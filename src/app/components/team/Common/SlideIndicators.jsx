export default function SlideIndicators({ currentPage, currentTeam, totalDepts, onGoToPage, onGoToTeam }) {
  // Dots mapping:
  // dot 0: Hero
  // dots 1 to totalDepts: Team Stage

  const dots = [];
  
  // Hero dot
  dots.push(
    <button 
      key="hero"
      className={`slide-dot w-[6px] h-[6px] p-0 rounded-full bg-[rgba(248,243,230,0.4)] border border-[rgba(248,243,230,0.5)] cursor-pointer transition-all duration-300 ease-out opacity-55 ${currentPage === 0 ? 'active !w-[26px] !rounded-[3px] !bg-blood-bright !border-blood-bright !opacity-100 shadow-[0_0_12px_rgba(213,69,54,0.65)]' : ''}`}
      onClick={() => onGoToPage(0)}
      aria-label="Hero"
    ></button>
  );

  // Team dots
  for (let i = 0; i < totalDepts; i++) {
    dots.push(
      <button 
        key={`team-${i}`}
        className={`slide-dot w-[6px] h-[6px] p-0 rounded-full bg-[rgba(248,243,230,0.4)] border border-[rgba(248,243,230,0.5)] cursor-pointer transition-all duration-300 ease-out opacity-55 ${currentPage === 1 && currentTeam === i ? 'active !w-[26px] !rounded-[3px] !bg-blood-bright !border-blood-bright !opacity-100 shadow-[0_0_12px_rgba(213,69,54,0.65)]' : ''}`}
        onClick={() => onGoToTeam(i)}
        aria-label={`Team ${i + 1}`}
      ></button>
    );
  }

  return (
    <nav id="slide-indicators" className="fixed bottom-[2.2rem] left-1/2 -translate-x-1/2 flex flex-row gap-[0.6rem] z-[9993] pointer-events-auto items-center" aria-label="Slide navigation">
      {dots}
    </nav>
  );
}
