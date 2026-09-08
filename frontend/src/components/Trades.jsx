const TRADES = ['Panel Beating', 'Spray Painting', 'Fibreglass & Plastic Repairs'];

export default function Trades() {
  return (
    <section className="trades">
      <div className="wrap">
        {TRADES.map((t) => (
          <div className="trade-item" key={t}>
            <span className="trade-index"> </span>
            <span className="trade-label">{t}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
