export default function Hero({ onEnter }) {
  return (
    <section className="page-section" id="page-hero">
      <header className="hero relative overflow-hidden">
        <div className="hero-overlay" />

        {/* Faint Grand Kanji Watermark (忍衆 - Shinobi Clan) */}
        <div
          className="absolute select-none text-[10rem] sm:text-[18rem] lg:text-[24rem] leading-none pointer-events-none z-0 opacity-20"
          style={{
            color: "#B8322C",
            top: "48%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "'Yuji Syuku', serif",
          }}
          aria-hidden="true"
        >
          忍衆
        </div>

        <div className="hero-inner relative z-10">
          <div className="eyebrow inline-flex items-center gap-2 mb-6">
            <span className="text-[#B8322C] font-bold">影の道</span>
            <span>•</span>
            <span>SHADOW PROTOCOL // SQUAD DOSSIER</span>
          </div>

          <h2 className="title">MEET THE <span>TEAM</span></h2>
          <p className="tagline">The architects, builders, and operatives behind Tech Kurukshetra. Weightless in the void. Bound by fire.</p>
          <button type="button" className="scroll-cue cursor-pointer" onClick={onEnter}>
            ▶ explore team <span className="text-[#B8322C] font-mono ml-1">[開陣]</span>
          </button>
        </div>
      </header>
    </section>
  );
}
