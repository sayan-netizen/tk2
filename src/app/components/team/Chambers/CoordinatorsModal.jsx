import { useEffect } from 'react';
import MemberCard from '../Members/MemberCard';
import { COORDINATORS } from '../../../team-assets/data/departments';
import { X, Users } from 'lucide-react';

export default function CoordinatorsModal({ isOpen, onClose, onBurst, setHoveredTorii }) {
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
            <span className="chambers-badge-title">STUDENT COORDINATORS ROSTER</span>
            <span className="chambers-badge-sub">Lead Student Coordinators</span>
          </div>

          <button 
            type="button" 
            className="chambers-modal-close-btn" 
            onClick={onClose}
            aria-label="Close"
          >
            <X className="size-6" />
            <span>Close</span>
          </button>
        </div>

        <div className="flex flex-col items-center py-10 px-6 max-w-7xl mx-auto w-full">
          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="mb-2 inline-flex items-center gap-2 font-accent text-xs uppercase tracking-[0.25em] text-[#B8322C]">
              <Users className="size-4" />
              <span>Execution Command</span>
            </div>
            <h3 className="font-display text-3xl sm:text-4xl text-[#F2ECE1] uppercase tracking-wide">
              COORDINATORS <span className="text-[#B8322C]">CHAMBER</span>
            </h3>
            <p className="text-sm text-[#F2ECE1]/70 max-w-md mx-auto mt-2 font-sans">
              The driving force orchestrating events, logistics, technical operations, and stage production across Tech Kurukshetra.
            </p>
          </div>

          {/* Members Cards Grid */}
          <div className="members-grid coordinators-grid">
            {COORDINATORS.map((member, i) => (
              <MemberCard
                key={member.name}
                member={member}
                delay={i * 0.1}
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
