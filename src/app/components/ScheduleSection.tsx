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
  ceremony: "bg-[#b91919]/10 text-[#b91919] border-[#b91919]/25",
  technical: "bg-blue-500/10 text-blue-600 border-blue-500/25",
  workshop: "bg-purple-500/10 text-purple-600 border-purple-500/25",
  cultural: "bg-amber-500/10 text-amber-600 border-amber-500/25",
  break: "bg-[#CDBF9E]/60 text-[#9A8060] border-[#CDBF9E]",
};

export default function ScheduleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3]);

  return (
    <section id="schedule" className="relative py-24 sm:py-32 overflow-hidden bg-[#EDE0C4]" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#EDE0C4] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SlideTitle className="mb-12">
          <span className="font-accent text-xs tracking-[0.3em] uppercase text-[#b91919] block mb-3">
            Plan Your Mission
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1A1208] tracking-wide">
            EVENT SCHEDULE
          </h2>
          <div className="w-20 h-0.5 bg-[#b91919] mt-4" />
        </SlideTitle>

        <ScrollReveal direction="up" delay={0.1}>
          <ScrollDepth rotate={6} y={70}>
            <Tabs defaultValue="day1" className="w-full">
              <TabsList className="bg-[#F5ECD8] border border-[#CDBF9E] rounded-xl p-1 mb-8 w-full sm:w-auto h-auto shadow-sm">
              {[
                { value: "day1", label: "DAY 1", date: "Sep 5" },
                { value: "day2", label: "DAY 2", date: "Sep 6" },
              ].map((day) => (
                <TabsTrigger
                  key={day.value}
                  value={day.value}
                  className="data-[state=active]:bg-[#b91919] data-[state=active]:text-white rounded-lg px-6 py-2.5 font-heading text-sm transition-all data-[state=inactive]:text-[#9A8060] data-[state=inactive]:hover:text-[#1A1208]"
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
                  <motion.div
                    className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-[#b91919] via-[#b91919]/40 to-[#CDBF9E]"
                    style={{ opacity: lineOpacity }}
                  />

                  <StaggerContainer className="space-y-1" staggerDelay={0.08}>
                    {entries.map((entry, i) => (
                      <StaggerItem key={i}>
                        <div className="relative flex gap-4 sm:gap-6 group">
                          <motion.div
                            className="absolute left-[-21px] sm:left-[-25px] top-6 w-3 h-3 rounded-full border-2 border-[#b91919] bg-[#F5ECD8] group-hover:bg-[#b91919] transition-colors z-10"
                            whileHover={{ scale: 1.5, boxShadow: "0 0 15px rgba(185,25,25,0.4)" }}
                          />

                          <motion.div
                            className="flex-1 bg-[#F5ECD8] rounded-xl p-4 sm:p-5 border border-[#CDBF9E] hover:border-[#b91919]/30 transition-all group-hover:bg-[#EDE0C4] mb-2 shadow-sm"
                            whileHover={{
                              y: -2,
                              boxShadow: "0 8px 25px rgba(185,25,25,0.08)",
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            style={{ transformStyle: "preserve-3d" }}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                              <div className="flex items-center gap-2 min-w-[80px]">
                                <Clock className="w-3.5 h-3.5 text-[#b91919]" />
                                <span className="font-accent text-sm font-semibold text-[#1A1208] tracking-wide">
                                  {entry.time}
                                </span>
                              </div>
                              <h4 className="font-heading font-semibold text-[#1A1208] text-base">
                                {entry.title}
                              </h4>
                              <div className="flex items-center gap-3 sm:ml-auto">
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-accent uppercase tracking-wider border ${
                                    typeColors[entry.type || "technical"]
                                  }`}
                                >
                                  {entry.type}
                                </span>
                                <div className="flex items-center gap-1 text-[#9A8060]">
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
