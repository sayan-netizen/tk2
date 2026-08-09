import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";

const cloudsImg = new URL(
  "../../../images/new_cloud.webp",
  import.meta.url
).href;

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function CountdownUnit({
  value,
  label,
  index,
}: {
  value: number;
  label: string;
  index: number;
}) {
  const display = String(value).padStart(2, "0");

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="relative group">
        {/* Glow ring */}
        <div className="absolute -inset-[2px] rounded-md bg-gradient-to-b from-[#d51e1e]/80 via-[#b91919]/35 to-transparent opacity-80 blur-[2px] transition-opacity duration-500 group-hover:opacity-100" />

        {/* Main box */}
        <div className="relative w-[68px] h-[68px] min-[400px]:w-[78px] min-[400px]:h-[78px] sm:w-[104px] sm:h-[104px] lg:w-[130px] lg:h-[130px] flex items-center justify-center border border-[#d51e1e]/70 bg-[#090706]/92 overflow-hidden shadow-[0_0_24px_rgba(185,25,25,0.28),inset_0_0_20px_rgba(0,0,0,0.82)] backdrop-blur-sm">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(213,30,30,0.24),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent_42%,rgba(0,0,0,0.42))]" />
          <div className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-[#ff2a2a]/90 to-transparent" />
          <div className="absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-[#b91919]/70 to-transparent" />
          <span className="font-display text-[30px] min-[400px]:text-[36px] sm:text-[54px] lg:text-[68px] font-bold text-[#ff2626] leading-none relative z-10 tabular-nums drop-shadow-[0_0_14px_rgba(213,30,30,0.85)]">
            {display}
          </span>
        </div>
      </div>

      <span className="font-accent text-xs sm:text-base lg:text-lg font-bold text-white mt-2 sm:mt-3 uppercase tracking-[0.14em] sm:tracking-[0.18em] drop-shadow-[0_0_12px_rgba(0,0,0,0.95)]">
        {label}
      </span>
    </motion.div>
  );
}

function Separator({ index }: { index: number }) {
  return (
    <motion.div
      className="hidden sm:flex flex-col gap-2 pb-7 sm:pb-9"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
    >
      <div className="w-[6px] h-[6px] rounded-full bg-[#ff2626] shadow-[0_0_10px_rgba(213,30,30,0.8)]" />
      <div className="w-[6px] h-[6px] rounded-full bg-[#ff2626] shadow-[0_0_10px_rgba(213,30,30,0.8)]" />
    </motion.div>
  );
}

export default function CountdownSection() {
  const targetDate = new Date("2026-09-26T09:00:00+05:30").getTime();
  const eventEndDate = new Date("2026-09-27T21:00:00+05:30").getTime();

  const calcTimeLeft = (): TimeLeft | null => {
    const diff = targetDate - Date.now();
    if (diff <= 0) return null;
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calcTimeLeft);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "0px 0px -80px 0px" });

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = timeLeft
    ? [
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
      ]
    : null;

  const isOngoing = Date.now() >= targetDate && Date.now() <= eventEndDate;

  // Track only while section is pinned at viewport top (boundary line = viewport top)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Staggered parallax and horizontal drift for 10 expansive horizontal cloud strata
  const cloudsY1 = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const cloudsY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const cloudsY3 = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);
  const cloudsY4 = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const cloudsY5 = useTransform(scrollYProgress, [0, 1], ["0%", "-95%"]);
  const cloudsY6 = useTransform(scrollYProgress, [0, 1], ["0%", "-110%"]);
  const cloudsY7 = useTransform(scrollYProgress, [0, 1], ["0%", "-125%"]);
  const cloudsY8 = useTransform(scrollYProgress, [0, 1], ["0%", "-140%"]);
  const cloudsY9 = useTransform(scrollYProgress, [0, 1], ["0%", "-155%"]);
  const cloudsY10 = useTransform(scrollYProgress, [0, 1], ["0%", "-170%"]);

  const cloudsX1 = useTransform(scrollYProgress, [0, 1], ["-60px", "80px"]);
  const cloudsX2 = useTransform(scrollYProgress, [0, 1], ["80px", "-90px"]);
  const cloudsX3 = useTransform(scrollYProgress, [0, 1], ["-40px", "60px"]);
  const cloudsX4 = useTransform(scrollYProgress, [0, 1], ["70px", "-60px"]);
  const cloudsX5 = useTransform(scrollYProgress, [0, 1], ["-80px", "50px"]);
  const cloudsX6 = useTransform(scrollYProgress, [0, 1], ["50px", "-70px"]);

  return (
    <section
      id="countdown"
      className="sticky top-0 z-10 pt-14 pb-20 sm:pt-16 sm:pb-28 bg-[#1c140d]"
      ref={sectionRef}
      style={{ overflow: "visible" }}
    >
      {/* Background assets — expanded downwards on mobile & desktop to fill empty spaces behind the dragon */}
      <div className="absolute inset-x-0 top-0 -bottom-36 sm:-bottom-48 lg:-bottom-64 overflow-hidden pointer-events-none">
        <img
          src="/images/countdown-scroll-bg.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center scale-105"
        />
        {/* Decorative bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b91919]/25 to-transparent" />
        {/* Subtle ambient red glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(213,30,30,0.06)_0%,transparent_75%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[200px] bg-[#b91919]/8 blur-[100px]" />
      </div>

      {/* ── SVG NATURAL CLOUDY BUMPY DISPLACEMENT FILTERS ── */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="natural-cloud-bumps-1" x="-10%" y="-20%" width="120%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.035" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="26" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="natural-cloud-bumps-2" x="-10%" y="-20%" width="120%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.028 0.04" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="34" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="natural-cloud-bumps-3" x="-10%" y="-20%" width="120%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.016 0.03" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* ── DISTRIBUTED MULTI-DEPTH CLOUD LAYERS (Sleek compact vertical profile, bumpy natural edges) ── */}

      {/* Mobile-Only Left-Fluffed Cloud Cap (Seals the left seam on mobile screens) */}
      <div
        className="absolute inset-x-0 pointer-events-none md:hidden"
        style={{ top: 0, transform: "translateY(-54%)", zIndex: 11 }}
      >
        <motion.img
          src={cloudsImg}
          alt=""
          aria-hidden="true"
          className="block max-w-none"
          style={{
            y: cloudsY1,
            width: "220vw",
            marginLeft: "-75vw",
            height: "115px",
            objectFit: "fill",
            opacity: 0.95,
            borderRadius: "60% 40% 45% 45% / 70% 60% 25% 25%",
            filter: "url(#natural-cloud-bumps-1) drop-shadow(0 10px 22px rgba(0,0,0,0.6))",
          }}
        />
      </div>

      {/* Mobile-Only Left Mid-Shelf Cloud Layer */}
      <div
        className="absolute inset-x-0 pointer-events-none md:hidden"
        style={{ top: 0, transform: "translateY(-44%)", zIndex: 13 }}
      >
        <motion.img
          src={cloudsImg}
          alt=""
          aria-hidden="true"
          className="block max-w-none"
          style={{
            y: cloudsY3,
            width: "210vw",
            marginLeft: "-65vw",
            height: "110px",
            objectFit: "fill",
            opacity: 0.92,
            borderRadius: "55% 45% 40% 40% / 65% 65% 25% 25%",
            filter: "url(#natural-cloud-bumps-2) drop-shadow(0 8px 18px rgba(0,0,0,0.5))",
          }}
        />
      </div>

      {/* Organic Rounded Cloud Puff Backing (Right-shifted Billow) */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{ top: 0, transform: "translateY(-50%)", zIndex: 11 }}
      >
        <motion.div
          className="mx-auto rounded-[40%_60%_30%_70%/60%_40%_60%_40%] bg-gradient-to-b from-[#f2e7d3]/30 via-[#dfceb3]/15 to-transparent blur-[12px]"
          style={{
            y: cloudsY2,
            x: cloudsX2,
            width: "130vw",
            marginLeft: "-15vw",
            height: "95px",
            filter: "url(#natural-cloud-bumps-2)",
          }}
        />
      </div>

      {/* Layer 2 — High Right Mist Bank (Flipped with organic bumpy billowing contour) */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{ top: 0, transform: "translateY(-48%)", zIndex: 12 }}
      >
        <motion.img
          src={cloudsImg}
          alt=""
          aria-hidden="true"
          className="block max-w-none"
          style={{
            y: cloudsY2,
            x: cloudsX2,
            scaleX: -1,
            width: "185vw",
            marginLeft: "-40vw",
            height: "95px",
            objectFit: "fill",
            opacity: 0.75,
            borderRadius: "45% 55% 40% 40% / 55% 65% 30% 30%",
            filter: "url(#natural-cloud-bumps-2) drop-shadow(0 6px 14px rgba(0,0,0,0.4))",
          }}
        />
      </div>

      {/* Layer 3 — Upper-Left Drifting Cloud Strata */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{ top: 0, transform: "translateY(-45%)", zIndex: 13 }}
      >
        <motion.img
          src={cloudsImg}
          alt=""
          aria-hidden="true"
          className="block max-w-none"
          style={{
            y: cloudsY3,
            width: "200vw",
            marginLeft: "-55vw",
            height: "105px",
            objectFit: "fill",
            opacity: 0.9,
            borderRadius: "50% 50% 30% 30% / 65% 65% 20% 20%",
            filter: "url(#natural-cloud-bumps-1) drop-shadow(0 8px 18px rgba(0,0,0,0.45))",
          }}
        />
      </div>

      {/* Layer 4 — Upper-Right Rolling Billow (Flipped with natural bumpy curves) */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{ top: 0, transform: "translateY(-42%)", zIndex: 14 }}
      >
        <motion.img
          src={cloudsImg}
          alt=""
          aria-hidden="true"
          className="block max-w-none"
          style={{
            y: cloudsY4,
            x: cloudsX3,
            scaleX: -1,
            width: "180vw",
            marginLeft: "-38vw",
            height: "105px",
            objectFit: "fill",
            opacity: 0.88,
            borderRadius: "55% 45% 45% 35% / 60% 70% 25% 25%",
            filter: "url(#natural-cloud-bumps-2) drop-shadow(0 8px 20px rgba(0,0,0,0.5))",
          }}
        />
      </div>

      {/* Layer 5 — Mid-Top Center Cloud Shelf */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{ top: 0, transform: "translateY(-39%)", zIndex: 15 }}
      >
        <motion.img
          src={cloudsImg}
          alt=""
          aria-hidden="true"
          className="block max-w-none"
          style={{
            y: cloudsY5,
            x: cloudsX4,
            width: "175vw",
            marginLeft: "-36vw",
            height: "110px",
            objectFit: "fill",
            opacity: 0.95,
            borderRadius: "48% 52% 35% 35% / 60% 60% 25% 25%",
            filter: "url(#natural-cloud-bumps-3) drop-shadow(0 10px 22px rgba(0,0,0,0.55))",
          }}
        />
      </div>

      {/* Layer 6 — Core Main Countdown Line Cloud Wall */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{ top: 0, transform: "translateY(-36%)", zIndex: 16 }}
      >
        <motion.img
          src={cloudsImg}
          alt=""
          aria-hidden="true"
          className="block max-w-none"
          style={{
            y: cloudsY6,
            width: "170vw",
            marginLeft: "-35vw",
            height: "115px",
            objectFit: "fill",
            opacity: 1,
            borderRadius: "50% 50% 30% 30% / 65% 65% 20% 20%",
            filter: "url(#natural-cloud-bumps-1) drop-shadow(0 10px 24px rgba(0,0,0,0.6))",
          }}
        />
      </div>

      {/* Layer 7 — Forward Rolling Lower Shelf */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{ top: 0, transform: "translateY(-32%)", zIndex: 17 }}
      >
        <motion.img
          src={cloudsImg}
          alt=""
          aria-hidden="true"
          className="block max-w-none"
          style={{
            y: cloudsY7,
            x: cloudsX5,
            width: "180vw",
            marginLeft: "-40vw",
            height: "100px",
            objectFit: "fill",
            opacity: 0.88,
            borderRadius: "55% 45% 40% 40% / 60% 60% 25% 25%",
            filter: "url(#natural-cloud-bumps-2) drop-shadow(0 8px 18px rgba(0,0,0,0.5))",
          }}
        />
      </div>

      {/* Layer 8 — Lower Left Drifting Mist Fringe (Flipped with bumpy mist peaks) */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{ top: 0, transform: "translateY(-28%)", zIndex: 18 }}
      >
        <motion.img
          src={cloudsImg}
          alt=""
          aria-hidden="true"
          className="block max-w-none"
          style={{
            y: cloudsY8,
            x: cloudsX6,
            scaleX: -1,
            width: "175vw",
            marginLeft: "-35vw",
            height: "90px",
            objectFit: "fill",
            opacity: 0.78,
            borderRadius: "45% 55% 35% 35% / 55% 65% 25% 25%",
            filter: "url(#natural-cloud-bumps-3) drop-shadow(0 6px 14px rgba(0,0,0,0.4))",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[960px] mx-auto px-4 sm:px-6">
        {/* Label */}
        <motion.div
          className="text-center mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="font-accent text-xs sm:text-base font-bold tracking-[0.24em] sm:tracking-[0.32em] uppercase text-[#8d0f0f] drop-shadow-[0_1px_10px_rgba(245,236,216,0.95)] block">
            Event Commences In
          </span>
        </motion.div>

        {/* Countdown or live/ended */}
        {units ? (
          <div className="flex flex-wrap items-center justify-center gap-3 min-[400px]:gap-4 sm:gap-6 lg:gap-10">
            {units.map((unit, i) => (
              <div key={unit.label} className="flex items-center justify-center gap-3 sm:gap-5 lg:gap-10">
                <CountdownUnit value={unit.value} label={unit.label} index={i} />
                {i < units.length - 1 && <Separator index={i} />}
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 border border-[#d51e1e]/60 bg-[#090706]/90 shadow-[0_0_24px_rgba(185,25,25,0.2)]">
              <div
                className={`w-2 h-2 rounded-full ${
                  isOngoing ? "bg-[#ff2626] animate-pulse" : "bg-[#3a3834]"
                }`}
              />
              <span className="font-accent text-base font-bold tracking-[0.18em] uppercase text-[#ff2626] drop-shadow-[0_0_12px_rgba(213,30,30,0.65)]">
                {isOngoing ? "Event is Live Now" : "Tech Kurukshetra 2026 Has Concluded"}
              </span>
            </div>
          </motion.div>
        )}

        {/* Sub-label */}
        <motion.p
          className="relative z-20 mx-auto mt-8 sm:mt-10 w-fit border border-[#d51e1e]/55 bg-[#090706]/90 px-5 py-3 text-center font-accent text-base font-bold uppercase tracking-[0.22em] text-white shadow-[0_0_24px_rgba(185,25,25,0.24),inset_0_0_18px_rgba(0,0,0,0.7)] drop-shadow-[0_0_14px_rgba(213,30,30,0.45)] sm:px-7 sm:text-xl lg:text-2xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <span className="text-[#ff2626] drop-shadow-[0_0_12px_rgba(213,30,30,0.75)]">26th</span>
          <span className="px-2 text-[#f5f1e8] sm:px-3">-</span>
          <span className="text-[#ff2626] drop-shadow-[0_0_12px_rgba(213,30,30,0.75)]">27th</span>
          <span className="block pt-1 text-sm tracking-[0.28em] text-[#f5f1e8] sm:inline sm:pl-3 sm:pt-0 sm:text-xl lg:text-2xl">
            September 2026
          </span>
        </motion.p>
      </div>
    </section>
  );
}
