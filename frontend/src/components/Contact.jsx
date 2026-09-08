import { useState } from 'react';

const initialForm = {
  name: '',
  phone: '',
  service: 'Panel beating',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      setStatus({ state: 'err', message: 'Please add your name and a phone number.' });
      return;
    }

    setStatus({ state: 'sending', message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Request failed');

      setStatus({
        state: 'ok',
        message: "Thanks, we've got your request and will call you back shortly.",
      });
      setForm(initialForm);
    } catch (err) {
      setStatus({
        state: 'err',
        message:
          "That didn't go through. Please call or WhatsApp us directly on 0999 713 363 instead.",
      });
    }
  };

  return (
    <section className="section section-dark" id="contact">
      <div className="wrap">
        <div className="section-head">
          <div className="section-kicker">GET IN TOUCH</div>
          <h2>Tell us what needs fixing or building.</h2>
          <p>Call for a free estimate, or send the details below and we'll call you back.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="info-block">
              <span className="label">VISIT THE YARD</span>
              <p>Malangalanga, Lilongwe, Malawi</p>
              <p>Open weekdays, 8:00 AM – 4:30 PM</p>
            </div>

            <div className="info-block">
              <span className="label">CALL OR WHATSAPP</span>
              <a href="tel:0999713363">0999 713 363</a>
              <a href="tel:0999933314">0999 933 314</a>
              <a href="tel:0888110091">0888 110 091</a>
            </div>

            <div className="info-block">
              <span className="label">EMAIL</span>
              <a href="mailto:fibreworldpat@gmail.com">fibreworldpat@gmail.com</a>
            </div>
          </div>

          <form className="form-card" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="field">
                <label htmlFor="name">Your name</label>
                <input id="name" value={form.name} onChange={update('name')} required />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone number</label>
                <input id="phone" value={form.phone} onChange={update('phone')} required />
              </div>
            </div>

            <div className="field">
              <label htmlFor="service">What do you need?</label>
              <select id="service" value={form.service} onChange={update('service')}>
                <option>Panel beating</option>
                <option>Spray painting / full respray</option>
                <option>Fibreglass or plastic repair</option>
                <option>Carport — new build</option>
                <option>Fibreglass tank / process equipment</option>
                <option>Boat or vehicle upholstery</option>
                <option>Something else</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="message">A few details (make, model, size, colour...)</label>
              <textarea id="message" value={form.message} onChange={update('message')} />
            </div>

            <button className="btn btn-resin" type="submit" disabled={status.state === 'sending'}>
              {status.state === 'sending' ? 'Sending…' : 'Request a call back'}
            </button>

            {status.message && (
              <p className={`form-status ${status.state === 'ok' ? 'ok' : 'err'}`}>
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}