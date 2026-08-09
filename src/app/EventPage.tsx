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
          {/* Header Banner with Japanese Kanji watermark & Hanko Seal */}
          <div className="relative mb-10 overflow-hidden rounded-2xl border border-[#b8322c]/40 bg-[#0d0908]/95 p-6 sm:p-10 shadow-[0_15px_45px_rgba(0,0,0,0.6),inset_0_0_35px_rgba(184,50,44,0.12)] backdrop-blur-md">
            {/* Traditional Asanoha (麻の葉) Geometric Sacred Japanese Pattern */}
            <svg className="absolute inset-0 size-full pointer-events-none opacity-25 z-0" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="asanoha-dark" width="60" height="103.92" patternUnits="userSpaceOnUse">
                  <path d="M30 0 L60 17.32 L60 51.96 L30 69.28 L0 51.96 L0 17.32 Z M30 0 L30 69.28 M0 17.32 L60 51.96 M60 17.32 L0 51.96 M30 103.92 L60 86.6 L60 51.96 L30 34.64 L0 51.96 L0 86.6 Z M30 103.92 L30 34.64 M0 86.6 L60 51.96 M60 86.6 L0 51.96" fill="none" stroke="#d51e1e" strokeWidth="0.75" opacity="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#asanoha-dark)" />
            </svg>

            {/* Kumiko Gold Dot Lattice Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#B88A3D_1.2px,transparent_1.2px)] [background-size:20px_20px] opacity-20 pointer-events-none z-0" />

            {/* Crimson Rising Sun Glow Behind Title */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 size-56 sm:size-72 rounded-full bg-gradient-to-br from-[#d51e1e]/30 via-[#b8322c]/10 to-transparent blur-md pointer-events-none z-0" />

            {/* Traditional Washi Paper Noise Texture */}
            <div
              className="absolute inset-0 opacity-[0.20] mix-blend-overlay pointer-events-none z-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Grand Kanji Watermark (任務 - Mission & 祭 - Festival) */}
            <div className="absolute -right-4 -top-8 select-none font-display text-[8rem] sm:text-[14rem] lg:text-[18rem] leading-none bg-gradient-to-b from-[#B8322C]/25 via-[#B8322C]/10 to-transparent bg-clip-text text-transparent opacity-80 pointer-events-none z-0">
              任務
            </div>
            <div className="absolute right-[28%] bottom-[-15%] select-none font-display text-[6rem] sm:text-[10rem] leading-none text-[#B88A3D]/15 opacity-50 pointer-events-none z-0">
              祭
            </div>

            {/* Traditional Red Hanko Stamp (朱印) */}
            <div className="absolute top-5 right-6 flex flex-col items-center justify-center size-9 sm:size-10 rounded border-2 border-[#ff3b30] bg-[#ff3b30]/15 text-[#ff3b30] font-serif font-bold text-[12px] tracking-tighter select-none rotate-6 shadow-[0_0_15px_rgba(255,59,48,0.4)] pointer-events-none z-20">
              <span className="leading-none">陣</span>
              <span className="text-[5px] font-mono tracking-widest text-[#ff3b30]/80 uppercase">MISSION</span>
            </div>

            {/* 4 Cardinal Corner Crest Accents (Kamon Marks) */}
            <div className="absolute top-2.5 left-2.5 size-1.5 rounded-full bg-[#ff3b30] border border-[#F7F1E5] shadow-[0_0_6px_rgba(255,59,48,0.8)]" />
            <div className="absolute top-2.5 right-2.5 size-1.5 rounded-full bg-[#B88A3D] border border-[#F7F1E5] shadow-[0_0_6px_rgba(184,138,61,0.8)]" />
            <div className="absolute bottom-2.5 left-2.5 size-1.5 rounded-full bg-[#B88A3D] border border-[#F7F1E5] shadow-[0_0_6px_rgba(184,138,61,0.8)]" />
            <div className="absolute bottom-2.5 right-2.5 size-1.5 rounded-full bg-[#ff3b30] border border-[#F7F1E5] shadow-[0_0_6px_rgba(255,59,48,0.8)]" />

            <div className="relative z-10 max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#ff3b30]/15 border border-[#ff3b30]/35 shadow-[0_0_12px_rgba(255,59,48,0.2)]">
                <span className="flex size-6 items-center justify-center rounded-full bg-[#ff3b30]/20 text-[#ff4d4d]">
                  <Trophy className="size-3" />
                </span>
                <span className="font-accent text-[11px] tracking-[0.2em] uppercase text-[#ff5252] font-bold">
                  催事録 // Grand Mission Board
                </span>
              </div>

              {/* Sumi-e Brush Strike Line */}
              <div className="h-[3px] w-28 bg-gradient-to-r from-[#d51e1e] via-[#ff4d4d] to-[#B88A3D] rounded-full mb-4 shadow-[0_0_10px_rgba(213,30,30,0.5)]" />

              <h1 className="font-display text-4xl tracking-wide text-[#F5F5F5] sm:text-6xl font-black drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                CHOOSE YOUR{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d4d] via-[#ff7a70] to-[#B88A3D]">
                  MISSION
                </span>
              </h1>
              <p className="mt-3.5 max-w-2xl text-sm sm:text-base leading-relaxed text-[#ccc] font-sans font-medium">
                Compare event tracks, sort the board, and jump into the challenge that fits your team.
              </p>
            </div>
          </div>

          <div className="mb-8 grid gap-3 border border-[#b8322c]/35 bg-[#0d0908]/90 p-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md lg:grid-cols-[1fr_auto_auto] lg:items-center">
            <label className="flex min-h-11 items-center gap-3 border border-[#b8322c]/30 bg-black/50 px-3.5 rounded text-[#999] focus-within:border-[#d51e1e] transition-colors">
              <Search className="size-4 text-[#d51e1e]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search events (e.g. Hackathon, Robo, Design...)"
                className="min-w-0 flex-1 bg-transparent font-accent text-sm tracking-[0.08em] text-[#f5f5f5] outline-none placeholder:text-[#888]"
              />
            </label>

            <label className="flex min-h-11 items-center gap-3 border border-[#b8322c]/30 bg-black/50 px-3.5 rounded text-[#999] focus-within:border-[#d51e1e] transition-colors">
              <Filter className="size-4 text-[#d51e1e]" />
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value as CategoryFilter)}
                className="bg-transparent font-accent text-sm uppercase tracking-[0.12em] text-[#f5f5f5] outline-none cursor-pointer"
              >
                {categories.map((item) => (
                  <option key={item.value} value={item.value} className="bg-[#0e0a09] text-white">
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex min-h-11 items-center gap-3 border border-[#b8322c]/30 bg-black/50 px-3.5 rounded text-[#999] focus-within:border-[#d51e1e] transition-colors">
              <span className="font-accent text-xs uppercase tracking-[0.18em] text-[#d51e1e] font-bold">Sort</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortMode)}
                className="bg-transparent font-accent text-sm uppercase tracking-[0.12em] text-[#f5f5f5] outline-none cursor-pointer"
              >
                <option value="featured" className="bg-[#0e0a09] text-white">Featured</option>
                <option value="name" className="bg-[#0e0a09] text-white">Name</option>
                <option value="category" className="bg-[#0e0a09] text-white">Category</option>
                <option value="prize" className="bg-[#0e0a09] text-white">Prize</option>
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
  const Icon = event.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.3) }}
      className="group relative min-h-[26rem] overflow-hidden rounded-xl bg-[#F2ECE1]/85 backdrop-blur-sm border border-[#B88A3D]/45 p-6 shadow-[0_5px_15px_rgba(75,50,37,0.1)] transition-all duration-300 hover:bg-[#F2ECE1] hover:border-[#B8322C] hover:shadow-[0_15px_40px_rgba(184,50,44,0.15)]"
    >
      {/* Crisp Enso Ink Border */}
      <svg className="absolute inset-0 size-full pointer-events-none z-30 opacity-75 transition-opacity duration-300 group-hover:opacity-100" preserveAspectRatio="none">
        <rect x="3" y="3" rx="10" ry="10" width="calc(100% - 6px)" height="calc(100% - 6px)" fill="none" stroke="#b8322c" strokeWidth="3" />
        <rect x="2" y="2" rx="11" ry="11" width="calc(100% - 4px)" height="calc(100% - 4px)" fill="none" stroke="#8A1C17" strokeWidth="1.5" strokeDasharray="50 15 150 40" opacity="0.9" />
      </svg>

      <div
        className="absolute inset-0 z-0 opacity-100 transition-opacity duration-500 bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/Event_page_background.webp')`,
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

