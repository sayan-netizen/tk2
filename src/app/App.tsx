import { lazy, Suspense, useEffect, useState } from "react";
import NinjaCursor from "./components/team/Effects/NinjaCursor";
import FXCanvas from "./components/team/Effects/FXCanvas";
import Background from "./components/team/Background/Background";
import { usePointer } from "./team-assets/hooks/usePointer";
import { useMediaQuery } from "./team-assets/hooks/useMediaQuery";
import IntroOverlay from "./components/IntroOverlay";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ScheduleSection from "./components/ScheduleSection";
import EventsSection from "./components/EventsSection";
import SponsorsSection from "./components/SponsorsSection";
import TeamBanner from "./components/TeamBanner";
import VenueSection from "./components/VenueSection";
import Footer from "./components/Footer";

const TeamPage = lazy(() => import("./TeamPage"));

export default function App() {
  const [isTeamPage, setIsTeamPage] = useState(() => window.location.hash === "#team");
  const [burstOrigin, setBurstOrigin] = useState<any>(null);
  const [hoveredTorii, setHoveredTorii] = useState<any>(null);
  const { pointerRef } = usePointer();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const syncRoute = () => setIsTeamPage(window.location.hash === "#team");
    window.addEventListener("hashchange", syncRoute);
    return () => window.removeEventListener("hashchange", syncRoute);
  }, []);

  return (
    <>
      <FXCanvas
        pointerRef={pointerRef}
        burstOrigin={burstOrigin}
        hoveredTorii={hoveredTorii}
        isMobile={isMobile}
      />
      <NinjaCursor />
      <Background />
      <Navigation />
      {isTeamPage ? (
        <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
          <TeamPage setBurstOrigin={setBurstOrigin} setHoveredTorii={setHoveredTorii} />
        </Suspense>
      ) : (
        <div className="main-site min-h-screen text-[#f1eeee]">
          <IntroOverlay />
          <main>
            <HeroSection />
            <AboutSection />
            <ScheduleSection />
            <EventsSection />
            <TeamBanner />
            <SponsorsSection />
            <VenueSection />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
