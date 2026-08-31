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

const sponsorDesktopBg = new URL("../../../images/Sponsor_desktop_f.webp", import.meta.url).href;
const sponsorMobileBg = new URL("../../../images/Sponsor_mobile_f.webp", import.meta.url).href;

export default function SponsorsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);

  return (
    <section id="sponsors" className="relative pt-4 pb-16 sm:pt-8 sm:pb-24 overflow-hidden bg-[#EFE2C7] scroll-mt-28" ref={sectionRef}>
      {/* Rich Japanese Background Artwork — Responsive Desktop / Mobile */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-transparent z-0">
        <picture>
          <source media="(max-width: 767px)" srcSet={sponsorMobileBg} />
          <img
            src={sponsorDesktopBg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-top opacity-100 will-change-transform"
          />
        </picture>
        {/* Soft top fog blend to blend seamlessly with BannersSection */}
        <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[#EFE2C7] via-[#EFE2C7]/80 via-[#EFE2C7]/40 to-[#EFE2C7]/0 pointer-events-none" />
        
        {/* Soft bottom blend to transition smoothly into the Venue section */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#EFE2C7] via-[#EFE2C7]/80 via-[#EFE2C7]/40 to-[#EFE2C7]/0 pointer-events-none" />
      </div>

      {/* Lightweight static ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] aspect-square pointer-events-none z-0">
        <div className="w-full h-full bg-[#B8322C]/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <SlideTitle className="mb-8 sm:mb-12 text-center">
          <span className="font-accent text-xs tracking-[0.3em] uppercase text-[#B8322C] block mb-3 font-bold">
            Backed By The Best
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1D1B18] tracking-wide font-black drop-shadow-sm">
            OUR SPONSORS
          </h2>
          <div className="w-24 h-[3px] bg-gradient-to-r from-transparent via-[#B8322C] to-transparent mt-4 mx-auto rounded-full" />
        </SlideTitle>

        {/* Sponsor tiers with stagger animations */}
        <ScrollDepth rotate={5} y={65}>
          <div className="space-y-16">
            {sponsorTiers.map((tierGroup, ti) => (
              <ScrollReveal key={tierGroup.tier} direction="up" delay={ti * 0.08}>
                <div className="text-center">
                  {/* Tier label */}
                  <div className="flex items-center gap-4 justify-center mb-8">
                    <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#B8322C]/40" />
                    <span className="font-accent text-xs tracking-[0.25em] uppercase text-[#38332C] font-bold">
                      {tierGroup.tier}
                    </span>
                    <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#B8322C]/40" />
                  </div>

                  {/* Logos with 3D tilt */}
                  <StaggerContainer className="flex flex-wrap items-center justify-center gap-4 sm:gap-6" staggerDelay={0.06}>
                    {tierGroup.sponsors.map((sponsor) => (
                      <StaggerItem key={sponsor.name}>
                        <TiltCard intensity={15}>
                          <motion.div
                            className={`${sizeClasses[tierGroup.size]} relative overflow-hidden rounded-xl bg-[#EFE2C7]/70 backdrop-blur-md border border-[#B88A3D]/45 flex items-center justify-center font-heading font-bold text-[#1D1B18] hover:text-[#B8322C] hover:border-[#B8322C] hover:bg-[#EFE2C7]/95 shadow-[0_10px_30px_rgba(75,50,37,0.12)] hover:shadow-[0_15px_40px_rgba(184,50,44,0.2)] transition-all duration-300 cursor-pointer group`}
                            title="TBD"
                            whileHover={{
                              scale: 1.05,
                              boxShadow: "0 15px 40px rgba(184,50,44,0.2)",
                            }}
                            style={{ transformStyle: "preserve-3d" }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#B8322C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
        <ScrollReveal direction="up" delay={0.3} className="text-center mt-20">
          <p className="text-[#38332C] text-sm mb-4 font-accent font-semibold">
            Interested in sponsoring Tech Kurukshetra?
          </p>
          <motion.button
            onClick={() => setIsSponsorModalOpen(true)}
            className="group/btn relative inline-flex items-center gap-3.5 border border-[#B8322C] bg-[#1D1B18] font-accent text-xs font-bold uppercase tracking-[0.22em] text-[#F7F1E5] shadow-[0_10px_25px_rgba(29,27,24,0.25)] hover:bg-[#B8322C] hover:border-[#7A1814] px-7 py-3.5 rounded-xl transition-all cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.03, x: 2 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Button Inner Katana Gleam */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover/btn:translate-x-[200%] transition-transform duration-700 pointer-events-none" />
            <span className="relative z-10 font-bold tracking-[0.25em]">Become a Sponsor</span>
            <span className="relative z-10 flex size-6 items-center justify-center rounded-lg bg-white/10 text-white transition-all group-hover/btn:bg-white group-hover/btn:text-[#B8322C] group-hover/btn:rotate-45 shadow-sm">
              →
            </span>
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
