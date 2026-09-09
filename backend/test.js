re_YAX7889V_ixWK1H37r6QXNFF6HVBYf9x5
import { Resend } from 'resend';

const resend = new Resend('re_YAX7889V_ixWK1H37r6QXNFF6HVBYf9x5');

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'symonimran7@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});