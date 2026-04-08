import { NextResponse } from "next/server";
import { founderSchema } from "@/lib/signup-schemas";
import { createSignupClient } from "@/lib/supabase/server";
import { sendFounderWelcome } from "@/lib/email/send-welcome";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = founderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const d = parsed.data;

  try {
    const supabase = createSignupClient();
    const { error } = await supabase.from("founders").insert({
      full_name: d.fullName,
      email: d.email.trim().toLowerCase(),
      startup_name: d.startupName,
      linkedin_url: d.linkedinUrl,
      company_linkedin_url: d.companyLinkedinUrl || null,
      company_website: d.companyWebsite || null,
      description: d.description.trim() || null,
      is_stealth: d.isStealth,
      team_size: d.teamSize,
      funds_raised: d.fundsRaised,
      job_title: d.jobTitle,
      office_location: d.officeLocation,
      work_policy: d.workPolicy,
    });

    if (error) {
      console.error("Supabase founders insert:", error.message);
      return NextResponse.json(
        { error: "Could not save signup. Try again later." },
        { status: 500 },
      );
    }

    const to = d.email.trim().toLowerCase();
    void sendFounderWelcome(to, {
      fullName: d.fullName,
      startupName: d.startupName,
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    console.error("signup/founder", e);
    return NextResponse.json(
      { error: "Server misconfigured or unavailable." },
      { status: 500 },
    );
  }
}
