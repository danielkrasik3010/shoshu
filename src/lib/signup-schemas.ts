import * as z from "zod";

/** Optional URL — accepts empty string or https://... */
const optionalUrl = z
  .string()
  .refine(
    (val) => val === "" || /^https?:\/\/.+\..+/.test(val),
    "Looks like that's not a valid URL — needs to start with https://",
  )
  .optional();

export const founderSchema = z
  .object({
    fullName: z.string().min(2, "Please enter your full name"),
    email: z.string().email("Please enter a valid email"),
    startupName: z.string().min(1, "Please enter your startup name"),
    linkedinUrl: z
      .string()
      .url("Please enter a valid LinkedIn URL (https://linkedin.com/in/...)"),
    companyLinkedinUrl: optionalUrl,
    companyWebsite: optionalUrl,
    description: z.string(),
    isStealth: z.boolean(),
    teamSize: z.string().min(1, "Please select your current team size"),
    fundsRaised: z.string().min(1, "Please tell us your funding status"),
    jobTitle: z.string().min(2, "Tell us what role you're hiring for"),
    officeLocation: z.string().min(2, "Where's the base?"),
    workPolicy: z.string().min(1, "Please pick a work policy"),
  })
  .superRefine((data, ctx) => {
    if (!data.isStealth) {
      const d = data.description.trim();
      if (d.length < 10) {
        ctx.addIssue({
          code: "custom",
          message: "Please add a short description",
          path: ["description"],
        });
      }
    }
  });

export const candidateSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email"),
  linkedinUrl: z
    .string()
    .url("Please enter a valid LinkedIn URL (https://linkedin.com/in/...)"),
  background: z.string().min(3, "Please describe your background"),
  snackAnswer: z.string().min(3, "Humor us for a second"),
  missionInterest: z.string().min(5, "Tell us what excites you"),
});

export type FounderFormData = z.infer<typeof founderSchema>;
export type CandidateFormData = z.infer<typeof candidateSchema>;
