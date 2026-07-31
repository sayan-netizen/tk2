import Hero from "../Hero/Hero";
import DepartmentCarousel from "../DepartmentCarousel/DepartmentCarousel";
import CTA from "../Common/CTA";
import SlideIndicators from "../Common/SlideIndicators";
import TeamNavLayer from "../DepartmentCarousel/TeamNavLayer";
import { DEPTS } from "../../../team-assets/data/departments";

export default function DesktopView({
  currentPage,
  currentTeam,
  flashIn,
  handleGoToPage,
  handleGoToTeam,
  handleBurst,
  setHoveredTorii,
}) {
  return (
    <>
      <div id="slide-flash" className={flashIn ? "flash-in" : ""} />
      <SlideIndicators
        currentPage={currentPage}
        currentTeam={currentTeam}
        totalDepts={DEPTS.length}
        onGoToPage={handleGoToPage}
        onGoToTeam={handleGoToTeam}
      />
      <div id="slide-counter">
        <span id="counter-current">
          {String(currentPage === 0 ? 1 : currentPage === 1 ? currentTeam + 2 : 7).padStart(2, "0")}
        </span>{" "}
        / 07
      </div>
      <TeamNavLayer currentPage={currentPage} currentTeam={currentTeam} onGoToTeam={handleGoToTeam} />
      <div
        id="page-carousel"
        style={{
          transform: `translateX(${-currentPage * 100}vw)`,
          transition: "transform 0.78s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <Hero onEnter={() => handleGoToPage(1)} />
        <DepartmentCarousel
          isActive={currentPage === 1}
          currentTeam={currentTeam}
          onGoToTeam={handleGoToTeam}
          onBurst={handleBurst}
          setHoveredTorii={setHoveredTorii}
        />
        <CTA />
      </div>
    </>
  );
}
