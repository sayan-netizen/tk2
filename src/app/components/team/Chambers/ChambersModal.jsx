import { useState, useEffect } from 'react';
import DepartmentCarousel from '../DepartmentCarousel/DepartmentCarousel';
import SlideIndicators from '../Common/SlideIndicators';
import TeamNavLayer from '../DepartmentCarousel/TeamNavLayer';
import { DEPTS } from '../../../team-assets/data/departments';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ChambersModal({ isOpen, onClose, onBurst, setHoveredTorii }) {
  const [currentTeam, setCurrentTeam] = useState(0);

  useEffect(() => {
    let wheelAccum = 0;
    let wheelTimer;

    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    const handleWheel = (e) => {
      if (!isOpen) return;
      e.preventDefault();
      
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      wheelAccum += delta;

      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        wheelAccum = 0;
      }, 300);

      if (Math.abs(wheelAccum) < 55) return;
      const dir = wheelAccum > 0 ? 1 : -1;
      wheelAccum = 0;

      setCurrentTeam((prev) => {
        const nextTeam = prev + dir;
        if (nextTeam >= 0 && nextTeam < DEPTS.length) {
          return nextTeam;
        }
        return prev;
      });
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('wheel', handleWheel, { passive: false });
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    setCurrentTeam((prev) => (prev + 1) % DEPTS.length);
  };

  const handlePrev = () => {
    setCurrentTeam((prev) => (prev - 1 + DEPTS.length) % DEPTS.length);
  };

  return (
    <div className="chambers-modal-overlay">
      <div className="chambers-modal-backdrop" onClick={onClose} />
      
      <div className="chambers-modal-container">
        {/* Top Header Controls */}
        <div className="chambers-modal-header">
          <div className="chambers-badge">
            <span className="chambers-badge-title">DEPARTMENT CHAMBERS</span>
            <span className="chambers-badge-sub">Chamber {currentTeam + 1} of {DEPTS.length}</span>
          </div>

          <button 
            type="button" 
            className="chambers-modal-close-btn" 
            onClick={onClose}
            aria-label="Close Chambers"
          >
            <X className="size-6" />
            <span>Close Chambers</span>
          </button>
        </div>

        {/* Slide Indicators & Dept Nav */}
        <TeamNavLayer currentPage={1} currentTeam={currentTeam} onGoToTeam={setCurrentTeam} />
        
        <SlideIndicators
          currentPage={1}
          currentTeam={currentTeam}
          totalDepts={DEPTS.length}
          onGoToPage={() => {}}
          onGoToTeam={setCurrentTeam}
        />

        {/* Main Carousel Area */}
        <div className="chambers-carousel-viewport">
          <button 
            type="button" 
            className="chamber-nav-arrow arrow-left" 
            onClick={handlePrev}
            aria-label="Previous Chamber"
          >
            <ChevronLeft className="size-6" />
          </button>

          <DepartmentCarousel
            isActive={true}
            currentTeam={currentTeam}
            onGoToTeam={setCurrentTeam}
            onBurst={onBurst}
            setHoveredTorii={setHoveredTorii}
          />

          <button 
            type="button" 
            className="chamber-nav-arrow arrow-right" 
            onClick={handleNext}
            aria-label="Next Chamber"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
