import Hero from "../Hero/Hero";
import MobileDepartment from "./MobileDepartment";
import CTA from "../Common/CTA";
import MobileNavLayer from "./MobileNavLayer";
import { DEPTS } from "../../../team-assets/data/departments";

export default function MobileView({ onBurst, setHoveredTorii }) {
  const handleHeroEnter = () => {
    document.getElementById("dept-0")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="mobile-view">
      <Hero onEnter={handleHeroEnter} />
      <div className="mobile-departments-wrapper">
        <div id="team-stage-label" className="mobile-stage-label">
          <span className="ts-eyebrow">影の道場 — Shadow Dojo</span>
          <h2 className="ts-title">THE CHAMBERS</h2>
        </div>
        {DEPTS.map((dept, index) => (
          <MobileDepartment
            key={dept.name}
            dept={dept}
            index={index}
            onBurst={onBurst}
            setHoveredTorii={setHoveredTorii}
          />
        ))}
      </div>
      <CTA />
      <MobileNavLayer />
    </div>
  );
}
