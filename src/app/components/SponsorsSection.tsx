import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SlideTitle, ScrollReveal, TiltCard, StaggerContainer, StaggerItem, ScrollDepth } from "./ScrollAnimations";

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
  large: "w-40 h-40 sm:w-48 sm:h-48 text-3xl",
  medium: "w-28 h-28 sm:w-32 sm:h-32 text-xl",
  small: "w-20 h-20 sm:w-24 sm:h-24 text-lg",
  tiny: "w-16 h-16 sm:w-20 sm:h-20 text-sm",
};

export default function SponsorsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <section id="sponsors" className="relative py-24 sm:py-32 overflow-hidden bg-[#F5ECD8]" ref={sectionRef}>
      {/* Decorative rotating glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
        style={{ rotate: bgRotate }}
      >
        <div className="w-full h-full bg-[#b91919]/5 rounded-full blur-[200px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <SlideTitle className="mb-16 text-center">
          <span className="font-accent text-xs tracking-[0.3em] uppercase text-[#b91919] block mb-3">
            Backed By The Best
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1A1208] tracking-wide">
            OUR SPONSORS
          </h2>
          <div className="w-20 h-0.5 bg-[#b91919] mt-4 mx-auto" />
        </SlideTitle>

        {/* Sponsor tiers with stagger animations */}
        <ScrollDepth rotate={5} y={65}>
          <div className="space-y-14">
            {sponsorTiers.map((tierGroup, ti) => (
              <ScrollReveal key={tierGroup.tier} direction="up" delay={ti * 0.08}>
                <div className="text-center">
                  {/* Tier label */}
                  <div className="flex items-center gap-4 justify-center mb-6">
                    <div className="h-px w-12 bg-[#CDBF9E]" />
                    <span className="font-accent text-xs tracking-[0.25em] uppercase text-[#7A6545]">
                      {tierGroup.tier}
                    </span>
                    <div className="h-px w-12 bg-[#CDBF9E]" />
                  </div>

                  {/* Logos with 3D tilt */}
                  <StaggerContainer className="flex flex-wrap items-center justify-center gap-4 sm:gap-6" staggerDelay={0.06}>
                    {tierGroup.sponsors.map((sponsor) => (
                      <StaggerItem key={sponsor.name}>
                        <TiltCard intensity={15}>
                          <motion.div
                            className={`${sizeClasses[tierGroup.size]} rounded-xl bg-[#EDE0C4] border border-[#CDBF9E] flex items-center justify-center font-heading font-bold text-[#7A6545] grayscale hover:grayscale-0 hover:text-[#b91919] hover:border-[#b91919]/40 hover:bg-[#b91919]/5 transition-all duration-300 cursor-pointer group shadow-sm`}
                            title={sponsor.name}
                            whileHover={{
                              boxShadow: "0 10px 30px rgba(185,25,25,0.1)",
                            }}
                          >
                            <span className="group-hover:scale-110 transition-transform">
                              {sponsor.initials}
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
          <p className="text-[#7A6545] text-sm mb-3 font-accent">
            Interested in sponsoring Tech Kurukshetra?
          </p>
          <motion.a
            href="mailto:sponsors@techkurukshetra.org"
            className="inline-flex items-center gap-2 text-[#b91919] hover:text-[#8a1212] font-heading text-sm font-semibold transition-colors"
            whileHover={{ x: 5 }}
          >
            Become a Sponsor →
          </motion.a>
        </ScrollReveal>
      </div>
    </section>
  );
}
