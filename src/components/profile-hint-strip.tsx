"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

interface ProfileHintStripProps {
  hint: string | null;
  accent?: "blue" | "emerald";
}

export function ProfileHintStrip({
  hint,
  accent = "blue",
}: ProfileHintStripProps) {
  const colors =
    accent === "blue"
      ? "bg-blue-50 border-blue-200/80 text-blue-700"
      : "bg-emerald-50 border-emerald-200/80 text-emerald-700";

  return (
    <AnimatePresence mode="wait">
      {hint && (
        <motion.div
          key={hint}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className={`flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm ${colors}`}
        >
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 opacity-70" />
          <span>{hint}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
