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
      }, 250);

      // Increased horizontal scroll sensitivity
      if (Math.abs(wheelAccum) < 30) return;
      const dir = wheelAccum > 0 ? 1 : -1;
      wheelAccum = 0;

      isCoolingDown = true;
      setTimeout(() => {
        isCoolingDown = false;
      }, 150);

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

      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        isCoolingDown = true;
        setTimeout(() => {
          isCoolingDown = false;
        }, 280);

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
      
      <div className="chambers-modal-container relative overflow-hidden flex flex-col h-screen">
        {/* Top Header Controls - Solid backdrop, clean without dots */}
        <div className="chambers-modal-header sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10 z-50">
          <div className="chambers-badge">
            <div className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-[#B8322C] shadow-[0_0_8px_#B8322C]" />
              <span className="chambers-badge-title font-accent tracking-[0.22em] text-[#B8322C] font-bold">DOMAIN LEADS & ARCHITECTS</span>
            </div>
            <span className="chambers-badge-sub font-mono text-[11px] text-[#F8F3E6]/70 tracking-wider">
              Pillar {currentTeam + 1} of {DEPTS.length} • {DEPTS[currentTeam]?.name}
            </span>
          </div>

          <button 
            type="button" 
            className="chambers-modal-close-btn" 
            onClick={onClose}
            aria-label="Close Leads Modal"
          >
            <X className="size-5" />
            <span>Close</span>
          </button>
        </div>

        {/* LEADS PAGE BODY CONTAINER (With Dot Matrix Background) */}
        <div className="relative flex-1 w-full overflow-hidden">
          {/* STATIC DOT MATRIX PATTERN (Leads Page Background, Not In Header) */}
          <div className="mobile-modal-dot-matrix-bg pointer-events-none absolute inset-0 z-0">
            <div className="mobile-dot-matrix-grid" />
            <svg className="mobile-dot-matrix-svg" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="leads-dot-matrix-pat" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="8" cy="8" r="1.5" fill="#B8322C" opacity="0.32" />
                  <circle cx="8" cy="8" r="0.75" fill="#B88A3D" opacity="0.45" />
                </pattern>
                <linearGradient id="leads-dot-matrix-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#B8322C" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#B88A3D" stopOpacity="0.06" />
                  <stop offset="100%" stopColor="#1D1B18" stopOpacity="0.12" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#leads-dot-matrix-glow)" />
              <rect width="100%" height="100%" fill="url(#leads-dot-matrix-pat)" />
            </svg>
          </div>

          {/* DESKTOP VIEW (Carousel) */}
          <div className="hidden lg:block h-full w-full relative z-10">
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
                aria-label="Previous Lead"
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
                aria-label="Next Lead"
              >
                <ChevronRight className="size-6" />
              </button>
            </div>
          </div>

          {/* MOBILE VIEW (Vertical List) */}
          <div className="block lg:hidden h-full w-full overflow-y-auto overflow-x-hidden pt-8 pb-28 px-4 mobile-leads-scroll-container relative z-10">
            <div className="mobile-departments-wrapper max-w-lg mx-auto relative z-10">
              <div id="team-stage-label" className="mobile-stage-label text-center mb-8">
                <div className="inline-flex items-center gap-1.5 font-accent text-[11px] uppercase tracking-[0.28em] text-[#B8322C] font-bold bg-[#B8322C]/10 border border-[#B8322C]/30 px-3.5 py-1 rounded-full shadow-sm mb-3">
                  <span>主導 • Strategic Pillars</span>
                </div>
                <h2 className="ts-title font-display text-4xl sm:text-5xl text-[#1D1B18] drop-shadow-sm uppercase tracking-wider">
                  DOMAIN <span className="text-[#B8322C]">LEADS</span>
                </h2>
                <p className="text-xs sm:text-sm text-[#1D1B18]/75 font-sans mt-2 max-w-sm mx-auto leading-relaxed">
                  The visionary commanders and lead architects driving execution, technology, and design at Tech Kurukshetra 2026.
                </p>
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
    </div>
  );
}
