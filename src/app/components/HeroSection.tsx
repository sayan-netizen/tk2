import { ArrowRight, Calendar, MapPin } from "lucide-react";

const heroVideo = new URL(
  "../../../images/herosection/hero-drive-background.mp4",
  import.meta.url
).href;
const heroLogo = new URL("../../../images/herosection/logo.svg", import.meta.url).href;
const heroTitle = new URL(
  "../../../images/herosection/techKurukshetra.svg",
  import.meta.url
).href;
const lowerRightDesign = new URL(
  "../../../images/herosection/lower_right_design.svg",
  import.meta.url
).href;
const scrollToExplore = new URL(
  "../../../images/herosection/scroll_to_explore.svg",
  import.meta.url
).href;

function BeginJourneyButton() {
  return (
    <button
      onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
      className="group flex h-[34px] w-[184px] items-center justify-center gap-[18px] border border-[#b91919] bg-black/5 font-accent text-[10px] font-bold uppercase tracking-[0.2em] text-[#f1eeee] shadow-[0_0_14px_rgba(185,25,25,0.24)] transition-colors hover:bg-[#b91919]/10"
    >
      <span>Begin The Journey</span>
      <ArrowRight className="size-3 text-[#d51e1e] transition-transform group-hover:translate-x-1" />
    </button>
  );
}

function DateAndVenue() {
  return (
    <div className="flex flex-col gap-[14px]">
      <div className="flex items-center gap-[15px] text-[#eeeeee]">
        <Calendar className="size-[15px] text-[#d51e1e]" strokeWidth={2.2} />
        <span className="font-accent text-[10px] font-bold uppercase tracking-[0.2em]">
          5th - 6th September 2025
        </span>
      </div>
      <div className="flex items-start gap-[15px] text-[#eeeeee]">
        <MapPin className="mt-[2px] size-[15px] text-[#d51e1e]" strokeWidth={2.2} />
        <span className="max-w-[235px] font-accent text-[10px] font-bold uppercase leading-[1.55] tracking-[0.18em]">
          University of Engineering
          <br />&amp; Management, Kolkata
        </span>
      </div>
    </div>
  );
}

function FollowUs() {
  return (
    <div className="flex items-center gap-[18px]">
      <span className="font-accent text-[10px] font-bold uppercase tracking-[0.2em] text-[#555555]">
        Follow Us
      </span>
      <div className="flex items-center gap-[14px]">
        <a href="#" className="text-[#555555] hover:text-[#d51e1e] transition-colors" aria-label="Instagram">
          <svg className="size-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
        <a href="#" className="text-[#555555] hover:text-[#d51e1e] transition-colors" aria-label="LinkedIn">
          <svg className="size-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        </a>
        <a href="#" className="text-[#555555] hover:text-[#d51e1e] transition-colors" aria-label="Discord">
          <svg className="size-[15px]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>
        </a>
        <a href="#" className="text-[#555555] hover:text-[#d51e1e] transition-colors" aria-label="X">
          <svg className="size-[13px]" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
        </a>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative isolate h-screen min-h-[626px] w-full overflow-hidden bg-black text-[#f5f5f5]"
    >
      <video
        className="absolute inset-0 -z-30 h-full w-full object-cover"
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 -z-20 bg-black/10" />

      <h1 className="sr-only">Tech Kurukshetra Shadow Protocol</h1>

      <div className="relative z-10 mx-auto hidden h-full w-[960px] max-w-full md:block">
        {/* -> Change 'left-[...]' and 'top-[...]' below to move the main title, and 'w-[...]' to resize it */}
        <img
          src={heroTitle}
          alt="Tech Kurukshetra Shadow Protocol. Ancient wisdom. Modern innovation. Limitless future."
          className="absolute left-[193px] top-[160px] w-[573px] object-contain"
        />

        {/* -> Change 'left-[...]' and 'top-[...]' below to move the entire Button/Date/Follow block */}
        <div className="absolute left-[200px] top-[290px] flex flex-col gap-[24px]">
          <BeginJourneyButton />
          <DateAndVenue />
          <FollowUs />
        </div>

        {/* -> Change 'left-[...]' and 'top-[...]' below to move this text image, and 'w-[...]' to resize it */}
        <img
          src={lowerRightDesign}
          alt="The future is not written. It is coded."
          className="absolute left-[582px] top-[543px] w-[240px] object-contain"
        />

        {/* -> Change 'right-[...]' and 'top-[...]' below to move the scroll icon, and 'w-[...]' to resize it */}
        <img
          src={scrollToExplore}
          alt="Scroll to explore"
          className="absolute right-[36px] top-[428px] w-[57px] object-contain"
        />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 pt-24 text-center md:hidden">
        <img src={heroLogo} alt="Tech Kurukshetra" className="mb-7 w-36 object-contain" />
        <img
          src={heroTitle}
          alt="Tech Kurukshetra Shadow Protocol. Ancient wisdom. Modern innovation. Limitless future."
          className="w-full max-w-[540px] object-contain"
        />
        <div className="mt-8 flex flex-col items-center gap-[28px]">
          <BeginJourneyButton />
          <DateAndVenue />
          <FollowUs />
        </div>
      </div>
    </section>
  );
}
