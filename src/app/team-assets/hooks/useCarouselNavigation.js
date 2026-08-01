import { useEffect, useRef } from 'react';

export function useCarouselNavigation({ 
  currentPage, 
  currentTeam, 
  totalDepts,
  onGoToPage, 
  onGoToTeam,
  pageAnimating,
  teamAnimating
}) {
  const wheelAccumRef = useRef(0);
  const wheelTimerRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (pageAnimating || teamAnimating) return;

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      wheelAccumRef.current += delta;

      clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = setTimeout(() => {
        wheelAccumRef.current = 0;
      }, 300);

      if (Math.abs(wheelAccumRef.current) < 55) return;

      const dir = wheelAccumRef.current > 0 ? 1 : -1;
      wheelAccumRef.current = 0;

      if (currentPage === 0) {
        if (dir > 0) onGoToPage(1);
      } else if (currentPage === 1) {
        const nextTeam = currentTeam + dir;
        if (nextTeam >= 0 && nextTeam < totalDepts) {
          onGoToTeam(nextTeam);
        } else if (nextTeam < 0) {
          onGoToPage(0);
        }
      }
    };

    const handleKeyDown = (e) => {
      if (pageAnimating || teamAnimating) return;

      if (currentPage === 0) {
        if (['ArrowDown', 'PageDown', 'ArrowRight'].includes(e.key)) {
          e.preventDefault(); onGoToPage(1);
        }
      } else if (currentPage === 1) {
        if (['ArrowRight', 'ArrowDown'].includes(e.key)) {
          e.preventDefault();
          if (currentTeam < totalDepts - 1) onGoToTeam(currentTeam + 1);
        } else if (['ArrowLeft', 'ArrowUp'].includes(e.key)) {
          e.preventDefault();
          if (currentTeam > 0) onGoToTeam(currentTeam - 1);
          else onGoToPage(0);
        } else if (e.key === 'Home') {
          e.preventDefault(); onGoToTeam(0);
        } else if (e.key === 'End') {
          e.preventDefault(); onGoToTeam(totalDepts - 1);
        }
      }
    };

    const handleTouchStart = (e) => {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    const handleTouchEnd = (e) => {
      if (pageAnimating || teamAnimating) return;
      
      const dx = touchStartRef.current.x - e.changedTouches[0].clientX;
      const dy = touchStartRef.current.y - e.changedTouches[0].clientY;

      if (currentPage === 0) {
        if (dx < -50) onGoToPage(1);
      } else if (currentPage === 1) {
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 45) {
          if (dx > 0) {
            if (currentTeam < totalDepts - 1) onGoToTeam(currentTeam + 1);
          } else {
            if (currentTeam > 0) onGoToTeam(currentTeam - 1);
            else onGoToPage(0);
          }
        } else if (dx > 50 && currentTeam === 0) {
          onGoToPage(0);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentPage, currentTeam, totalDepts, onGoToPage, onGoToTeam, pageAnimating, teamAnimating]);
}
