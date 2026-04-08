"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldLabel, inputCls, textareaCls } from "@/components/profile-shared";

export interface StartupData {
  startupName: string;
  stage: string;
  hiringCount: string;
  description: string;
  isStealth: boolean;
}

interface ProfileSectionStartupProps {
  data: StartupData;
  onChange: (patch: Partial<StartupData>) => void;
}

const stageOptions = [
  { value: "stealth", label: "Stealth" },
  { value: "pre-seed", label: "Pre-seed" },
  { value: "seed", label: "Seed" },
];

const hiringOptions = [
  { value: "1-2", label: "1–2 — The right ones" },
  { value: "3-5", label: "3–5 — Core team time" },
  { value: "5-10", label: "5–10 — It's getting real" },
];

export function ProfileSectionStartup({
  data,
  onChange,
}: ProfileSectionStartupProps) {
  const charCount = data.description.length;

  return (
    <div className="space-y-5">
      {/* Startup name */}
      <div>
        <FieldLabel>What are you calling it?</FieldLabel>
        <Input
          value={data.startupName}
          onChange={(e) => onChange({ startupName: e.target.value })}
          placeholder="Even if it's still just a Notion doc"
          className={inputCls}
        />
      </div>

      {/* Stage + Hiring row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <FieldLabel>Stage</FieldLabel>
          <Select
            value={data.stage}
            onValueChange={(v) => v && onChange({ stage: v })}
          >
            <SelectTrigger className={inputCls}>
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              {stageOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <FieldLabel>How many seats?</FieldLabel>
          <Select
            value={data.hiringCount}
            onValueChange={(v) => v && onChange({ hiringCount: v })}
          >
            <SelectTrigger className={inputCls}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {hiringOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stealth switch */}
      <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-slate-700">We&apos;re in stealth</p>
          <p className="text-xs text-slate-400 mt-0.5">
            Candidates only see your stage and hiring count.
          </p>
        </div>
        <Switch
          checked={data.isStealth}
          onCheckedChange={(v) => onChange({ isStealth: v })}
        />
      </div>

      {/* One-liner (hidden when stealth) */}
      <AnimatePresence initial={false}>
        {!data.isStealth && (
          <motion.div
            key="description"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div>
              <FieldLabel>Explain it like you&apos;re telling your mom</FieldLabel>
              <div className="relative">
                <Textarea
                  value={data.description}
                  onChange={(e) =>
                    onChange({ description: e.target.value.slice(0, 120) })
                  }
                  placeholder="We help people who struggle with..."
                  rows={3}
                  className={textareaCls}
                />
                <span className="absolute bottom-2 right-3 text-[11px] text-slate-400 tabular-nums">
                  {charCount} / 120
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
