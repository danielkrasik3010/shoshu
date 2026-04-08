"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FieldLabel, inputCls } from "@/components/profile-shared";
import { cn } from "@/lib/utils";

export interface LinkData {
  link: string;
}

interface ProfileSectionLinkProps {
  data: LinkData;
  role: "founder" | "candidate";
  onChange: (patch: Partial<LinkData>) => void;
}

function isValidUrl(val: string): boolean {
  if (!val) return true;
  try {
    const url = val.startsWith("http") ? val : `https://${val}`;
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function ProfileSectionLink({
  data,
  role,
  onChange,
}: ProfileSectionLinkProps) {
  const [touched, setTouched] = useState(false);
  const valid = isValidUrl(data.link);
  const showError = touched && !valid;

  const placeholder =
    role === "founder"
      ? "Your deck, site, or LinkedIn"
      : "Your LinkedIn, portfolio, or GitHub";

  return (
    <div className="space-y-2">
      <FieldLabel>A link that says more about you</FieldLabel>
      <div className="relative">
        <ExternalLink className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
        <Input
          value={data.link}
          onChange={(e) => onChange({ link: e.target.value })}
          onBlur={() => setTouched(true)}
          placeholder={placeholder}
          className={cn(inputCls, "pl-9", showError && "border-red-400 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]")}
        />
      </div>
      {showError && (
        <p className="text-xs text-red-500 mt-1">
          This doesn&apos;t look like a valid URL
        </p>
      )}
    </div>
  );
}
