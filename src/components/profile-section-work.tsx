"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TagInput } from "@/components/tag-input";
import { FieldLabel, inputCls } from "@/components/profile-shared";

export interface WorkData {
  skill: string;
  missionTags: string[];
  stagePreference: string;
}

interface ProfileSectionWorkProps {
  data: WorkData;
  onChange: (patch: Partial<WorkData>) => void;
}

const stageOptions = [
  { value: "pre-idea", label: "Pre-idea to pre-seed — the very earliest" },
  { value: "pre-seed-to-seed", label: "Pre-seed to seed — scrappy but moving" },
  { value: "seed-plus", label: "Seed+ — some structure, still early" },
  { value: "open", label: "Open to anything" },
];

export function ProfileSectionWork({
  data,
  onChange,
}: ProfileSectionWorkProps) {
  return (
    <div className="space-y-5">
      {/* Skill */}
      <div>
        <FieldLabel>What do you do better than most?</FieldLabel>
        <Input
          value={data.skill}
          onChange={(e) => onChange({ skill: e.target.value })}
          placeholder="e.g. I make complicated things work and look easy"
          className={inputCls}
        />
      </div>

      {/* Mission tags */}
      <div>
        <FieldLabel>What problem makes you stay up at night?</FieldLabel>
        <TagInput
          value={data.missionTags}
          onChange={(tags) => onChange({ missionTags: tags })}
        />
      </div>

      {/* Stage preference */}
      <div>
        <FieldLabel>What kind of startup do you want to join?</FieldLabel>
        <Select
          value={data.stagePreference}
          onValueChange={(v) => v && onChange({ stagePreference: v })}
        >
          <SelectTrigger className={inputCls}>
            <SelectValue placeholder="Select stage preference" />
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
    </div>
  );
}
