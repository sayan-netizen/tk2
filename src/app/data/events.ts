import {
  Bot,
  Code2,
  Cpu,
  Gamepad2,
  Lightbulb,
  Music,
  Palette,
  Wrench,
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
    name: "Shadow Sprint",
    description: "36-hour hackathon to build innovative solutions",
    fullDescription:
      "A 36-hour hackathon where teams of 2-4 build innovative tech solutions. Multiple tracks including AI/ML, Web3, IoT, and Social Impact. Mentors from top companies. Best hack wins the Shadow Sprint Trophy.",
    category: "technical",
    teamSize: "2-4",
    date: "Mar 14-15",
    prize: "₹1,00,000",
    rules: [
      "Teams of 2-4 members",
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
    date: "Mar 14-15",
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
    teamSize: "2-3",
    date: "Mar 15-16",
    prize: "₹75,000",
    rules: [
      "Teams of 2-3",
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
    teamSize: "1-2",
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
    teamSize: "1-3",
    date: "Mar 14-16",
    prize: "₹40,000",
    rules: [
      "Teams of 1-3",
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
    teamSize: "1-5",
    date: "Mar 14-16",
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
      "A hands-on workshop covering the latest in AI/ML, from fine-tuning large language models to building production AI applications. Led by industry professionals from top tech companies.",
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

