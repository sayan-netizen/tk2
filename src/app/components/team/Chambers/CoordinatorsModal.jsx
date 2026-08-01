import { useState, useEffect } from 'react';
import MemberCard from '../Members/MemberCard';
import { COORDINATORS_VOLUNTEERS, FACULTY_COORDINATORS } from '../../../team-assets/data/departments';
import { X, Users, Filter, GraduationCap } from 'lucide-react';

export default function CoordinatorsModal({ isOpen, onClose, onBurst, setHoveredTorii }) {
  const [filter, setFilter] = useState('ALL');

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

  const allMembers = [
    ...FACULTY_COORDINATORS.map(f => ({ ...f, category: 'Faculty' })),
    ...COORDINATORS_VOLUNTEERS
  ];

  const filteredMembers = filter === 'ALL'
    ? allMembers
    : allMembers.filter(m => m.category.toUpperCase() === filter);

  return (
    <div className="chambers-modal-overlay">
      <div className="chambers-modal-backdrop" onClick={onClose} />

      <div className="chambers-modal-container overflow-y-auto">
        {/* Top Header Controls */}
        <div className="chambers-modal-header sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-50">
          <div className="chambers-badge">
            <span className="chambers-badge-title">EXECUTION FORCE ROSTER</span>
            <span className="chambers-badge-sub">Faculty, Coordinators & Volunteers</span>
          </div>

          <button 
            type="button" 
            className="chambers-modal-close-btn" 
            onClick={onClose}
            aria-label="Close Roster"
          >
            <X className="size-6" />
            <span>Close Roster</span>
          </button>
        </div>

        <div className="flex flex-col items-center py-10 px-6 max-w-7xl mx-auto w-full">
          {/* Category Filter Bar */}
          <div className="filter-button-bar mb-10">
            <button
              type="button"
              className={`filter-btn ${filter === 'ALL' ? 'active' : ''}`}
              onClick={() => setFilter('ALL')}
            >
              <Users className="size-4" />
              <span>All Force ({allMembers.length})</span>
            </button>
            <button
              type="button"
              className={`filter-btn ${filter === 'FACULTY' ? 'active' : ''}`}
              onClick={() => setFilter('FACULTY')}
            >
              <GraduationCap className="size-4" />
              <span>Faculty</span>
            </button>
            <button
              type="button"
              className={`filter-btn ${filter === 'COORDINATOR' ? 'active' : ''}`}
              onClick={() => setFilter('COORDINATOR')}
            >
              <Filter className="size-4" />
              <span>Coordinators</span>
            </button>
            <button
              type="button"
              className={`filter-btn ${filter === 'VOLUNTEER' ? 'active' : ''}`}
              onClick={() => setFilter('VOLUNTEER')}
            >
              <Filter className="size-4" />
              <span>Volunteers</span>
            </button>
          </div>

          {/* Members Cards Grid */}
          <div className="members-grid coordinators-grid">
            {filteredMembers.map((member, i) => (
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
