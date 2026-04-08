"use client";

import { useEffect, useRef, useState } from "react";

interface MatchScorePillProps {
  score: number;
  className?: string;
}

function getPillStyle(score: number) {
  if (score >= 90)
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (score >= 75)
    return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-slate-50 text-slate-600 border-slate-200";
}

export function MatchScorePill({ score, className = "" }: MatchScorePillProps) {
  const [displayed, setDisplayed] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const duration = 800;

  useEffect(() => {
    startRef.current = null;
    const animate = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      setDisplayed(Math.round(progress * score));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [score]);

  const style = getPillStyle(score);

  return (
    <span
      className={`inline-flex items-center gap-0.5 border rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums ${style} ${className}`}
    >
      {displayed}%
    </span>
  );
}
