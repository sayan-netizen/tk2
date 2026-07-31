import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MapPin, Phone, Mail, Train, Plane, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { SlideTitle, ScrollReveal, TiltCard, Parallax } from "./ScrollAnimations";

export default function VenueSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const mapScale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const mapRotateY = useTransform(scrollYProgress, [0, 0.5], [5, 0]);

  return (
    <section id="venue" className="relative py-24 sm:py-32 overflow-hidden" ref={sectionRef}>
      <Parallax speed={-0.3} className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <div className="w-[600px] h-[600px] bg-[#d51e1e]/3 rounded-full blur-[200px]" />
      </Parallax>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <SlideTitle className="mb-12">
          <span className="font-accent text-xs tracking-[0.3em] uppercase text-[#d51e1e] block mb-3">
            Mission Location
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#F5F5F5] tracking-wide">
            VENUE
          </h2>
          <div className="w-20 h-0.5 bg-[#d51e1e] mt-4" />
        </SlideTitle>

        <div className="grid lg:grid-cols-2 gap-8" style={{ perspective: "1200px" }}>
          {/* Map with 3D scroll-linked rotation */}
          <ScrollReveal direction="left" delay={0.1}>
            <motion.div
              className="rounded-none overflow-hidden border border-[#b91919]/30 bg-black/40 min-h-[300px] lg:min-h-[400px] shadow-[0_0_15px_rgba(185,25,25,0.15)]"
              style={{
                scale: mapScale,
                rotateY: mapRotateY,
                transformStyle: "preserve-3d",
              }}
            >
              <iframe
                title="NIT Kurukshetra Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.789!2d76.8188!3d29.9468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e3f42f0a0a0a1%3A0x1234567890abcdef!2sNIT%20Kurukshetra!5e0!3m2!1sen!2sin!4v1234567890"
                className="w-full h-full min-h-[300px] lg:min-h-[400px] border-0 grayscale hover:grayscale-0 transition-all duration-700"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </motion.div>
          </ScrollReveal>

          {/* Venue info with 3D tilt */}
          <ScrollReveal direction="right" delay={0.2}>
            <TiltCard intensity={6}>
              <div className="relative overflow-hidden group bg-black/40 rounded-none p-8 border border-[#b91919]/30 hover:border-[#b91919] flex flex-col justify-center h-full shadow-[0_0_15px_rgba(185,25,25,0.15)] transition-all" style={{ transformStyle: "preserve-3d" }}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#d51e1e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <h3 className="font-heading text-2xl font-semibold text-[#F5F5F5] mb-2" style={{ transform: "translateZ(20px)" }}>
                  National Institute of Technology, Kurukshetra
                </h3>
                <p className="text-[#999] text-sm mb-8" style={{ transform: "translateZ(10px)" }}>
                  One of India's premier technical institutions, established in 1963.
                </p>

                <div className="space-y-5" style={{ transform: "translateZ(15px)" }}>
                  {[
                    { icon: MapPin, title: "Address", text: "NIT Kurukshetra, Thanesar, Kurukshetra,\nHaryana — 136119, India" },
                    { icon: Train, title: "Nearest Railway Station", text: "Kurukshetra Junction (KKDE) — 5 km" },
                    { icon: Plane, title: "Nearest Airport", text: "Chandigarh International Airport — 90 km" },
                    { icon: Phone, title: "Contact", text: "+91 1744-233208", href: "tel:+911744233208" },
                    { icon: Mail, title: "Email", text: "info@techkurukshetra.org", href: "mailto:info@techkurukshetra.org" },
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
                        <div className="w-9 h-9 rounded-none bg-black/40 border border-[#b91919]/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(185,25,25,0.2)]">
                          <Icon className="w-4 h-4 text-[#d51e1e]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#F5F5F5]">{item.title}</p>
                          {item.href ? (
                            <p className="text-sm text-[#999]">
                              <a href={item.href} className="hover:text-[#d51e1e] transition-colors">
                                {item.text}
                              </a>
                            </p>
                          ) : (
                            <p className="text-sm text-[#999] whitespace-pre-line">{item.text}</p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <motion.div className="mt-8" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ transform: "translateZ(25px)" }}>
                  <Button
                    className="border border-[#b91919] bg-black/5 font-accent text-[10px] uppercase tracking-[0.2em] text-[#f1eeee] shadow-[0_0_14px_rgba(185,25,25,0.24)] hover:bg-[#b91919]/10 px-6 py-4 rounded-none transition-all flex items-center gap-2"
                    onClick={() =>
                      window.open(
                        "https://maps.google.com/?q=NIT+Kurukshetra",
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
