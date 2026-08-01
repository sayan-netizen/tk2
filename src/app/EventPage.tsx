import { useMemo, useState } from "react";
import { ArrowLeft, Calendar, Filter, Home, Search, Trophy, Users } from "lucide-react";
import { motion } from "motion/react";
import { events, type EventCategory } from "./data/events";

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
    <div className="min-h-screen bg-[#050505] text-[#f1eeee]">
      <button
        type="button"
        onClick={() => {
          window.location.hash = "";
        }}
        className="group fixed right-0 top-4 z-[10000] flex items-center gap-3 overflow-hidden rounded-l-md border border-r-0 border-[#d51e1e]/65 bg-[#050505]/90 p-1.5 pr-4 text-left shadow-[-10px_10px_30px_rgba(29,27,24,0.25)] backdrop-blur-md transition-all duration-300 hover:-translate-x-1 hover:border-[#b91919] hover:bg-[#111111] hover:shadow-[-14px_14px_34px_rgba(184,50,44,0.3)] sm:top-6"
        aria-label="Return to the main site"
      >
        <span className="flex size-9 items-center justify-center bg-[#d51e1e] text-[#f1eeee] transition-colors duration-300 group-hover:bg-[#b91919]">
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
        </span>
        <span className="flex flex-col leading-none">
          <span className="mb-1 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[#d89aa4]">
            <Home className="size-2.5" /> Leave board
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#f1eeee]">Main site</span>
        </span>
      </button>

      <main className="relative overflow-hidden px-4 pb-20 pt-24 sm:px-6 lg:px-8">
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

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visibleEvents.map((event, index) => {
              const Icon = event.icon;

              return (
                <motion.article
                  key={event.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="group relative min-h-[26rem] overflow-hidden border border-[#b91919]/30 bg-black/40 p-6 shadow-[0_0_16px_rgba(185,25,25,0.08)] transition-all hover:-translate-y-1 hover:border-[#b91919] hover:bg-black/55 hover:shadow-[0_0_24px_rgba(185,25,25,0.16)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d51e1e]/8 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex h-full flex-col">
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <span className={`border px-3 py-1 font-accent text-[10px] uppercase tracking-[0.18em] ${categoryClasses[event.category]}`}>
                        {event.category}
                      </span>
                      <span className="flex size-11 items-center justify-center border border-[#b91919]/30 bg-black/40 text-[#d51e1e] transition-all group-hover:border-[#b91919] group-hover:bg-[#b91919]/15">
                        <Icon className="size-5" />
                      </span>
                    </div>

                    <h2 className="font-heading text-2xl font-semibold text-[#F5F5F5]">{event.name}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#999]">{event.fullDescription}</p>

                    <div className="mt-5 grid gap-2 text-xs text-[#777]">
                      <div className="flex items-center gap-2">
                        <Users className="size-3.5 text-[#d51e1e]" />
                        <span className="font-accent uppercase tracking-[0.12em]">{event.teamSize}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="size-3.5 text-[#d51e1e]" />
                        <span className="font-accent uppercase tracking-[0.12em]">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="size-3.5 text-[#d51e1e]" />
                        <span className="font-accent uppercase tracking-[0.12em] text-[#d51e1e]">{event.prize}</span>
                      </div>
                    </div>

                    <div className="mt-5 border-t border-[#b91919]/25 pt-4">
                      <p className="mb-2 font-accent text-xs uppercase tracking-[0.18em] text-[#f5f5f5]">
                        Rules
                      </p>
                      <ul className="space-y-1.5">
                        {event.rules.slice(0, 3).map((rule) => (
                          <li key={rule} className="flex gap-2 text-sm leading-relaxed text-[#888]">
                            <span className="mt-2 size-1 shrink-0 bg-[#d51e1e]" />
                            {rule}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button className="mt-auto w-full border border-[#b91919] bg-black/5 px-4 py-3 font-accent text-[10px] uppercase tracking-[0.2em] text-[#f1eeee] shadow-[0_0_14px_rgba(185,25,25,0.18)] transition-all hover:bg-[#b91919]/10">
                      Register
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

