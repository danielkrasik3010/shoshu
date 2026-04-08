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

export type FounderWelcomeEmailProps = {
  fullName: string;
  startupName: string;
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

export default function FounderWelcomeEmail({
  fullName,
  startupName,
}: FounderWelcomeEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>
        Shhhhhhhhhh — {fullName}, we got you. {startupName} is in the mix.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading as="h1" style={h1}>
            Shhhhhhhhhh
          </Heading>
          <Section>
            <Text style={body}>
              Hey {fullName} — keep it down. There&apos;s something good brewing
              here.
            </Text>
            <Text style={body}>
              Shosu quietly got your founder signup for{" "}
              <strong>{startupName}</strong>. You&apos;re on the list for early
              access, and we&apos;ll reach out when it&apos;s time to connect you
              with people who actually want day-one energy.
            </Text>
            <Text style={body}>
              Until then: build loud, post soft, and maybe tell one friend who
              gets it. We like secrets that travel by whisper.
            </Text>
            <Hr style={{ borderColor: "#e2e8f0", margin: "32px 0" }} />
            <Text style={muted}>
              — Shosu · The early hire, before it&apos;s a job post
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
