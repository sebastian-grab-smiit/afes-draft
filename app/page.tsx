import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { TargetGroups } from "@/components/sections/target-groups";
import { HowWeWork } from "@/components/sections/how-we-work";
import { ServicesOverview } from "@/components/sections/services-overview";
import { Reputation } from "@/components/sections/reputation";
import { BranchesMap } from "@/components/sections/branches-map";
import { NewsTeaser } from "@/components/sections/news-teaser";
import { FinalCTA } from "@/components/sections/final-cta";
import { NewsDrawer } from "@/components/news-drawer";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TargetGroups />
        <HowWeWork />
        <ServicesOverview />
        <Reputation />
        <BranchesMap />
        <NewsTeaser />
        <FinalCTA />
      </main>
      <Footer />
      <NewsDrawer />
    </>
  );
}
