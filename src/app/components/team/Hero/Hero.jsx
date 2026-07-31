export default function Hero({ onEnter }) {
  return (
    <section className="page-section" id="page-hero">
      <header className="hero">
        <div className="hero-overlay" />
        <div className="hero-inner">
          <h2 className="title">MEET THE <span>TEAM</span></h2>
          <p className="tagline">The teams behind Tech Kurukshetra. Weightless in the void. Bound by fire.</p>
          <button type="button" className="scroll-cue" onClick={onEnter}>▶ explore team</button>
        </div>
      </header>
    </section>
  );
}
