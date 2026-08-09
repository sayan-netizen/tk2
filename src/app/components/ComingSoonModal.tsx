import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Clock, ShieldAlert, Sparkles, Rocket } from "lucide-react";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName?: string | null;
}

export default function ComingSoonModal({
  isOpen,
  onClose,
  eventName,
}: ComingSoonModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur & Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-[#B88A3D]/45 bg-[#0e0a09]/95 p-6 sm:p-8 text-[#f1eeee] shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_0_35px_rgba(184,138,61,0.08)] backdrop-blur-xl"
          >
            {/* Traditional Asanoha Sacred Pattern */}
            <svg className="absolute inset-0 size-full pointer-events-none opacity-15 z-0" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="asanoha-modal" width="60" height="103.92" patternUnits="userSpaceOnUse">
                  <path d="M30 0 L60 17.32 L60 51.96 L30 69.28 L0 51.96 L0 17.32 Z M30 0 L30 69.28 M0 17.32 L60 51.96 M60 17.32 L0 51.96 M30 103.92 L60 86.6 L60 51.96 L30 34.64 L0 51.96 L0 86.6 Z M30 103.92 L30 34.64 M0 86.6 L60 51.96 M60 86.6 L0 51.96" fill="none" stroke="#d51e1e" strokeWidth="0.75" opacity="0.6"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#asanoha-modal)" />
            </svg>

            {/* Background Red Radial Glow */}
            <div className="absolute -top-24 -left-24 size-48 rounded-full bg-[#d51e1e]/20 blur-[60px] pointer-events-none z-0" />
            <div className="absolute -bottom-24 -right-24 size-48 rounded-full bg-[#B88A3D]/15 blur-[60px] pointer-events-none z-0" />

            {/* 4 Cardinal Corner Crest Accents (Kamon Marks) */}
            <div className="absolute top-2.5 left-2.5 size-1.5 rounded-full bg-[#ff3b30] border border-[#F7F1E5] shadow-[0_0_6px_rgba(255,59,48,0.8)] z-20" />
            <div className="absolute top-2.5 right-2.5 size-1.5 rounded-full bg-[#B88A3D] border border-[#F7F1E5] shadow-[0_0_6px_rgba(184,138,61,0.8)] z-20" />
            <div className="absolute bottom-2.5 left-2.5 size-1.5 rounded-full bg-[#B88A3D] border border-[#F7F1E5] shadow-[0_0_6px_rgba(184,138,61,0.8)] z-20" />
            <div className="absolute bottom-2.5 right-2.5 size-1.5 rounded-full bg-[#ff3b30] border border-[#F7F1E5] shadow-[0_0_6px_rgba(255,59,48,0.8)] z-20" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-neutral-300 transition-colors hover:border-[#B8322C] hover:bg-[#B8322C]/20 hover:text-white cursor-pointer z-20"
              aria-label="Close dialog"
            >
              <X className="size-4" />
            </button>

            {/* Header / Protocol Tag */}
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#B8322C]/40 bg-[#B8322C]/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff7d91] relative z-10">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff3b30] opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-[#ff3b30]" />
              </span>
              <span>陣 // REGISTRATION PROTOCOL</span>
            </div>

            {/* Event Name context if provided */}
            {eventName && (
              <div className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-[#ff7a70] font-semibold relative z-10">
                ▶ {eventName}
              </div>
            )}

            {/* Main Title */}
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-wide text-[#F5F5F5] drop-shadow-md relative z-10">
              COMING <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d4d] via-[#ff7a70] to-[#B88A3D]">SOON</span>
            </h2>

            {/* Visual Icon Badge */}
            <div className="my-6 flex items-center justify-center relative z-10">
              <div className="relative flex size-20 items-center justify-center rounded-2xl border border-[#B88A3D]/45 bg-gradient-to-b from-[#1a120e] to-[#0c0a0a] shadow-[0_10px_25px_rgba(0,0,0,0.6),inset_0_0_15px_rgba(184,138,61,0.15)]">
                <Rocket className="size-10 text-[#ff4d4d] animate-pulse" />
                <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none" />
              </div>
            </div>

            {/* Description */}
            <p className="text-center font-sans text-sm leading-relaxed text-neutral-300 relative z-10">
              Registrations for{" "}
              <span className="font-semibold text-white">
                {eventName || "Tech Kurukshetra 2026"}
              </span>{" "}
              will open very soon! Gear up your strategy, assemble your crew, and stay tuned for the official launch.
            </p>

            {/* Status Footer */}
            <div className="mt-6 flex items-center justify-between border-t border-[#B88A3D]/25 pt-4 text-xs font-mono text-neutral-400 relative z-10">
              <div className="flex items-center gap-2">
                <Clock className="size-3.5 text-[#ff4d4d]" />
                <span className="tracking-wider">PORTAL LOCK: ACTIVE</span>
              </div>
              <span className="text-[10px] text-[#B88A3D] font-bold tracking-widest">TK 2026 // 極</span>
            </div>

            {/* Action CTA Button */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group/btn relative mt-6 w-full cursor-pointer rounded-xl border border-[#B8322C] bg-[#B8322C] px-6 py-3.5 font-accent text-xs font-bold uppercase tracking-[0.25em] text-[#F7F1E5] shadow-[0_5px_20px_rgba(184,50,44,0.4)] transition-all hover:bg-[#962520] hover:shadow-[0_8px_25px_rgba(184,50,44,0.6)] overflow-hidden z-10"
            >
              {/* Button Inner Katana Gleam */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover/btn:translate-x-[200%] transition-transform duration-700 pointer-events-none" />
              <span className="relative z-10">Acknowledge →</span>
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
