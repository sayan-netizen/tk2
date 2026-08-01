import { motion, AnimatePresence } from 'motion/react';
import MemberCard from '../Members/MemberCard';
import { DEPTS } from '../../../team-assets/data/departments';

export default function DepartmentCarousel({ isActive, currentTeam, onGoToTeam, onBurst, setHoveredTorii }) {
  const activeDept = DEPTS[currentTeam];

  return (
    <section className={`page-section ${isActive ? 'stage-visible' : ''}`} id="team-stage">
      <div className="slide-overlay"></div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentTeam}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          id="ts-content-layer"
        >
          <div className="slide-text" id="ts-active-text">
            <span className="slide-kana" id="ts-kana">{activeDept.kana}</span>
            <h2 className="slide-dept-title" id="ts-title" dangerouslySetInnerHTML={{ __html: activeDept.title }}></h2>
            <p className="slide-dept-desc" id="ts-desc">{activeDept.desc}</p>
          </div>

          <div className="slide-cards-panel" id="ts-active-members">
            {activeDept.members.map((member, i) => (
              <MemberCard 
                key={`${currentTeam}-${i}`} 
                member={member} 
                delay={i * 0.08} 
                isCenter={true}
                onBurst={onBurst}
                setHoveredTorii={setHoveredTorii}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}


