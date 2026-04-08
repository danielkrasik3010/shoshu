"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import UnicornScene from "unicornstudio-react/next";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const UNICORN_SDK_URL =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.6/dist/unicornStudio.umd.js";

export function Hero() {
  return (
    <section className="relative w-full min-h-screen min-h-[100svh] overflow-hidden pb-24 md:pb-28">
      {/* Hero background canvas — Unicorn Studio WebGL; scene stays bright; readability is local to copy */}
      <div
        id="hero-background-canvas"
        style={{ position: "absolute", inset: 0, zIndex: 0 }}
        aria-hidden="true"
        className="bg-background"
      >
        <div className="absolute inset-0 size-full min-h-[100svh] pointer-events-none [&_*]:pointer-events-none">
          <UnicornScene
            projectId="yjoY2IwhJfauQkTQGiiK"
            sdkUrl={UNICORN_SDK_URL}
            width="100%"
            height="100%"
            lazyLoad
            production
            scale={1}
            dpi={1.5}
            fps={60}
            ariaLabel="Decorative hero background"
            className="size-full min-h-[100svh] [&>div]:size-full"
            showPlaceholderWhileLoading={false}
            showPlaceholderOnError={false}
          />
        </div>
        {/* Minimal top fade so the bridge/sky reads clearly; no heavy full-viewport wash */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background/25 to-transparent"
          aria-hidden
        />
      </div>

      {/* Content — bottom-left with glass panel so type stays sharp without dimming the whole scene */}
      <div
        className="relative z-10 flex flex-col justify-end min-h-screen min-h-[100svh] pl-6 pr-6 pb-10 pt-20 md:pl-14 md:pr-14 md:pb-12"
      >
        <div className="max-w-3xl">
          <div
            className={cn(
              "rounded-2xl border border-border/50",
              "bg-background/45 shadow-sm backdrop-blur-md",
              "supports-[backdrop-filter]:bg-background/35",
              "ring-1 ring-black/[0.04] dark:ring-white/[0.06]",
              "px-5 py-7 sm:px-7 sm:py-8 md:px-9 md:py-10"
            )}
          >
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0 }}
              className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-5"
            >
              Israel&apos;s early-stage hiring platform
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-foreground mb-5 [text-shadow:0_1px_2px_rgb(0_0_0_/0.04)]"
            >
              Where early-stage startups and ambitious people find each other.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
              className="text-lg md:text-xl text-foreground/85 leading-relaxed mb-8 max-w-2xl"
            >
              Shosu is the place for Israeli founders building their first team —
              and for people who want in before the rocket ship takes off.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-3 mb-7"
            >
              <Link
                href="#founder-form"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-[var(--color-founder)] hover:bg-[var(--color-founder)]/90 text-white border-0 text-base px-6"
                )}
              >
                I&apos;m a founder — find my first hires →
              </Link>
              <Link
                href="#candidate-form"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-[var(--color-candidate)] text-[var(--color-candidate)] hover:bg-[var(--color-candidate)]/10 text-base px-6 bg-background/80 backdrop-blur-sm"
                )}
              >
                I want to join a startup early →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
              className="flex flex-wrap items-center gap-3"
            >
              <p className="text-sm text-muted-foreground">
                Join{" "}
                <span className="font-semibold text-foreground">890</span>{" "}
                founders and candidates already on the list.
              </p>
              <Badge
                variant="secondary"
                className="text-xs animate-pulse bg-muted/90"
              >
                Growing daily
              </Badge>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
