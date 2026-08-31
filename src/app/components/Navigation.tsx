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
  "../../../images/tk-logo.webp",
  import.meta.url
).href;
const iedcLogo = new URL(
  "../../../images/IEDC (2).webp",
  import.meta.url
).href;
const registerNow = new URL(
  "../../../images/herosection/registerNow.svg",
  import.meta.url
).href;
const iemUemLogo = new URL(
  "../../../images/IEM_UEM.webp",
  import.meta.url
).href;

// Maps nav labels to actual DOM section IDs on the landing page
const navLinks = [
  { label: "HOME", href: "#hero", key: "hero" },
  { label: "ABOUT", href: "#about", key: "about" },
  { label: "EVENTS", href: "#events", key: "events" },
  { label: "TEAM", href: "#team-banner", key: "team" },
  { label: "SPONSORS", href: "#sponsors", key: "sponsors" },
  { label: "VENUE", href: "#venue", key: "venue" },
];

import { scrollToTop } from "../utils/scroll";

export default function Navigation() {
  const { openComingSoon } = useComingSoon();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Sections in top-to-bottom page order with their nav key
    const sections = [
      { id: "hero",        key: "hero" },
      { id: "about",       key: "about" },
      { id: "events",      key: "events" },
      { id: "team-banner", key: "team" },
      { id: "sponsors",    key: "sponsors" },
      { id: "venue",       key: "venue" },
    ];

    const update = () => {
      setScrolled(window.scrollY > 50);

      const hash = window.location.hash;

      // Dedicated sub-pages (Team / Events): lock active indicator immediately
      if (hash === "#team" || hash === "team") {
        setActiveSection("team");
        return;
      }
      if (hash === "#events-page" || hash === "events-page") {
        setActiveSection("events");
        return;
      }

      // If we are on a sub-page (no #hero in DOM), do not spy landing sections
      if (!document.getElementById("hero")) {
        return;
      }

      // On main landing page — calculate active section based on current viewport scroll position
      // Note: hero is position:sticky so its getBoundingClientRect is unreliable for scroll spying.
      // We keep "hero" as the default and only override it when a non-sticky section is in view.
      const viewportTrigger = window.innerHeight * 0.35;
      let current = "hero";

      for (const { id, key } of sections) {
        // Skip the sticky hero — it always reports top:0 while sticking
        if (id === "hero") continue;
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportTrigger + 60 && rect.bottom >= viewportTrigger) {
          current = key;
        }
      }

      // If at the bottom of the landing page, force the last section to be active
      if (window.scrollY > 200 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
        current = sections[sections.length - 1].key;
      }

      setActiveSection(current);
    };

    const onHashChange = () => {
      update();
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  const handleNavClick = (link: { href: string; key: string }) => {
    setOpen(false);

    const isOnLandingPage = !!document.getElementById("hero");

    if (isOnLandingPage) {
      // We're on the landing page — just scroll to the target section
      if (link.key === "hero") {
        // Scroll to the #page-top anchor (a non-sticky element above the hero)
        if (window.location.hash) {
          history.replaceState(null, "", window.location.pathname);
        }
        const top = document.getElementById("page-top");
        if (top) {
          top.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        const el = document.querySelector(link.href);
        if (el) {
          // Clear any sub-page hash so the router stays on the landing page
          if (window.location.hash === "#team" || window.location.hash === "#events-page") {
            history.replaceState(null, "", window.location.pathname);
          }
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
      setActiveSection(link.key);
    } else {
      // We're on a sub-page (Team / Events) — navigate back to landing page,
      // then scroll to the target section after the DOM has re-rendered
      history.replaceState(null, "", window.location.pathname);
      // Force hashchange so App.tsx re-renders the landing page
      window.location.hash = "";
      window.dispatchEvent(new HashChangeEvent("hashchange"));
      setTimeout(() => {
        const el = document.querySelector(link.href);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
      setActiveSection(link.key);
    }
  };

  const navStyle: React.CSSProperties = {
    position: "fixed",
    top: "10px",
    left: "12px",
    right: "12px",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "1480px",
    height: "64px",
    zIndex: 10000,
    borderRadius: "9999px",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(0,0,0,0.8)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    boxShadow: "0 10px 35px rgba(0,0,0,0.6), 0 0 20px rgba(213,30,30,0.15)",
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxSizing: "border-box",
  };

  return (
    <motion.nav
      id="main-nav"
      style={navStyle}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* LOGO */}
      <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
        <button
          onClick={() => handleNavClick({ href: "#hero", key: "hero" })}
          aria-label="Go to home"
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          <img
            src={navLogo}
            alt="Tech Kurukshetra"
            className="h-7 sm:h-9 w-auto max-w-[130px] sm:max-w-[210px] object-contain block"
          />
        </button>
        <div className="h-4 sm:h-6 w-[1px] bg-white/25 shrink-0" />
        <img
          src={iedcLogo}
          alt="IEDC"
          className="h-7 sm:h-9 w-auto object-contain block shrink-0"
        />
        <div className="h-4 sm:h-6 w-[1px] bg-white/25 shrink-0" />
        <img
          src={iemUemLogo}
          alt="IEM & UEM"
          className="h-5 sm:h-7 w-auto object-contain block shrink-0"
        />
      </div>

      {/* CENTERED NAV LINKS — desktop only, hidden on mobile via className */}
      <div className="hidden lg:flex" style={{ alignItems: "center", gap: "28px" }}>
        {navLinks.map((link) => {
          const isActive = activeSection === link.key;
          return (
            <button
              key={link.key}
              onClick={() => handleNavClick(link)}
              style={{
                position: "relative",
                background: "none",
                border: "none",
                padding: "4px 4px",
                cursor: "pointer",
                fontFamily: "'Rajdhani', 'Inter', sans-serif",
                fontSize: "13px",
                letterSpacing: "0.08em",
                fontWeight: isActive ? "600" : "400",
                color: isActive ? "#d51e1e" : "rgba(241,238,238,0.9)",
                transition: "color 0.2s",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {link.label}
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "#d51e1e",
                    borderRadius: "1px",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* RIGHT: REGISTER + HAMBURGER */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
        <button
          id="register-nav-cta"
          onClick={() => {
            setActiveSection("events");
            window.location.hash = "#events-page";
            scrollToTop();
          }}
          aria-label="Register now"
          className="hidden sm:inline-flex"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            height: "44px",
            width: "162px",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.2s ease, filter 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <img src={registerNow} alt="" style={{ height: "100%", width: "100%", objectFit: "contain" }} />
        </button>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              id="mobile-menu-trigger"
              aria-label="Open menu"
              className="lg:hidden"
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "34px",
                width: "34px",
                borderRadius: "50%",
                border: "1px solid rgba(213,30,30,0.4)",
                background: "rgba(213,30,30,0.15)",
                color: "#F5F5F5",
                boxShadow: "0 0 12px rgba(213,30,30,0.25)",
                cursor: "pointer",
                flexShrink: 0,
                padding: 0,
                boxSizing: "border-box",
              }}
            >
              <Menu style={{ width: "16px", height: "16px", display: "block", flexShrink: 0 }} strokeWidth={2.2} />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="!bg-[#0a0a0a] backdrop-blur-2xl !border-l !border-[#d51e1e]/30 !w-[85vw] !max-w-[320px] !p-0 !flex !flex-col !justify-between overflow-hidden"
            style={{
              background: "#0a0a0a",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: 0,
              width: "min(85vw, 320px)",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            {/* Top: heading + links */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                padding: "24px 24px 0 24px",
                flex: "1 1 auto",
                overflowY: "auto",
              }}
            >

              {/* Drawer Heading with Logo */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  paddingBottom: "18px",
                }}
              >
                <img
                  src={navLogo}
                  alt="Tech Kurukshetra"
                  style={{ height: "28px", width: "auto", objectFit: "contain", display: "block", flexShrink: 0 }}
                />
                <span
                  style={{
                    fontFamily: "'Rajdhani', 'Inter', sans-serif",
                    fontSize: "11px",
                    fontWeight: "600",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "#d51e1e",
                  }}
                >
                  Shadow Protocol 2026
                </span>
              </motion.div>

              {/* Navigation Links — staggered animation */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.key;
                  return (
                    <motion.button
                      key={link.key}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.15 + i * 0.06, ease: "easeOut" }}
                      onClick={() => handleNavClick(link)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        textAlign: "left",
                        padding: "12px 16px",
                        borderRadius: "12px",
                        fontSize: "13px",
                        fontFamily: "inherit",
                        fontWeight: isActive ? "700" : "500",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        border: isActive ? "1px solid rgba(213,30,30,0.5)" : "1px solid transparent",
                        background: isActive ? "rgba(213,30,30,0.2)" : "transparent",
                        color: isActive ? "#ffffff" : "#aaaaaa",
                        boxShadow: isActive ? "0 0 15px rgba(213,30,30,0.25)" : "none",
                      }}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: "#d51e1e",
                            boxShadow: "0 0 8px #d51e1e",
                            flexShrink: 0,
                          }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Bottom: Register CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.5, ease: "easeOut" }}
              style={{
                padding: "16px 24px 24px 24px",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                flexShrink: 0,
              }}
            >
              <button
                onClick={() => {
                  setOpen(false);
                  setActiveSection("events");
                  window.location.hash = "#events-page";
                  scrollToTop();
                }}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "1px solid #d51e1e",
                  background: "linear-gradient(to right, rgba(213,30,30,0.3), rgba(185,25,25,0.5))",
                  color: "#ffffff",
                  fontFamily: "inherit",
                  fontSize: "12px",
                  fontWeight: "700",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  boxShadow: "0 0 18px rgba(213,30,30,0.35)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                REGISTER NOW →
              </button>
            </motion.div>
          </SheetContent>
        </Sheet>

      </div>
    </motion.nav>
  );
}
