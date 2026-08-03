import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SlideTitle, ScrollReveal, TiltCard, StaggerContainer, StaggerItem, ScrollDepth } from "./ScrollAnimations";
import SponsorModal from "./SponsorModal";

interface Sponsor {
  name: string;
  initials: string;
}

const sponsorTiers: { tier: string; size: string; sponsors: Sponsor[] }[] = [
  {
    tier: "Title Sponsor",
    size: "large",
    sponsors: [{ name: "TechCorp Global", initials: "TCG" }],
  },
  {
    tier: "Platinum",
    size: "medium",
    sponsors: [
      { name: "InnovateTech", initials: "IT" },
      { name: "CloudFirst", initials: "CF" },
      { name: "DataPrime", initials: "DP" },
    ],
  },
  {
    tier: "Gold",
    size: "small",
    sponsors: [
      { name: "ByteStack", initials: "BS" },
      { name: "DevSynth", initials: "DS" },
      { name: "QuantumLabs", initials: "QL" },
      { name: "NexaFlow", initials: "NF" },
      { name: "CodeForge", initials: "CF" },
    ],
  },
  {
    tier: "Silver",
    size: "tiny",
    sponsors: [
      { name: "HackMate", initials: "HM" },
      { name: "GitPro", initials: "GP" },
      { name: "Meshwork", initials: "MW" },
      { name: "FlutterBay", initials: "FB" },
      { name: "RustLab", initials: "RL" },
      { name: "VueHub", initials: "VH" },
    ],
  },
  {
    tier: "Media Partners",
    size: "tiny",
    sponsors: [
      { name: "TechCrunch India", initials: "TC" },
      { name: "YourStory", initials: "YS" },
      { name: "Analytics India", initials: "AI" },
    ],
  },
  {
    tier: "Community Partners",
    size: "tiny",
    sponsors: [
      { name: "GDG Kurukshetra", initials: "GK" },
      { name: "DSC NIT KKR", initials: "DN" },
      { name: "CodeChef NIT", initials: "CC" },
      { name: "IEEE NIT KKR", initials: "IE" },
    ],
  },
];

const sizeClasses: Record<string, string> = {
  large: "w-32 h-32 sm:w-48 sm:h-48 text-2xl sm:text-3xl",
  medium: "w-24 h-24 sm:w-32 sm:h-32 text-lg sm:text-xl",
  small: "w-16 h-16 sm:w-24 sm:h-24 text-base sm:text-lg",
  tiny: "w-12 h-12 sm:w-20 sm:h-20 text-xs sm:text-sm",
};

export default function SponsorsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <section id="sponsors" className="relative py-16 sm:py-32 overflow-hidden" ref={sectionRef}>
      {/* Decorative rotating glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] aspect-square pointer-events-none"
        style={{ rotate: bgRotate }}
      >
        <div className="w-full h-full bg-[#d51e1e]/3 rounded-full blur-[150px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <SlideTitle className="mb-16 text-center">
          <span className="font-accent text-xs tracking-[0.3em] uppercase text-[#d51e1e] block mb-3">
            Backed By The Best
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#F5F5F5] tracking-wide">
            OUR SPONSORS
          </h2>
          <div className="w-20 h-0.5 bg-[#d51e1e] mt-4 mx-auto" />
        </SlideTitle>

        {/* Sponsor tiers with stagger animations */}
        <ScrollDepth rotate={5} y={65}>
          <div className="space-y-14">
            {sponsorTiers.map((tierGroup, ti) => (
              <ScrollReveal key={tierGroup.tier} direction="up" delay={ti * 0.08}>
                <div className="text-center">
                  {/* Tier label */}
                  <div className="flex items-center gap-4 justify-center mb-6">
                    <div className="h-px w-12 bg-[#b91919]/30" />
                    <span className="font-accent text-xs tracking-[0.25em] uppercase text-[#999]">
                      {tierGroup.tier}
                    </span>
                    <div className="h-px w-12 bg-[#b91919]/30" />
                  </div>

                  {/* Logos with 3D tilt */}
                  <StaggerContainer className="flex flex-wrap items-center justify-center gap-4 sm:gap-6" staggerDelay={0.06}>
                    {tierGroup.sponsors.map((sponsor) => (
                      <StaggerItem key={sponsor.name}>
                        <TiltCard intensity={15}>
                          <motion.div
                            className={`${sizeClasses[tierGroup.size]} relative overflow-hidden rounded-none bg-black/40 border border-[#b91919]/30 flex items-center justify-center font-heading font-bold text-[#666] grayscale hover:grayscale-0 hover:text-[#d51e1e] hover:border-[#b91919] hover:bg-black/60 transition-all duration-300 cursor-pointer group`}
                            title="TBD"
                            whileHover={{
                              boxShadow: "0 10px 30px rgba(196,30,58,0.15)",
                            }}
                            style={{ transformStyle: "preserve-3d" }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#d51e1e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="relative z-10 group-hover:scale-110 transition-transform" style={{ transform: "translateZ(20px)" }}>
                              TBD
                            </span>
                          </motion.div>
                        </TiltCard>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollDepth>

        {/* CTA for sponsors */}
        <ScrollReveal direction="up" delay={0.3} className="text-center mt-16">
          <p className="text-[#666] text-sm mb-3 font-accent">
            Interested in sponsoring Tech Kurukshetra?
          </p>
          <motion.button
            onClick={() => setIsSponsorModalOpen(true)}
            className="inline-flex items-center gap-2 border border-[#b91919] bg-black/5 font-accent text-[10px] uppercase tracking-[0.2em] text-[#f1eeee] shadow-[0_0_14px_rgba(185,25,25,0.24)] hover:bg-[#b91919]/10 px-4 py-2 transition-all cursor-pointer"
            whileHover={{ x: 5 }}
          >
            Become a Sponsor →
          </motion.button>
        </ScrollReveal>
      </div>

      <SponsorModal
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
      />
    </section>
  );
}
