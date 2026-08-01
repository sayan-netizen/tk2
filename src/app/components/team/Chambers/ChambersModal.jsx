import { useState, useEffect, useRef } from 'react';
import DepartmentCarousel from '../DepartmentCarousel/DepartmentCarousel';
import SlideIndicators from '../Common/SlideIndicators';
import TeamNavLayer from '../DepartmentCarousel/TeamNavLayer';
import { DEPTS } from '../../../team-assets/data/departments';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import MobileDepartment from '../Mobile/MobileDepartment';

export default function ChambersModal({ isOpen, onClose, onBurst, setHoveredTorii }) {
  const [currentTeam, setCurrentTeam] = useState(0);
  const touchStartRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let wheelAccum = 0;
    let wheelTimer;
    let isCoolingDown = false;

    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    const handleWheel = (e) => {
      if (!isOpen) return;
      e.preventDefault();
      
      if (isCoolingDown) return;

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      wheelAccum += delta;

      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        wheelAccum = 0;
      }, 350);

      // Decreased horizontal scroll sensitivity: require delta threshold of 200 (up from 55)
      if (Math.abs(wheelAccum) < 200) return;
      const dir = wheelAccum > 0 ? 1 : -1;
      wheelAccum = 0;

      isCoolingDown = true;
      setTimeout(() => {
        isCoolingDown = false;
      }, 450);

      setCurrentTeam((prev) => {
        const nextTeam = prev + dir;
        if (nextTeam >= 0 && nextTeam < DEPTS.length) {
          return nextTeam;
        }
        return prev;
      });
    };

    const handleTouchStart = (e) => {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    const handleTouchEnd = (e) => {
      if (!isOpen || isCoolingDown) return;
      const dx = touchStartRef.current.x - e.changedTouches[0].clientX;
      const dy = touchStartRef.current.y - e.changedTouches[0].clientY;

      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 80) {
        isCoolingDown = true;
        setTimeout(() => {
          isCoolingDown = false;
        }, 450);

        if (dx > 0) {
          setCurrentTeam((prev) => (prev < DEPTS.length - 1 ? prev + 1 : prev));
        } else {
          setCurrentTeam((prev) => (prev > 0 ? prev - 1 : prev));
        }
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchend', handleTouchEnd, { passive: true });
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
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

        {/* DESKTOP VIEW (Carousel) */}
        <div className="hidden lg:block h-full w-full relative">
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

        {/* MOBILE VIEW (Vertical List) */}
        <div className="block lg:hidden h-full w-full overflow-y-auto overflow-x-hidden pt-24 pb-24 px-4 bg-[#0a0a0a]/90 backdrop-blur-md">
          <div className="mobile-departments-wrapper max-w-lg mx-auto">
            <div id="team-stage-label" className="mobile-stage-label text-center mb-8">
              <span className="ts-eyebrow text-[#B8322C] font-accent text-xs font-bold tracking-[0.2em] uppercase">影の道場 — Shadow Dojo</span>
              <h2 className="ts-title font-display text-4xl text-white mt-2 drop-shadow-lg">THE CHAMBERS</h2>
            </div>
            {DEPTS.map((dept, index) => (
              <MobileDepartment
                key={dept.name}
                dept={dept}
                index={index}
                onBurst={onBurst}
                setHoveredTorii={setHoveredTorii}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
