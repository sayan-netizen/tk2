import { lazy, Suspense, useEffect, useState } from "react";
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

const TeamPage = lazy(() => import("./TeamPage"));
const EventPage = lazy(() => import("./EventPage"));

export default function App() {
  const [route, setRoute] = useState(() => window.location.hash);

  useEffect(() => {
    const syncRoute = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", syncRoute);
    return () => window.removeEventListener("hashchange", syncRoute);
  }, []);

  if (route === "#team") {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
        <TeamPage />
      </Suspense>
    );
  }

  if (route === "#events-page") {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
        <EventPage />
      </Suspense>
    );
  }

  return (
    <div className="main-site min-h-screen text-[#f1eeee]">
      <IntroOverlay />
      <Navigation />
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
  );
}
