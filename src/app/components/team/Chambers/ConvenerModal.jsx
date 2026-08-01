import { useEffect } from 'react';
import MemberCard from '../Members/MemberCard';
import { CONVENERS } from '../../../team-assets/data/departments';
import { X, Crown } from 'lucide-react';

export default function ConvenerModal({ isOpen, onClose, onBurst, setHoveredTorii }) {
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
            <span className="chambers-badge-title">LEADERSHIP & VISION</span>
            <span className="chambers-badge-sub">Meet the Convener</span>
          </div>

          <button 
            type="button" 
            className="chambers-modal-close-btn" 
            onClick={onClose}
            aria-label="Close Convener Modal"
          >
            <X className="size-6" />
            <span>Close</span>
          </button>
        </div>

        <div className="flex flex-col items-center py-12 px-6 max-w-7xl mx-auto w-full">
          <div className="mb-8 text-center max-w-xl">
            <div className="inline-flex items-center gap-2 font-accent text-xs uppercase tracking-[0.25em] text-[#B8322C] mb-3">
              <Crown className="size-4 text-[#B8322C]" />
              <span>Conveying Excellence</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white uppercase tracking-wide">
              FEST CONVENER
            </h2>
          </div>

          {/* Member Card Grid */}
          <div className="members-grid convener-grid flex justify-center">
            {CONVENERS.map((convener, i) => (
              <MemberCard
                key={convener.name}
                member={convener}
                delay={i * 0.15}
                isCenter={true}
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
