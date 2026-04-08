"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  founderSchema,
  candidateSchema,
  type FounderFormData,
  type CandidateFormData,
} from "@/lib/signup-schemas";
import { Rocket, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

/* ─── Spotlight Form Card ───────────────────────────────────── */
type SpotlightColor = "blue" | "green";

function SpotlightFormCard({
  children,
  color,
  className,
  id,
}: {
  children: React.ReactNode;
  color: SpotlightColor;
  className?: string;
  id?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const rgb = color === "blue" ? "59,130,246" : "16,185,129";
  const borderTop =
    color === "blue" ? "border-t-blue-500" : "border-t-emerald-500";
  const ringHover =
    color === "blue"
      ? "group-hover:ring-blue-200"
      : "group-hover:ring-emerald-200";

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
    [],
  );

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      id={id}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white",
        "border border-slate-200/80 border-t-4",
        borderTop,
        "ring-1 ring-slate-200 transition-all duration-300",
        ringHover,
        "shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(700px circle at ${pos.x}px ${pos.y}px, rgba(${rgb},0.07), transparent 50%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ─── Glow Field Wrapper ────────────────────────────────────── */
function GlowField({
  children,
  color,
  hasError,
}: {
  children: React.ReactNode;
  color: SpotlightColor;
  hasError?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const ringColor =
    color === "blue"
      ? "shadow-[0_0_0_3px_rgba(59,130,246,0.2)]"
      : "shadow-[0_0_0_3px_rgba(16,185,129,0.2)]";

  return (
    <div
      className={cn(
        "relative rounded-xl transition-all duration-200",
        focused && !hasError && ringColor,
      )}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={() => setFocused(false)}
    >
      {children}
    </div>
  );
}

/* ─── Shared style constants ────────────────────────────────── */
const labelCls = "text-sm font-semibold text-slate-700 tracking-wide uppercase";
const inputCls =
  "h-12 px-4 text-base rounded-xl border-slate-200 bg-slate-50/60 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-blue-300 transition-all duration-200 shadow-none";
const inputGreenCls =
  "h-12 px-4 text-base rounded-xl border-slate-200 bg-slate-50/60 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-emerald-300 transition-all duration-200 shadow-none";
const textareaCls =
  "min-h-[100px] px-4 py-3 text-base rounded-xl border-slate-200 bg-slate-50/60 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-blue-300 transition-all duration-200 resize-none shadow-none";
const textareaGreenCls =
  "min-h-[100px] px-4 py-3 text-base rounded-xl border-slate-200 bg-slate-50/60 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-emerald-300 transition-all duration-200 resize-none shadow-none";
const selectTriggerCls =
  "h-12 w-full rounded-xl border-slate-200 bg-slate-50/60 px-4 text-base text-slate-900 transition-all duration-200 focus:bg-white focus:border-blue-300";
const selectTriggerGreenCls =
  "h-12 w-full rounded-xl border-slate-200 bg-slate-50/60 px-4 text-base text-slate-900 transition-all duration-200 focus:bg-white focus:border-emerald-300";

/* ─── Reusable Select field ─────────────────────────────────── */
function SelectField({
  id,
  color,
  value,
  onValueChange,
  placeholder,
  options,
  error,
}: {
  id: string;
  color: SpotlightColor;
  value: string;
  onValueChange: (v: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
  error?: string;
}) {
  return (
    <>
      <GlowField color={color} hasError={!!error}>
        <Select
          value={value}
          onValueChange={(v) => {
            if (v) onValueChange(v);
          }}
        >
          <SelectTrigger
            id={id}
            className={
              color === "blue" ? selectTriggerCls : selectTriggerGreenCls
            }
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((o) => (
              <SelectItem key={o.value} value={o.value} className="text-base">
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </GlowField>
      {error && (
        <FieldDescription className="text-sm text-destructive">
          {error}
        </FieldDescription>
      )}
    </>
  );
}

/* ─── Info Banner ───────────────────────────────────────────── */
function InfoBanner({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: SpotlightColor;
}) {
  const bg =
    color === "blue"
      ? "bg-blue-50 border-blue-200/60"
      : "bg-emerald-50 border-emerald-200/60";
  const iconCls = color === "blue" ? "text-blue-500" : "text-emerald-500";
  const titleCls = color === "blue" ? "text-blue-900" : "text-emerald-900";
  const bodyCls =
    color === "blue" ? "text-blue-700/80" : "text-emerald-700/80";

  return (
    <div className={cn("flex gap-3 rounded-xl border px-4 py-3.5", bg)}>
      <Icon className={cn("mt-0.5 size-5 shrink-0", iconCls)} />
      <div>
        <p className={cn("text-sm font-semibold", titleCls)}>{title}</p>
        <p className={cn("mt-0.5 text-sm leading-snug", bodyCls)}>
          {description}
        </p>
      </div>
    </div>
  );
}

/* ─── Team size options ─────────────────────────────────────── */
const teamSizeOptions = [
  { value: "0-5", label: "1–5 — Just you and the brave early believers" },
  { value: "6-15", label: "6–15 — Getting real. Whiteboard needed." },
  { value: "16-30", label: "16–30 — You're building a company now" },
  { value: "31-50", label: "31–50 — Okay, this is actually a company" },
  {
    value: "50+",
    label: "50+ — You're awesome, but maybe a bit far along for Shosu 👀",
  },
];

/* ─── Funds raised options ──────────────────────────────────── */
const fundsOptions = [
  { value: "under-2m", label: "Under $2M — Still scrappy and loving it" },
  {
    value: "2m-5m",
    label: "$2M–$5M — Found the product, now building the team",
  },
  { value: "5m-10m", label: "$5M–$10M — Series A energy in the room" },
  {
    value: "10m+",
    label: "$10M+ — Well capitalised. Say hi anyway.",
  },
  {
    value: "bootstrapped",
    label: "Bootstrapping — No VC? No problem. Real founders do it.",
  },
  {
    value: "pre-raise",
    label: "Planning to raise — haven't yet",
  },
];

/* ─── Work policy options ───────────────────────────────────── */
const workPolicyOptions = [
  { value: "hybrid", label: "Hybrid — sometimes office, sometimes pajamas" },
  { value: "onsite", label: "On-site — you miss eye contact and it shows" },
  { value: "remote", label: "Remote — timezone is just a suggestion" },
];

/* ─── Founder Form ──────────────────────────────────────────── */
function FounderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FounderFormData>({
    resolver: zodResolver(founderSchema),
    defaultValues: {
      isStealth: false,
      description: "",
      teamSize: "",
      fundsRaised: "",
      workPolicy: "",
      companyLinkedinUrl: "",
      companyWebsite: "",
    },
  });

  const isStealth = watch("isStealth");

  const onSubmit = async (data: FounderFormData) => {
    const res = await fetch("/api/signup/founder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      toast.error("Couldn't save that", {
        description: json.error ?? "Check your connection and try again.",
      });
      return;
    }
    toast.success("You're on the list! We'll be in touch.", {
      description: "Thanks for joining Shosu as a founder.",
    });
    reset();
  };

  return (
    <SpotlightFormCard color="blue" id="founder-form">
      <div className="px-6 pt-7 pb-2 md:px-8 md:pt-8">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <h3 className="font-serif text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Join as a founder
          </h3>
          <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
            Hiring
          </span>
        </div>
        <p className="mb-4 text-base leading-relaxed text-slate-500 md:text-lg">
          You&apos;re early. The people you hire next will define everything.
        </p>
        <InfoBanner
          icon={Rocket}
          color="blue"
          title="You built the thing."
          description="We find the people who'd join before the Series A."
        />
        <Separator className="mt-5 bg-slate-100" />
      </div>

      <div className="px-6 pb-8 md:px-8">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup className="gap-5 md:gap-6">

            {/* ── Full name ── */}
            <Field>
              <FieldLabel htmlFor="f-fullName" className={labelCls}>
                Your name
              </FieldLabel>
              <GlowField color="blue" hasError={!!errors.fullName}>
                <Input
                  id="f-fullName"
                  placeholder="What your mom calls you when the food is ready"
                  className={inputCls}
                  {...register("fullName")}
                  aria-invalid={!!errors.fullName}
                />
              </GlowField>
              {errors.fullName && (
                <FieldDescription className="text-sm text-destructive">
                  {errors.fullName.message}
                </FieldDescription>
              )}
            </Field>

            {/* ── Email ── */}
            <Field>
              <FieldLabel htmlFor="f-email" className={labelCls}>
                Email address
              </FieldLabel>
              <GlowField color="blue" hasError={!!errors.email}>
                <Input
                  id="f-email"
                  type="email"
                  placeholder="The one you actually check"
                  className={inputCls}
                  {...register("email")}
                  aria-invalid={!!errors.email}
                />
              </GlowField>
              {errors.email && (
                <FieldDescription className="text-sm text-destructive">
                  {errors.email.message}
                </FieldDescription>
              )}
            </Field>

            {/* ── Personal LinkedIn ── */}
            <Field>
              <FieldLabel htmlFor="f-linkedin" className={labelCls}>
                Your LinkedIn
              </FieldLabel>
              <GlowField color="blue" hasError={!!errors.linkedinUrl}>
                <Input
                  id="f-linkedin"
                  placeholder="https://linkedin.com/in/you — the one that's actually updated"
                  className={inputCls}
                  {...register("linkedinUrl")}
                  aria-invalid={!!errors.linkedinUrl}
                />
              </GlowField>
              {errors.linkedinUrl && (
                <FieldDescription className="text-sm text-destructive">
                  {errors.linkedinUrl.message}
                </FieldDescription>
              )}
            </Field>

            {/* ── Startup name ── */}
            <Field>
              <FieldLabel htmlFor="f-startupName" className={labelCls}>
                What are you calling it?
              </FieldLabel>
              <GlowField color="blue" hasError={!!errors.startupName}>
                <Input
                  id="f-startupName"
                  placeholder="Even if it's still just a Notion doc"
                  className={inputCls}
                  {...register("startupName")}
                  aria-invalid={!!errors.startupName}
                />
              </GlowField>
              {errors.startupName && (
                <FieldDescription className="text-sm text-destructive">
                  {errors.startupName.message}
                </FieldDescription>
              )}
            </Field>

            {/* ── Company LinkedIn (optional) ── */}
            <Field>
              <FieldLabel htmlFor="f-companyLinkedin" className={labelCls}>
                Company LinkedIn{" "}
                <span className="font-normal normal-case text-slate-400">
                  (optional)
                </span>
              </FieldLabel>
              <GlowField color="blue" hasError={!!errors.companyLinkedinUrl}>
                <Input
                  id="f-companyLinkedin"
                  placeholder="https://linkedin.com/company/... — they'll find it anyway 🕵️"
                  className={inputCls}
                  {...register("companyLinkedinUrl")}
                  aria-invalid={!!errors.companyLinkedinUrl}
                />
              </GlowField>
              {errors.companyLinkedinUrl && (
                <FieldDescription className="text-sm text-destructive">
                  {errors.companyLinkedinUrl.message}
                </FieldDescription>
              )}
            </Field>

            {/* ── Company website (optional) ── */}
            <Field>
              <FieldLabel htmlFor="f-website" className={labelCls}>
                Company website{" "}
                <span className="font-normal normal-case text-slate-400">
                  (optional)
                </span>
              </FieldLabel>
              <GlowField color="blue" hasError={!!errors.companyWebsite}>
                <Input
                  id="f-website"
                  placeholder="https://... — even if you built it last Tuesday at 2 AM"
                  className={inputCls}
                  {...register("companyWebsite")}
                  aria-invalid={!!errors.companyWebsite}
                />
              </GlowField>
              {errors.companyWebsite && (
                <FieldDescription className="text-sm text-destructive">
                  {errors.companyWebsite.message}
                </FieldDescription>
              )}
            </Field>

            {/* ── Stealth checkbox ── */}
            <Field orientation="horizontal" className="items-start gap-3">
              <Checkbox
                id="f-stealth"
                checked={isStealth}
                onCheckedChange={(checked) =>
                  setValue("isStealth", checked === true, {
                    shouldValidate: true,
                  })
                }
                className="mt-1 size-5"
              />
              <div className="flex flex-col gap-1">
                <Label
                  htmlFor="f-stealth"
                  className="cursor-pointer text-base font-semibold leading-snug text-slate-800"
                >
                  We&apos;re in stealth
                </Label>
                <FieldDescription className="text-sm text-slate-500">
                  Say no more. Literally — the description is optional.
                </FieldDescription>
              </div>
            </Field>

            {/* ── Description ── */}
            <Field>
              <FieldLabel htmlFor="f-description" className={labelCls}>
                Explain it like you&apos;re telling your mom
                {isStealth && (
                  <span className="ml-1 font-normal normal-case text-slate-400">
                    (optional in stealth)
                  </span>
                )}
              </FieldLabel>
              <GlowField color="blue" hasError={!!errors.description}>
                <Textarea
                  id="f-description"
                  placeholder={
                    isStealth
                      ? "You didn't hear this from us…"
                      : "We help people who struggle with..."
                  }
                  rows={3}
                  className={textareaCls}
                  {...register("description")}
                  aria-invalid={!!errors.description}
                />
              </GlowField>
              {errors.description && (
                <FieldDescription className="text-sm text-destructive">
                  {errors.description.message}
                </FieldDescription>
              )}
            </Field>

            {/* ── Team size ── */}
            <Field>
              <FieldLabel htmlFor="f-teamSize" className={labelCls}>
                How many humans are on the payroll?
              </FieldLabel>
              <SelectField
                id="f-teamSize"
                color="blue"
                value={watch("teamSize") ?? ""}
                onValueChange={(v) =>
                  setValue("teamSize", v, { shouldValidate: true })
                }
                placeholder="Pick your headcount band"
                options={teamSizeOptions}
                error={errors.teamSize?.message}
              />
            </Field>

            {/* ── Funds raised ── */}
            <Field>
              <FieldLabel htmlFor="f-fundsRaised" className={labelCls}>
                What&apos;s the funding story?
              </FieldLabel>
              <SelectField
                id="f-fundsRaised"
                color="blue"
                value={watch("fundsRaised") ?? ""}
                onValueChange={(v) =>
                  setValue("fundsRaised", v, { shouldValidate: true })
                }
                placeholder="Be honest — we won't judge"
                options={fundsOptions}
                error={errors.fundsRaised?.message}
              />
            </Field>

            {/* ── Job title / role ── */}
            <Field>
              <FieldLabel htmlFor="f-jobTitle" className={labelCls}>
                What role are you hiring for?
              </FieldLabel>
              <GlowField color="blue" hasError={!!errors.jobTitle}>
                <Input
                  id="f-jobTitle"
                  placeholder="e.g. First engineer, Head of Growth, Someone who makes sense of the chaos"
                  className={inputCls}
                  {...register("jobTitle")}
                  aria-invalid={!!errors.jobTitle}
                />
              </GlowField>
              {errors.jobTitle && (
                <FieldDescription className="text-sm text-destructive">
                  {errors.jobTitle.message}
                </FieldDescription>
              )}
            </Field>

            {/* ── Office location ── */}
            <Field>
              <FieldLabel htmlFor="f-officeLocation" className={labelCls}>
                Where&apos;s the base?
              </FieldLabel>
              <GlowField color="blue" hasError={!!errors.officeLocation}>
                <Input
                  id="f-officeLocation"
                  placeholder="Tel Aviv, Haifa, Berlin, the coffee shop on Rothschild..."
                  className={inputCls}
                  {...register("officeLocation")}
                  aria-invalid={!!errors.officeLocation}
                />
              </GlowField>
              {errors.officeLocation && (
                <FieldDescription className="text-sm text-destructive">
                  {errors.officeLocation.message}
                </FieldDescription>
              )}
            </Field>

            {/* ── Work policy ── */}
            <Field>
              <FieldLabel htmlFor="f-workPolicy" className={labelCls}>
                How do you work?
              </FieldLabel>
              <SelectField
                id="f-workPolicy"
                color="blue"
                value={watch("workPolicy") ?? ""}
                onValueChange={(v) =>
                  setValue("workPolicy", v, { shouldValidate: true })
                }
                placeholder="Pick a vibe"
                options={workPolicyOptions}
                error={errors.workPolicy?.message}
              />
            </Field>

            {/* ── Submit ── */}
            <Field>
              <ShimmerButton
                type="submit"
                disabled={isSubmitting}
                background="linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #3b82f6 100%)"
                className="shadow-blue-200/60"
              >
                {isSubmitting
                  ? "Shaking the right hands…"
                  : "Get me in front of the right people →"}
              </ShimmerButton>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </SpotlightFormCard>
  );
}

/* ─── Candidate Form ────────────────────────────────────────── */
function CandidateForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CandidateFormData>({
    resolver: zodResolver(candidateSchema),
  });

  const onSubmit = async (data: CandidateFormData) => {
    const res = await fetch("/api/signup/candidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      toast.error("Couldn't save that", {
        description: json.error ?? "Check your connection and try again.",
      });
      return;
    }
    toast.success("You're on the list! We'll be in touch.", {
      description: "Thanks for joining Shosu as a candidate.",
    });
    reset();
  };

  return (
    <SpotlightFormCard color="green" id="candidate-form">
      <div className="px-6 pt-7 pb-2 md:px-8 md:pt-8">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <h3 className="font-serif text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Join as a candidate
          </h3>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
            Joining
          </span>
        </div>
        <p className="mb-4 text-base leading-relaxed text-slate-500 md:text-lg">
          The role that doesn&apos;t have a job description yet is waiting for
          you.
        </p>
        <InfoBanner
          icon={Sparkles}
          color="green"
          title="Your next chapter starts weird."
          description="In a good way — no bureaucracy, no six-month roadmaps, just you and a founder who needs exactly what you've got."
        />
        <Separator className="mt-5 bg-slate-100" />
      </div>

      <div className="px-6 pb-8 md:px-8">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup className="gap-5 md:gap-6">

            {/* ── Full name ── */}
            <Field>
              <FieldLabel htmlFor="c-fullName" className={labelCls}>
                Your name
              </FieldLabel>
              <GlowField color="green" hasError={!!errors.fullName}>
                <Input
                  id="c-fullName"
                  placeholder="What your future co-workers will Slack you as"
                  className={inputGreenCls}
                  {...register("fullName")}
                  aria-invalid={!!errors.fullName}
                />
              </GlowField>
              {errors.fullName && (
                <FieldDescription className="text-sm text-destructive">
                  {errors.fullName.message}
                </FieldDescription>
              )}
            </Field>

            {/* ── Email ── */}
            <Field>
              <FieldLabel htmlFor="c-email" className={labelCls}>
                Email address
              </FieldLabel>
              <GlowField color="green" hasError={!!errors.email}>
                <Input
                  id="c-email"
                  type="email"
                  placeholder="Not the spam one"
                  className={inputGreenCls}
                  {...register("email")}
                  aria-invalid={!!errors.email}
                />
              </GlowField>
              {errors.email && (
                <FieldDescription className="text-sm text-destructive">
                  {errors.email.message}
                </FieldDescription>
              )}
            </Field>

            {/* ── LinkedIn ── */}
            <Field>
              <FieldLabel htmlFor="c-linkedin" className={labelCls}>
                Your LinkedIn
              </FieldLabel>
              <GlowField color="green" hasError={!!errors.linkedinUrl}>
                <Input
                  id="c-linkedin"
                  placeholder="https://linkedin.com/in/you — stalking is how we say we care"
                  className={inputGreenCls}
                  {...register("linkedinUrl")}
                  aria-invalid={!!errors.linkedinUrl}
                />
              </GlowField>
              {errors.linkedinUrl && (
                <FieldDescription className="text-sm text-destructive">
                  {errors.linkedinUrl.message}
                </FieldDescription>
              )}
            </Field>

            {/* ── Background ── */}
            <Field>
              <FieldLabel htmlFor="c-background" className={labelCls}>
                What do you do better than most?
              </FieldLabel>
              <GlowField color="green" hasError={!!errors.background}>
                <Input
                  id="c-background"
                  placeholder="e.g. I make complicated things work and make it look easy"
                  className={inputGreenCls}
                  {...register("background")}
                  aria-invalid={!!errors.background}
                />
              </GlowField>
              {errors.background && (
                <FieldDescription className="text-sm text-destructive">
                  {errors.background.message}
                </FieldDescription>
              )}
            </Field>

            {/* ── Weird superpower ── */}
            <Field>
              <FieldLabel htmlFor="c-snackAnswer" className={labelCls}>
                The weird thing that actually makes you faster
              </FieldLabel>
              <GlowField color="green" hasError={!!errors.snackAnswer}>
                <Input
                  id="c-snackAnswer"
                  placeholder="e.g. I talk to rubber ducks but they're named after ex-managers"
                  className={inputGreenCls}
                  {...register("snackAnswer")}
                  aria-invalid={!!errors.snackAnswer}
                />
              </GlowField>
              {errors.snackAnswer && (
                <FieldDescription className="text-sm text-destructive">
                  {errors.snackAnswer.message}
                </FieldDescription>
              )}
            </Field>

            {/* ── Mission interest ── */}
            <Field>
              <FieldLabel htmlFor="c-missionInterest" className={labelCls}>
                What problem makes you stay up at night?
              </FieldLabel>
              <GlowField color="green" hasError={!!errors.missionInterest}>
                <Textarea
                  id="c-missionInterest"
                  placeholder="Climate, health, dev tools, the thing nobody else is fixing…"
                  rows={3}
                  className={textareaGreenCls}
                  {...register("missionInterest")}
                  aria-invalid={!!errors.missionInterest}
                />
              </GlowField>
              {errors.missionInterest && (
                <FieldDescription className="text-sm text-destructive">
                  {errors.missionInterest.message}
                </FieldDescription>
              )}
            </Field>

            {/* ── Submit ── */}
            <Field>
              <ShimmerButton
                type="submit"
                disabled={isSubmitting}
                background="linear-gradient(135deg, #047857 0%, #059669 60%, #10b981 100%)"
                className="shadow-emerald-200/60"
              >
                {isSubmitting ? "Saving your spot…" : "I want in →"}
              </ShimmerButton>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </SpotlightFormCard>
  );
}

/* ─── Combined Section ──────────────────────────────────────── */
export function SignupForms() {
  return (
    <section
      id="contact"
      className="w-full border-t border-slate-200/60 bg-[#FAF9F6] pt-12 pb-20 md:pt-16 md:pb-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 md:mb-14"
        >
          <h2 className="mb-3 font-serif text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            Get early access
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-slate-500 md:text-xl">
            Tell us who you are — we&apos;ll take it from there.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0 }}
          >
            <FounderForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.12 }}
          >
            <CandidateForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
