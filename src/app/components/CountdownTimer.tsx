import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
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

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  // Event is in the past
  if (timeLeft === null) {
    const isOngoing = Date.now() >= targetDate && Date.now() <= eventEndDate;
    return (
      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111111] border border-[#2A2A2A]">
        <div className={`w-2.5 h-2.5 rounded-full ${isOngoing ? 'bg-green-500 animate-pulse' : 'bg-[#C41E3A]'}`} />
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
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-lg bg-[#111111] border border-[#2A2A2A] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-[#C41E3A]/5 to-transparent" />
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
