import { ArrowUpRight, Sparkles, Users } from "lucide-react";
import { motion } from "motion/react";

export default function TeamBanner() {
  const handleRedirect = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = "team";
    window.scrollTo({ top: 0, behavior: "instant" as any });
  };

  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8 max-w-[1720px] mx-auto">
      {/* Header Outside Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="section-header text-center mb-10 mx-auto max-w-3xl"
      >
        <div className="mb-3 inline-flex items-center gap-2.5 font-accent text-xs uppercase tracking-[0.28em] text-[#B8322C]">
          <span className="flex size-7 items-center justify-center rounded-full border border-[#B8322C]/35 bg-[#B8322C]/10">
            <Users className="size-3.5 text-[#B8322C]" />
          </span>
          The Shadow Dojo
        </div>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1D1B18] uppercase tracking-wide leading-none">
          MEET THE <span className="text-[#B8322C]">TEAM</span>
        </h2>
      </motion.div>

      {/* Light Theme Banner Container */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto w-full max-w-[1680px] min-h-[340px] sm:min-h-[380px] lg:min-h-[420px] overflow-hidden rounded-3xl border border-[#B8322C]/30 bg-[#F7F1E5]/95 shadow-[0_20px_50px_rgba(75,50,37,0.12),0_0_35px_rgba(184,50,44,0.08)] backdrop-blur-xl p-10 sm:p-16 lg:p-20 flex items-center"
      >
        {/* Background Warm Radial Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(184,50,44,0.12),transparent_70%)] pointer-events-none" />
        
        {/* Faint Gradient Kanji Watermark */}
        <div className="absolute -right-4 -top-10 select-none font-display text-[24rem] leading-none bg-gradient-to-b from-[#B8322C]/25 via-[#B8322C]/10 to-transparent bg-clip-text text-transparent opacity-60 sm:right-6 sm:text-[32rem] pointer-events-none z-0">
          戦
        </div>

        <div className="relative w-full flex flex-col lg:flex-row items-center justify-between gap-8 text-left">
          {/* Floating Information Paragraph Card */}
          <div className="w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl rounded-2xl border border-[#B8322C]/25 bg-white/80 p-8 sm:p-10 lg:p-12 backdrop-blur-md shadow-[0_12px_30px_rgba(29,27,24,0.08)] transition-all duration-300 hover:shadow-[0_18px_40px_rgba(29,27,24,0.12)] hover:-translate-y-1">
            <div className="mb-4 flex items-center gap-2.5 font-accent text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#B8322C]">
              <Sparkles className="size-4.5 text-[#B8322C]" />
              INNOVATORS & EXECUTION SQUAD
            </div>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#1D1B18] font-sans font-medium">
              Meet the core leads, department architects, and student volunteers turning vision into reality across 5 specialized chambers and 4 operational wings at Tech Kurukshetra.
            </p>
          </div>

          {/* Light Theme Redirect Button with Custom Cursor & Scroll-to-Top Support */}
          <motion.a
            href="#team"
            onClick={handleRedirect}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex shrink-0 items-center gap-5 rounded-2xl border border-[#B8322C] bg-[#B8322C] hover:bg-[#d54536] px-9 py-6 font-accent text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-white shadow-[0_8px_25px_rgba(184,50,44,0.35)] transition-all duration-300 pointer-events-auto cursor-pointer"
          >
            <span>ENTER THE CHAMBERS</span>
            <span className="flex size-10 items-center justify-center rounded-xl bg-black/20 text-white backdrop-blur-sm transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="size-5" />
            </span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
