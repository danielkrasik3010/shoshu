"use client";

import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const SUGGESTED = [
  "Climate",
  "Health",
  "Fintech",
  "Dev tools",
  "Education",
  "Consumer",
  "Deep tech",
  "AI",
];

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  className?: string;
}

export function TagInput({ value, onChange, className }: TagInputProps) {
  const [draft, setDraft] = useState("");

  const add = (tag: string) => {
    const cleaned = tag.trim();
    if (!cleaned || value.includes(cleaned)) return;
    onChange([...value, cleaned]);
    setDraft("");
  };

  const remove = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      add(draft);
    }
    if (e.key === "Backspace" && draft === "" && value.length > 0) {
      remove(value[value.length - 1]);
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* Tag bubbles + input */}
      <div className="flex min-h-[44px] flex-wrap gap-2 rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 transition-colors focus-within:border-blue-300 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]">
        <AnimatePresence initial={false}>
          {value.map((tag) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.75 }}
              transition={{ duration: 0.1 }}
              className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700"
            >
              {tag}
              <button
                type="button"
                onClick={() => remove(tag)}
                className="ml-0.5 rounded-full hover:bg-blue-200 p-0.5 transition-colors"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKey}
          placeholder={value.length === 0 ? "Type and press Enter…" : ""}
          className="min-w-[120px] flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />
      </div>

      {/* Suggested pills */}
      <div className="flex flex-wrap gap-2">
        {SUGGESTED.filter((s) => !value.includes(s)).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => add(s)}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/60 transition-colors"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
