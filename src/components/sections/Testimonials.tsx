"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    quote:
      "We spent four months trying to find our first developer through LinkedIn. Two weeks on Shosu and we had three real conversations with people who actually wanted to be employee #1.",
    author: "Founder, stealth B2B startup, Tel Aviv",
    initials: "TF",
    color: "founder" as const,
  },
  {
    quote:
      "I knew I wanted to join something early — I just didn't know where to find it. Shosu was the first place that felt like it was actually built for that.",
    author: "Early-stage candidate, product background, Jerusalem",
    initials: "EC",
    color: "candidate" as const,
  },
];

export function Testimonials() {
  return (
    <section className="w-full bg-muted/20 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-14 max-w-xl"
        >
          The first hire changes everything.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: "easeOut", delay: i * 0.2 }}
            >
              <Card
                className={`h-full border-l-4 ${
                  t.color === "founder"
                    ? "border-l-[var(--color-founder)]"
                    : "border-l-[var(--color-candidate)]"
                } border-border/40 bg-card/70 hover:shadow-lg transition-all duration-300`}
              >
                <CardContent className="p-8 flex flex-col gap-6">
                  <blockquote className="text-foreground text-base md:text-lg leading-relaxed font-medium italic">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback
                        className={`text-xs font-semibold ${
                          t.color === "founder"
                            ? "bg-[var(--color-founder)]/20 text-[var(--color-founder)]"
                            : "bg-[var(--color-candidate)]/20 text-[var(--color-candidate)]"
                        }`}
                      >
                        {t.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      — {t.author}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
