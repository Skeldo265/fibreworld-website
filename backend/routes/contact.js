import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

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
  const { RESEND_API_KEY, NOTIFY_EMAIL } = process.env;

  if (!RESEND_API_KEY || !NOTIFY_EMAIL) {
    console.log(
      '[email] Skipped — missing env var(s):',
      [!RESEND_API_KEY && 'RESEND_API_KEY', !NOTIFY_EMAIL && 'NOTIFY_EMAIL']
        .filter(Boolean)
        .join(', ')
    );
    return;
  }

  console.log(`[email] Sending via Resend to ${NOTIFY_EMAIL}...`);

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Fibre World Website <onboarding@resend.dev>',
      to: [NOTIFY_EMAIL],
      subject: `New enquiry from ${entry.name}_${entry.service}`,
      text: [
        `Name: ${entry.name}`,
        `Phone: ${entry.phone}`,
        `Service: ${entry.service}`,
        `Message: ${entry.message || '(none)'}`,
        `Received: ${entry.receivedAt}`,
      ].join('\n'),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend API error ${res.status}: ${body}`);
  }

  const data = await res.json();
  console.log(`[email] Sent OK — id: ${data.id}`);
}

router.post('/', async (req, res) => {
  const { name, phone, service, message } = req.body || {};

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone number are required.' });
  }

  const d = new Date();
const options = { timeZone: 'Africa/Lilongwe' };
const local = new Date(d.toLocaleString('en-US', options));

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const formatted = `${local.getDate().toString().padStart(2, '0')}-${months[local.getMonth()]}-${local.getFullYear()}, ${local.getHours().toString().padStart(2, '0')}:${local.getMinutes().toString().padStart(2, '0')}`;

const entry = {
  name: String(name).trim(),
  phone: String(phone).trim(),
  service: service ? String(service).trim() : 'Not specified',
  message: message ? String(message).trim() : '',
  receivedAt: formatted,
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