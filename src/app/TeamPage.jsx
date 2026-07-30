import { useEffect, useState } from "react";
import Background from "./components/team/Background/Background";
import NinjaCursor from "./components/team/Effects/NinjaCursor";
import FXCanvas from "./components/team/Effects/FXCanvas";
import DesktopView from "./components/team/Desktop/DesktopView";
import MobileView from "./components/team/Mobile/MobileView";
import { usePointer } from "./team-assets/hooks/usePointer";
import { useCarouselNavigation } from "./team-assets/hooks/useCarouselNavigation";
import { useMediaQuery } from "./team-assets/hooks/useMediaQuery";
import { DEPTS } from "./team-assets/data/departments";
import { ArrowLeft, Home } from "lucide-react";
import teamStyles from "./team-assets/styles/globals.css?raw";
import mobileStyles from "./team-assets/styles/mobile.css?raw";

const teamStyleId = "shadow-dojo-team-styles";

export default function TeamPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentTeam, setCurrentTeam] = useState(0);
  const [pageAnimating, setPageAnimating] = useState(false);
  const [teamAnimating, setTeamAnimating] = useState(false);
  const [burstOrigin, setBurstOrigin] = useState(null);
  const [hoveredTorii, setHoveredTorii] = useState(null);
  const [flashIn, setFlashIn] = useState(false);
  const { pointerRef } = usePointer();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const style = document.createElement("style");
    style.id = teamStyleId;
    style.textContent = `${mobileStyles}\n${teamStyles.replace("@import './mobile.css';", "")}`;
    document.head.appendChild(style);
    document.documentElement.classList.add("team-page-active");
    document.body.classList.add("team-page-active");

    return () => {
      style.remove();
      document.documentElement.classList.remove("team-page-active");
      document.body.classList.remove("team-page-active");
    };
  }, []);

  const handleGoToPage = (index, skipFlash = false) => {
    if (index < 0 || index > 2 || pageAnimating) return;
    setPageAnimating(true);
    setCurrentPage(index);
    if (!skipFlash) {
      setFlashIn(true);
      window.setTimeout(() => setFlashIn(false), 150);
    }
    window.setTimeout(() => setPageAnimating(false), 850);
  };

  const handleGoToTeam = (index) => {
    if (index < 0 || index >= DEPTS.length || teamAnimating) return;
    if (currentPage !== 1) handleGoToPage(1);
    setTeamAnimating(true);
    setCurrentTeam(index);
    window.setTimeout(() => setTeamAnimating(false), 700);
  };

  useCarouselNavigation({
    currentPage,
    currentTeam,
    totalDepts: DEPTS.length,
    onGoToPage: handleGoToPage,
    onGoToTeam: handleGoToTeam,
    pageAnimating,
    teamAnimating,
  });

  return (
    <div className="shadow-dojo-page">
      <button
        type="button"
        onClick={() => { window.location.hash = ""; }}
        className="group fixed right-0 top-4 z-[10000] flex items-center gap-3 overflow-hidden rounded-l-md border border-r-0 border-[#b8322c]/65 bg-[#1d1b18]/90 p-1.5 pr-4 text-left shadow-[-10px_10px_30px_rgba(29,27,24,0.25)] backdrop-blur-md transition-all duration-300 hover:-translate-x-1 hover:border-[#d54536] hover:bg-[#2a1d1a] hover:shadow-[-14px_14px_34px_rgba(184,50,44,0.3)] sm:top-6"
        aria-label="Return to the main site"
      >
        <span className="flex size-9 items-center justify-center bg-[#b8322c] text-[#f7f1e5] transition-colors duration-300 group-hover:bg-[#d54536]">
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
        </span>
          <span className="flex flex-col leading-none">
            <span className="mb-1 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[#d89aa4]">
            <Home className="size-2.5" /> Leave dojo
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#f7f1e5]">Main site</span>
        </span>
      </button>
      <FXCanvas
        pointerRef={pointerRef}
        burstOrigin={burstOrigin}
        hoveredTorii={hoveredTorii}
        currentTeam={currentTeam}
        isMobile={isMobile}
      />
      <NinjaCursor />
      <Background />
      {isMobile ? (
        <MobileView onBurst={(x, y) => setBurstOrigin({ x, y, timestamp: Date.now() })} setHoveredTorii={setHoveredTorii} />
      ) : (
        <DesktopView
          currentPage={currentPage}
          currentTeam={currentTeam}
          flashIn={flashIn}
          handleGoToPage={handleGoToPage}
          handleGoToTeam={handleGoToTeam}
          handleBurst={(x, y) => setBurstOrigin({ x, y, timestamp: Date.now() })}
          setHoveredTorii={setHoveredTorii}
        />
      )}
    </div>
  );
}
