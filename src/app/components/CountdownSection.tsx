import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";

const cloudsImg = new URL(
  "../../../images/cloud2.webp",
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
  // Three layers at different parallax speeds for depth
  const cloudsY1 = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const cloudsY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const cloudsY3 = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  return (
    <section
      id="countdown"
      className="sticky top-0 z-10 py-16 sm:py-20 bg-[#1c140d]"
      ref={sectionRef}
      style={{ overflow: "visible" }}
    >
      {/* Background assets — clipped to section bounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

      {/* ── Cloud layers on the countdown section boundary ──
          offset:"start start" means y=0 exactly when the section is sticky.
          translateY(-50%) centers the cloud on that line; base covers the seam. */}

      {/* Layer 1 — back, slowest, most transparent */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{ top: 0, transform: "translateY(-45%)", zIndex: 13 }}
      >
        <motion.img
          src={cloudsImg}
          alt=""
          aria-hidden="true"
          className="block"
          style={{ y: cloudsY1, width: "110vw", marginLeft: "-5vw", height: "200px", objectFit: "fill", opacity: 0.45 }}
        />
      </div>

      {/* Layer 2 — mid, normal speed */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{ top: 0, transform: "translateY(-50%)", zIndex: 14 }}
      >
        <motion.img
          src={cloudsImg}
          alt=""
          aria-hidden="true"
          className="block"
          style={{ y: cloudsY2, width: "105vw", marginLeft: "-2.5vw", height: "240px", objectFit: "fill", opacity: 0.7 }}
        />
      </div>

      {/* Layer 3 — front, fastest, fully opaque */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{ top: 0, transform: "translateY(-55%)", zIndex: 15 }}
      >
        <motion.img
          src={cloudsImg}
          alt=""
          aria-hidden="true"
          className="block"
          style={{ y: cloudsY3, width: "100vw", height: "270px", objectFit: "fill", opacity: 1 }}
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
          className="mx-auto mt-10 w-fit border border-[#d51e1e]/55 bg-[#090706]/80 px-5 py-3 text-center font-accent text-base font-bold uppercase tracking-[0.22em] text-white shadow-[0_0_24px_rgba(185,25,25,0.24),inset_0_0_18px_rgba(0,0,0,0.7)] drop-shadow-[0_0_14px_rgba(213,30,30,0.45)] sm:px-7 sm:text-xl lg:text-2xl"
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
