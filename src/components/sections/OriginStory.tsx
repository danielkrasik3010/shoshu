"use client";

import { motion } from "framer-motion";
import { BentoGrid } from "@/components/ui/bento-grid";
import { GlowCard } from "@/components/ui/spotlight-card";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

function PillBadge({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "founder" | "candidate";
}) {
  const colors =
    variant === "founder"
      ? "bg-blue-50 text-blue-700 border-blue-200"
      : "bg-emerald-50 text-emerald-700 border-emerald-200";

  return (
    <span
      className={`inline-block w-fit rounded-full border px-3 py-1 text-xs font-semibold ${colors}`}
    >
      {children}
    </span>
  );
}

export function OriginStory() {
  return (
    <section className="w-full bg-[#FAF9F6] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 max-w-2xl font-serif text-3xl font-bold tracking-tight text-slate-900 md:mb-12 md:text-4xl lg:text-5xl"
        >
          We&apos;ve been on both sides of this.
        </motion.h2>

        <BentoGrid className="auto-rows-auto grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {/* Founder card */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="group relative col-span-1 flex flex-col overflow-hidden rounded-2xl bg-white p-6 md:p-8 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transition-shadow duration-300 hover:shadow-lg"
          >
            <PillBadge variant="founder">Founders</PillBadge>
            <p className="mt-5 text-base leading-relaxed text-slate-500 md:text-lg">
              We know what it&apos;s like to post a job and get 200 irrelevant
              CVs — and to spend three months looking for one person who actually
              gets it.
            </p>
          </motion.div>

          {/* Candidate card */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
            className="group relative col-span-1 flex flex-col overflow-hidden rounded-2xl bg-white p-6 md:p-8 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transition-shadow duration-300 hover:shadow-lg"
          >
            <PillBadge variant="candidate">Candidates</PillBadge>
            <p className="mt-5 text-base leading-relaxed text-slate-500 md:text-lg">
              We know what it&apos;s like to want to join something early,
              something meaningful — and have no idea where to even look.
            </p>
          </motion.div>
        </BentoGrid>

        {/* Spotlight quote card */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-6 max-w-3xl md:mt-8"
        >
          <GlowCard
            glowColor="blue"
            customSize
            className="!aspect-auto !grid-rows-none !shadow-none !p-0 !gap-0"
          >
            <div className="relative z-10 rounded-2xl border-t-4 border-t-blue-600 bg-white px-6 py-6 md:px-8 md:py-7">
              <p className="font-serif text-lg font-medium leading-relaxed text-slate-800 md:text-xl">
                Shosu is the platform we wish had existed. A community built
                specifically for the earliest, most exciting — and most human —
                moment in a startup&apos;s life.
              </p>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    </section>
  );
}
