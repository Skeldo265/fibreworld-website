import { useState } from 'react';

const LINKS = [
  { href: '#products', label: 'Products' },
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Our Work' },
  { href: '#about', label: 'About Us' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="wrap">
        <a href="#top" className="brand">
          <span className="brand-mark">
            FIBRE<span>WORLD</span>
          </span>
          <span className="brand-sub">PANEL · PAINT · FIBREGLASS</span>
        </a>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-cta">
          <a className="nav-phone" href="tel:0999713363">
            0999 713 363
          </a>
          <a className="btn btn-resin" href="#contact">
            Get a Quote
          </a>
          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
}
