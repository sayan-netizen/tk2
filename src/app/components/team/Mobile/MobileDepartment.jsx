import MemberCard from '../Members/MemberCard';

export default function MobileDepartment({ dept, index, onBurst, setHoveredTorii }) {

  return (
    <section className="mobile-dept-section" id={`dept-${index}`}>
      <div className="mobile-dept-header">
        <div className="mobile-dept-text">
          <span className="mobile-ts-kana">{dept.kana}</span>
          <h2 className="mobile-ts-title" dangerouslySetInnerHTML={{ __html: dept.title }}></h2>
          <p className="mobile-ts-desc">{dept.desc}</p>
          <button className="mobile-explore-btn">Enter Chamber ›</button>
        </div>
        <div className="mobile-dept-image">
          <img src={`/images/team/series-card-${index}.png`} alt={`${dept.name} icon`} />
        </div>
      </div>

      <div className="mobile-cards-grid">
        {dept.members.map((member, i) => (
          <MemberCard 
            key={`${index}-${i}`} 
            member={member} 
            delay={0} // No stagger on mobile to avoid popping during scroll
            isCenter={true} // Always render as large/primary card on mobile
            onBurst={onBurst}
            setHoveredTorii={setHoveredTorii}
          />
        ))}
      </div>
    </section>
  );
}
