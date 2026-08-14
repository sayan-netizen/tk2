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
import EventsSection from "./components/EventsSection";
import SponsorsSection from "./components/SponsorsSection";
import TeamBanner from "./components/TeamBanner";
import VenueSection from "./components/VenueSection";
import Footer from "./components/Footer";
import { ComingSoonProvider } from "./context/ComingSoonContext";

const bannerDesktopFBg = new URL("../../images/banner_desktop_f.webp", import.meta.url).href;
const bannerMobileFBg = new URL("../../images/banner_mobile_f.webp", import.meta.url).href;

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
            {/* Invisible scroll anchor for HOME navigation — placed before the sticky hero */}
            <div id="page-top" style={{ height: 0, overflow: 'hidden' }} />
            {/* Hero & Countdown curtain stacking: Hero sticks while Countdown scrolls over it, then Hero scrolls upward once fully covered */}
            <div className="relative">
              <HeroSection />
              <div className="relative z-10 bg-[#1c140d]">
                <CountdownSection />
                <AboutSection />
              </div>
            </div>

            {/* Team & Events Banners Section with responsive background */}
            <div className="relative overflow-hidden bg-[#EFE2C7] max-sm:-mt-24 sm:mt-0 z-20">
              <div className="absolute inset-0 pointer-events-none overflow-hidden bg-transparent">
                <picture>
                  <source media="(max-width: 767px)" srcSet={bannerMobileFBg} />
                  <img
                    src={bannerDesktopFBg}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover object-top opacity-100 will-change-transform"
                  />
                </picture>
                {/* Soft top fog blend to blend with AboutSection */}
                <div className="absolute inset-x-0 top-0 h-52 max-sm:h-52 bg-gradient-to-b from-[#EFE2C7] via-[#EFE2C7]/90 via-[#EFE2C7]/60 via-[#EFE2C7]/30 to-[#EFE2C7]/0 pointer-events-none" />
                
                {/* Soft bottom blend to transition smoothly into the Sponsors section */}
                <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#EFE2C7] via-[#EFE2C7]/80 via-[#EFE2C7]/40 to-[#EFE2C7]/0 pointer-events-none" />
              </div>
              <div className="relative z-10 py-6 sm:py-12">
                <EventsSection />
                <TeamBanner />
              </div>
            </div>
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

