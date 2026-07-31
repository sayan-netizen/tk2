import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Clock, MapPin } from "lucide-react";
import { SlideTitle, ScrollReveal, StaggerContainer, StaggerItem, ScrollDepth } from "./ScrollAnimations";

interface ScheduleEntry {
  time: string;
  title: string;
  venue: string;
  type?: "ceremony" | "technical" | "workshop" | "cultural" | "break";
}

const schedule: Record<string, ScheduleEntry[]> = {
  day1: [
    { time: "09:00", title: "Inauguration Ceremony", venue: "Main Auditorium", type: "ceremony" },
    { time: "10:00", title: "Technical Events Begin", venue: "Multiple Venues", type: "technical" },
    { time: "11:30", title: "Hackathon Kickoff — Shadow Sprint", venue: "LHC Block", type: "technical" },
    { time: "12:30", title: "Lunch Break", venue: "Central Mess", type: "break" },
    { time: "14:00", title: "Workshop: AI & Machine Learning", venue: "CSE Department", type: "workshop" },
    { time: "15:30", title: "Code Wars — Round 1", venue: "Computer Lab", type: "technical" },
    { time: "17:00", title: "Gaming Arena Opens", venue: "Sports Complex", type: "cultural" },
    { time: "19:00", title: "Day 1 Closing & Networking", venue: "Open Air Theatre", type: "ceremony" },
  ],
  day2: [
    { time: "09:00", title: "Day 2 Briefing", venue: "Main Auditorium", type: "ceremony" },
    { time: "09:30", title: "Robo Arena — Qualifiers", venue: "Mechanical Block", type: "technical" },
    { time: "10:00", title: "Hackathon Continues", venue: "LHC Block", type: "technical" },
    { time: "11:00", title: "Workshop: Cybersecurity", venue: "CSE Department", type: "workshop" },
    { time: "12:30", title: "Lunch Break", venue: "Central Mess", type: "break" },
    { time: "14:00", title: "Code Wars — Finals", venue: "Computer Lab", type: "technical" },
    { time: "16:00", title: "Design Sprint Challenge", venue: "Architecture Block", type: "technical" },
    { time: "18:00", title: "Cultural Night — DJ & Performances", venue: "Open Air Theatre", type: "cultural" },
  ],
};

const typeColors: Record<string, string> = {
  ceremony: "bg-[#b91919]/10 text-[#d51e1e] border-[#b91919]/30",
  technical: "bg-[#050505] text-[#999] border-[#b91919]/20",
  workshop: "bg-[#b91919]/20 text-[#F5F5F5] border-[#b91919]/50",
  cultural: "bg-[#0A0A0A] text-[#999] border-[#b91919]/10",
  break: "bg-[#050505] text-[#666] border-[#0A0A0A]",
};

export default function ScheduleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Parallax timeline line glow
  const lineOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3]);

  return (
    <section id="schedule" className="relative py-24 sm:py-32 overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <SlideTitle className="mb-12">
          <span className="font-accent text-xs tracking-[0.3em] uppercase text-[#d51e1e] block mb-3">
            Plan Your Mission
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#F5F5F5] tracking-wide">
            EVENT SCHEDULE
          </h2>
          <div className="w-20 h-0.5 bg-[#d51e1e] mt-4" />
        </SlideTitle>

        <ScrollReveal direction="up" delay={0.1}>
          <ScrollDepth rotate={6} y={70}>
            <Tabs defaultValue="day1" className="w-full">
              <TabsList className="bg-black/40 border border-[#b91919]/30 rounded-none p-1 mb-8 w-full sm:w-auto h-auto">
              {[
                { value: "day1", label: "DAY 1", date: "Sep 5" },
                { value: "day2", label: "DAY 2", date: "Sep 6" },
              ].map((day) => (
                <TabsTrigger
                  key={day.value}
                  value={day.value}
                  className="data-[state=active]:bg-[#b91919]/20 data-[state=active]:border data-[state=active]:border-[#b91919] data-[state=active]:text-[#f5f5f5] data-[state=active]:shadow-[0_0_10px_rgba(185,25,25,0.3)] rounded-none px-6 py-2.5 font-accent tracking-[0.1em] text-sm transition-all data-[state=inactive]:text-[#999] data-[state=inactive]:hover:text-[#F5F5F5] border border-transparent"
                >
                  <div className="flex flex-col items-center">
                    <span className="font-semibold">{day.label}</span>
                    <span className="text-[10px] opacity-70">{day.date}</span>
                  </div>
                </TabsTrigger>
              ))}
              </TabsList>

              {Object.entries(schedule).map(([day, entries]) => (
                <TabsContent key={day} value={day}>
                <div className="relative pl-6 sm:pl-8">
                  {/* Timeline line with scroll-linked opacity */}
                  <motion.div
                    className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-[#b91919] via-[#b91919]/50 to-transparent"
                    style={{ opacity: lineOpacity }}
                  />

                  <StaggerContainer className="space-y-1" staggerDelay={0.08}>
                    {entries.map((entry, i) => (
                      <StaggerItem key={i}>
                        <div className="relative flex gap-4 sm:gap-6 group">
                          {/* Timeline dot with pulse on hover */}
                          <motion.div
                            className="absolute left-[-21px] sm:left-[-25px] top-6 w-3 h-3 rounded-none border border-[#b91919] bg-[#0A0A0A] group-hover:bg-[#b91919]/50 transition-colors z-10"
                            whileHover={{ scale: 1.5, boxShadow: "0 0 15px rgba(196,30,58,0.5)" }}
                          />

                          {/* Entry card with 3D hover */}
                          <motion.div
                            className="flex-1 relative bg-black/40 rounded-none border border-[#b91919]/30 hover:border-[#b91919] transition-all group-hover:bg-black/60 group-hover:shadow-[0_0_15px_rgba(185,25,25,0.15)] mb-2 overflow-hidden group"
                            whileHover={{
                              y: -2,
                              boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            style={{ transformStyle: "preserve-3d" }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#d51e1e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4" style={{ transform: "translateZ(15px)" }}>
                              <div className="flex items-center gap-2 min-w-[80px]">
                                <Clock className="w-3.5 h-3.5 text-[#d51e1e]" />
                                <span className="font-accent text-sm font-semibold text-[#F5F5F5] tracking-wide">
                                  {entry.time}
                                </span>
                              </div>
                              <h4 className="font-heading font-semibold text-[#F5F5F5] text-base">
                                {entry.title}
                              </h4>
                              <div className="flex items-center gap-3 sm:ml-auto">
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded-none text-[10px] font-accent uppercase tracking-wider border ${
                                    typeColors[entry.type || "technical"]
                                  }`}
                                >
                                  {entry.type}
                                </span>
                                <div className="flex items-center gap-1 text-[#666]">
                                  <MapPin className="w-3 h-3" />
                                  <span className="font-accent text-xs">
                                    {entry.venue}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
                </TabsContent>
              ))}
            </Tabs>
          </ScrollDepth>
        </ScrollReveal>
      </div>
    </section>
  );
}
