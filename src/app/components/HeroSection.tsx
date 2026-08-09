import heroVideoWebm from "../../../images/herosection/hero-drive-background (1) (1).webm";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="sticky top-0 z-0 isolate h-[100dvh] min-h-[626px] w-full overflow-hidden bg-black text-[#f5f5f5] flex items-center justify-center px-4 sm:px-8 max-sm:items-start max-sm:pt-32"
    >
      {/* Video background — focused on ninja with enhanced brightness */}
      <video
        className="absolute inset-0 -z-30 h-full w-full object-cover object-center max-sm:object-[80%_center] max-sm:scale-100 transition-transform duration-300 brightness-115 contrast-105"
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={heroVideoWebm} type="video/webm" />
      </video>

      {/* Subtle ambient overlay */}
      <div className="absolute inset-0 -z-20 bg-black/10 max-sm:bg-transparent pointer-events-none" />

      <h1 className="sr-only">Tech Kurukshetra Shadow Protocol</h1>
    </section>
  );
}
