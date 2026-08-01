import { useState, useRef } from "react";
import { ArrowUpRight, Flame } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";

export default function CoordinatorsSection({ onOpenCoordinators, setHoveredTorii }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef(null);

  // 3D Parallax Hover State
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current || isAnimating) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsAnimating(true);
    x.set(0);
    y.set(0);
    setTimeout(() => {
      onOpenCoordinators();
    }, 250);
    setTimeout(() => {
      setIsAnimating(false);
    }, 550);
  };

  return (
    <section className="vertical-team-section w-full py-12 flex flex-col items-center justify-center [perspective:1200px]" id="coordinators-section">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.88, y: 35 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        animate={isAnimating ? { rotateY: [0, 180, 360], scale: [1, 0.9, 1] } : {}}
        transition={isAnimating ? { duration: 0.5, ease: "easeInOut" } : { duration: 0.6, ease: "easeOut" }}
        style={{ 
          transformStyle: "preserve-3d",
          rotateX: isAnimating ? 0 : rotateX,
          rotateY: isAnimating ? (0) : rotateY,
        }}
        className="relative mx-auto w-full max-w-[540px] aspect-square rounded-full bg-[#F2ECE1] shadow-[0_20px_60px_rgba(75,50,37,0.18),inset_0_0_60px_rgba(184,138,61,0.1)] backdrop-blur-2xl p-6 sm:p-10 lg:p-12 flex flex-col items-center justify-center text-center overflow-hidden transition-shadow duration-500 hover:shadow-[0_25px_75px_rgba(184,50,44,0.22),inset_0_0_80px_rgba(184,138,61,0.15)] group"
      >
        {/* Traditional Washi Paper (和紙) Noise Texture */}
        <div className="absolute inset-0 opacity-[0.35] mix-blend-multiply pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        
        {/* Aged Tea Stain & Watercolor Edge Burn */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(184,138,61,0.12)_80%,rgba(184,50,44,0.15)_100%)] rounded-full pointer-events-none z-0"></div>

        {/* Japanese Ensō (円相) Zen Ink Brush Circle Overlay - Enhanced Authentic Calligraphy */}
        <svg className="absolute inset-[-6%] size-[112%] pointer-events-none z-10 overflow-visible" viewBox="0 0 200 200">
          <defs>
            <filter id="rough-ink-coordinators" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.12" numOctaves="4" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            
            <linearGradient id="ensoGradCoordinators" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d54536" />
              <stop offset="60%" stopColor="#B8322C" />
              <stop offset="100%" stopColor="#7A1814" />
            </linearGradient>
          </defs>

          <g filter="url(#rough-ink-coordinators)">
            <path d="M 94 10 C 146 8 190 48 190 100 C 190 152 148 192 100 190 C 50 188 8 148 10 98 C 12 50 50 12 86 10" fill="none" stroke="url(#ensoGradCoordinators)" strokeWidth="12" strokeLinecap="round" strokeDasharray="560 40" className="opacity-95" />
            <path d="M 92 6 C 148 4 196 46 194 100 C 194 156 150 196 100 194 C 46 194 4 150 6 98 C 8 46 48 8 84 8" fill="none" stroke="#B8322C" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="60 15 120 25 200 50" className="opacity-80" />
            <path d="M 96 14 C 142 14 184 52 184 100 C 184 146 144 184 100 184 C 54 184 16 144 16 98 C 16 54 52 16 90 14" fill="none" stroke="#8A1C17" strokeWidth="4" strokeLinecap="round" strokeDasharray="40 10 80 5 150 20" className="opacity-65" />
            <path d="M 95 12 C 144 10 187 49 187 100 C 187 149 146 188 100 187 C 52 186 12 146 13 98 C 14 52 51 14 88 12" fill="none" stroke="#B88A3D" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="180 40 300 80" className="opacity-90" />
            <circle cx="82" cy="4" r="3" fill="#B8322C" className="opacity-90" />
            <circle cx="72" cy="10" r="1.5" fill="#B88A3D" className="opacity-80" />
            <circle cx="65" cy="5" r="2" fill="#B8322C" className="opacity-70" />
            <circle cx="194" cy="115" r="2.5" fill="#B8322C" className="opacity-75" />
            <circle cx="188" cy="128" r="1" fill="#B88A3D" className="opacity-65" />
            <circle cx="8" cy="108" r="1.5" fill="#8A1C17" className="opacity-60" />
          </g>
        </svg>

        <div className="absolute inset-3.5 rounded-full border border-dashed border-[#B8322C]/30 pointer-events-none animate-[spin_55s_linear_infinite]" />
        <div className="absolute inset-7 rounded-full border border-[#B8322C]/15 pointer-events-none" />

        <svg className="absolute inset-0 size-full opacity-[0.08] pointer-events-none z-0" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="none" stroke="#B8322C" strokeWidth="0.4" strokeDasharray="1 2" />
          <circle cx="50" cy="50" r="44" fill="none" stroke="#B88A3D" strokeWidth="0.3" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#B8322C" strokeWidth="0.4" strokeDasharray="3 2" />
        </svg>

        <div className="absolute top-2 left-1/2 -translate-x-1/2 size-2 rounded-full bg-[#B8322C] border border-[#F7F1E5] shadow-[0_0_6px_rgba(184,50,44,0.7)] z-10" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 size-2 rounded-full bg-[#B8322C] border border-[#F7F1E5] shadow-[0_0_6px_rgba(184,50,44,0.7)] z-10" />
        <div className="absolute left-2 top-1/2 -translate-y-1/2 size-2 rounded-full bg-[#B88A3D] border border-[#F7F1E5] shadow-[0_0_6px_rgba(184,138,61,0.7)] z-10" />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 size-2 rounded-full bg-[#B88A3D] border border-[#F7F1E5] shadow-[0_0_6px_rgba(184,138,61,0.7)] z-10" />

        <div className="absolute top-7 right-8 sm:top-9 sm:right-11 flex flex-col items-center justify-center size-8 sm:size-10 rounded border-2 border-[#B8322C] bg-[#B8322C]/10 text-[#B8322C] font-serif font-bold text-xs sm:text-sm tracking-tighter select-none rotate-6 shadow-[0_0_12px_rgba(184,50,44,0.25)] pointer-events-none z-20" style={{ transform: "translateZ(30px)" }}>
          <span className="leading-none">火</span>
          <span className="text-[6px] font-mono tracking-widest text-[#B8322C]/80 uppercase">SEAL</span>
        </div>

        <div className="absolute left-5 top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-center gap-1 font-serif text-[10px] tracking-[0.35em] text-[#B8322C]/50 select-none pointer-events-none [writing-mode:vertical-rl] z-0">
          侍の精神 • SAMURAI SPIRIT
        </div>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-center gap-1 font-serif text-[10px] tracking-[0.35em] text-[#B88A3D]/50 select-none pointer-events-none [writing-mode:vertical-rl] z-0">
          実行力 • EXECUTION FORCE
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,50,44,0.14),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center select-none font-display text-[16rem] sm:text-[20rem] leading-none bg-gradient-to-b from-[#B8322C]/25 via-[#B8322C]/10 to-transparent bg-clip-text text-transparent opacity-60 pointer-events-none z-0">
          刃
        </div>

        <AnimatePresence>
          {isAnimating && (
            <>
              <motion.div initial={{ scale: 0.4, opacity: 0.95 }} animate={{ scale: 1.45, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="absolute inset-0 rounded-full border-4 border-[#B8322C] pointer-events-none z-30 shadow-[0_0_50px_rgba(184,50,44,0.8)]" />
              <motion.div initial={{ scale: 0.25, opacity: 1 }} animate={{ scale: 1.3, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, delay: 0.04, ease: "easeOut" }} className="absolute inset-0 rounded-full border-2 border-[#B88A3D] pointer-events-none z-30 shadow-[0_0_35px_rgba(184,138,61,0.8)]" />
              <motion.div initial={{ scaleX: 0, opacity: 1 }} animate={{ scaleX: 1.2, opacity: [1, 1, 0] }} exit={{ opacity: 0 }} transition={{ duration: 0.28, ease: "easeInOut" }} className="absolute top-1/2 left-[-10%] right-[-10%] h-1.5 bg-gradient-to-r from-transparent via-[#FFF] to-transparent -rotate-45 pointer-events-none z-40 shadow-[0_0_20px_#ffffff,0_0_35px_#B8322C]" />
              <motion.div initial={{ opacity: 0.7 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0 rounded-full bg-[#B8322C]/25 backdrop-blur-sm pointer-events-none z-20" />
            </>
          )}
        </AnimatePresence>

        <motion.div 
          style={{ transform: "translateZ(40px)" }} 
          className="relative z-20 flex flex-col items-center justify-center gap-3 sm:gap-4 h-full py-12 px-10 sm:px-14 lg:px-16 w-full"
        >
          <div className="inline-flex items-center gap-2 font-accent text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#B8322C] font-semibold bg-[#B8322C]/10 border border-[#B8322C]/30 px-4 py-1.5 rounded-full shadow-sm">
            <Flame className="size-3.5 text-[#B8322C]" />
            <span>実行部隊 • Execution Force</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#1D1B18] uppercase tracking-wide leading-tight my-3 drop-shadow-sm">
            MEET THE <br />
            <span className="text-[#B8322C]">COORDINATORS</span>
          </h2>

          <p className="text-xs sm:text-sm lg:text-base leading-relaxed text-[#1D1B18]/80 font-sans font-medium max-w-[280px] sm:max-w-[320px] mx-auto px-4 mb-2">
            The relentless driving force executing the vision of Tech Kurukshetra with precision and unyielding energy.
          </p>

          <motion.button
            type="button"
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={(e) => setHoveredTorii && setHoveredTorii(e.currentTarget)}
            className="group/btn relative inline-flex items-center gap-3.5 rounded-full bg-gradient-to-br from-[#1D1B18] to-[#2A2621] px-7 py-3.5 font-accent text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#EFE9DD] shadow-[0_10px_25px_rgba(29,27,24,0.4)] transition-all duration-300 pointer-events-auto cursor-pointer mt-2 sm:mt-4 border border-[#B88A3D]/30 hover:border-[#B88A3D] hover:shadow-[0_15px_35px_rgba(184,138,61,0.25)] overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#B88A3D]/40 to-transparent group-hover/btn:translate-x-[200%] transition-transform duration-700 ease-in-out" />
            
            <span className="relative z-10 transition-colors group-hover/btn:text-white">VIEW COORDINATORS</span>
            <span className="relative z-10 flex size-8 items-center justify-center rounded-full bg-[#B8322C] text-white shadow-[0_0_12px_rgba(184,50,44,0.5)] transition-transform duration-300 group-hover/btn:rotate-45 group-hover/btn:scale-110">
              <ArrowUpRight className="size-4" strokeWidth={2.5} />
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
