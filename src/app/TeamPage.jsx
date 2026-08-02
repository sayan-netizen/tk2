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
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleBurst = (x, y) => {
    if (setGlobalBurst) setGlobalBurst({ x, y, timestamp: Date.now() });
  };

  const handleSetHovered = (torii) => {
    if (setGlobalHovered) setGlobalHovered(torii);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const style = document.createElement("style");
    style.id = teamStyleId;
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

  return (
    <div className="shadow-dojo-page pt-24 sm:pt-28">
      {isMobile ? (
        <MobileView onBurst={handleBurst} setHoveredTorii={handleSetHovered} />
      ) : (
        <DesktopView
          handleBurst={handleBurst}
          setHoveredTorii={handleSetHovered}
        />
      )}
    </div>
  );
}
