import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Send,
  Building2,
  Mail,
  Phone,
  User,
  CheckCircle2,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  Loader2,
  AlertCircle,
  Globe,
} from "lucide-react";
import {
  SponsorFormData,
  TARGET_SPONSOR_EMAIL,
  validateSponsorForm,
  buildSponsorEmailBody,
  getMailtoUrl,
  getGmailWebUrl,
  getOutlookWebUrl,
  triggerMailtoClient,
  sendSponsorApiRequest,
  copyToClipboard,
} from "../utils/sponsorApi";

interface SponsorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialFormState: SponsorFormData = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  tier: "Gold Sponsor",
  message: "",
};

export default function SponsorModal({ isOpen, onClose }: SponsorModalProps) {
  const [formData, setFormData] = useState<SponsorFormData>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof SponsorFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDetails, setCopiedDetails] = useState(false);
  const [apiNotice, setApiNotice] = useState<string | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleResetAndClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof SponsorFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = validateSponsorForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setApiNotice(null);

    // 1. Attempt API dispatch (if backend server or webhook is active)
    const apiResult = await sendSponsorApiRequest(formData);

    setIsSubmitting(false);

    if (apiResult.success) {
      setApiNotice("Request sent directly to our sponsorship team via API!");
    } else {
      // Automatic seamless fallback to mail client dispatch
      triggerMailtoClient(formData);
      setApiNotice("Prepared email inquiry dispatch for your mail application.");
    }

    setIsSubmitted(true);
  };

  const handleCopyEmail = async () => {
    const success = await copyToClipboard(TARGET_SPONSOR_EMAIL);
    if (success) {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleCopyDetails = async () => {
    const details = buildSponsorEmailBody(formData);
    const success = await copyToClipboard(details);
    if (success) {
      setCopiedDetails(true);
      setTimeout(() => setCopiedDetails(false), 2500);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setIsSubmitting(false);
    setFormData(initialFormState);
    setErrors({});
    setCopiedEmail(false);
    setCopiedDetails(false);
    setApiNotice(null);
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
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-[#B88A3D]/45 bg-[#0e0a09]/95 p-6 sm:p-8 text-[#f1eeee] shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_0_35px_rgba(184,138,61,0.08)] backdrop-blur-xl my-auto"
          >
            {/* Traditional Asanoha Sacred Pattern */}
            <svg className="absolute inset-0 size-full pointer-events-none opacity-15 z-0" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="asanoha-sponsor" width="60" height="103.92" patternUnits="userSpaceOnUse">
                  <path d="M30 0 L60 17.32 L60 51.96 L30 69.28 L0 51.96 L0 17.32 Z M30 0 L30 69.28 M0 17.32 L60 51.96 M60 17.32 L0 51.96 M30 103.92 L60 86.6 L60 51.96 L30 34.64 L0 51.96 L0 86.6 Z M30 103.92 L30 34.64 M0 86.6 L60 51.96 M60 86.6 L0 51.96" fill="none" stroke="#d51e1e" strokeWidth="0.75" opacity="0.6"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#asanoha-sponsor)" />
            </svg>

            {/* Background Radial Glow */}
            <div className="absolute -top-24 -left-24 size-48 rounded-full bg-[#d51e1e]/20 blur-[60px] pointer-events-none z-0" />
            <div className="absolute -bottom-24 -right-24 size-48 rounded-full bg-[#B88A3D]/15 blur-[60px] pointer-events-none z-0" />

            {/* 4 Cardinal Corner Crest Accents (Kamon Marks) */}
            <div className="absolute top-2.5 left-2.5 size-1.5 rounded-full bg-[#ff3b30] border border-[#F7F1E5] shadow-[0_0_6px_rgba(255,59,48,0.8)] z-20" />
            <div className="absolute top-2.5 right-2.5 size-1.5 rounded-full bg-[#B88A3D] border border-[#F7F1E5] shadow-[0_0_6px_rgba(184,138,61,0.8)] z-20" />
            <div className="absolute bottom-2.5 left-2.5 size-1.5 rounded-full bg-[#B88A3D] border border-[#F7F1E5] shadow-[0_0_6px_rgba(184,138,61,0.8)] z-20" />
            <div className="absolute bottom-2.5 right-2.5 size-1.5 rounded-full bg-[#ff3b30] border border-[#F7F1E5] shadow-[0_0_6px_rgba(255,59,48,0.8)] z-20" />

            {/* Close Button */}
            <button
              onClick={handleResetAndClose}
              className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-neutral-300 transition-colors hover:border-[#B8322C] hover:bg-[#B8322C]/20 hover:text-white cursor-pointer z-20"
              aria-label="Close dialog"
            >
              <X className="size-4" />
            </button>

            {/* Header Badge */}
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#B8322C]/40 bg-[#B8322C]/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff7d91] relative z-10">
              <Sparkles className="size-3 text-[#ff4d4d]" />
              <span>協 // PARTNERSHIP PROTOCOL</span>
            </div>

            {/* Main Title */}
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-[#F5F5F5] drop-shadow-md relative z-10">
              BECOME A <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d4d] via-[#ff7a70] to-[#B88A3D]">SPONSOR</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1 mb-6 font-sans relative z-10 font-medium">
              Partner with Tech Kurukshetra 2026 at Dept. of CSE(IOT,CS,BT), UEM Kolkata and showcase your brand to thousands of tech innovators.
            </p>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-4 text-center flex flex-col items-center justify-center relative z-10"
              >
                <div className="flex size-14 items-center justify-center rounded-2xl bg-[#B8322C]/20 border border-[#B8322C] mb-3 text-[#ff4d4d] shadow-[0_0_20px_rgba(184,50,44,0.4)]">
                  <CheckCircle2 className="size-7" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#F5F5F5] mb-1">
                  Inquiry Prepared!
                </h3>

                {apiNotice && (
                  <p className="text-xs text-[#ff7d91] font-mono mb-4 bg-black/50 px-3 py-1.5 border border-[#B88A3D]/30 rounded-lg">
                    {apiNotice}
                  </p>
                )}

                <p className="text-xs sm:text-sm text-neutral-300 max-w-md leading-relaxed mb-4 font-sans">
                  Sponsorship request for <span className="font-semibold text-white">{formData.companyName}</span> ({formData.tier}) ready to dispatch.
                </p>

                {/* Email Address Quick Copy Card */}
                <div className="w-full bg-black/60 border border-[#B88A3D]/40 rounded-xl p-3.5 mb-5 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#ff7d91]">
                    <Mail className="size-4 text-[#ff4d4d] shrink-0" />
                    <span>{TARGET_SPONSOR_EMAIL}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#B8322C]/20 border border-[#B8322C]/50 hover:bg-[#B8322C]/40 rounded-lg text-xs font-mono text-white transition-all cursor-pointer"
                  >
                    {copiedEmail ? <Check className="size-3.5 text-green-400" /> : <Copy className="size-3.5" />}
                    <span>{copiedEmail ? "Copied Email!" : "Copy Email"}</span>
                  </button>
                </div>

                {/* Multiple Dispatch Options Grid */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-left">
                  <a
                    href={getMailtoUrl(formData)}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#140e0b]/80 border border-[#B88A3D]/35 hover:border-[#ff3b30] hover:bg-[#B8322C]/15 transition-all text-xs font-accent tracking-wider uppercase text-white group cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Mail className="size-4 text-[#ff4d4d]" />
                      Default Mail App
                    </span>
                    <ExternalLink className="size-3.5 text-neutral-400 group-hover:text-white transition-colors" />
                  </a>

                  <a
                    href={getGmailWebUrl(formData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#140e0b]/80 border border-[#B88A3D]/35 hover:border-[#ff3b30] hover:bg-[#B8322C]/15 transition-all text-xs font-accent tracking-wider uppercase text-white group cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Globe className="size-4 text-[#ff4d4d]" />
                      Open Gmail Web
                    </span>
                    <ExternalLink className="size-3.5 text-neutral-400 group-hover:text-white transition-colors" />
                  </a>

                  <a
                    href={getOutlookWebUrl(formData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#140e0b]/80 border border-[#B88A3D]/35 hover:border-[#ff3b30] hover:bg-[#B8322C]/15 transition-all text-xs font-accent tracking-wider uppercase text-white group cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Building2 className="size-4 text-[#ff4d4d]" />
                      Open Outlook Web
                    </span>
                    <ExternalLink className="size-3.5 text-neutral-400 group-hover:text-white transition-colors" />
                  </a>

                  <button
                    onClick={handleCopyDetails}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#140e0b]/80 border border-[#B88A3D]/35 hover:border-[#ff3b30] hover:bg-[#B8322C]/15 transition-all text-xs font-accent tracking-wider uppercase text-white group cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      {copiedDetails ? <Check className="size-4 text-green-400" /> : <Copy className="size-4 text-[#ff4d4d]" />}
                      {copiedDetails ? "Details Copied!" : "Copy Full Details"}
                    </span>
                    <Copy className="size-3.5 text-neutral-400 group-hover:text-white transition-colors" />
                  </button>
                </div>

                <motion.button
                  onClick={handleResetAndClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-[#B8322C] text-[#F7F1E5] font-accent text-xs uppercase tracking-[0.25em] font-bold rounded-xl shadow-[0_5px_20px_rgba(184,50,44,0.4)] hover:bg-[#962520] transition-all cursor-pointer"
                >
                  Done &amp; Close Window
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Company Name */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1.5">
                      <Building2 className="size-3 text-[#ff4d4d]" />
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g. Acme Corp"
                      className={`w-full bg-[#140e0b]/90 border ${
                        errors.companyName ? "border-red-500 ring-1 ring-red-500" : "border-[#B88A3D]/40"
                      } rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#ff3b30] focus:ring-1 focus:ring-[#ff3b30] transition-all font-sans`}
                    />
                    {errors.companyName && (
                      <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1 font-sans">
                        <AlertCircle className="size-3 shrink-0" />
                        {errors.companyName}
                      </p>
                    )}
                  </div>

                  {/* Contact Person */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1.5">
                      <User className="size-3 text-[#ff4d4d]" />
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      placeholder="e.g. Alex Morgan"
                      className={`w-full bg-[#140e0b]/90 border ${
                        errors.contactName ? "border-red-500 ring-1 ring-red-500" : "border-[#B88A3D]/40"
                      } rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#ff3b30] focus:ring-1 focus:ring-[#ff3b30] transition-all font-sans`}
                    />
                    {errors.contactName && (
                      <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1 font-sans">
                        <AlertCircle className="size-3 shrink-0" />
                        {errors.contactName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1.5">
                      <Mail className="size-3 text-[#ff4d4d]" />
                      Official Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@acme.com"
                      className={`w-full bg-[#140e0b]/90 border ${
                        errors.email ? "border-red-500 ring-1 ring-red-500" : "border-[#B88A3D]/40"
                      } rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#ff3b30] focus:ring-1 focus:ring-[#ff3b30] transition-all font-sans`}
                    />
                    {errors.email && (
                      <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1 font-sans">
                        <AlertCircle className="size-3 shrink-0" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1.5">
                      <Phone className="size-3 text-[#ff4d4d]" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#140e0b]/90 border border-[#B88A3D]/40 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#ff3b30] focus:ring-1 focus:ring-[#ff3b30] transition-all font-sans"
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
                    className="w-full bg-[#140e0b] border border-[#B88A3D]/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff3b30] focus:ring-1 focus:ring-[#ff3b30] transition-all font-sans cursor-pointer"
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
                    className="w-full bg-[#140e0b]/90 border border-[#B88A3D]/40 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#ff3b30] focus:ring-1 focus:ring-[#ff3b30] transition-all resize-none font-sans"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group/btn relative w-full mt-2 cursor-pointer flex items-center justify-center gap-2 rounded-xl border border-[#B8322C] bg-[#B8322C] py-3.5 font-accent text-xs font-bold uppercase tracking-[0.25em] text-[#F7F1E5] shadow-[0_5px_20px_rgba(184,50,44,0.4)] transition-all hover:bg-[#962520] hover:shadow-[0_8px_25px_rgba(184,50,44,0.6)] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                  {/* Button Inner Katana Gleam */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover/btn:translate-x-[200%] transition-transform duration-700 pointer-events-none" />

                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin text-white" />
                      <span className="relative z-10">Processing Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="size-4 text-white" />
                      <span className="relative z-10">Submit Sponsorship Request →</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
