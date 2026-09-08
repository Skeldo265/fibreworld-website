const PRINCIPLES = [
  'Give our current and future clients the highest quality products and excellent service.',
  'Build long-term relationships with a chain of trustworthy suppliers.',
  'Give our people safe, healthy and rewarding employment.',
  'Run a business that is more eco-friendly and cares for the environment.',
  'Lead in the design and fabrication of process equipment in fibreglass.',
];

export default function Mission() {
  return (
    <section className="section section-dark" id="about">
      <div className="wrap">
        <div className="section-head">
          <div className="section-kicker">OUR MISSION</div>
          <h2>What every job at Fibre World is measured against.</h2>
        </div>
        <div className="mission-list">
          {PRINCIPLES.map((line) => (
            <div className="mission-item" key={line}>
              <span className="mark" />
              <p>{line}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}