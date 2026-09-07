import carport from '../assets/cantilever-carport-2.jpeg';
import poolBeach from '../assets/pool-beach.jpeg';
import hiluxCanopy from '../assets/hilux-canopy.jpeg';
import boatHull from '../assets/boat.jpeg';
import respraySpray from '../assets/respray-truck.jpeg';
import subaruFinished from '../assets/subaru-finished.jpeg';

const SHOTS = [
  { img: respraySpray, caption: 'Full respray in progress masked up and ready for paint' },
  { img: subaruFinished, caption: 'Panel beating & respray, finished and ready for collection' },
  { img: poolBeach, caption: 'Resin-coated pool, finished, lakeside' },
  { img: carport, caption: 'carport installation' },
  { img: hiluxCanopy, caption: 'Toyota Hilux, canopy fitted and parked under a Fibre World carport' },
  { img: boatHull, caption: 'Boat hull, mid-repair' },
];

export default function Gallery() {
  return (
    <section className="section section-dark" id="gallery">
      <div className="wrap">
        <div className="section-head">
          <div className="section-kicker">FROM THE YARD</div>
          <h2>A few jobs, on the way to finished.</h2>
          <p>More photos coming soon every job leaves the yard looking sharper than it arrived.</p>
        </div>

        <div className="gallery-grid">
          {SHOTS.map((s) => (
            <figure className="gallery-item" key={s.caption}>
              <img src={s.img} alt={s.caption} loading="lazy" />
              <figcaption>{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
