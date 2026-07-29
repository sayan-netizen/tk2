import { lazy, Suspense, useEffect, useState } from "react";
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

  useEffect(() => {
    const syncRoute = () => setIsTeamPage(window.location.hash === "#team");
    window.addEventListener("hashchange", syncRoute);
    return () => window.removeEventListener("hashchange", syncRoute);
  }, []);

  if (isTeamPage) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
        <TeamPage />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5]">
      <IntroOverlay />
      <Navigation />
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
  );
}
