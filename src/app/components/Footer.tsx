import { Instagram, Twitter, Linkedin, Youtube, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useComingSoon } from "../context/ComingSoonContext";

const quickLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Schedule", href: "#schedule" },
  { label: "Events", href: "#events" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Venue", href: "#venue" },
];

const eventLinks = [
  { label: "Shadow Sprint (Hackathon)", href: "#events" },
  { label: "Code Wars", href: "#events" },
  { label: "Robo Arena", href: "#events" },
  { label: "Shadow Games", href: "#events" },
  { label: "Design Sprint", href: "#events" },
];

const socials = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter/X" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  const { openComingSoon } = useComingSoon();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative bg-[#050505] border-t border-[#b91919]/30 pt-16 pb-8">
      {/* Top red accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d51e1e] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-none bg-black/40 border border-[#b91919]/30 flex items-center justify-center font-display text-[#d51e1e] text-lg tracking-wider">
                TK
              </div>
              <div>
                <span className="font-heading text-sm font-semibold text-[#F5F5F5] tracking-wider block leading-tight">
                  TECH KURUKSHETRA
                </span>
                <span className="font-accent text-[10px] tracking-[0.2em] uppercase text-[#666]">
                  2026
                </span>
              </div>
            </div>
            <p className="text-[#666] text-sm leading-relaxed max-w-xs mb-5">
              Enter the mission. Master the unknown. The flagship national-level
              tech fest of NIT Kurukshetra.
            </p>
            <Button
              className="border border-[#b91919] bg-black/5 font-accent text-[10px] uppercase tracking-[0.2em] text-[#f1eeee] shadow-[0_0_14px_rgba(185,25,25,0.24)] hover:bg-[#b91919]/10 rounded-none px-6 py-2 transition-all cursor-pointer"
              onClick={() => openComingSoon("Tech Kurukshetra 2026")}
            >
              Register Now →
            </Button>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-[#F5F5F5] mb-4 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-[#666] hover:text-[#d51e1e] text-sm transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Events */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-[#F5F5F5] mb-4 tracking-wide">
              Events
            </h4>
            <ul className="space-y-2">
              {eventLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-[#666] hover:text-[#d51e1e] text-sm transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-[#F5F5F5] mb-4 tracking-wide">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-[#666]">
              <li>
                <a
                  href="mailto:tech.kurukshetra.uem@gmail.com"
                  className="hover:text-[#d51e1e] transition-colors"
                >
                  📧 tech.kurukshetra.uem@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+911744233208"
                  className="hover:text-[#d51e1e] transition-colors"
                >
                  📞 +91 1744-233208
                </a>
              </li>
              <li>📍 UEM, Kolkata, West Bengal</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#b91919]/20 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-none bg-black/40 border border-[#b91919]/30 flex items-center justify-center text-[#666] hover:text-[#d51e1e] hover:border-[#b91919] transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            {/* Copyright */}
            <p className="text-[#666] text-xs font-accent flex items-center gap-1">
              © 2026 Tech Kurukshetra, NIT Kurukshetra. Made with{" "}
              <Heart className="w-3 h-3 text-[#d51e1e] fill-[#d51e1e]" /> by students.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
