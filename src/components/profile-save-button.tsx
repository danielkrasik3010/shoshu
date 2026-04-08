"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Check } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { toast } from "sonner";

type SaveState = "idle" | "saving" | "saved";

interface ProfileSaveButtonProps {
  isDirty: boolean;
  onSave: () => void;
  accent?: "blue" | "emerald";
}

export function ProfileSaveButton({
  isDirty,
  onSave,
  accent = "blue",
}: ProfileSaveButtonProps) {
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [showShortcut, setShowShortcut] = useState(true);

  // Hide ⌘S hint after 2 s
  useEffect(() => {
    const t = setTimeout(() => setShowShortcut(false), 2000);
    return () => clearTimeout(t);
  }, []);

  const handleSave = useCallback(() => {
    if (saveState !== "idle") return;
    setSaveState("saving");
    setTimeout(() => {
      setSaveState("saved");
      onSave();
      toast.success("Profile saved");
      setTimeout(() => setSaveState("idle"), 1500);
    }, 600);
  }, [saveState, onSave]);

  // ⌘S / Ctrl+S
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        if (isDirty) handleSave();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isDirty, handleSave]);

  const bg =
    accent === "blue"
      ? "linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #3b82f6 100%)"
      : "linear-gradient(135deg, #047857 0%, #059669 60%, #10b981 100%)";

  const isVisible = isDirty || saveState === "saving" || saveState === "saved";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 16, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 8, opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-1.5"
        >
          {/* ⌘S tooltip */}
          <AnimatePresence>
            {showShortcut && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-xs text-slate-500 pr-1"
              >
                ⌘S to save
              </motion.p>
            )}
          </AnimatePresence>

          <ShimmerButton
            background={bg}
            className="rounded-full px-7 h-11 text-sm font-semibold shadow-xl"
            onClick={handleSave}
            disabled={saveState !== "idle"}
          >
            {/* Unsaved amber dot */}
            {saveState === "idle" && isDirty && (
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 inline-block" />
            )}
            {saveState === "idle" && "Save changes →"}
            {saveState === "saving" && (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Saving…
              </span>
            )}
            {saveState === "saved" && (
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4" /> Saved
              </span>
            )}
          </ShimmerButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
