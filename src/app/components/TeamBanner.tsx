import { ArrowUpRight, Users } from "lucide-react";
import { motion } from "motion/react";

export default function TeamBanner() {
  return (
    <section className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl border border-[#C41E3A]/35 bg-[#111111]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(196,30,58,0.25),transparent_26%),linear-gradient(115deg,#111111_0%,#111111_48%,#1c0c10_100%)]" />
        <div className="absolute -right-3 -top-20 select-none font-display text-[18rem] leading-none text-[#C41E3A]/10 sm:right-8 sm:text-[23rem]">
          戦
        </div>
        <div className="absolute inset-y-0 right-[18%] w-px bg-gradient-to-b from-transparent via-[#C41E3A]/45 to-transparent" />

        <div className="relative grid gap-8 px-6 py-9 sm:px-10 sm:py-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14 lg:px-14">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3 font-accent text-xs uppercase tracking-[0.28em] text-[#FF8599]">
              <span className="flex size-8 items-center justify-center rounded-full border border-[#C41E3A]/45 bg-[#C41E3A]/10">
                <Users className="size-4" />
              </span>
              The shadow dojo
            </div>
            <h2 className="font-display text-4xl tracking-wide text-[#F5F5F5] sm:text-5xl lg:text-6xl">
              MEET THE <span className="text-[#C41E3A]">TEAM</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#999] sm:text-base">
              Enter the chambers and meet the people turning ideas into impact at Tech Kurukshetra.
            </p>
          </div>

          <motion.a
            href="#team"
            whileHover={{ scale: 1.03, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex w-fit items-center gap-4 border border-[#C41E3A] bg-[#C41E3A] px-5 py-4 font-heading text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#A0162F] sm:px-6"
          >
            ENTER THE CHAMBERS
            <span className="flex size-8 items-center justify-center border border-white/25 bg-black/10 transition-transform group-hover:rotate-45">
              <ArrowUpRight className="size-4" />
            </span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
