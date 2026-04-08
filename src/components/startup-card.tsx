"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MatchScorePill } from "@/components/match-score-pill";
import type { StartupMock, AvatarColor } from "@/lib/mock-data";

const avatarBg: Record<AvatarColor, string> = {
  blue: "bg-blue-100 text-blue-700",
  emerald: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  rose: "bg-rose-100 text-rose-700",
  violet: "bg-violet-100 text-violet-700",
  slate: "bg-slate-100 text-slate-600",
};

const stageBadge: Record<string, string> = {
  Stealth: "bg-slate-100 text-slate-600",
  "Pre-seed": "bg-amber-50 text-amber-700",
  Seed: "bg-blue-50 text-blue-700",
};

interface StartupCardProps {
  startup: StartupMock;
  index: number;
}

export function StartupCard({ startup, index }: StartupCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect || !spotlightRef.current) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.background = `radial-gradient(480px circle at ${x}px ${y}px, rgba(16,185,129,0.07), transparent 70%)`;
  };

  const handleMouseLeave = () => {
    if (spotlightRef.current) {
      spotlightRef.current.style.background = "transparent";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.08, duration: 0.5, ease: "easeOut" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative"
      >
        {/* Spotlight overlay */}
        <div
          ref={spotlightRef}
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-300"
        />

        <Card className="relative overflow-visible rounded-2xl border border-slate-200/80 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-300 group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] group-hover:-translate-y-0.5 group-hover:ring-1 group-hover:ring-emerald-200 group-hover:ring-emerald-400 group-hover:ring-2 p-0 gap-0">
          <div className="flex gap-4 p-5">
            {/* Left: logo + stage */}
            <div className="flex shrink-0 flex-col items-center gap-2">
              <div
                className={`flex h-13 w-13 items-center justify-center rounded-xl text-base font-serif font-bold ${avatarBg[startup.color]}`}
                style={{ width: 52, height: 52 }}
              >
                {startup.initials}
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${stageBadge[startup.stage] ?? "bg-slate-100 text-slate-600"}`}
              >
                {startup.stage}
              </span>
            </div>

            {/* Right: details */}
            <div className="flex-1 min-w-0">
              {/* Top row */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-serif font-bold text-xl text-slate-900 leading-tight">
                  {startup.name}
                </span>
                <span className="rounded-full border border-slate-200 px-2.5 py-0.5 text-xs text-slate-500">
                  Hiring {startup.hiring}
                </span>
                <div className="flex items-center gap-1.5 ml-auto">
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${avatarBg["slate"]}`}
                  >
                    {startup.founder.initials}
                  </div>
                  <span className="text-sm text-slate-500">
                    by {startup.founder.name}
                  </span>
                </div>
              </div>

              <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
                {startup.description}
              </p>

              <Separator className="my-3 bg-slate-100" />

              {/* Match row */}
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">
                    Why it matches you
                  </p>
                  <p className="text-sm italic text-slate-500 leading-snug line-clamp-2">
                    ✦ {startup.reason}
                  </p>
                </div>
                <div className="shrink-0">
                  <MatchScorePill score={startup.score} />
                </div>
              </div>

              <div className="mt-3 flex justify-end">
                <p className="text-xs text-slate-400 italic">
                  Founder will reach out if interested
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
