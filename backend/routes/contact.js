import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
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
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(all, null, 2));
}

async function maybeSendEmail(entry) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.log(
      '[email] Skipped — missing env var(s):',
      [
        !SMTP_HOST && 'SMTP_HOST',
        !SMTP_USER && 'SMTP_USER',
        !SMTP_PASS && 'SMTP_PASS',
      ]
        .filter(Boolean)
        .join(', ')
    );
    return;
  }

  console.log(`[email] Attempting to send via ${SMTP_HOST} as ${SMTP_USER}...`);

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 465,
    secure: true,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const info = await transporter.sendMail({
    from: `"Fibre World Website" <${SMTP_USER}>`,
    to: NOTIFY_EMAIL || SMTP_USER,
    subject: `New enquiry from ${entry.name} — ${entry.service}`,
    text: [
      `Name: ${entry.name}`,
      `Phone: ${entry.phone}`,
      `Service: ${entry.service}`,
      `Message: ${entry.message || '(none)'}`,
      `Received: ${entry.receivedAt}`,
    ].join('\n'),
  });

  console.log(`[email] Sent OK — messageId: ${info.messageId}`);
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
  } catch (err) {
    console.error('Failed to save enquiry:', err);
    return res.status(500).json({ error: 'Something went wrong saving your request.' });
  }

  try {
    await maybeSendEmail(entry);
  } catch (err) {
    // The enquiry is already saved at this point — a broken email
    // setup shouldn't make the form look like it failed.
    console.error('[email] Send failed:', err.message);
  }

  res.status(201).json({ ok: true });
});

// simple listing endpoint, handy for the business owner to check enquiries
router.get('/', async (_req, res) => {
  const all = await readEnquiries();
  res.json(all.slice().reverse());
});

export default router;