const SERVICES = [
  'Minor & major dents',
  'Canopy repairs & modifications',
  'Spray painting',
  'Panel beating',
  'Fibreglass repairs',
  'Bumper repairs',
  'Gas welding',
  'Arc welding',
  'Back-to-standard',
  'Plastic welding',
  'Scratch repairs',
  'Polishing, Buffing and Waxing',
  'Windscreen fitments',
  'Mechanical repairs',
  'Upholstery boats & vehicles',
  'Scuff repairs',
  'Colour changes',
];

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="section-head">
          <div className="section-kicker">OUR SERVICES</div>
          <h2>Whatever's dented, scratched, faded or cracked.</h2>
          <p>Bring it in and we'll tell you honestly what it needs.</p>
        </div>

        <div className="service-tags">
          {SERVICES.map((s) => (
            <span className="service-tag" key={s}>
              {s}
            </span>
          ))}
        </div>

        <div className="respray-banner">
          <div>
            <h3>Full respray, vehicles and boats.</h3>
            <p>
              A complete colour-to-colour respray, done in-house from prep through to
              clear coat and buffing.
            </p>
          </div>
          <a className="btn btn-dark" href="#contact">
            Ask about a respray
          </a>
        </div>
      </div>
    </section>
  );
}
