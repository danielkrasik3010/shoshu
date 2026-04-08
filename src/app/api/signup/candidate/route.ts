import { NextResponse } from "next/server";
import { candidateSchema } from "@/lib/signup-schemas";
import { createSignupClient } from "@/lib/supabase/server";
import { sendCandidateWelcome } from "@/lib/email/send-welcome";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = candidateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const d = parsed.data;

  try {
    const supabase = createSignupClient();
    const { error } = await supabase.from("candidates").insert({
      full_name: d.fullName,
      email: d.email.trim().toLowerCase(),
      linkedin_url: d.linkedinUrl,
      background: d.background,
      snack_answer: d.snackAnswer,
      mission_interest: d.missionInterest,
    });

    if (error) {
      console.error("Supabase candidates insert:", error.message);
      return NextResponse.json(
        { error: "Could not save signup. Try again later." },
        { status: 500 },
      );
    }

    const to = d.email.trim().toLowerCase();
    void sendCandidateWelcome(to, { fullName: d.fullName });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    console.error("signup/candidate", e);
    return NextResponse.json(
      { error: "Server misconfigured or unavailable." },
      { status: 500 },
    );
  }
}
