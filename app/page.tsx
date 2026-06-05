import { Hero } from "@/components/sections/Hero";
import { Trust } from "@/components/sections/Trust";
import { PainPoints } from "@/components/sections/PainPoints";
import { Services } from "@/components/sections/Services";
import { WeekComparison } from "@/components/sections/WeekComparison";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SystemArchitecture } from "@/components/sections/SystemArchitecture";
import { Industries } from "@/components/sections/Industries";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { WhyBellona } from "@/components/sections/WhyBellona";
import { Team } from "@/components/sections/Team";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Trust />
      <PainPoints />
      <Services />
      <WeekComparison />
      <HowItWorks />
      <SystemArchitecture />
      <Industries />
      <CaseStudies />
      <WhyBellona />
      <Team />
      <FAQ />
      <FinalCTA />
    </>
  );
}
