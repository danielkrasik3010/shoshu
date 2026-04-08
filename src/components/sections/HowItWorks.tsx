"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Step = {
  step: string;
  title: string;
  description: string;
};

const founderSteps: Step[] = [
  {
    step: "01",
    title: "Create a startup profile",
    description: "Your mission, stage, and what you're looking for.",
  },
  {
    step: "02",
    title: "Browse candidates",
    description:
      "Discover candidates who've specifically opted in to early-stage roles.",
  },
  {
    step: "03",
    title: "Reach out directly",
    description: "No fees, no recruiters, no noise.",
  },
];

const candidateSteps: Step[] = [
  {
    step: "01",
    title: "Build your profile",
    description:
      "Skills, what excites you, and what kind of mission you'd join.",
  },
  {
    step: "02",
    title: "Discover startups",
    description:
      "Explore vetted early-stage Israeli startups actively hiring.",
  },
  {
    step: "03",
    title: "Apply, connect, or get found",
    description: "You're in control.",
  },
];

function StepFlow({ steps, variant }: { steps: Step[]; variant: "founder" | "candidate" }) {
  const c =
    variant === "founder"
      ? {
          line: "border-[var(--color-founder)]",
          lineBg: "bg-[var(--color-founder)]",
          text: "text-[var(--color-founder)]",
        }
      : {
          line: "border-[var(--color-candidate)]",
          lineBg: "bg-[var(--color-candidate)]",
          text: "text-[var(--color-candidate)]",
        };

  return (
    <>
      {/* Mobile: vertical flow (nodes + connector) */}
      <div className="flex flex-col md:hidden">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="flex gap-4"
          >
            <div className="flex w-12 shrink-0 flex-col items-center">
              <span
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-full border-2 bg-card font-mono text-sm font-bold",
                  c.line,
                  c.text
                )}
                aria-label={`Step ${s.step}`}
              >
                {s.step}
              </span>
              {i < steps.length - 1 && (
                <div
                  className={cn("mt-2 w-0.5 flex-1 min-h-10 rounded-full", c.lineBg, "opacity-45")}
                  aria-hidden
                />
              )}
            </div>
            <div className={cn("min-w-0 flex-1", i < steps.length - 1 && "pb-10")}>
              <h3 className="text-xl font-semibold leading-snug text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {s.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop: horizontal flowchart */}
      <div className="hidden md:flex flex-row items-stretch gap-0">
        {steps.map((s, i) => (
          <Fragment key={s.step}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="flex min-w-0 flex-1 flex-col rounded-2xl border border-border/50 bg-card/60 px-6 py-8 shadow-sm ring-1 ring-black/[0.03] dark:ring-white/[0.04]"
            >
              <div className="mb-4">
                <span
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-full border-2 font-mono text-lg font-bold",
                    c.line,
                    c.text
                  )}
                  aria-label={`Step ${s.step}`}
                >
                  {s.step}
                </span>
              </div>
              <h3 className="text-xl lg:text-2xl font-semibold leading-snug text-foreground">
                {s.title}
              </h3>
              <p className="mt-3 text-base lg:text-lg leading-relaxed text-muted-foreground">
                {s.description}
              </p>
            </motion.div>

            {i < steps.length - 1 && (
              <div
                className="flex w-10 shrink-0 flex-col justify-center self-stretch pt-10 lg:w-14"
                aria-hidden
              >
                <div className="flex items-center gap-0">
                  <div className={cn("h-0.5 flex-1 rounded-full", c.lineBg, "opacity-40")} />
                  <ArrowRight className={cn("size-6 shrink-0 -ml-1", c.text)} strokeWidth={2.25} />
                </div>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full bg-background py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 md:mb-10 max-w-2xl"
        >
          Simple. Focused. Built for the earliest stage.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          <Tabs defaultValue="founders" className="w-full">
            <TabsList className="mb-8 md:mb-10 h-auto gap-1 p-1.5 bg-muted/60">
              <TabsTrigger
                value="founders"
                className="px-7 py-3 text-base font-semibold data-active:bg-[var(--color-founder)] data-active:text-white"
              >
                For founders
              </TabsTrigger>
              <TabsTrigger
                value="candidates"
                className="px-7 py-3 text-base font-semibold data-active:bg-[var(--color-candidate)] data-active:text-white"
              >
                For candidates
              </TabsTrigger>
            </TabsList>

            <TabsContent value="founders" id="for-founders" className="mt-0">
              <StepFlow steps={founderSteps} variant="founder" />
            </TabsContent>

            <TabsContent value="candidates" id="for-candidates" className="mt-0">
              <StepFlow steps={candidateSteps} variant="candidate" />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
