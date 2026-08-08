import heroVideoWebm from "../../../images/herosection/hero-drive-background.webm";
import heroVideoMp4 from "../../../images/herosection/hero-drive-background.mp4";
import heroTitle from "../../../images/herosection/techKurukshetra.svg";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="sticky top-0 z-0 isolate h-[100dvh] min-h-[626px] w-full overflow-hidden bg-black text-[#f5f5f5] flex items-center justify-center px-4 sm:px-8 max-sm:items-start max-sm:pt-32"
    >
      {/* Video background — focused on ninja */}
      <video
        className="absolute inset-0 -z-30 h-full w-full object-cover object-center max-sm:object-[82%_88%] max-sm:scale-[1.18] transition-transform duration-300"
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
        <source src={heroVideoMp4} type="video/mp4" />
      </video>

      {/* Ambient background contrast overlay */}
      <div className="absolute inset-0 -z-20 bg-black/30 max-sm:bg-black/15" />

      <h1 className="sr-only">Tech Kurukshetra Shadow Protocol</h1>

      {/* Clean Main Section Title — lifted on mobile above ninja */}
      <div className="relative z-10 mx-auto w-full max-w-4xl flex items-center justify-center text-center max-sm:-translate-y-4">
        <img
          src={heroTitle}
          alt="Tech Kurukshetra Shadow Protocol. Ancient wisdom. Modern innovation. Limitless future."
          className="w-full max-w-[310px] sm:max-w-[520px] md:max-w-[660px] lg:max-w-[760px] object-contain drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)]"
        />
      </div>
    </section>
  );
}
