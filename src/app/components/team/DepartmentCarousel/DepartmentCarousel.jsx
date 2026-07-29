import React, { useEffect, useRef } from 'react';
import MemberCard from '../Members/MemberCard';
import { DEPTS } from '../../../team-assets/data/departments';
import { lerp } from '../../../team-assets/utils/math';

export default function DepartmentCarousel({ isActive, currentTeam, onGoToTeam, onBurst, setHoveredTorii }) {
  const activeDept = DEPTS[currentTeam];

  return (
    <section className={`page-section ${isActive ? 'stage-visible' : ''}`} id="team-stage">
      <div className="slide-overlay"></div>

      <div id="team-stage-label">
        <span className="ts-eyebrow">影の道場 — Shadow Dojo</span>
        <h2 className="ts-title">THE CHAMBERS</h2>
      </div>

      <div id="ts-content-layer">
        <div className="slide-text" id="ts-active-text">
          <span className="slide-kana" id="ts-kana">{activeDept.kana}</span>
          <h2 className="slide-dept-title" id="ts-title" dangerouslySetInnerHTML={{ __html: activeDept.title }}></h2>
          <p className="slide-dept-desc" id="ts-desc">{activeDept.desc}</p>
          <button className="explore-btn">Enter Chamber ›</button>
        </div>

        <div className="slide-cards-panel" id="ts-active-members">
          {activeDept.members.map((member, i) => (
            <MemberCard 
              key={`${currentTeam}-${i}`} 
              member={member} 
              delay={i * 0.08} 
              isCenter={(activeDept.members.length % 2 !== 0 && i === Math.floor(activeDept.members.length / 2)) || (activeDept.members.length === 1 && i === 0)}
              onBurst={onBurst}
              setHoveredTorii={setHoveredTorii}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


