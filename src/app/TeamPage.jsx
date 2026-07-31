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

export default function TeamPage({
  setBurstOrigin: setGlobalBurst,
  setHoveredTorii: setGlobalHovered,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentTeam, setCurrentTeam] = useState(0);
  const [pageAnimating, setPageAnimating] = useState(false);
  const [teamAnimating, setTeamAnimating] = useState(false);
  const [flashIn, setFlashIn] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleBurst = (x, y) => {
    if (setGlobalBurst) setGlobalBurst({ x, y, timestamp: Date.now() });
  };

  const handleSetHovered = (torii) => {
    if (setGlobalHovered) setGlobalHovered(torii);
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.id = teamStyleId;
    // Keep responsive overrides last: the original standalone page imported them
    // before its desktop rules, causing the fixed desktop layout to win on phones.
    style.textContent = `${teamStyles.replace("@import './mobile.css';", "")}\n${mobileStyles}`;
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
    if (index < 0 || index > 1 || pageAnimating) return;
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
    <div className="shadow-dojo-page pt-[76px]">
      {isMobile ? (
        <MobileView onBurst={handleBurst} setHoveredTorii={handleSetHovered} />
      ) : (
        <DesktopView
          currentPage={currentPage}
          currentTeam={currentTeam}
          flashIn={flashIn}
          handleGoToPage={handleGoToPage}
          handleGoToTeam={handleGoToTeam}
          handleBurst={handleBurst}
          setHoveredTorii={handleSetHovered}
        />
      )}
    </div>
  );
}
