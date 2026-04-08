import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TestimonialsMarquee } from "@/components/sections/TestimonialsMarquee";
import { Stats } from "@/components/sections/Stats";
import { Problem } from "@/components/sections/Problem";
import { OriginStory } from "@/components/sections/OriginStory";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FinalCta } from "@/components/sections/FinalCta";
import { SignupForms } from "@/components/sections/SignupForms";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Problem />
        <OriginStory />
        <HowItWorks />
        <TestimonialsMarquee />
        <FinalCta />
        <SignupForms />
      </main>
      <Footer />
    </>
  );
}
