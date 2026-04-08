"use client";

import { Switch } from "@/components/ui/switch";
import { AnimatePresence, motion } from "framer-motion";

export interface VisibilityData {
  isVisible: boolean;
}

interface ProfileSectionVisibilityProps {
  data: VisibilityData;
  onChange: (patch: Partial<VisibilityData>) => void;
}

export function ProfileSectionVisibility({
  data,
  onChange,
}: ProfileSectionVisibilityProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-slate-700">
            Show my profile to candidates
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            Turn this off to pause your listing without deleting anything.
          </p>
        </div>
        <Switch
          checked={data.isVisible}
          onCheckedChange={(v) => onChange({ isVisible: v })}
        />
      </div>

      <AnimatePresence>
        {!data.isVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: "hidden" }}
          >
            <div className="flex items-center gap-2 rounded-xl border border-red-200/60 bg-red-50 px-4 py-3 text-sm text-red-700">
              <span className="h-2 w-2 shrink-0 rounded-full bg-red-400" />
              Your profile is hidden — candidates won&apos;t see you in matches.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
