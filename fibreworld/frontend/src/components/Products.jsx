import carportAlt from '../assets/carport-alt.jpeg';
import roofSheets from '../assets/roof-sheets.jpeg';
import cantileverCarport from '../assets/cantilever-carport-2.jpeg';
import portableToilet from '../assets/portable-toilet.jpeg';

const PHOTO_PRODUCTS = [
  {
    img: carportAlt,
    title: 'Steel-Frame Carports',
    text: 'Any colour, any size built to fit your vehicles, boats and trailers.',
  },
  {
    img: cantileverCarport,
    title: 'Cantilever Carports',
    text: 'Single-post, tensioned-canopy carports no centre posts in the way of parking.',
  },
  {
    img: roofSheets,
    title: 'Translucent Roof Sheets',
    text: 'Fibreglass sheeting that lets daylight into workshops, carports and stores.',
  },

  {
    img: portableToilet,
    title: 'Fibreglass Seats & Fittings',
    text: 'Moulded seats and fittings like this portable loo built to your spec.',
  },
];

const TEXT_PRODUCTS = [
  { title: 'Fibreglass Ducting', text: 'Corrosion-resistant ducting fabricated to your run and diameter.' },
  { title: 'Fibreglass Downcomers', text: 'Built for process plants that need reliable, leak-free downcomers.' },
  { title: 'Fibreglass Clarifiers', text: 'Settling and clarification units moulded for durability.' },
  { title: 'Fibreglass Jacuzzis', text: 'Custom-shaped fibreglass jacuzzis, finished and gel-coated on site.' },
];

export default function Products() {
  return (
    <section className="section" id="products">
      <div className="wrap">
        <div className="section-head">
          <div className="section-kicker">WHAT WE MANUFACTURE</div>
          <h2>Built in-house, from steel frame to gel coat.</h2>
          <p>
            Every product below is fabricated to order, tell us the size, colour and
            capacity you need.
          </p>
        </div>

        <div className="products-grid">
          {PHOTO_PRODUCTS.map((p) => (
            <div className="product-card has-image" key={p.title}>
              <div className="product-media">
                <img src={p.img} alt={p.title} loading="lazy" />
              </div>
              <div className="product-body">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </div>
          ))}

          {TEXT_PRODUCTS.map((p) => (
            <div className="product-card no-image" key={p.title}>
              <div className="product-body">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
