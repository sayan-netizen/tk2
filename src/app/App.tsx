import IntroOverlay from "./components/IntroOverlay";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import CountdownSection from "./components/CountdownSection";
import AboutSection from "./components/AboutSection";
import ScheduleSection from "./components/ScheduleSection";
import EventsSection from "./components/EventsSection";
import SponsorsSection from "./components/SponsorsSection";
import VenueSection from "./components/VenueSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#F5ECD8] text-[#1A1208]">
      <IntroOverlay />
      <Navigation />
      <main>
        <HeroSection />
        <CountdownSection />
        <AboutSection />
        <ScheduleSection />
        <EventsSection />
        <SponsorsSection />
        <VenueSection />
      </main>
      <Footer />
    </div>
  );
}