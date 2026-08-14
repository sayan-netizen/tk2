import { Instagram, Linkedin, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useComingSoon } from "../context/ComingSoonContext";

const quickLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
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
  { icon: Instagram, href: "https://www.instagram.com/tech_kurukshetra", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/tech-kurukshetra", label: "LinkedIn" },
];

const tkLogo = new URL(
  "../../../images/tk-logo.webp",
  import.meta.url
).href;

export default function Footer() {
  const { openComingSoon } = useComingSoon();

  const handleNav = (href: string) => {
    if (href === "#events-page" || href === "#team") {
      window.location.hash = href;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as any });
      return;
    }
    if (href === "#hero") {
      const top = document.getElementById("page-top");
      if (top) {
        top.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative bg-[#EFE2C7] pt-20 pb-10 overflow-hidden border-t border-[#B88A3D]/30">
      {/* Polka Dots Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35 z-0"
        style={{
          backgroundImage: `radial-gradient(#8A623B 1.5px, transparent 1.5px)`,
          backgroundSize: "22px 22px",
        }}
      />

      {/* Traditional Washi Paper (和紙) Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.20] mix-blend-multiply pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Soft top fog blend to transition seamlessly from VenueSection */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#EFE2C7] via-[#EFE2C7]/70 to-[#EFE2C7]/0 pointer-events-none z-10" />

      {/* Sumi-e brush accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#B8322C]/40 to-transparent z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <img
                src={tkLogo}
                alt="Tech Kurukshetra 2026"
                className="h-11 sm:h-12 w-auto max-w-[240px] object-contain"
              />
            </div>
            <p className="text-[#5A5043] text-sm leading-relaxed max-w-xs mb-6 font-medium">
              Enter the mission. Master the unknown. The flagship national-level tech fest of Dept. of CSE(IOT,CS,BT), UEM Kolkata.
            </p>
            <Button
              className="border border-[#B8322C] bg-[#B8322C] font-accent text-[11px] font-bold uppercase tracking-[0.2em] text-[#F7F1E5] shadow-[0_5px_15px_rgba(184,50,44,0.25)] hover:bg-[#962520] rounded-lg px-6 py-2.5 transition-all cursor-pointer"
              onClick={() => handleNav("#events-page")}
            >
              Register Now →
            </Button>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-bold text-[#1D1B18] mb-4 tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-[#5A5043] hover:text-[#B8322C] text-sm font-medium transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Events */}
          <div>
            <h4 className="font-heading text-sm font-bold text-[#1D1B18] mb-4 tracking-wider uppercase">
              Events
            </h4>
            <ul className="space-y-2.5">
              {eventLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-[#5A5043] hover:text-[#B8322C] text-sm font-medium transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-bold text-[#1D1B18] mb-4 tracking-wider uppercase">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-[#5A5043] font-medium">
              <li>
                <a
                  href="mailto:tech.kurukshetra.uem@gmail.com"
                  className="hover:text-[#B8322C] transition-colors"
                >
                  📧 tech.kurukshetra.uem@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+911744233208"
                  className="hover:text-[#B8322C] transition-colors"
                >
                  📞 +91 1744-233208
                </a>
              </li>
              <li>📍 Dept. of CSE(IOT,CS,BT), UEM, Kolkata, West Bengal</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#B88A3D]/30 pt-8">
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
                    className="size-9 rounded-lg bg-[#F2ECE1]/80 border border-[#B88A3D]/40 flex items-center justify-center text-[#5A5043] hover:text-[#B8322C] hover:border-[#B8322C] hover:bg-[#F2ECE1] transition-all shadow-sm"
                    aria-label={social.label}
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>

            {/* Copyright */}
            <p className="text-[#5A5043] text-xs font-accent font-semibold flex items-center gap-1">
              © 2026 Tech Kurukshetra, Dept. of CSE(IOT,CS,BT), UEM Kolkata. Made with{" "}
              <Heart className="size-3.5 text-[#B8322C] fill-[#B8322C]" /> by students.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
