"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { MatchScorePill } from "@/components/match-score-pill";
import type { CandidateMock, AvatarColor } from "@/lib/mock-data";

const avatarBg: Record<AvatarColor, string> = {
  blue: "bg-blue-100 text-blue-700",
  emerald: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  rose: "bg-rose-100 text-rose-700",
  violet: "bg-violet-100 text-violet-700",
  slate: "bg-slate-100 text-slate-600",
};

interface CandidateCardProps {
  candidate: CandidateMock;
  index: number;
  onMessage?: (candidate: CandidateMock) => void;
}

export function CandidateCard({
  candidate,
  index,
  onMessage,
}: CandidateCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect || !spotlightRef.current) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.background = `radial-gradient(380px circle at ${x}px ${y}px, rgba(59,130,246,0.07), transparent 70%)`;
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

        <Card className="relative overflow-visible rounded-2xl border border-slate-200/80 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-300 group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] group-hover:-translate-y-0.5 group-hover:ring-1 group-hover:ring-blue-200 group-hover:ring-blue-400 group-hover:ring-2 p-0 gap-0">
          {/* Match score — absolute top-right */}
          <div className="absolute top-4 right-4 z-20">
            <MatchScorePill score={candidate.score} />
          </div>

          <div className="p-5 pb-4">
            {/* Avatar + name row */}
            <div className="flex items-start gap-3 pr-14">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${avatarBg[candidate.color]}`}
              >
                {candidate.initials}
              </div>
              <div className="min-w-0">
                <p className="font-serif font-bold text-lg text-slate-900 leading-tight">
                  {candidate.name}
                </p>
                <p className="text-sm text-slate-500 mt-0.5">{candidate.skill}</p>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                  <span className="text-xs text-slate-400">{candidate.location}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-100" />

          <div className="p-5 pt-4 flex flex-col gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
                Why they fit
              </p>
              <p className="text-sm italic text-slate-500 leading-snug line-clamp-2">
                ✦ {candidate.reason}
              </p>
            </div>

            <ShimmerButton
              background="linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #3b82f6 100%)"
              className="h-10 text-sm"
              onClick={() => onMessage?.(candidate)}
            >
              Send a message
            </ShimmerButton>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
