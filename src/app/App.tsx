import { lazy, Suspense, useEffect, useState } from "react";
import NinjaCursor from "./components/team/Effects/NinjaCursor";
import FXCanvas from "./components/team/Effects/FXCanvas";
import Background from "./components/team/Background/Background";
import { usePointer } from "./team-assets/hooks/usePointer";
import { useMediaQuery } from "./team-assets/hooks/useMediaQuery";
import IntroOverlay from "./components/IntroOverlay";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import CountdownSection from "./components/CountdownSection";
import AboutSection from "./components/AboutSection";
import ScheduleSection from "./components/ScheduleSection";
import EventsSection from "./components/EventsSection";
import SponsorsSection from "./components/SponsorsSection";
import TeamBanner from "./components/TeamBanner";
import VenueSection from "./components/VenueSection";
import Footer from "./components/Footer";
import { ComingSoonProvider } from "./context/ComingSoonContext";

const TeamPage = lazy(() => import("./TeamPage"));
const EventPage = lazy(() => import("./EventPage"));

export default function App() {
  const [burstOrigin, setBurstOrigin] = useState<any>(null);
  const [hoveredTorii, setHoveredTorii] = useState<any>(null);
  const { pointerRef } = usePointer();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [route, setRoute] = useState(() => window.location.hash);

  useEffect(() => {
    const syncRoute = () => {
      setRoute(window.location.hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", syncRoute);
    return () => window.removeEventListener("hashchange", syncRoute);
  }, []);

  const renderContent = () => {
    if (route === "#team") {
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
          <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
            <TeamPage setBurstOrigin={setBurstOrigin} setHoveredTorii={setHoveredTorii} />
          </Suspense>
        </>
      );
    }

    if (route === "#events-page") {
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
          <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
            <EventPage />
          </Suspense>
        </>
      );
    }

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
        <div className="main-site min-h-screen text-[#f1eeee]">
          <IntroOverlay />
          <main>
            <HeroSection />
            <CountdownSection />
            <AboutSection />
            <ScheduleSection />
            <EventsSection />
            <TeamBanner />
            <SponsorsSection />
            <VenueSection />
          </main>
          <Footer />
        </div>
      </>
    );
  };

  return <ComingSoonProvider>{renderContent()}</ComingSoonProvider>;
}

