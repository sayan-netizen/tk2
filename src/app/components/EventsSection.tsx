import { ArrowUpRight, Swords, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { events } from "../data/events";

export default function EventsSection() {
  return (
    <section id="events" className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-none border border-[#b91919]/50 bg-black/40 shadow-[0_0_20px_rgba(185,25,25,0.15)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(196,30,58,0.25),transparent_26%),linear-gradient(115deg,#111111_0%,#111111_48%,#1c0c10_100%)]" />
        <div className="absolute -right-6 -top-20 select-none font-display text-[17rem] leading-none text-[#d51e1e]/10 sm:right-10 sm:text-[22rem]">
          祭
        </div>
        <div className="absolute inset-y-0 right-[18%] w-px bg-gradient-to-b from-transparent via-[#d51e1e]/45 to-transparent" />

        <div className="relative grid gap-8 px-6 py-9 sm:px-10 sm:py-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14 lg:px-14">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3 font-accent text-xs uppercase tracking-[0.28em] text-[#FF8599]">
              <span className="flex size-8 items-center justify-center rounded-full border border-[#d51e1e]/45 bg-[#d51e1e]/10">
                <Swords className="size-4" />
              </span>
              The arena dossier
            </div>
            <h2 className="font-display text-4xl tracking-wide text-[#F5F5F5] sm:text-5xl lg:text-6xl">
              EXPLORE THE <span className="text-[#d51e1e]">EVENTS</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#999] sm:text-base">
              Browse every challenge, workshop, tournament, and cultural night in one focused mission board.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-xs font-accent uppercase tracking-[0.18em] text-[#999]">
              <span className="inline-flex items-center gap-2 border border-[#b91919]/30 bg-black/30 px-3 py-2">
                <Trophy className="size-3.5 text-[#d51e1e]" />
                {events.length} missions
              </span>
              <span className="border border-[#b91919]/30 bg-black/30 px-3 py-2">sort and filter</span>
            </div>
          </div>

          <motion.a
            href="#events-page"
            whileHover={{ scale: 1.03, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex w-fit items-center gap-4 border border-[#b91919] bg-black/5 px-5 py-4 font-accent text-[10px] uppercase tracking-[0.2em] text-[#f1eeee] shadow-[0_0_14px_rgba(185,25,25,0.24)] transition-all hover:bg-[#b91919]/10 sm:px-6"
          >
            Open event board
            <span className="flex size-8 items-center justify-center border border-white/25 bg-black/10 transition-transform group-hover:rotate-45">
              <ArrowUpRight className="size-4" />
            </span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
