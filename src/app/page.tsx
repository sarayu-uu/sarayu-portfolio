import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { FeaturedWork } from "@/components/site/FeaturedWork";
import { Systems } from "@/components/site/Systems";
import { HowIWork } from "@/components/site/HowIWork";
import { Playground } from "@/components/site/Playground";
import { About } from "@/components/site/About";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <FeaturedWork />
        <Systems />
        <HowIWork />
        <Playground />
        <About />
      </main>
    </>
  );
}
