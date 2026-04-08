"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FinalCta() {
  return (
    <section className="w-full bg-background pt-14 md:pt-16 pb-6 md:pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            Your people are out there. Let&apos;s help you find them.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            Shosu is coming to Israel&apos;s early-stage startup scene. Sign up
            now and be among the first to get access — whether you&apos;re
            building or joining.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="#founder-form"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-[var(--color-founder)] hover:bg-[var(--color-founder)]/90 text-white border-0 text-base px-6"
              )}
            >
              I&apos;m a founder — sign me up →
            </Link>
            <Link
              href="#candidate-form"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-[var(--color-candidate)] text-[var(--color-candidate)] hover:bg-[var(--color-candidate)]/10 text-base px-6"
              )}
            >
              I want to join a startup →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
