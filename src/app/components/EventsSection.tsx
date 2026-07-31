import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Code2,
  Gamepad2,
  Palette,
  Wrench,
  Users,
  Calendar,
  Trophy,
  X,
  Cpu,
  Music,
  Lightbulb,
  Bot,
} from "lucide-react";
import { SlideTitle, TiltCard, ScrollDepth } from "./ScrollAnimations";

interface Event {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  category: "technical" | "gaming" | "cultural" | "workshop";
  teamSize: string;
  date: string;
  prize: string;
  rules: string[];
  icon: React.ElementType;
}

const events: Event[] = [
  {
    id: "hackathon",
    name: "Shadow Sprint",
    description: "36-hour hackathon to build innovative solutions",
    fullDescription:
      "A 36-hour hackathon where teams of 2–4 build innovative tech solutions. Multiple tracks including AI/ML, Web3, IoT, and Social Impact. Mentors from top companies. Best hack wins the Shadow Sprint Trophy.",
    category: "technical",
    teamSize: "2–4",
    date: "Mar 14–15",
    prize: "₹1,00,000",
    rules: [
      "Teams of 2–4 members",
      "Bring your own laptop",
      "No pre-built projects",
      "Judging based on innovation, execution, and impact",
    ],
    icon: Code2,
  },
  {
    id: "codewars",
    name: "Code Wars",
    description: "Competitive programming showdown",
    fullDescription:
      "A multi-round competitive programming contest on platforms like Codeforces/HackerRank. Test your algorithmic thinking and speed against the best coders nationwide.",
    category: "technical",
    teamSize: "Solo",
    date: "Mar 14–15",
    prize: "₹50,000",
    rules: [
      "Individual participation",
      "3 rounds of increasing difficulty",
      "Standard CP contest rules apply",
      "No external code allowed",
    ],
    icon: Cpu,
  },
  {
    id: "roboarena",
    name: "Robo Arena",
    description: "Build and battle autonomous robots",
    fullDescription:
      "Design, build, and battle your robots in the ultimate arena. Categories include line followers, maze solvers, and battle bots. Separate tracks for beginners and advanced builders.",
    category: "technical",
    teamSize: "2–3",
    date: "Mar 15–16",
    prize: "₹75,000",
    rules: [
      "Teams of 2–3",
      "Weight limit: 5kg for battle bots",
      "No weapons causing permanent damage",
      "Bots must be autonomous for certain tracks",
    ],
    icon: Bot,
  },
  {
    id: "designsprint",
    name: "Design Sprint",
    description: "UI/UX design challenge with real-world briefs",
    fullDescription:
      "A time-boxed design challenge where participants create UI/UX solutions for real-world problems. From wireframes to high-fidelity prototypes, showcase your design thinking.",
    category: "technical",
    teamSize: "1–2",
    date: "Mar 15",
    prize: "₹30,000",
    rules: [
      "Solo or duo participation",
      "Use any design tool (Figma recommended)",
      "6-hour time limit",
      "Present and defend your design to judges",
    ],
    icon: Palette,
  },
  {
    id: "ctf",
    name: "Capture The Flag",
    description: "Cybersecurity challenges across multiple domains",
    fullDescription:
      "A cybersecurity CTF challenge spanning web exploitation, reverse engineering, cryptography, forensics, and OSINT. Solve challenges, capture flags, claim the leaderboard.",
    category: "technical",
    teamSize: "1–3",
    date: "Mar 14–16",
    prize: "₹40,000",
    rules: [
      "Teams of 1–3",
      "No attacking other teams' infrastructure",
      "All tools allowed unless specified",
      "Flag format: TK{...}",
    ],
    icon: Lightbulb,
  },
  {
    id: "gaming",
    name: "Shadow Games",
    description: "Valorant, BGMI, and FIFA tournaments",
    fullDescription:
      "Compete in multi-title esports tournaments featuring Valorant (5v5), BGMI (Squad), and FIFA (1v1). LAN and online rounds. Massive prize pool and streaming on the main stage.",
    category: "gaming",
    teamSize: "1–5",
    date: "Mar 14–16",
    prize: "₹60,000",
    rules: [
      "Game-specific team sizes",
      "Bring your own peripherals for LAN",
      "Standard tournament rules per game",
      "Anti-cheat is mandatory",
    ],
    icon: Gamepad2,
  },
  {
    id: "aiworkshop",
    name: "AI/ML Workshop",
    description: "Hands-on workshop on building with LLMs",
    fullDescription:
      "A hands-on workshop covering the latest in AI/ML — from fine-tuning large language models to building production AI applications. Led by industry professionals from top tech companies.",
    category: "workshop",
    teamSize: "Individual",
    date: "Mar 14",
    prize: "Certificate",
    rules: [
      "Bring your own laptop",
      "Basic Python knowledge required",
      "Google Colab will be used",
      "Limited to 100 seats",
    ],
    icon: Wrench,
  },
  {
    id: "culturalnight",
    name: "Cultural Night",
    description: "Live performances, DJ night, and star-night",
    fullDescription:
      "The grand cultural extravaganza featuring live band performances, dance competitions, stand-up comedy, and the legendary star night. A celebration of art, rhythm, and community.",
    category: "cultural",
    teamSize: "Open",
    date: "Mar 15",
    prize: "Experience",
    rules: [
      "Open to all registered participants",
      "Performance slots available for registration",
      "College ID required for entry",
      "No outside food or beverages",
    ],
    icon: Music,
  },
];

const categories = [
  { value: "all", label: "All" },
  { value: "technical", label: "Technical" },
  { value: "gaming", label: "Gaming" },
  { value: "cultural", label: "Cultural" },
  { value: "workshop", label: "Workshops" },
];

const categoryColors: Record<string, string> = {
  technical: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  gaming: "bg-green-500/10 text-green-600 border-green-500/20",
  cultural: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  workshop: "bg-purple-500/10 text-purple-600 border-purple-500/20",
};

export default function EventsSection() {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "0px 0px -100px 0px" });

  const filtered = filter === "all" ? events : events.filter((e) => e.category === filter);

  return (
    <section id="events" className="relative py-24 sm:py-32 overflow-hidden bg-[#F5ECD8]" ref={sectionRef}>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#b91919]/4 rounded-full blur-[200px] -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <SlideTitle>
            <span className="font-accent text-xs tracking-[0.3em] uppercase text-[#b91919] block mb-3">
              Choose Your Arena
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1A1208] tracking-wide">
              EVENTS
            </h2>
            <div className="w-20 h-0.5 bg-[#b91919] mt-4" />
          </SlideTitle>

          {/* Filter pills */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-1.5 rounded-full text-sm font-accent tracking-wide transition-all cursor-pointer ${
                  filter === cat.value
                    ? "bg-[#b91919] text-white"
                    : "bg-[#EDE0C4] text-[#7A6545] hover:text-[#1A1208] border border-[#CDBF9E] hover:border-[#b91919]/40"
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Event grid */}
        <ScrollDepth rotate={6} y={75}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: "1200px" }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((event, i) => {
              const Icon = event.icon;
              const isExpanded = expanded === event.id;

              return (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: 40, rotateX: -5 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateX: 5 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`${isExpanded ? "sm:col-span-2 lg:col-span-3" : ""}`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <TiltCard intensity={isExpanded ? 3 : 8}>
                    <div className="bg-[#EDE0C4] rounded-2xl border border-[#CDBF9E] overflow-hidden hover:border-[#b91919]/30 transition-all group h-full shadow-sm">
                      <div className="p-6">
                        {/* Category badge + icon */}
                        <div className="flex items-center justify-between mb-4">
                          <Badge
                            className={`${
                              categoryColors[event.category]
                            } border font-accent text-[10px] tracking-wider uppercase`}
                          >
                            {event.category}
                          </Badge>
                          <motion.div
                            className="w-10 h-10 rounded-lg bg-[#F5ECD8] flex items-center justify-center group-hover:bg-[#b91919]/10 transition-colors"
                            whileHover={{ rotate: 15, scale: 1.1 }}
                          >
                            <Icon className="w-5 h-5 text-[#9A8060] group-hover:text-[#b91919] transition-colors" />
                          </motion.div>
                        </div>

                        {/* Title + description */}
                        <h3 className="font-heading text-xl font-semibold text-[#1A1208] mb-2">
                          {event.name}
                        </h3>
                        <p className="text-[#7A6545] text-sm leading-relaxed mb-4">
                          {isExpanded ? event.fullDescription : event.description}
                        </p>

                        {/* Meta */}
                        <div className="flex flex-wrap gap-3 mb-5 text-[#9A8060]">
                          <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5" />
                            <span className="font-accent text-xs">{event.teamSize}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span className="font-accent text-xs">{event.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Trophy className="w-3.5 h-3.5 text-[#b91919]" />
                            <span className="font-accent text-xs text-[#b91919]">
                              {event.prize}
                            </span>
                          </div>
                        </div>

                        {/* Expanded content */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-[#CDBF9E] pt-4 mb-4">
                                <h4 className="font-heading text-sm font-semibold text-[#1A1208] mb-3">
                                  Rules & Guidelines
                                </h4>
                                <ul className="space-y-1.5">
                                  {event.rules.map((rule, j) => (
                                    <motion.li
                                      key={j}
                                      className="flex items-start gap-2 text-sm text-[#7A6545]"
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: j * 0.05 }}
                                    >
                                      <span className="text-[#b91919] mt-1">•</span>
                                      {rule}
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Actions */}
                        <div className="flex items-center gap-3 pt-2 border-t border-[#CDBF9E]">
                          <button
                            onClick={() =>
                              setExpanded(isExpanded ? null : event.id)
                            }
                            className="text-sm font-accent text-[#9A8060] hover:text-[#1A1208] transition-colors cursor-pointer flex items-center gap-1"
                          >
                            {isExpanded ? (
                              <>
                                <X className="w-3.5 h-3.5" /> Close
                              </>
                            ) : (
                              "Details"
                            )}
                          </button>
                          <motion.div className="ml-auto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              size="sm"
                              className="bg-[#b91919] hover:bg-[#8a1212] text-white font-heading text-xs px-4 rounded-lg"
                            >
                              Register →
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
              })}
            </AnimatePresence>
          </div>
        </ScrollDepth>
      </div>
    </section>
  );
}
