import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";

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
        <div className="absolute -inset-[1px] rounded-md bg-gradient-to-b from-[#b91919]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Main box */}
        <div className="relative w-[76px] h-[76px] sm:w-[96px] sm:h-[96px] lg:w-[120px] lg:h-[120px] flex items-center justify-center border border-[#b91919]/30 bg-[#EDE0C4] overflow-hidden shadow-md">
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-[#CDBF9E]/20" />
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#b91919]/50 to-transparent" />
          <span className="font-display text-[36px] sm:text-[46px] lg:text-[58px] text-[#1A1208] leading-none relative z-10 tabular-nums">
            {display}
          </span>
        </div>
      </div>

      <span className="font-accent text-[9px] sm:text-[11px] text-[#9A8060] mt-2.5 uppercase tracking-[0.28em]">
        {label}
      </span>
    </motion.div>
  );
}

function Separator({ index }: { index: number }) {
  return (
    <motion.div
      className="flex flex-col gap-2 pb-6 sm:pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
    >
      <div className="w-[5px] h-[5px] rounded-full bg-[#b91919]/50" />
      <div className="w-[5px] h-[5px] rounded-full bg-[#b91919]/50" />
    </motion.div>
  );
}

export default function CountdownSection() {
  const targetDate = new Date("2026-09-05T09:00:00+05:30").getTime();
  const eventEndDate = new Date("2026-09-06T21:00:00+05:30").getTime();

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

  return (
    <section
      id="countdown"
      className="relative py-16 sm:py-20 overflow-hidden bg-[#120f0b]"
      ref={sectionRef}
    >
      <img
        src="/images/countdown-scroll-bg.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Decorative top/bottom lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b91919]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b91919]/25 to-transparent" />

      {/* Subtle warm ambient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-[#F5ECD8]/5 to-black/40 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/65 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/65 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[200px] bg-[#b91919]/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[960px] mx-auto px-5">
        {/* Label */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="font-accent text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[#b91919] block">
            Event Commences In
          </span>
        </motion.div>

        {/* Countdown or live/ended */}
        {units ? (
          <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8">
            {units.map((unit, i) => (
              <div key={unit.label} className="flex items-center gap-4 sm:gap-6 lg:gap-8">
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
            <div className="inline-flex items-center gap-3 px-6 py-3 border border-[#b91919]/40 bg-[#EDE0C4]">
              <div
                className={`w-2 h-2 rounded-full ${
                  isOngoing ? "bg-[#d51e1e] animate-pulse" : "bg-[#CDBF9E]"
                }`}
              />
              <span className="font-accent text-sm tracking-[0.2em] uppercase text-[#1A1208]">
                {isOngoing ? "Event is Live Now" : "Tech Kurukshetra 2026 Has Concluded"}
              </span>
            </div>
          </motion.div>
        )}

        {/* Sub-label */}
        <motion.p
          className="text-center font-accent text-[10px] sm:text-xs text-[#9A8060] tracking-[0.2em] uppercase mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          5th – 6th September 2026 &nbsp;·&nbsp; University of Engineering &amp; Management, Kolkata
        </motion.p>
      </div>
    </section>
  );
}
