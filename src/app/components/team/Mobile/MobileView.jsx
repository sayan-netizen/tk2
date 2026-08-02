import { useState } from 'react';
import ConvenerSection from '../Sections/ConvenerSection';
import FacultySection from '../Sections/FacultySection';
import LeadsSection from '../Sections/LeadsSection';
import CoordinatorsSection from '../Sections/CoordinatorsSection';
import VolunteersSection from '../Sections/VolunteersSection';
import ConvenerModal from '../Chambers/ConvenerModal';
import FacultyModal from '../Chambers/FacultyModal';
import ChambersModal from '../Chambers/ChambersModal';
import CoordinatorsModal from '../Chambers/CoordinatorsModal';
import VolunteersModal from '../Chambers/VolunteersModal';

export default function MobileView({ onBurst, setHoveredTorii }) {
  const [isConvenerOpen, setIsConvenerOpen] = useState(false);
  const [isFacultyOpen, setIsFacultyOpen] = useState(false);
  const [isChambersOpen, setIsChambersOpen] = useState(false);
  const [isRosterOpen, setIsRosterOpen] = useState(false);
  const [isVolunteersOpen, setIsVolunteersOpen] = useState(false);

  return (
    <div id="mobile-view" className="vertical-team-layout flex flex-col items-center gap-4 sm:gap-8 py-4 sm:py-6">
      {/* CIRCULAR BANNER 1: MEET THE CONVENER */}
      <ConvenerSection
        onOpenConvener={() => setIsConvenerOpen(true)}
        setHoveredTorii={setHoveredTorii}
      />

      {/* CIRCULAR BANNER 2: MEET THE FACULTY COORDINATORS */}
      <FacultySection
        onOpenFaculty={() => setIsFacultyOpen(true)}
        setHoveredTorii={setHoveredTorii}
      />

      {/* CIRCULAR BANNER 3: MEET THE LEADS */}
      <LeadsSection
        onOpenChambers={() => setIsChambersOpen(true)}
        setHoveredTorii={setHoveredTorii}
      />

      {/* CIRCULAR BANNER 4: MEET THE COORDINATORS */}
      <CoordinatorsSection
        onOpenCoordinators={() => setIsRosterOpen(true)}
        setHoveredTorii={setHoveredTorii}
      />

      {/* CIRCULAR BANNER 5: MEET THE VOLUNTEERS */}
      <VolunteersSection
        onOpenVolunteers={() => setIsVolunteersOpen(true)}
        setHoveredTorii={setHoveredTorii}
      />

      {/* CONVENER MODAL */}
      <ConvenerModal
        isOpen={isConvenerOpen}
        onClose={() => setIsConvenerOpen(false)}
        onBurst={onBurst}
        setHoveredTorii={setHoveredTorii}
      />

      {/* FACULTY MODAL */}
      <FacultyModal
        isOpen={isFacultyOpen}
        onClose={() => setIsFacultyOpen(false)}
        onBurst={onBurst}
        setHoveredTorii={setHoveredTorii}
      />

      {/* DEPARTMENT CHAMBERS MODAL */}
      <ChambersModal
        isOpen={isChambersOpen}
        onClose={() => setIsChambersOpen(false)}
        onBurst={onBurst}
        setHoveredTorii={setHoveredTorii}
      />

      {/* COORDINATORS MODAL */}
      <CoordinatorsModal
        isOpen={isRosterOpen}
        onClose={() => setIsRosterOpen(false)}
        onBurst={onBurst}
        setHoveredTorii={setHoveredTorii}
      />

      {/* VOLUNTEERS MODAL */}
      <VolunteersModal
        isOpen={isVolunteersOpen}
        onClose={() => setIsVolunteersOpen(false)}
        onBurst={onBurst}
        setHoveredTorii={setHoveredTorii}
      />
    </div>
  );
}
