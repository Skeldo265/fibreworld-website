// test-smtp.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // loads .env

async function main() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465, // true for 465, false for 587
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  try {
    // Verify connection
    await transporter.verify();
    console.log('✅ SMTP connection successful');

    // Send a test email
    const info = await transporter.sendMail({
      from: `"SMTP Test" <${SMTP_USER}>`,
      to: SMTP_USER, // send to yourself
      subject: 'SMTP Test Email',
      text: 'This is a test email sent via Nodemailer + Gmail app password.',
    });

    console.log('📨 Message sent:', info.messageId);
  } catch (err) {
    console.error('❌ SMTP error:', err);
  }
}

main();
