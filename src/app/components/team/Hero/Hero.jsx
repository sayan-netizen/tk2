export default function Hero({ onEnter }) {
  return (
    <section className="page-section" id="page-hero">
      <header className="hero">
        <div className="hero-overlay" />
        <div className="hero-inner">
          <span className="eyebrow">テック クルクシェトラ — Tech Kurukshetra</span>
          <h1 className="kanji-hero">戦</h1>
          <h2 className="title">TECH <span>KURUKSHETRA</span></h2>
          <p className="tagline">The elite chambers of Tech Kurukshetra. Weightless in the void. Bound by fire.</p>
          <button type="button" className="scroll-cue" onClick={onEnter}>▶ enter the chambers</button>
        </div>
      </header>
    </section>
  );
}
