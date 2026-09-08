import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Resolve __dirname for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Always load backend/.env (one level up from routes/)
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const DATA_FILE = path.join(__dirname, '..', 'data', 'enquiries.json');
const router = Router();

async function readEnquiries() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function saveEnquiry(entry) {
  const all = await readEnquiries();
  all.push(entry);
  await fs.writeFile(DATA_FILE, JSON.stringify(all, null, 2));
}

async function maybeSendEmail(entry) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn('⚠️ SMTP not configured, skipping email.');
    return;
  }

  const port = Number(SMTP_PORT) || 465;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // SSL for 465, TLS for 587
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.verify();
    console.log('SMTP connection verified');
    await transporter.sendMail({
      from: `"Fibre World Website" <${SMTP_USER}>`,
      to: NOTIFY_EMAIL || SMTP_USER,
      subject: `New enquiry from ${entry.name}_${entry.service}`,
      text: [
        `Name: ${entry.name}`,
        `Phone: ${entry.phone}`,
        `Service: ${entry.service}`,
        `Message: ${entry.message || '(none)'}`,
        `Received: ${entry.receivedAt}`,
      ].join('\n'),
    });
  } catch (err) {
    console.error('SMTP connection failed:', err);
    return false;
  }

  return true;
}

router.post('/', async (req, res) => {
  const { name, phone, service, message } = req.body || {};

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone number are required.' });
  }

  const entry = {
    name: String(name).trim(),
    phone: String(phone).trim(),
    service: service ? String(service).trim() : 'Not specified',
    message: message ? String(message).trim() : '',
    receivedAt: new Date().toISOString(),
  };

  try {
    await saveEnquiry(entry);
    res.status(201).json({ ok: true });

    void maybeSendEmail(entry).catch((err) => {
      console.error('Failed to send enquiry email:', err);
    });
  } catch (err) {
    console.error('Failed to handle enquiry:', err);
    res.status(500).json({ error: 'Something went wrong saving your request.' });
  }
});

router.get('/', async (_req, res) => {
  const all = await readEnquiries();
  res.json(all.slice().reverse());
});

export default router;
