import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { DEPTS } from '../../../team-assets/data/departments';

export default function TeamNavLayer({ currentTeam, onGoToTeam, currentPage }) {
  const trackRef = useRef(null);
  const trackTargetX = useRef(0);
  const trackCurrentX = useRef(0);
  const trackVelocity = useRef(0);
  const hasInitialPosition = useRef(false);

  const getNavCardWidth = useCallback(() => {
    if (!trackRef.current) return 220;
    const cards = trackRef.current.querySelectorAll('.nav-team-card');
    if (cards.length === 0) return 220;
    return cards[0].offsetWidth;
  }, []);

  const getGapPx = useCallback(() => {
    if (!trackRef.current) return 0;
    return parseFloat(getComputedStyle(trackRef.current).gap) || 0;
  }, []);

  const alignTrack = useCallback((snap = false) => {
    const cw = getNavCardWidth();
    const gap = getGapPx();
    const targetX = -(cw / 2) - (currentTeam * (cw + gap));

    trackTargetX.current = targetX;
    if (snap) {
      trackCurrentX.current = targetX;
      trackVelocity.current = 0;
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${targetX}px)`;
      }
    }
  }, [currentTeam, getNavCardWidth, getGapPx]);

  // The first card must be positioned only after the browser has measured it.
  // Previously the animation began from 0px, which could leave Social Media
  // outside the visible strip until a resize or another card selection.
  useLayoutEffect(() => {
    const shouldSnap = !hasInitialPosition.current;
    alignTrack(shouldSnap);
    const frame = requestAnimationFrame(() => alignTrack(shouldSnap));
    hasInitialPosition.current = true;
    return () => cancelAnimationFrame(frame);
  }, [currentTeam, currentPage, alignTrack]);

  useEffect(() => {
    let animationFrameId;
    const tickTeamTrack = () => {
      const stiffness = 0.16;
      const damping = 0.74;
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

  useEffect(() => {
    const handleResize = () => alignTrack(true);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [alignTrack]);

  return (
    <div id="ts-nav-layer" className={currentPage === 1 ? 'nav-visible' : ''}>
      <div id="ts-nav-track" ref={trackRef}>
        {DEPTS.map((dept, idx) => (
          <div 
            key={idx} 
            className={`nav-team-card ${idx === currentTeam ? 'ntc-active' : ''}`}
            onClick={() => onGoToTeam(idx)}
          >
            <img src={`/images/team/series-card-${idx}.png`} alt={dept.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
