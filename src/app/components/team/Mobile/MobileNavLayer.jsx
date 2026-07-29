import React from 'react';
import { DEPTS } from '../../../team-assets/data/departments';

export default function MobileNavLayer() {
  const scrollToDept = (index) => {
    const el = document.getElementById(`dept-${index}`);
    if (el) {
      const navHeight = 70; // rough height of bottom nav
      const y = el.getBoundingClientRect().top + window.scrollY - 20; 
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div id="mobile-nav-layer">
      <div className="mobile-nav-scroll-area">
        {DEPTS.map((dept, idx) => (
          <button 
            key={idx} 
            className="mobile-nav-chip"
            onClick={() => scrollToDept(idx)}
            aria-label={`Go to ${dept.name}`}
          >
            <span className="chip-kana">{dept.kana.split(' ')[0]}</span>
            <span className="chip-name">{dept.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
