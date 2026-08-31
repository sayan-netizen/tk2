import { ArrowUpRight, Sparkles, Users } from "lucide-react";
import { motion } from "motion/react";

export default function TeamBanner() {
  const handleRedirect = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = "team";
    window.scrollTo({ top: 0, behavior: "instant" as any });
  };

  return (
    <section id="team-banner" className="relative overflow-hidden px-4 pt-2 pb-6 sm:px-6 sm:pt-3 sm:pb-8 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="group relative mx-auto max-w-7xl overflow-hidden rounded-2xl border border-[#B88A3D]/45 bg-[#F2ECE1]/50 hover:bg-[#F2ECE1]/65 p-6 sm:p-10 lg:p-12 hover:border-[#B8322C] transition-all duration-500 backdrop-blur-md transform-gpu"
      >
        {/* Traditional Washi Paper (和紙) Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.35] mix-blend-multiply pointer-events-none z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Aged Tea Stain & Radial Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,138,61,0.18)_0%,transparent_65%)] pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(184,50,44,0.12)_0%,transparent_60%)] pointer-events-none z-0" />

        {/* Katana Light Sweep on Hover */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#B88A3D]/25 to-transparent group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out pointer-events-none z-10" />

        {/* Grand Kanji Watermark (戦 - Battle/War & 組 - Clan/Squad) */}
        <div className="absolute -right-6 -top-12 select-none font-display text-[10rem] sm:text-[18rem] lg:text-[22rem] leading-none bg-gradient-to-b from-[#B8322C]/20 via-[#B8322C]/08 to-transparent bg-clip-text text-transparent opacity-85 sm:right-4 pointer-events-none z-0">
          戦
        </div>
        <div className="absolute right-[24%] bottom-[-20%] select-none font-display text-[7rem] sm:text-[12rem] lg:text-[15rem] leading-none text-[#B88A3D]/10 opacity-60 pointer-events-none z-0">
          組
        </div>

        {/* Traditional Red Hanko Stamp (朱印) */}
        <div className="absolute top-5 right-6 flex flex-col items-center justify-center size-9 sm:size-10 rounded border-2 border-[#B8322C] bg-[#B8322C]/10 text-[#B8322C] font-serif font-bold text-[12px] tracking-tighter select-none rotate-6 shadow-[0_0_12px_rgba(184,50,44,0.25)] pointer-events-none z-20">
          <span className="leading-none">極</span>
          <span className="text-[5px] font-mono tracking-widest text-[#B8322C]/80 uppercase">TEAM</span>
        </div>

        {/* 4 Cardinal Corner Crest Accents (Kamon Marks) */}
        <div className="absolute top-2.5 left-2.5 size-1.5 rounded-full bg-[#B8322C] border border-[#F7F1E5] shadow-[0_0_6px_rgba(184,50,44,0.7)] z-20" />
        <div className="absolute top-2.5 right-2.5 size-1.5 rounded-full bg-[#B88A3D] border border-[#F7F1E5] shadow-[0_0_6px_rgba(184,138,61,0.7)] z-20" />
        <div className="absolute bottom-2.5 left-2.5 size-1.5 rounded-full bg-[#B88A3D] border border-[#F7F1E5] shadow-[0_0_6px_rgba(184,138,61,0.7)] z-20" />
        <div className="absolute bottom-2.5 right-2.5 size-1.5 rounded-full bg-[#B8322C] border border-[#F7F1E5] shadow-[0_0_6px_rgba(184,50,44,0.7)] z-20" />

        {/* Decorative Katana Vertical Division Line */}
        <div className="absolute inset-y-0 right-[22%] hidden lg:block w-px bg-gradient-to-b from-transparent via-[#B88A3D]/40 to-transparent pointer-events-none z-0" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14">
          <div className="max-w-2xl">
            {/* Eyebrow with Japanese Calligraphy badge */}
            <div className="mb-4 inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#B8322C]/10 border border-[#B8322C]/30">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#B8322C]/15 text-[#B8322C]">
                <Users className="size-3" />
              </span>
              <span className="font-accent text-[11px] tracking-[0.2em] uppercase text-[#B8322C] font-bold">
                忍道 // The Shadow Dojo
              </span>
            </div>

            {/* Sumi-e Brush Strike Line */}
            <div className="h-[3px] w-28 bg-gradient-to-r from-[#7A1814] via-[#B8322C] to-[#B88A3D] rounded-full mb-4 shadow-[0_1px_3px_rgba(122,24,20,0.3)]" />

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1D1B18] tracking-wide font-black drop-shadow-sm">
              MEET THE{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B8322C] via-[#d54536] to-[#B88A3D]">
                TEAM
              </span>
            </h2>
            <p className="mt-3.5 max-w-xl text-sm sm:text-base leading-relaxed text-[#38332C] font-sans font-medium">
              Meet the core leads, department architects, and student volunteers turning vision into reality across 5 specialized domains and 4 operational wings at Tech Kurukshetra.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-xs font-accent uppercase tracking-[0.2em]">
              <span className="inline-flex items-center gap-2 border border-[#B8322C]/30 bg-[#EAE1D2]/80 px-3.5 py-2 rounded-lg shadow-sm text-[#1D1B18] font-bold">
                <Sparkles className="size-3.5 text-[#B8322C]" />
                <span>Innovators & execution squad</span>
              </span>
              <span className="inline-flex items-center gap-2 border border-[#B88A3D]/40 bg-[#EAE1D2]/80 px-3.5 py-2 rounded-lg shadow-sm text-[#1D1B18]">
                <span className="text-[#B88A3D] font-bold">五門</span>
                <span className="text-[#5A5043] font-semibold">5 Domain leads</span>
              </span>
            </div>
          </div>

          <motion.a
            href="#team"
            onClick={handleRedirect}
            whileHover={{ scale: 1.03, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="group/btn relative inline-flex w-fit items-center gap-4 overflow-hidden rounded-xl border border-[#B8322C] bg-[#1D1B18] px-6 py-4 font-accent text-[11px] uppercase tracking-[0.22em] text-[#F7F1E5] shadow-[0_10px_25px_rgba(29,27,24,0.3)] transition-all hover:bg-[#B8322C] hover:border-[#7A1814] sm:px-7 cursor-pointer"
          >
            {/* Button Inner Katana Gleam */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:translate-x-[200%] transition-transform duration-700 pointer-events-none" />
            <span className="relative z-10 font-bold tracking-[0.25em]">Explore Team Leads</span>
            <span className="relative z-10 flex size-8 items-center justify-center rounded-lg bg-white/10 text-white transition-all group-hover/btn:bg-white group-hover/btn:text-[#B8322C] group-hover/btn:rotate-45 shadow-sm">
              <ArrowUpRight className="size-4" />
            </span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
