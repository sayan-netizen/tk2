import React, { useEffect, useRef } from 'react';
import { DEPTS } from '../../../team-assets/data/departments';

export default function TeamNavLayer({ currentTeam, onGoToTeam, currentPage }) {
  const trackRef = useRef(null);
  const trackTargetX = useRef(0);
  const trackCurrentX = useRef(0);
  const trackVelocity = useRef(0);

  const getNavCardWidth = () => {
    if (!trackRef.current) return 220;
    const cards = trackRef.current.querySelectorAll('.nav-team-card');
    if (cards.length === 0) return 220;
    return cards[0].getBoundingClientRect().width;
  };

  const getGapPx = () => {
    if (!trackRef.current) return 0;
    return parseFloat(getComputedStyle(trackRef.current).gap) || 0;
  };

  useEffect(() => {
    const cw = getNavCardWidth();
    const gap = getGapPx();
    trackTargetX.current = -(cw / 2) - (currentTeam * (cw + gap));
  }, [currentTeam]);

  useEffect(() => {
    let animationFrameId;
    const tickTeamTrack = () => {
      const stiffness = 0.11;
      const damping = 0.72;
      const force = (trackTargetX.current - trackCurrentX.current) * stiffness;
      trackVelocity.current = trackVelocity.current * damping + force;
      trackCurrentX.current += trackVelocity.current;

      if (trackRef.current) {
        if (Math.abs(trackVelocity.current) > 0.01 || Math.abs(trackTargetX.current - trackCurrentX.current) > 0.01) {
          trackRef.current.style.transform = `translateX(${trackCurrentX.current}px)`;
        }
      }
      animationFrameId = requestAnimationFrame(tickTeamTrack);
    };

    animationFrameId = requestAnimationFrame(tickTeamTrack);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleResize = () => {
    const cw = getNavCardWidth();
    const gap = getGapPx();
    trackTargetX.current = -(cw / 2) - (currentTeam * (cw + gap));
    trackCurrentX.current = trackTargetX.current;
    trackVelocity.current = 0;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${trackCurrentX.current}px)`;
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentTeam]);

  return (
    <div id="ts-nav-layer" className={currentPage === 1 ? 'nav-visible' : ''}>
      <div id="ts-nav-track" ref={trackRef}>
        {DEPTS.map((dept, idx) => (
          <div 
            key={idx} 
            className={`nav-team-card ${idx === currentTeam ? 'ntc-active' : ''}`}
            onClick={() => onGoToTeam(idx)}
          >
            <img src={`/images/team/card-${idx === 0 ? 'social-media' : idx === 1 ? 'pr' : idx === 2 ? 'web-dev' : idx === 3 ? 'video-editing' : 'graphics'}.webp`} alt={dept.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
