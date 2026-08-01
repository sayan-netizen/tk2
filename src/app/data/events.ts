import {
  Bot,
  Code2,
  Cpu,
  Gamepad2,
  Lightbulb,
  Music,
  Palette,
  Wrench,
  Rocket,
  Brain,
  Terminal,
  type LucideIcon,
} from "lucide-react";

export type EventCategory = "technical" | "gaming" | "cultural" | "workshop";

export interface Event {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  category: EventCategory;
  teamSize: string;
  date: string;
  prize: string;
  rules: string[];
  icon: LucideIcon;
}

export const events: Event[] = [
  {
    id: "hackathon",
    name: "Hackathon",
    description: "Software & Hardware Innovation Hackathon",
    fullDescription:
      "A comprehensive hackathon featuring Software Tracks (AI/ML, Cybersecurity, EdTech, Healthcare, Sustainability), Hardware Tracks (IoT, Automation, Smart Agriculture), and Open Innovation.",
    category: "technical",
    teamSize: "TBD",
    date: "TBD",
    prize: "₹60,000+ (30k, 20k, 10k, 8+ track winner 24k)",
    rules: [
      "Software and Hardware tracks available",
      "Open Innovation category available",
    ],
    icon: Code2,
  },
  {
    id: "innovation-expo",
    name: "Innovation & Expo",
    description: "Project Showcase & Drone Expo",
    fullDescription:
      "Showcase your projects in the Project Expo, participate in the DIY Project Making Competition (Robotics, Embedded Systems, Hardware Innovation), or join the Drone Expo (Autonomous, Surveillance, Delivery).",
    category: "technical",
    teamSize: "TBD",
    date: "TBD",
    prize: "₹10,000+",
    rules: [
      "Project Expo: Open project showcase for students and innovators",
      "DIY Project Making Competition: School level (Reg: 1k)",
      "Drone Expo: Reg Amt: 300/-",
    ],
    icon: Lightbulb,
  },
  {
    id: "coding-contest",
    name: "Coding Contest Zone",
    description: "Debugging, Promptathon, AI-ML & UI-UX",
    fullDescription:
      "Test your skills in the Debugging Challenge, Promptathon (AI Prompt Engineering), AI-ML Challenge, and UI-UX Challenge. Registration Amount: 100/-.",
    category: "technical",
    teamSize: "TBD",
    date: "TBD",
    prize: "₹6,000+ per event (3k, 2k, 1k)",
    rules: [
      "Debugging Challenge: Find and fix bugs in given programs",
      "Promptathon: AI Prompt Engineering Competition",
      "AI-ML Challenge",
      "UI-UX Challenge",
    ],
    icon: Terminal,
  },
  {
    id: "tech-quiz",
    name: "Tech Quiz",
    description: "General Tech & Emerging Technologies Quiz",
    fullDescription:
      "A quiz competition spanning General Technology, AI & Emerging Technologies, Computer Science Fundamentals, and Current Tech Affairs. Separate levels for School and College students. Reg Amt: 100/-.",
    category: "technical",
    teamSize: "TBD",
    date: "TBD",
    prize: "₹6,000 x2 (3k, 2k, 1k)",
    rules: [
      "School level & College Level",
      "Topics include General Tech, AI, CS Fundamentals, Tech Affairs",
    ],
    icon: Brain,
  },
  {
    id: "startup-pitch",
    name: "Startup Pitch Competition",
    description: "Pitch your startup idea to real investors",
    fullDescription:
      "Present your startup idea, validate your business model, and experience an investor pitch simulation with the possibility of pitching to real investors. Reg Amt: 300/-.",
    category: "technical",
    teamSize: "TBD",
    date: "TBD",
    prize: "₹6,000 (3k, 2k, 1k)",
    rules: [
      "Startup Idea Presentation",
      "Business Model Validation",
      "Investor Pitch Simulation",
    ],
    icon: Rocket,
  },
  {
    id: "gaming-zone",
    name: "Gaming Zone",
    description: "Valorant, FIFA, Chess, BGMI, eFootball",
    fullDescription:
      "Compete in various gaming tournaments including Valorant (online, Reg: 400/-), FIFA (offline, Reg: 200/-), Chess (offline, Reg: 50/-), BGMI (Hybrid, Reg: 200/-), and eFootball (online, Reg: 70/-).",
    category: "gaming",
    teamSize: "Various",
    date: "TBD",
    prize: "₹30,000",
    rules: [
      "Valorant (online), Reg Amt: 400/-",
      "FIFA (offline), Reg Amt: 200/-",
      "Chess (offline), Reg Amt: 50/-",
      "Bgmi (Hybrid), Reg Amt: 200/-",
      "Efootball (online), Reg Amt: 70/-",
    ],
    icon: Gamepad2,
  },
  {
    id: "robotics-arena",
    name: "Robotics Arena",
    description: "Robo Race, Line Follower, Robo Soccer, Robo Arena",
    fullDescription:
      "Participate in thrilling robotics competitions: Robo Race (speed-based obstacle course), Line Follower Robot Competition, Robo Soccer (Robot vs Robot football), and Robo Arena (pushing off the line).",
    category: "technical",
    teamSize: "TBD",
    date: "TBD",
    prize: "₹60,000",
    rules: [
      "Robo Race: Reg Amt: 300/-",
      "Line Follower: Reg Amt: 250/-",
      "Robo Soccer: Reg Amt: 250/-",
      "Robo Arena: Reg Amt: 500/-",
    ],
    icon: Bot,
  },
  {
    id: "workshops",
    name: "Workshops",
    description: "Learn from industry experts",
    fullDescription:
      "Participate in workshops on AI & Generative AI, Cybersecurity Basics, IoT & Embedded Systems, Drone Technology, Web Development, Git & Open Source Contribution, and Game development.",
    category: "workshop",
    teamSize: "Individual",
    date: "TBD",
    prize: "Knowledge & Certificate",
    rules: [
      "Planned workshops are currently in consideration",
      "Various technical domains covered",
    ],
    icon: Wrench,
  },
  {
    id: "fun-events",
    name: "Fun Events",
    description: "Poster, PPT, Auction, Reel Making, Hunting",
    fullDescription:
      "Join our fun events including Poster Competition, Presentation Competition, Knapsack-based Auction (Reg: 100/-), Reel Making Competition, and Hunting Challenge (Reg: 200/-).",
    category: "cultural",
    teamSize: "TBD",
    date: "TBD",
    prize: "₹5,000+",
    rules: [
      "Auction (Knapsack based): Prizepool 3k, 2k, 1k. Reg Amt: 100/-",
      "Hunting Challenge: Prizepool 2k. Reg Amt: 200/-",
    ],
    icon: Palette,
  },
];

