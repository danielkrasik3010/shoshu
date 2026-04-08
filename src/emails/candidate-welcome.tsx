import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export type CandidateWelcomeEmailProps = {
  fullName: string;
};

const main = {
  backgroundColor: "#FAF9F6",
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 24px",
  maxWidth: "560px",
};

const h1 = {
  color: "#0f172a",
  fontSize: "28px",
  fontWeight: "700",
  lineHeight: "1.2",
  margin: "0 0 24px",
  letterSpacing: "-0.02em",
};

const body = {
  color: "#334155",
  fontSize: "16px",
  lineHeight: "1.7",
  margin: "0 0 16px",
};

const muted = {
  color: "#64748b",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "24px 0 0",
};

export default function CandidateWelcomeEmail({
  fullName,
}: CandidateWelcomeEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>
        Shhhhhhhhhh — {fullName}, your next chapter isn&apos;t a job board thing.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading as="h1" style={h1}>
            Shhhhhhhhhh
          </Heading>
          <Section>
            <Text style={body}>
              Hey {fullName} — easy on the noise. You just stepped into something
              a little different.
            </Text>
            <Text style={body}>
              Shosu quietly saved your spot. We&apos;ll match you with early
              founders who need exactly the kind of energy you bring — no six-layer
              hoops, no &quot;we&apos;ll get back to you in 6–8 weeks.&quot;
            </Text>
            <Text style={body}>
              Keep your LinkedIn shiny and your curiosity high. When there&apos;s
              a fit worth your time, we&apos;ll be in touch.
            </Text>
            <Hr style={{ borderColor: "#e2e8f0", margin: "32px 0" }} />
            <Text style={muted}>
              — Shosu · Where the first hires still feel human
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
