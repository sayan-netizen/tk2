import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { ScrollReveal, TiltCard, Parallax, SlideTitle, StaggerContainer, StaggerItem, ScrollDepth } from "./ScrollAnimations";

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
    <span ref={ref} className="font-display text-4xl sm:text-5xl text-[#d51e1e]">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 5000, suffix: "+", label: "Students" },
  { value: 50, suffix: "+", label: "Events" },
  { value: 30, suffix: "+", label: "Colleges" },
  { value: 10, suffix: "L+", label: "In Prizes" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax for decorative glows
  const glowY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden" ref={sectionRef}>
      {/* Parallax decorative elements */}
      <motion.div className="absolute top-0 left-0" style={{ y: glowY }}>
        <div className="w-72 h-72 bg-[#d51e1e]/3 rounded-full blur-[120px]" />
      </motion.div>
      <Parallax speed={-0.4} className="absolute bottom-0 right-0">
        <div className="w-96 h-96 bg-[#d51e1e]/2 rounded-full blur-[150px]" />
      </Parallax>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header — slides in from left */}
        <SlideTitle className="mb-16">
          <span className="font-accent text-xs tracking-[0.3em] uppercase text-[#d51e1e] block mb-3">
            About the Event
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#F5F5F5] tracking-wide">
            ABOUT
          </h2>
          <div className="w-20 h-0.5 bg-[#d51e1e] mt-4" />
        </SlideTitle>

        {/* Content grid with 3D tilt cards */}
        <ScrollDepth className="mb-20" rotate={7} y={80}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Overview — slides from left with 3D tilt */}
            <ScrollReveal direction="left" delay={0.1}>
              <TiltCard intensity={8}>
                <div className="bg-black/40 rounded-none p-8 border border-[#b91919]/30 hover:border-[#b91919] hover:shadow-[0_0_15px_rgba(185,25,25,0.15)] transition-all h-full" style={{ transformStyle: "preserve-3d" }}>
                  <h3 className="font-heading text-2xl font-semibold text-[#F5F5F5] mb-4" style={{ transform: "translateZ(20px)" }}>
                    Tech Kurukshetra
                  </h3>
                  <p className="text-[#999] leading-relaxed mb-4" style={{ transform: "translateZ(10px)" }}>
                    Tech Kurukshetra is the flagship national-level technology festival of NIT Kurukshetra,
                    one of India's premier technical institutions. For over a decade, it has been the
                    battleground where the brightest minds from across the nation converge to compete,
                    collaborate, and create.
                  </p>
                  <p className="text-[#999] leading-relaxed" style={{ transform: "translateZ(10px)" }}>
                    From high-stakes hackathons and intense coding marathons to cutting-edge robotics
                    challenges and immersive workshops — Tech Kurukshetra is where innovation meets
                    competition. With participants from 30+ top engineering colleges and over ₹10 Lakh in
                    prizes, every edition pushes the boundaries of what's possible.
                  </p>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Theme narrative — slides from right with 3D tilt + glow */}
            <ScrollReveal direction="right" delay={0.2}>
              <TiltCard intensity={8}>
                <div className="relative bg-black/40 rounded-none p-8 border border-[#b91919]/30 hover:border-[#b91919] hover:shadow-[0_0_15px_rgba(185,25,25,0.15)] overflow-hidden group transition-all h-full" style={{ transformStyle: "preserve-3d" }}>
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d51e1e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-[#b91919]/20 border border-[#b91919] shadow-[0_0_10px_rgba(185,25,25,0.3)] mb-4" style={{ transform: "translateZ(25px)" }}>
                      <span className="font-accent text-xs tracking-[0.2em] uppercase text-[#d51e1e]">
                        2026 Theme
                      </span>
                    </div>
                    <h3 className="font-heading text-2xl font-semibold text-[#F5F5F5] mb-4" style={{ transform: "translateZ(20px)" }}>
                      Shadow Protocol
                    </h3>
                    <p className="text-[#999] leading-relaxed mb-4 italic" style={{ transform: "translateZ(10px)" }}>
                      "In a world of noise, the shadow prevails. Where others broadcast their moves, the
                      shinobi strikes in silence — with precision, purpose, and mastery of the unknown."
                    </p>
                    <p className="text-[#999] leading-relaxed" style={{ transform: "translateZ(10px)" }}>
                      This year's theme draws from the ancient art of the ninja — combining stealth,
                      strategy, and cutting-edge technology. Every challenge is a mission. Every
                      participant, an operative. Enter the Shadow Protocol and prove your worth in the
                      arena of innovation.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        </ScrollDepth>

        {/* Stats grid with stagger animation */}
        <ScrollDepth rotate={5} y={45}>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" staggerDelay={0.12}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <TiltCard intensity={12}>
                  <div className="bg-black/40 rounded-none p-6 border border-[#b91919]/30 text-center hover:border-[#b91919] hover:shadow-[0_0_15px_rgba(185,25,25,0.15)] transition-all group">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    <p className="font-accent text-sm text-[#999] mt-2 tracking-wider uppercase group-hover:text-[#F5F5F5] transition-colors">
                      {stat.label}
                    </p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </ScrollDepth>
      </div>
    </section>
  );
}
