import { Resend } from "resend";
import FounderWelcomeEmail from "@/emails/founder-welcome";
import CandidateWelcomeEmail from "@/emails/candidate-welcome";
import type { FounderWelcomeEmailProps } from "@/emails/founder-welcome";
import type { CandidateWelcomeEmailProps } from "@/emails/candidate-welcome";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function getFrom(): string {
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (from) return from;
  return "Shosu <onboarding@resend.dev>";
}

/** After DB success: send welcome; failures only log — signup still counts. */
export async function sendFounderWelcome(
  to: string,
  props: FounderWelcomeEmailProps,
): Promise<void> {
  const resend = getResend();
  if (!resend) {
    console.warn(
      "[email] RESEND_API_KEY missing — skipping founder welcome",
    );
    return;
  }

  const { error } = await resend.emails.send({
    from: getFrom(),
    to,
    subject: "Shhhhhhhhhh — you're in (founder)",
    react: FounderWelcomeEmail(props),
  });

  if (error) {
    console.error("[email] founder welcome failed:", error.message);
  }
}

export async function sendCandidateWelcome(
  to: string,
  props: CandidateWelcomeEmailProps,
): Promise<void> {
  const resend = getResend();
  if (!resend) {
    console.warn(
      "[email] RESEND_API_KEY missing — skipping candidate welcome",
    );
    return;
  }

  const { error } = await resend.emails.send({
    from: getFrom(),
    to,
    subject: "Shhhhhhhhhh — you're in (candidate)",
    react: CandidateWelcomeEmail(props),
  });

  if (error) {
    console.error("[email] candidate welcome failed:", error.message);
  }
}
