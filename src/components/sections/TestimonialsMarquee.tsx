"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  audience: "Founder" | "Candidate";
};

const row1: Testimonial[] = [
  {
    name: "Noa Levi",
    role: "CTO, Fablo AI",
    quote:
      "We found our first two engineers through Shosu in under three weeks. Both are still with us a year later.",
    audience: "Founder",
  },
  {
    name: "Daniel Shapira",
    role: "Job Seeker",
    quote:
      "I'd been applying to Series B companies for months. Shosu showed me there was a whole world of earlier opportunities I didn't know existed.",
    audience: "Candidate",
  },
  {
    name: "Yael Cohen",
    role: "Co-Founder, Rootly",
    quote:
      "Every platform we tried sent us senior candidates who wanted a salary we couldn't afford. Shosu actually understood our stage.",
    audience: "Founder",
  },
  {
    name: "Amit Peretz",
    role: "Product Designer",
    quote:
      "Joining a 3-person team was the best career decision I've made. Shosu made it possible to find them.",
    audience: "Candidate",
  },
  {
    name: "Or Mizrahi",
    role: "Founder, Stackr",
    quote:
      "The quality of candidates on Shosu is different. They actually want to build something, not just work somewhere.",
    audience: "Founder",
  },
];

const row2: Testimonial[] = [
  {
    name: "Roni Ashkenazi",
    role: "Founder, Patchly",
    quote:
      "Shosu helped us find our first hire in 10 days. She's now leading our entire backend.",
    audience: "Founder",
  },
  {
    name: "Eyal Friedman",
    role: "Software Engineer",
    quote:
      "Every startup I found on Shosu was real, early-stage, and honest about where they were. Refreshing.",
    audience: "Candidate",
  },
  {
    name: "Hila Bar-On",
    role: "Co-Founder, Verta",
    quote:
      "We were two people with a prototype. Shosu found us a designer who believed in the vision before we had revenue.",
    audience: "Founder",
  },
  {
    name: "Guy Nachman",
    role: "Data Scientist",
    quote:
      "I got three offers from Shosu in my first month. All of them were exactly the kind of early-stage roles I was looking for.",
    audience: "Candidate",
  },
  {
    name: "Liron Keren",
    role: "Founder, Menta",
    quote:
      "Our first hire through Shosu became our VP of Product eighteen months later. The right person at the right moment.",
    audience: "Founder",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function TestimonialCard({ t }: { t: Testimonial }) {
  const isFounder = t.audience === "Founder";
  return (
    <Card className="w-80 shrink-0 select-none border border-border/60 bg-card shadow-xs hover:shadow-sm transition-shadow duration-200 py-0">
      <CardContent className="flex flex-col gap-3 p-5 text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Avatar size="default">
              <AvatarFallback
                className={cn(
                  "text-xs font-semibold",
                  isFounder
                    ? "bg-[var(--color-founder)]/15 text-[var(--color-founder)]"
                    : "bg-[var(--color-candidate)]/15 text-[var(--color-candidate)]"
                )}
              >
                {initials(t.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold leading-tight text-foreground">
                {t.name}
              </p>
              <p className="text-xs text-muted-foreground leading-snug">
                {t.role}
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "shrink-0 text-[10px] font-semibold px-2 py-0.5 border",
              isFounder
                ? "border-[var(--color-founder)]/35 text-[var(--color-founder)] bg-[var(--color-founder)]/8"
                : "border-[var(--color-candidate)]/35 text-[var(--color-candidate)] bg-[var(--color-candidate)]/8"
            )}
          >
            {t.audience}
          </Badge>
        </div>

        <p className="text-sm leading-relaxed text-foreground/88 italic">
          &ldquo;{t.quote}&rdquo;
        </p>
      </CardContent>
    </Card>
  );
}

function MarqueeRow({
  items,
  direction,
}: {
  items: Testimonial[];
  direction: "left" | "right";
}) {
  const animClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="relative overflow-x-hidden overflow-y-visible py-1">
      <div
        className={cn(
          "flex w-max gap-6",
          animClass,
          "motion-reduce:animate-none hover:[animation-play-state:paused]"
        )}
      >
        {/* Original set */}
        {items.map((t, i) => (
          <TestimonialCard key={`a-${i}`} t={t} />
        ))}
        {/* Duplicate for seamless loop */}
        {items.map((t, i) => (
          <TestimonialCard key={`b-${i}`} t={t} />
        ))}
      </div>
      {/* Edge fades — match section track so cards soften at viewport edges */}
      <div
        className="testimonial-marquee-fade testimonial-marquee-fade--start"
        aria-hidden
      />
      <div
        className="testimonial-marquee-fade testimonial-marquee-fade--end"
        aria-hidden
      />
    </div>
  );
}

export function TestimonialsMarquee() {
  return (
    <section className="w-full bg-muted/40 border-y border-border/40 py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10 md:mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground"
        >
          What people are saying
        </motion.h2>
      </div>

      <div className="flex flex-col gap-4">
        <MarqueeRow items={row1} direction="left" />
        <MarqueeRow items={row2} direction="right" />
      </div>
    </section>
  );
}
