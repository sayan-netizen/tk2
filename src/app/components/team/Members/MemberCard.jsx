import { useRef } from 'react';

export default function MemberCard({ member, delay, isCenter, onBurst, setHoveredTorii }) {
  const frameRef = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();
    if (frameRef.current) {
      const img = frameRef.current.querySelector('.torii-image');
      if (img) {
        img.classList.remove('torii-awaken');
        void img.offsetWidth;
        img.classList.add('torii-awaken');
      }

      const portrait = frameRef.current.querySelector('.portrait-symbol-container');
      if (portrait) {
        portrait.classList.remove('torii-portrait-awaken');
        void portrait.offsetWidth;
        portrait.classList.add('torii-portrait-awaken');
      }
    }
  };

  return (
    <div 
      className="member-card mp-card-entry"
      data-float-seed={member.seed} 
      style={{ animationDelay: `${delay}s`, cursor: 'default' }}
      onClick={handleClick}
    >
      <div className="member-card-3d-inner">
        {/* FRONT SIDE (Torii Gate Placeholder) */}
        <div className="member-card-front">
          <div 
            ref={frameRef}
            className="torii-frame"
          >
            <div className="portrait-symbol-container" />
            <img className="torii-image" src="/images/team/Placeholder 2.webp" alt="Torii Gate Frame" />
          </div>
          
          <div className="clean-member-info">
            <h4>{member.name}</h4>
            <p>{member.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


