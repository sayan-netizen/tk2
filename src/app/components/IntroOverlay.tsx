import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const tkLogo = new URL(
  "../../../images/tk-logo.webp",
  import.meta.url
).href;

export default function IntroOverlay({ onComplete }: { onComplete?: () => void }) {
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
      onComplete?.();
      return;
    }
    if (!show) {
      onComplete?.();
      return;
    }
    const t1 = setTimeout(() => setPhase("slash"), 800);
    const t2 = setTimeout(() => setPhase("split"), 1800);
    const t3 = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("introSeen", "true");
      onComplete?.();
    }, 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [show, skipIntro, onComplete]);

  // Skip handler
  const handleSkip = () => {
    setShow(false);
    sessionStorage.setItem("introSeen", "true");
    onComplete?.();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[99999] overflow-hidden"
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
            {/* Shinobi silhouette / Tech Kurukshetra logo */}
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
              <img
                src={tkLogo}
                alt="Tech Kurukshetra"
                className="w-72 sm:w-96 md:w-[440px] h-auto max-w-[90vw] object-contain drop-shadow-[0_0_40px_rgba(196,30,58,0.7)]"
              />
            </motion.div>
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
                stroke="#d51e1e"
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
            className="absolute bottom-8 right-8 font-accent text-sm tracking-widest uppercase text-[#999] hover:text-[#d51e1e] transition-colors pointer-events-auto cursor-pointer"
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
