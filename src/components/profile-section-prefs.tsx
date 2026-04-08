"use client";

import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";
import { FieldLabel, inputCls } from "@/components/profile-shared";

export interface PrefsData {
  openToEquity: boolean;
  availability: string;
}

interface ProfileSectionPrefsProps {
  data: PrefsData;
  onChange: (patch: Partial<PrefsData>) => void;
}

const availabilityOptions = [
  { value: "immediately", label: "Immediately" },
  { value: "within-a-month", label: "Within a month" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "just-exploring", label: "Just exploring for now" },
];

export function ProfileSectionPrefs({
  data,
  onChange,
}: ProfileSectionPrefsProps) {
  return (
    <div className="space-y-5">
      {/* Equity toggle */}
      <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-slate-700">
              Open to equity-only or mixed compensation
            </p>
            <AnimatePresence>
              {data.openToEquity && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] px-2 py-0.5 font-semibold">
                    Open to equity
                  </Badge>
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Some early-stage roles pay partly or fully in equity.
          </p>
        </div>
        <Switch
          checked={data.openToEquity}
          onCheckedChange={(v) => onChange({ openToEquity: v })}
        />
      </div>

      {/* Availability */}
      <div>
        <FieldLabel>When can you start?</FieldLabel>
        <Select
          value={data.availability}
          onValueChange={(v) => v && onChange({ availability: v })}
        >
          <SelectTrigger className={inputCls}>
            <SelectValue placeholder="Select availability" />
          </SelectTrigger>
          <SelectContent>
            {availabilityOptions.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
