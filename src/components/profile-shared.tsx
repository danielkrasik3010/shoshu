"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared input class for all profile fields */
export const inputCls =
  "h-11 px-4 rounded-xl border-slate-200 bg-slate-50/60 text-sm transition-all focus:bg-white focus:border-blue-300 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)] focus-visible:ring-0";

/** Shared textarea class */
export const textareaCls =
  "min-h-[90px] px-4 py-3 rounded-xl border-slate-200 bg-slate-50/60 text-sm resize-none transition-all focus:bg-white focus:border-blue-300 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)] focus-visible:ring-0";

/** Consistent section field label */
export function FieldLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** "Unsaved changes" indicator line */
export function UnsavedBadge() {
  return (
    <p className="mt-4 text-xs italic text-amber-500">· Unsaved changes</p>
  );
}

/** Completion status for a section */
export type CompletionState = "empty" | "partial" | "complete";

/** Determine completion dot classes */
export function dotClasses(state: CompletionState): string {
  if (state === "complete") return "bg-emerald-400";
  if (state === "partial") return "bg-amber-400";
  return "border-2 border-slate-300 bg-transparent";
}
