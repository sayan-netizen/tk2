import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function IntroOverlay() {
  const skipIntro =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("skipIntro") === "1";
  const [show, setShow] = useState(() => {
    return !skipIntro && !sessionStorage.getItem("introSeen");
  });
  const [phase, setPhase] = useState<"silhouette" | "slash" | "split">("silhouette");

  useEffect(() => {
    if (skipIntro) {
      sessionStorage.setItem("introSeen", "true");
      return;
    }
    if (!show) return;
    const t1 = setTimeout(() => setPhase("slash"), 800);
    const t2 = setTimeout(() => setPhase("split"), 1800);
    const t3 = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("introSeen", "true");
    }, 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [show, skipIntro]);

  // Skip handler
  const handleSkip = () => {
    setShow(false);
    sessionStorage.setItem("introSeen", "true");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Top panel */}
          <motion.div
            className="absolute inset-0 bg-[#0A0A0A]"
            style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
            animate={
              phase === "split"
                ? { x: "-100%", y: "-100%", opacity: 0 }
                : {}
            }
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Bottom panel */}
          <motion.div
            className="absolute inset-0 bg-[#0A0A0A]"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
            animate={
              phase === "split"
                ? { x: "100%", y: "100%", opacity: 0 }
                : {}
            }
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {/* Shinobi silhouette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                phase === "silhouette"
                  ? { opacity: 1, scale: 1 }
                  : phase === "slash"
                  ? { opacity: 0.6, scale: 1.05 }
                  : { opacity: 0, scale: 1.2 }
              }
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <svg
                width="120"
                height="160"
                viewBox="0 0 120 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_0_30px_rgba(196,30,58,0.5)]"
              >
                {/* Head */}
                <circle cx="60" cy="25" r="18" fill="#C41E3A" opacity="0.9" />
                {/* Eye band */}
                <rect x="42" y="20" width="36" height="6" rx="3" fill="#0A0A0A" />
                {/* Eyes */}
                <circle cx="52" cy="23" r="2" fill="#FF0000" />
                <circle cx="68" cy="23" r="2" fill="#FF0000" />
                {/* Body */}
                <path
                  d="M40 45 L60 40 L80 45 L85 90 L70 95 L60 130 L50 95 L35 90 Z"
                  fill="#C41E3A"
                  opacity="0.8"
                />
                {/* Scarf tails */}
                <path
                  d="M78 28 Q95 35 100 55 Q98 50 90 45"
                  fill="#C41E3A"
                  opacity="0.6"
                />
                {/* Arms */}
                <path
                  d="M40 50 L15 70 L20 72 L42 55"
                  fill="#C41E3A"
                  opacity="0.7"
                />
                <path
                  d="M80 50 L105 45 L108 48 L82 55"
                  fill="#C41E3A"
                  opacity="0.7"
                />
                {/* Katana in right hand */}
                <line
                  x1="105"
                  y1="45"
                  x2="115"
                  y2="10"
                  stroke="#999"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="103"
                  y1="43"
                  x2="107"
                  y2="47"
                  stroke="#666"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Legs */}
                <path
                  d="M50 95 L40 145 L45 148 L55 105"
                  fill="#C41E3A"
                  opacity="0.7"
                />
                <path
                  d="M70 95 L80 145 L75 148 L65 105"
                  fill="#C41E3A"
                  opacity="0.7"
                />
              </svg>
            </motion.div>

            {/* Text */}
            <motion.p
              className="font-display text-2xl tracking-[0.3em] text-[#C41E3A] mt-6 uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={
                phase !== "split"
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: -20 }
              }
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Shadow Protocol
            </motion.p>
          </div>

          {/* Slash line */}
          {(phase === "slash" || phase === "split") && (
            <motion.svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <motion.line
                x1="100"
                y1="0"
                x2="0"
                y2="100"
                stroke="#C41E3A"
                strokeWidth="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                filter="url(#glow)"
              />
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="1" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </motion.svg>
          )}

          {/* Skip button */}
          <motion.button
            className="absolute bottom-8 right-8 font-accent text-sm tracking-widest uppercase text-[#999] hover:text-[#C41E3A] transition-colors pointer-events-auto cursor-pointer"
            onClick={handleSkip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Skip →
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
