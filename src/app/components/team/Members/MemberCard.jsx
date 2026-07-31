import React, { useRef } from 'react';

export default function MemberCard({ member, delay, isCenter, onBurst, hoveredTorii, setHoveredTorii }) {
  const frameRef = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();
    if (frameRef.current) {
      const rect = frameRef.current.getBoundingClientRect();
      const ox = rect.left + rect.width / 2;
      const oy = rect.top + rect.height / 2;
      onBurst(ox, oy);

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
      style={{ animationDelay: `${delay}s` }}
    >
      <div 
        ref={frameRef}
        className="torii-frame"
        onMouseEnter={() => setHoveredTorii(frameRef.current)}
        onMouseLeave={() => setHoveredTorii(prev => prev === frameRef.current ? null : prev)}
        onClick={handleClick}
      >
        <div className="portrait-symbol-container">
          {/* Originally, there's no symbol text here in the final vanilla version! */}
        </div>
        <img className="torii-image" src="/images/team/Placeholder.webp" alt="Torii Gate Frame" />
      </div>
      
      <div className="clean-member-info">
        <h4>{member.name}</h4>
        <p>{member.role}</p>
      </div>
    </div>
  );
}


