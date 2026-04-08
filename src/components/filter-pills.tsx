"use client";

import { motion, AnimatePresence } from "framer-motion";

interface FilterPillsProps {
  filters: readonly string[];
  active: string;
  onChange: (f: string) => void;
  accent?: "blue" | "emerald";
}

export function FilterPills({
  filters,
  active,
  onChange,
  accent = "blue",
}: FilterPillsProps) {
  const activeCls =
    accent === "blue"
      ? "bg-blue-600 text-white border-blue-600"
      : "bg-emerald-600 text-white border-emerald-600";

  const inactiveCls =
    accent === "blue"
      ? "border border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600"
      : "border border-slate-200 text-slate-500 hover:border-emerald-300 hover:text-emerald-600";

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => {
        const isActive = f === active;
        return (
          <button
            key={f}
            onClick={() => onChange(f)}
            className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${
              isActive ? activeCls : inactiveCls
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="pill-bg"
                className={`absolute inset-0 rounded-full ${
                  accent === "blue" ? "bg-blue-600" : "bg-emerald-600"
                }`}
                transition={{ type: "spring", stiffness: 380, damping: 36 }}
              />
            )}
            <span className="relative">{f}</span>
          </button>
        );
      })}
    </div>
  );
}

/* Wrapper that applies AnimatePresence around children when filter changes */
export function FilteredContent({
  filterKey,
  children,
}: {
  filterKey: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={filterKey}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
