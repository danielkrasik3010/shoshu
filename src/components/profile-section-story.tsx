"use client";

import { Textarea } from "@/components/ui/textarea";
import { FieldLabel, textareaCls } from "@/components/profile-shared";

export interface StoryData {
  story: string;
}

interface ProfileSectionStoryProps {
  data: StoryData;
  role: "founder" | "candidate";
  onChange: (patch: Partial<StoryData>) => void;
}

const copy = {
  founder: {
    hint: "This is what candidates read before deciding to reply. Make it personal.",
    label: "Your story as a founder",
    placeholder:
      "What brought you here? What have you done before? What made you start this?",
  },
  candidate: {
    hint: "Founders read this before reaching out. One honest paragraph beats a polished CV.",
    label: "Your story",
    placeholder:
      "What have you built? What drives you? What kind of problem do you want to work on next?",
  },
};

export function ProfileSectionStory({
  data,
  role,
  onChange,
}: ProfileSectionStoryProps) {
  const c = copy[role];
  const charCount = data.story.length;

  return (
    <div className="space-y-4">
      <p className="text-xs italic text-slate-400">{c.hint}</p>

      <div>
        <FieldLabel>{c.label}</FieldLabel>
        <div className="relative">
          <Textarea
            value={data.story}
            onChange={(e) => onChange({ story: e.target.value.slice(0, 300) })}
            placeholder={c.placeholder}
            rows={6}
            className={textareaCls}
          />
          <span className="absolute bottom-2 right-3 text-[11px] text-slate-400 tabular-nums">
            {charCount} / 300
          </span>
        </div>
      </div>
    </div>
  );
}
