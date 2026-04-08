"use client";

import { motion } from "framer-motion";
import { BentoGrid } from "@/components/ui/bento-grid";

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

export function Problem() {
  return (
    <section id="about" className="w-full bg-[#FAF9F6] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 max-w-2xl font-serif text-3xl font-bold tracking-tight text-slate-900 md:mb-14 md:text-4xl lg:text-5xl"
        >
          Early-stage hiring is broken.
          <br />
          For everyone.
        </motion.h2>

        <BentoGrid className="auto-rows-auto grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {/* Founder card */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0 }}
            className="group relative col-span-1 flex flex-col overflow-hidden rounded-2xl bg-white p-6 md:p-8 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transition-shadow duration-300 hover:shadow-lg"
          >
            <PillBadge variant="founder">Founders</PillBadge>
            <p className="mt-5 text-base leading-relaxed text-slate-500 md:text-lg">
              Job boards were built for companies with HR teams, job
              descriptions, and comp bands. You have a pitch deck and a vision.
              LinkedIn isn&apos;t built for you.
            </p>
          </motion.div>

          {/* Candidate card */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.15 }}
            className="group relative col-span-1 flex flex-col overflow-hidden rounded-2xl bg-white p-6 md:p-8 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transition-shadow duration-300 hover:shadow-lg"
          >
            <PillBadge variant="candidate">Candidates</PillBadge>
            <p className="mt-5 text-base leading-relaxed text-slate-500 md:text-lg">
              You want to be part of something from the ground up — but finding a
              real, serious early-stage startup in Israel feels like searching in
              the dark. Most job boards start at Series A.
            </p>
          </motion.div>
        </BentoGrid>
      </div>
    </section>
  );
}
