import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { ScrollReveal, Parallax, SlideTitle, StaggerContainer, StaggerItem, ScrollDepth } from "./ScrollAnimations";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const id = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(id);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(id);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-display text-4xl sm:text-5xl text-[#B8322C] font-black drop-shadow-[0_1px_8px_rgba(184,50,44,0.3)]">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 5000, suffix: "+", label: "Students", seal: "衆" },
  { value: 50, suffix: "+", label: "Events", seal: "陣" },
  { value: 30, suffix: "+", label: "Colleges", seal: "学" },
  { value: 10, suffix: "L+", label: "In Prizes", seal: "賞" },
];

const aboutDesktopBg = new URL("../../../images/About_dektop_f.webp", import.meta.url).href;
const aboutMobileBg = new URL("../../../images/about_mobile_f.webp", import.meta.url).href;

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="about"
      className="relative z-20 max-sm:-mt-20 sm:-mt-38 lg:-mt-48 pb-56 sm:pb-28 overflow-hidden bg-transparent transform-gpu"
      ref={sectionRef}
    >
      {/* Rich Japanese Background Artwork — Responsive Desktop / Mobile */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-transparent">
        <picture>
          <source media="(max-width: 767px)" srcSet={aboutMobileBg} />
          <img
            src={aboutDesktopBg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover max-sm:object-[-25px_top] sm:object-top opacity-100 will-change-transform"
          />
        </picture>
        {/* Soft bottom fog blend to seamlessly transition into the banner section below */}
        <div className="absolute inset-x-0 bottom-0 h-52 max-sm:h-64 bg-gradient-to-t from-[#EFE2C7] via-[#EFE2C7]/90 via-[#EFE2C7]/60 via-[#EFE2C7]/30 to-[#EFE2C7]/0 pointer-events-none" />
      </div>

      {/* Lightweight static ambient glows (zero scroll paint overhead) */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#B8322C]/5 rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#B88A3D]/5 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-80 sm:pt-40 lg:pt-52">
        {/* Section header — animated clean title with glowing katana line */}
        <div className="mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            {/* Animated Sumi-e Ink Strike Mark — Blends naturally with parchment background */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "130px", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="h-[3px] bg-gradient-to-r from-[#7A1814] via-[#B8322C] to-transparent rounded-full mb-3 shadow-[0_1px_3px_rgba(122,24,20,0.3)]"
            />

            {/* Animated Main Title */}
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-[#1D1B18] tracking-wide font-black drop-shadow-sm">
              ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B8322C] via-[#d54536] to-[#B88A3D]">TK &apos;26</span>
            </h2>
          </motion.div>
        </div>

        {/* Content grid — Styled with authentic Team Page Washi Paper & Parchment Aesthetics */}
        <div className="mb-14 sm:mb-20">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Overview Card with Katana Light Sweep Animation */}
            <ScrollReveal direction="left" delay={0.1}>
              <div className="relative rounded-2xl bg-[#F2ECE1]/95 p-8 sm:p-10 border border-[#B88A3D]/40 hover:border-[#B8322C] shadow-[0_15px_45px_rgba(75,50,37,0.14),inset_0_0_40px_rgba(184,138,61,0.08)] hover:shadow-[0_20px_60px_rgba(184,50,44,0.18)] transition-all duration-300 overflow-hidden group h-full flex flex-col justify-between transform-gpu will-change-transform">
                {/* Traditional Washi Paper (和紙) Noise Texture */}
                <div
                  className="absolute inset-0 opacity-[0.35] mix-blend-multiply pointer-events-none z-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Aged Tea Stain & Radial Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,138,61,0.15)_0%,transparent_65%)] pointer-events-none z-0" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(184,50,44,0.12)_0%,transparent_60%)] pointer-events-none z-0" />

                {/* Katana Light Sweep on Hover */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#B88A3D]/25 to-transparent group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out pointer-events-none" />

                {/* Traditional Red Hanko Stamp (朱印) */}
                <div className="absolute top-5 right-6 flex flex-col items-center justify-center size-8 sm:size-9 rounded border-2 border-[#B8322C] bg-[#B8322C]/10 text-[#B8322C] font-serif font-bold text-[11px] tracking-tighter select-none rotate-6 shadow-[0_0_12px_rgba(184,50,44,0.25)] pointer-events-none z-10">
                  <span className="leading-none">極</span>
                  <span className="text-[5px] font-mono tracking-widest text-[#B8322C]/80 uppercase">SEAL</span>
                </div>

                {/* 4 Cardinal Corner Crest Accents (Kamon Marks) */}
                <div className="absolute top-2.5 left-2.5 size-1.5 rounded-full bg-[#B8322C] border border-[#F7F1E5] shadow-[0_0_6px_rgba(184,50,44,0.7)]" />
                <div className="absolute bottom-2.5 left-2.5 size-1.5 rounded-full bg-[#B88A3D] border border-[#F7F1E5] shadow-[0_0_6px_rgba(184,138,61,0.7)]" />
                <div className="absolute bottom-2.5 right-2.5 size-1.5 rounded-full bg-[#B8322C] border border-[#F7F1E5] shadow-[0_0_6px_rgba(184,50,44,0.7)]" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8322C]/10 border border-[#B8322C]/30 mb-5">
                    <span className="font-accent text-[11px] tracking-[0.2em] uppercase text-[#B8322C] font-bold">
                      Grand Tech Arena
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-[#1D1B18] mb-4">
                    Tech Kurukshetra
                  </h3>
                  <p className="text-[#38332C] text-sm sm:text-base leading-relaxed mb-4 font-sans font-medium">
                    Tech Kurukshetra is the flagship national-level technology festival of NIT Kurukshetra,
                    one of India&apos;s premier technical institutions. For over a decade, it has been the
                    battleground where the brightest minds from across the nation converge to compete,
                    collaborate, and create.
                  </p>
                  <p className="text-[#5A5043] text-sm sm:text-base leading-relaxed font-sans font-medium">
                    From high-stakes hackathons and intense coding marathons to cutting-edge robotics
                    challenges and immersive workshops — Tech Kurukshetra is where innovation meets
                    competition with participants from 30+ top engineering colleges.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Theme narrative Card */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="relative rounded-2xl bg-[#F2ECE1]/95 p-8 sm:p-10 border border-[#B88A3D]/40 hover:border-[#B8322C] shadow-[0_15px_45px_rgba(75,50,37,0.14),inset_0_0_40px_rgba(184,138,61,0.08)] hover:shadow-[0_20px_60px_rgba(184,50,44,0.18)] transition-all duration-300 overflow-hidden group h-full flex flex-col justify-between transform-gpu will-change-transform">
                {/* Traditional Washi Paper (和紙) Noise Texture */}
                <div
                  className="absolute inset-0 opacity-[0.35] mix-blend-multiply pointer-events-none z-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Aged Tea Stain & Radial Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,138,61,0.15)_0%,transparent_65%)] pointer-events-none z-0" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(184,50,44,0.12)_0%,transparent_60%)] pointer-events-none z-0" />

                {/* Katana Light Sweep on Hover */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#B88A3D]/25 to-transparent group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out pointer-events-none" />

                {/* Traditional Red Hanko Stamp (朱印) */}
                <div className="absolute top-5 right-6 flex flex-col items-center justify-center size-8 sm:size-9 rounded border-2 border-[#B8322C] bg-[#B8322C]/10 text-[#B8322C] font-serif font-bold text-[11px] tracking-tighter select-none rotate-6 shadow-[0_0_12px_rgba(184,50,44,0.25)] pointer-events-none z-10">
                  <span className="leading-none">秘</span>
                  <span className="text-[5px] font-mono tracking-widest text-[#B8322C]/80 uppercase">THEME</span>
                </div>

                {/* 4 Cardinal Corner Crest Accents */}
                <div className="absolute top-2.5 left-2.5 size-1.5 rounded-full bg-[#B8322C] border border-[#F7F1E5] shadow-[0_0_6px_rgba(184,50,44,0.7)]" />
                <div className="absolute bottom-2.5 left-2.5 size-1.5 rounded-full bg-[#B88A3D] border border-[#F7F1E5] shadow-[0_0_6px_rgba(184,138,61,0.7)]" />
                <div className="absolute bottom-2.5 right-2.5 size-1.5 rounded-full bg-[#B8322C] border border-[#F7F1E5] shadow-[0_0_6px_rgba(184,50,44,0.7)]" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8322C]/10 border border-[#B8322C]/30 mb-5">
                    <span className="font-accent text-[11px] tracking-[0.2em] uppercase text-[#B8322C] font-bold">
                      2026 Theme Edition
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-[#1D1B18] mb-4">
                    Shadow Protocol
                  </h3>
                  <p className="text-[#38332C] text-sm sm:text-base leading-relaxed mb-4 italic font-sans font-medium border-l-2 border-[#B8322C] pl-3 py-0.5">
                    &ldquo;In a world of noise, the shadow prevails. Where others broadcast their moves, the
                    shinobi strikes in silence — with precision, purpose, and mastery.&rdquo;
                  </p>
                  <p className="text-[#5A5043] text-sm sm:text-base leading-relaxed font-sans font-medium">
                    This year&apos;s theme draws from the ancient art of the ninja — combining stealth,
                    strategy, and cutting-edge technology. Enter the Shadow Protocol and prove your worth.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Stats grid with stagger animation & Team Page Washi Styling */}
        <div>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" staggerDelay={0.12}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="relative rounded-2xl bg-[#F2ECE1]/95 p-6 sm:p-8 border border-[#B88A3D]/40 hover:border-[#B8322C] shadow-[0_10px_30px_rgba(75,50,37,0.12),inset_0_0_30px_rgba(184,138,61,0.06)] hover:shadow-[0_15px_40px_rgba(184,50,44,0.16)] transition-all duration-300 group overflow-hidden text-center transform-gpu will-change-transform">
                  {/* Washi Texture */}
                  <div
                    className="absolute inset-0 opacity-[0.25] mix-blend-multiply pointer-events-none z-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                  />

                  {/* Aged Tea Stain & Radial Glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,138,61,0.15)_0%,transparent_65%)] pointer-events-none z-0" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(184,50,44,0.12)_0%,transparent_60%)] pointer-events-none z-0" />

                  {/* Katana Light Sweep on Hover */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#B88A3D]/25 to-transparent group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out pointer-events-none" />

                  {/* Traditional Red Hanko Stamp (朱印) */}
                  <div className="absolute top-3 right-3 flex flex-col items-center justify-center size-6 rounded border border-[#B8322C] bg-[#B8322C]/10 text-[#B8322C] font-serif font-bold text-[9px] tracking-tighter select-none rotate-6 shadow-[0_0_8px_rgba(184,50,44,0.2)] pointer-events-none z-10">
                    <span className="leading-none">{stat.seal}</span>
                  </div>

                  {/* 4 Cardinal Corner Crest Accents */}
                  <div className="absolute top-2 left-2 size-1 rounded-full bg-[#B8322C] border border-[#F7F1E5] shadow-[0_0_4px_rgba(184,50,44,0.7)]" />
                  <div className="absolute bottom-2 left-2 size-1 rounded-full bg-[#B88A3D] border border-[#F7F1E5] shadow-[0_0_4px_rgba(184,138,61,0.7)]" />
                  <div className="absolute bottom-2 right-2 size-1 rounded-full bg-[#B8322C] border border-[#F7F1E5] shadow-[0_0_4px_rgba(184,50,44,0.7)]" />

                  <div className="relative z-10">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    <p className="font-accent text-xs sm:text-sm text-[#5A5043] mt-2.5 tracking-widest uppercase font-bold group-hover:text-[#1D1B18] transition-colors">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
