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

export default function DesktopView({
  handleBurst,
  setHoveredTorii,
}) {
  const [isConvenerOpen, setIsConvenerOpen] = useState(false);
  const [isFacultyOpen, setIsFacultyOpen] = useState(false);
  const [isChambersOpen, setIsChambersOpen] = useState(false);
  const [isRosterOpen, setIsRosterOpen] = useState(false);
  const [isVolunteersOpen, setIsVolunteersOpen] = useState(false);

  return (
    <div className="vertical-team-layout flex flex-col items-center gap-10 lg:gap-16 py-8 px-4 w-full max-w-[1400px] mx-auto">
      {/* CIRCULAR BANNER 1: MEET THE CONVENER (Centered as it is) */}
      <div className="w-full flex justify-center">
        <ConvenerSection
          onOpenConvener={() => setIsConvenerOpen(true)}
          setHoveredTorii={setHoveredTorii}
        />
      </div>

      {/* ROW 2: FACULTY & LEADS (2 SIDE BY SIDE ON DESKTOP) */}
      <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-10 lg:gap-16 items-center justify-items-center">
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
      </div>

      {/* ROW 3: COORDINATORS & VOLUNTEERS (2 SIDE BY SIDE ON DESKTOP) */}
      <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-10 lg:gap-16 items-center justify-items-center">
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
      </div>

      {/* CONVENER MODAL */}
      <ConvenerModal
        isOpen={isConvenerOpen}
        onClose={() => setIsConvenerOpen(false)}
        onBurst={handleBurst}
        setHoveredTorii={setHoveredTorii}
      />

      {/* FACULTY MODAL */}
      <FacultyModal
        isOpen={isFacultyOpen}
        onClose={() => setIsFacultyOpen(false)}
        onBurst={handleBurst}
        setHoveredTorii={setHoveredTorii}
      />

      {/* DEPARTMENT CHAMBERS MODAL */}
      <ChambersModal
        isOpen={isChambersOpen}
        onClose={() => setIsChambersOpen(false)}
        onBurst={handleBurst}
        setHoveredTorii={setHoveredTorii}
      />

      {/* COORDINATORS MODAL */}
      <CoordinatorsModal
        isOpen={isRosterOpen}
        onClose={() => setIsRosterOpen(false)}
        onBurst={handleBurst}
        setHoveredTorii={setHoveredTorii}
      />

      {/* VOLUNTEERS MODAL */}
      <VolunteersModal
        isOpen={isVolunteersOpen}
        onClose={() => setIsVolunteersOpen(false)}
        onBurst={handleBurst}
        setHoveredTorii={setHoveredTorii}
      />
    </div>
  );
}
