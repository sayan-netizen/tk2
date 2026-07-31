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

const navLogo = new URL(
  "../../../images/herosection/logo.svg",
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
  { label: "EVENTS", href: "#events" },
  { label: "SPONSORS", href: "#sponsors" },
  { label: "TEAM", href: "#team" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navigation() {
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
    if (href === "#team") {
      window.location.hash = "team";
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-[#050505]/88 backdrop-blur-xl shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      {/* SEPARATED LOGO - Edit size and location here */}
      {/* -> Change 'left-[...]' and 'top-[...]' in the div below to move the logo */}
      <div className="absolute left-[max(20px,calc(50%-480px))] top-[17px] z-50">
        <button
          onClick={() => handleNavClick("#hero")}
          className="group flex cursor-pointer items-center"
          aria-label="Go to home"
        >
          {/* -> Change 'h-[...]' and 'w-[...]' in the img below to resize the logo */}
          <img
            src={navLogo}
            alt="Tech Kurukshetra"
            className="h-[90px] w-[135px] object-contain transition-[filter] duration-300 group-hover:drop-shadow-[0_0_14px_rgba(213,30,30,0.45)]"
          />
        </button>
      </div>

      {/* CENTERED NAV LINKS */}
      <div className="mx-auto flex h-[76px] w-full max-w-[960px] items-center justify-center px-5 sm:px-6 lg:px-0">
        {/* Desktop links */}
        <div className="hidden items-center gap-[28px] lg:flex">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`relative cursor-pointer px-0 py-2 font-accent text-[15px] tracking-[0.06em] transition-colors ${
                activeSection === link.href.slice(1)
                  ? "text-[#d51e1e]"
                  : "text-[#f1eeee] hover:text-[#d51e1e]"
              }`}
            >
              {link.label}
              {activeSection === link.href.slice(1) && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-px bg-[#d51e1e]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* SEPARATED REGISTER BUTTON - Edit size and location here */}
      {/* -> Change 'right-[...]' and 'top-[...]' in the div below to move the button */}
      <div className="absolute right-[max(20px,calc(50%-480px))] top-[22px] z-50 flex items-center gap-3">
        {/* -> Change 'h-[...]' and 'w-[...]' in the button below to resize the button */}
        <button
          id="register-nav-cta"
          className="hidden h-[32px] w-[124px] items-center justify-center bg-transparent transition-[filter] hover:drop-shadow-[0_0_12px_rgba(213,30,30,0.45)] sm:inline-flex"
          onClick={() => window.open("#", "_blank")}
          aria-label="Register now"
        >
          <img src={registerNow} alt="" className="h-full w-full object-contain" />
        </button>
      </div>

      {/* Mobile hamburger */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            id="mobile-menu-trigger"
            className="fixed right-4 top-3 z-[120] flex h-10 w-10 items-center justify-center rounded-none border border-[#b91919]/50 bg-black/90 text-[#F5F5F5] shadow-[0_0_15px_rgba(185,25,25,0.15)] transition-all hover:bg-black hover:border-[#b91919] hover:shadow-[0_0_20px_rgba(185,25,25,0.25)] lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="bg-black/95 border-l border-[#b91919]/30 w-72"
        >
          <SheetHeader>
            <SheetTitle className="font-heading text-[#F5F5F5] text-lg tracking-wider">
              Navigation
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-1 mt-6 px-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-left px-4 py-3 rounded-none text-[15px] tracking-[0.06em] font-accent transition-all cursor-pointer border-l-2 ${
                  activeSection === link.href.slice(1)
                    ? "bg-black/5 text-[#f5f5f5] border-[#b91919] shadow-[inset_10px_0_15px_-10px_rgba(185,25,25,0.15)]"
                    : "border-transparent text-[#999] hover:text-[#F5F5F5] hover:border-[#b91919]/50 hover:bg-black/20"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

    </nav>
  );
}
