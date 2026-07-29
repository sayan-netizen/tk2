import IntroOverlay from "./components/IntroOverlay";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ScheduleSection from "./components/ScheduleSection";
import EventsSection from "./components/EventsSection";
import SponsorsSection from "./components/SponsorsSection";
import VenueSection from "./components/VenueSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5]">
      <IntroOverlay />
      <Navigation />
      <main>
        <HeroSection />
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