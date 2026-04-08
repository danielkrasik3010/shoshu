"use client";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAvatarBg, getInitials, type AvatarColorKey } from "@/lib/avatar-color";
import { FieldLabel, inputCls } from "@/components/profile-shared";

export interface IdentityData {
  name: string;
  email: string;
}

interface ProfileSectionIdentityProps {
  data: IdentityData;
  avatarColor: AvatarColorKey;
  onChange: (patch: Partial<IdentityData>) => void;
}

export function ProfileSectionIdentity({
  data,
  avatarColor,
  onChange,
}: ProfileSectionIdentityProps) {
  const initials = getInitials(data.name || "?");
  const bg = getAvatarBg(avatarColor);

  return (
    <div className="space-y-5">
      {/* Avatar upload zone */}
      <div
        className="flex items-center gap-4 rounded-2xl border-2 border-dashed border-slate-200 p-5 hover:border-blue-300 transition-colors cursor-pointer"
        onClick={() => toast.info("Photo upload coming soon")}
      >
        <div
          className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-full text-base font-bold ${bg}`}
          style={{ width: 52, height: 52 }}
        >
          {initials}
        </div>
        <div>
          <p className="font-semibold text-sm text-slate-700">Upload a photo</p>
          <p className="text-xs text-slate-400 mt-0.5">JPG or PNG, up to 2MB</p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-1.5 h-7 px-2.5 text-xs rounded-lg border border-slate-200"
            onClick={(e) => {
              e.stopPropagation();
              toast.info("Photo upload coming soon");
            }}
          >
            Choose file
          </Button>
        </div>
      </div>

      {/* Name */}
      <div>
        <FieldLabel>Your name</FieldLabel>
        <Input
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="Full name"
          className={inputCls}
        />
      </div>

      {/* Email */}
      <div>
        <FieldLabel>Email address</FieldLabel>
        <Input
          type="email"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          placeholder="you@example.com"
          className={inputCls}
        />
      </div>
    </div>
  );
}
