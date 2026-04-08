"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  background?: string;
  shimmerOpacity?: number;
}

export function ShimmerButton({
  background = "hsl(221, 83%, 53%)",
  shimmerOpacity = 0.25,
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        "relative overflow-hidden rounded-xl font-semibold text-white",
        "w-full h-12 text-base md:text-lg",
        "shadow-lg transition-all duration-300",
        "hover:brightness-110 hover:shadow-xl hover:scale-[1.015]",
        "active:scale-[0.99] active:brightness-95",
        "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:brightness-100",
        className,
      )}
      style={{ background }}
      {...props}
    >
      {/* sweeping shimmer */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_2.4s_ease-in-out_infinite]"
        style={{
          background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,${shimmerOpacity}) 50%, transparent 60%)`,
        }}
      />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}
