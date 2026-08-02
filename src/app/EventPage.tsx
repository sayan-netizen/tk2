import { useMemo, useState, useRef } from "react";
import { ArrowLeft, Calendar, Filter, Home, Search, Trophy, Users } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { events, type EventCategory, type Event } from "./data/events";
import { useComingSoon } from "./context/ComingSoonContext";

type CategoryFilter = "all" | EventCategory;
type SortMode = "featured" | "name" | "category" | "prize";

const categories: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "technical", label: "Technical" },
  { value: "gaming", label: "Gaming" },
  { value: "cultural", label: "Cultural" },
  { value: "workshop", label: "Workshops" },
];

const categoryClasses: Record<EventCategory, string> = {
  technical: "border-[#d51e1e]/40 bg-[#d51e1e]/10 text-[#ff7d91]",
  gaming: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  cultural: "border-amber-300/30 bg-amber-300/10 text-amber-100",
  workshop: "border-sky-300/30 bg-sky-300/10 text-sky-100",
};

function prizeValue(prize: string) {
  const digits = prize.replace(/[^\d]/g, "");
  return digits ? Number(digits) : 0;
}

export default function EventPage() {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [sort, setSort] = useState<SortMode>("featured");
  const [query, setQuery] = useState("");

  const visibleEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = events.filter((event) => {
      const matchesCategory = category === "all" || event.category === category;
      const matchesQuery =
        !normalizedQuery ||
        event.name.toLowerCase().includes(normalizedQuery) ||
        event.description.toLowerCase().includes(normalizedQuery) ||
        event.category.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "category") return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
      if (sort === "prize") return prizeValue(b.prize) - prizeValue(a.prize);
      return events.findIndex((event) => event.id === a.id) - events.findIndex((event) => event.id === b.id);
    });
  }, [category, query, sort]);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#f1eeee]">
      {/* Full Page Background Image - Brighter Display */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-100 brightness-[1.3] pointer-events-none"
        style={{ backgroundImage: "url('/images/Event_page_background.webp')" }}
      />
      {/* Soft Light Vignette */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(5,5,5,0.2)_100%)] pointer-events-none" />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]/40 pointer-events-none" />

      <main className="relative z-10 overflow-hidden px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <div className="absolute left-[-12rem] top-24 size-[34rem] rounded-full bg-[#d51e1e]/10 blur-[160px]" />
        <div className="absolute right-[-10rem] top-[28rem] size-[30rem] rounded-full bg-[#63272d]/20 blur-[150px]" />

        <section className="relative mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-3 font-accent text-xs uppercase tracking-[0.28em] text-[#FF8599]">
              <span className="flex size-8 items-center justify-center rounded-full border border-[#d51e1e]/45 bg-[#d51e1e]/10">
                <Trophy className="size-4" />
              </span>
              Event board
            </div>
            <h1 className="font-display text-5xl tracking-wide text-[#F5F5F5] sm:text-7xl">
              CHOOSE YOUR <span className="text-[#d51e1e]">MISSION</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#999] sm:text-base">
              Compare event tracks, sort the board, and jump into the challenge that fits your team.
            </p>
          </div>

          <div className="mb-8 grid gap-3 border border-[#b91919]/30 bg-black/40 p-4 shadow-[0_0_20px_rgba(185,25,25,0.12)] lg:grid-cols-[1fr_auto_auto] lg:items-center">
            <label className="flex min-h-11 items-center gap-3 border border-[#b91919]/25 bg-black/30 px-3 text-[#999]">
              <Search className="size-4 text-[#d51e1e]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search events"
                className="min-w-0 flex-1 bg-transparent font-accent text-sm tracking-[0.08em] text-[#f5f5f5] outline-none placeholder:text-[#666]"
              />
            </label>

            <label className="flex min-h-11 items-center gap-3 border border-[#b91919]/25 bg-black/30 px-3 text-[#999]">
              <Filter className="size-4 text-[#d51e1e]" />
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value as CategoryFilter)}
                className="bg-transparent font-accent text-sm uppercase tracking-[0.12em] text-[#f5f5f5] outline-none"
              >
                {categories.map((item) => (
                  <option key={item.value} value={item.value} className="bg-[#050505]">
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex min-h-11 items-center gap-3 border border-[#b91919]/25 bg-black/30 px-3 text-[#999]">
              <span className="font-accent text-xs uppercase tracking-[0.18em] text-[#d51e1e]">Sort</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortMode)}
                className="bg-transparent font-accent text-sm uppercase tracking-[0.12em] text-[#f5f5f5] outline-none"
              >
                <option value="featured" className="bg-[#050505]">Featured</option>
                <option value="name" className="bg-[#050505]">Name</option>
                <option value="category" className="bg-[#050505]">Category</option>
                <option value="prize" className="bg-[#050505]">Prize</option>
              </select>
            </label>
          </div>

          <div className="mb-5 flex items-center justify-between gap-4 font-accent text-xs uppercase tracking-[0.18em] text-[#777]">
            <span>{visibleEvents.length} events shown</span>
            <span>{category === "all" ? "All categories" : category}</span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 [perspective:1200px]">
            {visibleEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} categoryClasses={categoryClasses} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function EventCard({ event, index, categoryClasses }: { event: Event; index: number; categoryClasses: Record<EventCategory, string> }) {
  const { openComingSoon } = useComingSoon();
  const cardRef = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.innerWidth < 768 || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = event.icon;

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.3) }}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      className="group relative min-h-[26rem] overflow-hidden rounded-xl bg-[#111111]/80 border border-[#8A1C17]/50 p-6 shadow-[0_0_20px_rgba(184,50,44,0.2),inset_0_0_15px_rgba(184,50,44,0.2)] transition-all duration-300 hover:bg-[#1a1a1a]/90 hover:border-[#b8322c]/90 hover:shadow-[0_0_30px_rgba(184,50,44,0.5),inset_0_0_25px_rgba(184,50,44,0.4)]"
    >
      {/* Crisp Enso Ink Border */}
      <svg className="absolute inset-0 size-full pointer-events-none z-30 opacity-75 transition-opacity duration-300 group-hover:opacity-100" preserveAspectRatio="none">
        <rect x="3" y="3" rx="10" ry="10" width="calc(100% - 6px)" height="calc(100% - 6px)" fill="none" stroke="#b8322c" strokeWidth="3" />
        <rect x="2" y="2" rx="11" ry="11" width="calc(100% - 4px)" height="calc(100% - 4px)" fill="none" stroke="#8A1C17" strokeWidth="1.5" strokeDasharray="50 15 150 40" opacity="0.9" />
      </svg>

      <div
        className="absolute inset-0 z-0 opacity-100 transition-opacity duration-500 bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/event-card-${index % 9}.png')`,
          transform: `translateZ(0) scale(${index < 6 ? 1.25 : 1}) ${index < 3 ? 'translateY(-8%)' : (index < 6 ? 'translateY(8%)' : '')}`
        }}
      />
      
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#000000]/95 via-[#000000]/65 to-[#b8322c]/20 opacity-90 transition-opacity duration-300 group-hover:opacity-75" style={{ transform: "translateZ(0)" }} />
      
      <div className="relative z-20 flex h-full flex-col" style={{ transform: "translateZ(10px)" }}>
        <div className="mb-5 flex items-start justify-between gap-4">
          <span className={`border px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${categoryClasses[event.category]} bg-black/60 backdrop-blur-md shadow-[0_0_10px_rgba(0,0,0,0.8)]`}>
            {event.category}
          </span>
          <div className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-black/80 text-[#b8322c] backdrop-blur-md transition-all duration-300 group-hover:bg-[#b8322c]/40 group-hover:text-white shadow-[0_0_15px_rgba(0,0,0,0.8)]">
            <Icon className="relative z-20 size-5 drop-shadow-[0_0_5px_rgba(0,0,0,1)]" />
            <svg className="absolute inset-[-10%] size-[120%] pointer-events-none z-10 overflow-visible opacity-80 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="#B8322C" strokeWidth="2.5" strokeDasharray="180 30" opacity="0.9" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#B88A3D" strokeWidth="1.5" strokeDasharray="120 40" opacity="0.7" />
            </svg>
          </div>
        </div>

        <h2 className="font-display text-3xl font-bold uppercase tracking-wider text-[#ff4d4d] [text-shadow:0_2px_4px_rgba(0,0,0,0.95),0_0_20px_rgba(0,0,0,1),0_0_12px_rgba(213,30,30,0.6)]">{event.name}</h2>
        <p className="mt-3 font-sans text-sm font-medium leading-relaxed text-[#f4f2eb] [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_0_15px_rgba(0,0,0,1)]">{event.fullDescription}</p>

        <div className="mt-5 grid gap-2 text-[11px] text-white">
          <div className="flex items-center gap-3">
            <Users className="size-4 text-[#d54536] drop-shadow-[0_0_4px_rgba(0,0,0,1)]" />
            <span className="font-mono font-semibold uppercase tracking-[0.15em] text-[#f8f3e6] [text-shadow:0_1px_3px_rgba(0,0,0,1),0_0_10px_rgba(0,0,0,1)]">{event.teamSize}</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="size-4 text-[#d54536] drop-shadow-[0_0_4px_rgba(0,0,0,1)]" />
            <span className="font-mono font-semibold uppercase tracking-[0.15em] text-[#f8f3e6] [text-shadow:0_1px_3px_rgba(0,0,0,1),0_0_10px_rgba(0,0,0,1)]">{event.date}</span>
          </div>
          <div className="flex items-center gap-3">
            <Trophy className="size-4 text-[#d54536] drop-shadow-[0_0_4px_rgba(0,0,0,1)]" />
            <span className="font-mono font-bold uppercase tracking-[0.15em] text-[#d54536] [text-shadow:0_1px_3px_rgba(0,0,0,1),0_0_15px_rgba(0,0,0,1)]">{event.prize}</span>
          </div>
        </div>

        <div className="mt-5 border-t border-[#b8322c]/50 pt-4">
          <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#f8f3e6] [text-shadow:0_1px_3px_rgba(0,0,0,1)] opacity-90">
            Rules
          </p>
          <ul className="space-y-2">
            {event.rules.slice(0, 3).map((rule) => (
              <li key={rule} className="flex items-start gap-2 font-sans text-xs font-medium leading-relaxed text-[#eeeade] [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_0_12px_rgba(0,0,0,1)]">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#d54536] shadow-[0_0_4px_rgba(0,0,0,1)]" />
                {rule}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => openComingSoon(event.name)}
          className="mt-auto w-full border border-[#b8322c] bg-black/60 px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[#f8f3e6] shadow-[0_0_15px_rgba(184,50,44,0.3)] backdrop-blur-md transition-all hover:bg-[#b8322c] hover:text-white cursor-pointer"
        >
          Register
        </button>
      </div>
    </motion.article>
  );
}

