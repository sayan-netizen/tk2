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
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-[#b8322c]/50 bg-[#0c0a0a] p-6 sm:p-8 text-[#f1eeee] shadow-[0_0_50px_rgba(184,50,44,0.35)]"
          >
            {/* Background Red Radial Glow */}
            <div className="absolute -top-24 -left-24 size-48 rounded-full bg-[#d51e1e]/20 blur-[60px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 size-48 rounded-full bg-[#63272d]/30 blur-[60px] pointer-events-none" />

            {/* Corner Decorative Brackets */}
            <div className="absolute top-3 left-3 size-3 border-t-2 border-l-2 border-[#d51e1e]/60 pointer-events-none" />
            <div className="absolute top-3 right-3 size-3 border-t-2 border-r-2 border-[#d51e1e]/60 pointer-events-none" />
            <div className="absolute bottom-3 left-3 size-b-2 border-b-2 border-l-2 border-[#d51e1e]/60 pointer-events-none" />
            <div className="absolute bottom-3 right-3 size-b-2 border-b-2 border-r-2 border-[#d51e1e]/60 pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-neutral-400 transition-colors hover:border-[#d51e1e]/50 hover:bg-[#d51e1e]/20 hover:text-white cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="size-4" />
            </button>

            {/* Header / Protocol Tag */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d51e1e]/40 bg-[#d51e1e]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff7d91]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d51e1e] opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-[#d51e1e]" />
              </span>
              <span>REGISTRATION PROTOCOL</span>
            </div>

            {/* Event Name context if provided */}
            {eventName && (
              <div className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-[#d54536] font-semibold">
                ▶ {eventName}
              </div>
            )}

            {/* Main Title */}
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-wide text-[#F5F5F5] [text-shadow:0_0_20px_rgba(213,30,30,0.5)]">
              COMING <span className="text-[#d51e1e]">SOON</span>
            </h2>

            {/* Visual Icon Badge */}
            <div className="my-6 flex items-center justify-center">
              <div className="relative flex size-20 items-center justify-center rounded-2xl border border-[#b8322c]/40 bg-gradient-to-b from-black/80 to-[#1a0809] shadow-[0_0_25px_rgba(184,50,44,0.3)]">
                <Rocket className="size-10 text-[#d51e1e] animate-pulse" />
                <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none" />
              </div>
            </div>

            {/* Description */}
            <p className="text-center font-sans text-sm leading-relaxed text-neutral-300">
              Registrations for{" "}
              <span className="font-semibold text-white">
                {eventName || "Tech Kurukshetra 2026"}
              </span>{" "}
              will open very soon! Gear up your strategy, assemble your crew, and stay tuned for the official launch.
            </p>

            {/* Status Footer */}
            <div className="mt-6 flex items-center justify-between border-t border-[#b8322c]/20 pt-4 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <Clock className="size-3.5 text-[#d51e1e]" />
                <span className="tracking-wider">PORTAL LOCK: ACTIVE</span>
              </div>
              <span className="text-[10px] text-[#ff7d91] tracking-widest">TK 2026</span>
            </div>

            {/* Action CTA Button */}
            <button
              onClick={onClose}
              className="mt-6 w-full cursor-pointer rounded-lg border border-[#b8322c] bg-gradient-to-r from-[#d51e1e]/20 via-[#b8322c]/40 to-[#d51e1e]/20 px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.25em] text-white shadow-[0_0_20px_rgba(184,50,44,0.4)] backdrop-blur-md transition-all hover:border-red-500 hover:bg-[#b8322c] hover:shadow-[0_0_30px_rgba(213,30,30,0.7)] active:scale-[0.99]"
            >
              Acknowledge
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
