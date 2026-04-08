"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card3D } from "@/components/ui/card-3d";
import { NumberTicker } from "@/components/ui/number-ticker";

const stats = [
  {
    value: 90,
    prefix: "",
    suffix: "%",
    description:
      "of startup founders say their first 5 employees shaped the company's culture permanently",
    accent: "blue" as const,
  },
  {
    value: 1,
    prefix: "#",
    suffix: "",
    description:
      "reason early-stage startups fail to grow: the wrong first hire",
    accent: "green" as const,
  },
  {
    value: 3,
    prefix: "",
    suffix: "×",
    description:
      "faster growth for startups whose early employees had prior startup experience",
    accent: "red" as const,
  },
];

const accentStyles: Record<
  (typeof stats)[number]["accent"],
  { border: string; glow: string; ring: string }
> = {
  blue: {
    border: "border-t-[var(--color-founder)]",
    glow: "from-[var(--color-founder)]/[0.08] via-transparent to-transparent",
    ring: "shadow-[var(--color-founder)]/12",
  },
  green: {
    border: "border-t-[var(--color-candidate)]",
    glow: "from-[var(--color-candidate)]/[0.08] via-transparent to-transparent",
    ring: "shadow-[var(--color-candidate)]/12",
  },
  red: {
    border: "border-t-red-500",
    glow: "from-red-500/[0.08] via-transparent to-transparent",
    ring: "shadow-red-500/15",
  },
};

export function Stats() {
  return (
    <section className="w-full border-t border-border/40 bg-muted/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto mb-14 max-w-3xl text-center font-serif text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl md:mb-20 md:text-4xl"
        >
          Why the first hire matters more than any other
        </motion.h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8">
          {stats.map((stat, i) => {
            const a = accentStyles[stat.accent];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.55,
                  ease: "easeOut",
                  delay: i * 0.1,
                }}
              >
                <Card3D
                  intensity={8}
                  className="h-full"
                  containerClassName="h-full"
                >
                  <div
                    className={cn(
                      "relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-border/60 bg-card p-8 shadow-md md:p-10",
                      "border-t-4",
                      a.border,
                      "transition-shadow duration-300 hover:shadow-lg",
                      a.ring,
                    )}
                  >
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-100",
                        a.glow,
                      )}
                      aria-hidden
                    />
                    <div className="relative z-10 flex flex-1 flex-col gap-6">
                      <NumberTicker
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        delay={0.05 + i * 0.12}
                        className="font-serif text-6xl font-bold leading-none tracking-tight text-foreground md:text-7xl"
                        springOptions={{ stiffness: 100, damping: 26 }}
                      />
                      <p className="text-base leading-relaxed text-muted-foreground md:text-[1.05rem]">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
