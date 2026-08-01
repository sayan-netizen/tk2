import { useEffect } from 'react';
import MemberCard from '../Members/MemberCard';
import { FACULTY_COORDINATORS } from '../../../team-assets/data/departments';
import { X, GraduationCap } from 'lucide-react';

export default function FacultyModal({ isOpen, onClose, onBurst, setHoveredTorii }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="chambers-modal-overlay">
      <div className="chambers-modal-backdrop" onClick={onClose} />

      <div className="chambers-modal-container overflow-y-auto">
        {/* Top Header Controls */}
        <div className="chambers-modal-header sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-50">
          <div className="chambers-badge">
            <span className="chambers-badge-title">FACULTY GUIDANCE ROSTER</span>
            <span className="chambers-badge-sub">Faculty Coordinators</span>
          </div>

          <button 
            type="button" 
            className="chambers-modal-close-btn" 
            onClick={onClose}
            aria-label="Close Faculty Modal"
          >
            <X className="size-6" />
            <span>Close</span>
          </button>
        </div>

        <div className="flex flex-col items-center py-12 px-6 max-w-7xl mx-auto w-full">
          <div className="mb-8 text-center max-w-xl">
            <div className="inline-flex items-center gap-2 font-accent text-xs uppercase tracking-[0.25em] text-[#B8322C] mb-3">
              <GraduationCap className="size-4 text-[#B8322C]" />
              <span>Academic Wisdom</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white uppercase tracking-wide">
              FACULTY COORDINATORS
            </h2>
          </div>

          {/* Member Card Grid */}
          <div className="members-grid faculty-grid flex flex-wrap justify-center gap-8">
            {FACULTY_COORDINATORS.map((faculty, i) => (
              <MemberCard
                key={faculty.name}
                member={faculty}
                delay={i * 0.15}
                isCenter={false}
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
