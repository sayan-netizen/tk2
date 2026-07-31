import { useState, useEffect, useCallback } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const targetDate = new Date("2026-09-05T09:00:00+05:30").getTime();
  const eventEndDate = new Date("2026-09-06T21:00:00+05:30").getTime();

  const calcTimeLeft = useCallback((): TimeLeft | null => {
    const diff = targetDate - Date.now();
    if (diff <= 0) return null;
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calcTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, [calcTimeLeft]);

  // Event is in the past
  if (timeLeft === null) {
    const now = Date.now();
    const isOngoing = now >= targetDate && now <= eventEndDate;
    return (
      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none bg-black/40 border border-[#b91919]/30">
        <div className={`w-2.5 h-2.5 rounded-none ${isOngoing ? 'bg-green-500 animate-pulse' : 'bg-[#d51e1e] shadow-[0_0_8px_rgba(213,30,30,0.6)]'}`} />
        <span className="font-heading text-sm font-semibold text-[#F5F5F5] tracking-wide">
          {isOngoing ? "Event is LIVE now!" : "Tech Kurukshetra 2026 has concluded!"}
        </span>
      </div>
    );
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-3 sm:gap-4">
      {units.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-none bg-black/40 border border-[#b91919]/30 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-[#d51e1e]/5 to-transparent" />
            <span className="font-display text-2xl sm:text-3xl text-[#F5F5F5] relative z-10">
              {String(unit.value).padStart(2, "0")}
            </span>
          </div>
          <span className="font-accent text-[10px] sm:text-xs text-[#999] mt-1.5 uppercase tracking-wider">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
