import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useComingSoon } from "../context/ComingSoonContext";

const navLogo = new URL(
  "../../../images/herosection/tech kurukshetra web design.svg",
  import.meta.url
).href;
const registerNow = new URL(
  "../../../images/herosection/registerNow.svg",
  import.meta.url
).href;

const navLinks = [
  { label: "HOME", href: "#hero" },
  { label: "ABOUT", href: "#about" },
  { label: "SCHEDULE", href: "#schedule" },
  { label: "EVENTS", href: "#events-page" },
  { label: "SPONSORS", href: "#sponsors" },
  { label: "TEAM", href: "#team" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navigation() {
  const { openComingSoon } = useComingSoon();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver for active section
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (href === "#team" || href === "#events-page") {
      window.location.hash = href.replace("#", "");
      return;
    }
    if (window.location.hash === "#team" || window.location.hash === "#events-page") {
      window.location.hash = href;
      setTimeout(() => {
        const targetId = href.startsWith('#') ? href : `#${href}`;
        const el = document.querySelector(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const isDedicatedPage = typeof window !== "undefined" && (window.location.hash === "#team" || window.location.hash === "#events-page");
  const currentActiveSection = isDedicatedPage ? window.location.hash.slice(1) : activeSection;

  return (
    <nav
      id="main-nav"
      className="fixed top-2.5 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-[1480px] h-[56px] sm:h-[64px] z-[10000] rounded-full border border-white/15 bg-black/45 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(213,30,30,0.12)] transition-all duration-300 px-6"
    >
      {/* SEPARATED LOGO - Edit size and location here */}
      {/* -> Change 'left-[...]' and 'top-[...]' in the div below to move the logo */}
      <div className="absolute left-6 sm:left-8 top-1/2 -translate-y-1/2 z-50 flex items-center">
        <button
          onClick={() => handleNavClick("#hero")}
          className="group flex cursor-pointer items-center"
          aria-label="Go to home"
        >
          {/* -> Change 'h-[...]' and 'w-[...]' in the img below to resize the logo */}
          <img
            src={navLogo}
            alt="Tech Kurukshetra"
            className="h-[36px] sm:h-[44px] w-auto object-contain transition-[filter] duration-300 group-hover:drop-shadow-[0_0_14px_rgba(213,30,30,0.45)]"
          />
        </button>
      </div>

      {/* CENTERED NAV LINKS */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex h-[56px] w-max items-center justify-center">
        {/* Desktop links */}
        <div className="hidden items-center gap-[28px] lg:flex">
          {navLinks.map((link) => {
            const isActive = currentActiveSection === link.href.slice(1);
            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative cursor-pointer px-0 py-1.5 font-accent text-[14px] tracking-[0.06em] transition-colors ${
                  isActive
                    ? "text-[#d51e1e]"
                    : "text-[#f1eeee]/90 hover:text-[#d51e1e]"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#d51e1e]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT ACTION ITEMS: REGISTER & MOBILE HAMBURGER */}
      <div className="absolute right-6 sm:right-8 top-1/2 -translate-y-1/2 z-50 flex items-center gap-3">
        <button
          id="register-nav-cta"
          className="hidden h-[30px] w-[116px] items-center justify-center bg-transparent transition-[filter] hover:drop-shadow-[0_0_12px_rgba(213,30,30,0.45)] sm:inline-flex cursor-pointer"
          onClick={() => openComingSoon("Tech Kurukshetra 2026")}
          aria-label="Register now"
        >
          <img src={registerNow} alt="" className="h-full w-full object-contain" />
        </button>

        {/* Mobile hamburger button */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              id="mobile-menu-trigger"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d51e1e]/40 bg-[#d51e1e]/15 text-[#F5F5F5] shadow-[0_0_12px_rgba(213,30,30,0.25)] transition-all hover:bg-[#d51e1e] hover:text-white hover:shadow-[0_0_18px_rgba(213,30,30,0.5)] active:scale-95 lg:hidden cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="size-4.5" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-[#0a0a0a]/95 backdrop-blur-2xl border-l border-[#d51e1e]/30 w-64 p-6 flex flex-col justify-center"
          >
            <div className="flex flex-col gap-2 my-auto pt-6">
              {navLinks.map((link) => {
                const isActive = currentActiveSection === link.href.slice(1);
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-left px-5 py-3.5 rounded-xl text-sm font-accent tracking-[0.14em] uppercase transition-all cursor-pointer flex items-center justify-between border ${
                      isActive
                        ? "bg-[#d51e1e]/20 text-white border-[#d51e1e]/50 font-bold shadow-[0_0_15px_rgba(213,30,30,0.25)]"
                        : "border-transparent text-[#aaa] hover:text-white hover:bg-white/5 hover:border-white/10"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="size-2 rounded-full bg-[#d51e1e] shadow-[0_0_8px_#d51e1e]" />
                    )}
                  </button>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>

    </nav>
  );
}
