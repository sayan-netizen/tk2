import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Building2, Mail, Phone, User, CheckCircle2, Sparkles } from "lucide-react";

interface SponsorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SponsorModal({ isOpen, onClose }: SponsorModalProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    tier: "Gold Sponsor",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open mailto link with pre-filled content as fallback / direct dispatch
    const subject = encodeURIComponent(`Sponsorship Inquiry: ${formData.companyName}`);
    const body = encodeURIComponent(
      `Company / Organization: ${formData.companyName}\n` +
      `Contact Person: ${formData.contactName}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Interested Tier: ${formData.tier}\n\n` +
      `Message:\n${formData.message}`
    );

    window.open(`mailto:tech.kurukshetra.uem@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFormData({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      tier: "Gold Sponsor",
      message: "",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleResetAndClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative z-10 w-full max-w-xl overflow-hidden border border-[#b91919]/60 bg-[#0c0a0a] p-6 sm:p-8 text-[#f1eeee] shadow-[0_0_50px_rgba(185,25,25,0.4)] my-auto"
          >
            {/* Background Radial Glow */}
            <div className="absolute -top-24 -left-24 size-48 rounded-full bg-[#d51e1e]/20 blur-[60px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 size-48 rounded-full bg-[#63272d]/30 blur-[60px] pointer-events-none" />

            {/* Corner Bracket Accents */}
            <div className="absolute top-3 left-3 size-3 border-t-2 border-l-2 border-[#d51e1e]/70 pointer-events-none" />
            <div className="absolute top-3 right-3 size-3 border-t-2 border-r-2 border-[#d51e1e]/70 pointer-events-none" />
            <div className="absolute bottom-3 left-3 size-3 border-b-2 border-l-2 border-[#d51e1e]/70 pointer-events-none" />
            <div className="absolute bottom-3 right-3 size-3 border-b-2 border-r-2 border-[#d51e1e]/70 pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleResetAndClose}
              className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-neutral-400 transition-colors hover:border-[#d51e1e]/50 hover:bg-[#d51e1e]/20 hover:text-white cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="size-4" />
            </button>

            {/* Header Badge */}
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d51e1e]/40 bg-[#d51e1e]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff7d91]">
              <Sparkles className="size-3 text-[#d51e1e]" />
              <span>PARTNERSHIP PROTOCOL</span>
            </div>

            {/* Main Title */}
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-[#F5F5F5] [text-shadow:0_0_20px_rgba(213,30,30,0.5)]">
              BECOME A <span className="text-[#d51e1e]">SPONSOR</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 mb-6 font-sans">
              Partner with Tech Kurukshetra 2026 at UEM Kolkata and showcase your brand to thousands of tech innovators.
            </p>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center flex flex-col items-center justify-center"
              >
                <div className="flex size-16 items-center justify-center rounded-full bg-[#d51e1e]/20 border border-[#d51e1e] mb-4 text-[#ff2626] shadow-[0_0_20px_rgba(213,30,30,0.4)]">
                  <CheckCircle2 className="size-8" />
                </div>
                <h3 className="font-display text-2xl font-bold uppercase text-[#F5F5F5] mb-2">
                  Inquiry Dispatched!
                </h3>
                <p className="text-sm text-neutral-300 max-w-md leading-relaxed mb-6 font-sans">
                  Your sponsorship inquiry for <span className="font-semibold text-white">{formData.companyName}</span> has been prepared. If your email client did not open automatically, please send your details directly to:
                </p>
                <div className="px-4 py-2 bg-black/60 border border-[#b91919]/40 rounded font-mono text-xs text-[#ff7d91] mb-6">
                  tech.kurukshetra.uem@gmail.com
                </div>
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 bg-[#d51e1e] text-white font-accent text-xs uppercase tracking-[0.2em] font-bold rounded shadow-[0_0_15px_rgba(213,30,30,0.5)] hover:bg-[#b91919] transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Company Name */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1.5">
                      <Building2 className="size-3 text-[#d51e1e]" />
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g. Acme Corp"
                      className="w-full bg-black/60 border border-[#b91919]/40 rounded px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d51e1e] focus:ring-1 focus:ring-[#d51e1e] transition-all font-sans"
                    />
                  </div>

                  {/* Contact Person */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1.5">
                      <User className="size-3 text-[#d51e1e]" />
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      required
                      value={formData.contactName}
                      onChange={handleChange}
                      placeholder="e.g. Alex Morgan"
                      className="w-full bg-black/60 border border-[#b91919]/40 rounded px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d51e1e] focus:ring-1 focus:ring-[#d51e1e] transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1.5">
                      <Mail className="size-3 text-[#d51e1e]" />
                      Official Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@acme.com"
                      className="w-full bg-black/60 border border-[#b91919]/40 rounded px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d51e1e] focus:ring-1 focus:ring-[#d51e1e] transition-all font-sans"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1.5">
                      <Phone className="size-3 text-[#d51e1e]" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full bg-black/60 border border-[#b91919]/40 rounded px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d51e1e] focus:ring-1 focus:ring-[#d51e1e] transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Tier Selection */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                    Sponsorship Interest Tier
                  </label>
                  <select
                    name="tier"
                    value={formData.tier}
                    onChange={handleChange}
                    className="w-full bg-[#120b0b] border border-[#b91919]/40 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d51e1e] focus:ring-1 focus:ring-[#d51e1e] transition-all font-sans"
                  >
                    <option value="Title Sponsor">Title Sponsor</option>
                    <option value="Platinum Sponsor">Platinum Sponsor</option>
                    <option value="Gold Sponsor">Gold Sponsor</option>
                    <option value="Silver Sponsor">Silver Sponsor</option>
                    <option value="Media / Community Partner">Media / Community Partner</option>
                    <option value="Custom Partnership">Custom Partnership</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                    Additional Message / Requirements
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your organization's sponsorship goals or special queries..."
                    className="w-full bg-black/60 border border-[#b91919]/40 rounded px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d51e1e] focus:ring-1 focus:ring-[#d51e1e] transition-all resize-none font-sans"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-2 cursor-pointer flex items-center justify-center gap-2 rounded border border-[#b91919] bg-gradient-to-r from-[#d51e1e]/30 via-[#b8322c]/50 to-[#d51e1e]/30 py-3 font-accent text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_0_20px_rgba(185,25,25,0.4)] transition-all hover:bg-[#d51e1e] hover:shadow-[0_0_30px_rgba(213,30,30,0.7)] active:scale-[0.99]"
                >
                  <Send className="size-4 text-[#ff7d91]" />
                  <span>Submit Sponsorship Request</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
