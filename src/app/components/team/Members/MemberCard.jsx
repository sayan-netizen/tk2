import { useRef, useState } from 'react';
import { Instagram, Linkedin, RotateCcw } from 'lucide-react';

export default function MemberCard({ member, delay, isCenter, onBurst, setHoveredTorii }) {
  const frameRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);

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
    setIsFlipped((prev) => !prev);
  };

  const handleSocialClick = (e, url) => {
    e.stopPropagation();
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className={`member-card mp-card-entry ${isFlipped ? 'flipped' : ''}`}
      data-float-seed={member.seed} 
      style={{ animationDelay: `${delay}s` }}
      onClick={handleClick}
    >
      <div className="member-card-3d-inner">
        {/* FRONT SIDE (Torii Gate Placeholder) */}
        <div className="member-card-front">
          <div 
            ref={frameRef}
            className="torii-frame"
            onMouseEnter={() => setHoveredTorii(frameRef.current)}
            onMouseLeave={() => setHoveredTorii((prev) => (prev === frameRef.current ? null : prev))}
          >
            <div className="portrait-symbol-container" />
            <img className="torii-image" src="/images/team/Placeholder 2.webp" alt="Torii Gate Frame" />
          </div>
          
          <div className="clean-member-info">
            <h4>{member.name}</h4>
            <p>{member.role}</p>
          </div>
        </div>

        {/* BACK SIDE (Ninja Scroll / Details Box) */}
        <div className="member-card-back">
          <div className="scroll-box-container">
            <img src="/images/team/box.webp" alt="Scroll Details Box" className="scroll-box-bg" />
            
            <div className="scroll-box-content">
              <span className="scroll-kanji-stamp">{member.symbol || '忍'}</span>
              <h3 className="scroll-member-name">{member.name}</h3>
              <p className="scroll-member-role">{member.role}</p>

              <div className="scroll-social-links">
                {member.instagram && (
                  <button 
                    type="button" 
                    className="social-btn instagram-btn"
                    onClick={(e) => handleSocialClick(e, member.instagram)}
                    aria-label={`${member.name} Instagram`}
                  >
                    <Instagram className="size-4" />
                    <span>Instagram</span>
                  </button>
                )}
                {member.linkedin && (
                  <button 
                    type="button" 
                    className="social-btn linkedin-btn"
                    onClick={(e) => handleSocialClick(e, member.linkedin)}
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="size-4" />
                    <span>LinkedIn</span>
                  </button>
                )}
              </div>

              <div className="flip-back-hint">
                <RotateCcw className="size-3" />
                <span>Click to flip back</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


