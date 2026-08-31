import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MapPin, Phone, Mail, Train, Plane, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { SlideTitle, ScrollReveal, TiltCard, Parallax } from "./ScrollAnimations";

const venueDesktopBg = new URL("../../../images/Venue_desktop_f.webp", import.meta.url).href;
const venueMobileBg = new URL("../../../images/Venue_mobile_f.webp", import.meta.url).href;

export default function VenueSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="venue" className="relative py-20 sm:py-28 overflow-hidden bg-[#EFE2C7] scroll-mt-28" ref={sectionRef}>
      {/* Rich Japanese Background Artwork — Responsive Desktop / Mobile */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-transparent z-0">
        <picture>
          <source media="(max-width: 767px)" srcSet={venueMobileBg} />
          <img
            src={venueDesktopBg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-top opacity-100 will-change-transform"
          />
        </picture>
        {/* Soft top fog blend to transition seamlessly from Sponsors */}
        <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[#EFE2C7] via-[#EFE2C7]/80 via-[#EFE2C7]/40 to-[#EFE2C7]/0 pointer-events-none" />
        
        {/* Soft bottom blend to transition smoothly into the parchment Footer */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#EFE2C7] via-[#EFE2C7]/80 via-[#EFE2C7]/40 to-[#EFE2C7]/0 pointer-events-none" />
      </div>

      <Parallax speed={-0.3} className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-0">
        <div className="w-full max-w-[500px] aspect-square bg-[#B8322C]/5 rounded-full blur-[150px]" />
      </Parallax>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <SlideTitle className="mb-12">
          <span className="font-accent text-xs tracking-[0.3em] uppercase text-[#B8322C] block mb-3 font-bold">
            Mission Location
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1D1B18] tracking-wide font-black drop-shadow-sm">
            VENUE
          </h2>
          <div className="w-24 h-[3px] bg-gradient-to-r from-[#B8322C] to-transparent mt-4 rounded-full" />
        </SlideTitle>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map with hardware-accelerated reveal */}
          <ScrollReveal direction="left" delay={0.1}>
            <div className="rounded-2xl overflow-hidden border border-[#B88A3D]/45 bg-[#F2ECE1]/60 backdrop-blur-md min-h-[300px] lg:min-h-[400px] shadow-[0_15px_45px_rgba(75,50,37,0.12)] p-2 sm:p-3 transform-gpu">
              <iframe
                title="University of Engineering and Management Kolkata Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.7176166946654!2d88.4868!3d22.5694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275326d0c5b31%3A0x62a5e4a838562d98!2sUniversity%20of%20Engineering%20%26%20Management%20(UEM)%2C%20Kolkata!5e0!3m2!1sen!2sin!4v1700000000000"
                className="w-full h-full min-h-[300px] lg:min-h-[380px] rounded-xl border border-[#B88A3D]/25"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </ScrollReveal>

          {/* Venue info with 3D tilt */}
          <ScrollReveal direction="right" delay={0.2}>
            <TiltCard intensity={6}>
              <div className="relative overflow-hidden group bg-[#F2ECE1]/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-[#B88A3D]/45 hover:border-[#B8322C] flex flex-col justify-center h-full shadow-[0_15px_45px_rgba(75,50,37,0.12)] hover:shadow-[0_20px_50px_rgba(184,50,44,0.18)] transition-all duration-300" style={{ transformStyle: "preserve-3d" }}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#B8322C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Traditional Red Hanko Stamp Accent */}
                <div className="absolute top-4 right-5 flex flex-col items-center justify-center size-8 rounded border border-[#B8322C] bg-[#B8322C]/10 text-[#B8322C] font-serif font-bold text-[10px] tracking-tighter select-none rotate-6 shadow-[0_0_8px_rgba(184,50,44,0.2)] pointer-events-none z-20">
                  <span className="leading-none">場</span>
                </div>

                <div className="relative z-10">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#1D1B18] mb-2" style={{ transform: "translateZ(20px)" }}>
                    Dept. of CSE(IOT,CS,BT), University of Engineering and Management, Kolkata
                  </h3>
                  <p className="text-[#5A5043] text-sm mb-6 font-medium" style={{ transform: "translateZ(10px)" }}>
                    A premier institution for engineering, technology, and management education in Kolkata.
                  </p>

                  <div className="space-y-4" style={{ transform: "translateZ(15px)" }}>
                    {[
                      { icon: MapPin, title: "Address", text: "Dept. of CSE(IOT,CS,BT), University of Engineering & Management (UEM),\nUniversity Area, Plot No. III - B/5, Action Area III,\nNew Town, Kolkata, West Bengal — 700160" },
                      { icon: Train, title: "Nearest Railway Station", text: "Bidhannagar Road / Sealdah Railway Station — 15 km" },
                      { icon: Plane, title: "Nearest Airport", text: "Netaji Subhash Chandra Bose International Airport (CCU) — 14 km" },
                      { icon: Phone, title: "Contact", text: "+91 33 2357 2059", href: "tel:+913323572059" },
                      { icon: Mail, title: "Email", text: "tech.kurukshetra.uem@gmail.com", href: "mailto:tech.kurukshetra.uem@gmail.com" },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={item.title}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.08 }}
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#B8322C]/10 border border-[#B8322C]/30 flex items-center justify-center flex-shrink-0 shadow-sm">
                            <Icon className="w-4 h-4 text-[#B8322C]" />
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wider font-bold text-[#1D1B18] font-accent">{item.title}</p>
                            {item.href ? (
                              <p className="text-sm font-medium text-[#38332C]">
                                <a href={item.href} className="hover:text-[#B8322C] transition-colors underline decoration-[#B8322C]/40 underline-offset-2">
                                  {item.text}
                                </a>
                              </p>
                            ) : (
                              <p className="text-sm text-[#38332C] whitespace-pre-line font-medium leading-relaxed">{item.text}</p>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <motion.div className="mt-7" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ transform: "translateZ(25px)" }}>
                    <Button
                      className="border border-[#B8322C] bg-[#B8322C] font-accent text-[11px] font-bold uppercase tracking-[0.2em] text-[#F7F1E5] shadow-[0_5px_18px_rgba(184,50,44,0.3)] hover:bg-[#962520] px-6 py-4 rounded-lg transition-all flex items-center gap-2 cursor-pointer"
                      onClick={() =>
                        window.open(
                          "https://maps.google.com/?q=University+of+Engineering+and+Management+Kolkata",
                          "_blank"
                        )
                      }
                    >
                      <ExternalLink className="w-4 h-4" />
                      Get Directions
                    </Button>
                  </motion.div>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
