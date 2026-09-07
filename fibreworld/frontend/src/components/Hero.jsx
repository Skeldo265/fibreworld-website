import carportHero from '../assets/carport-hero.jpeg';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div>
          <div className="hero-eyebrow">MALANGALANGA · LILONGWE</div>
          <h1>
            Your vehicle and boat,
            <br />
            looking <em>better than new.</em>
          </h1>
          <p className="hero-lede">
            Panel beating, spray painting, and fibreglass &amp; plastic repairs plus
            carports, tanks and process equipment built to order, in any colour and size.
            Quality work at a reasonable price.
          </p>
          <div className="hero-actions">
            <a className="btn btn-resin" href="#contact">
              Request a free estimate
            </a>
            <a className="btn btn-outline" href="tel:0999713363">
              Call 0999 713 363
            </a>
          </div>
        </div>

        <figure className="hero-figure">
          <img src={carportHero} alt="Steel carport fabricated by Fibre World, sheltering a truck and pontoon boat" />
          <figcaption>Carport, built and installed by Fibre World</figcaption>
        </figure>
      </div>
    </section>
  );
}
