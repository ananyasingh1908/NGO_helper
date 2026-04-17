import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Causes } from "@/components/site/Causes";
import { Stats } from "@/components/site/Stats";
import { Volunteers } from "@/components/site/Volunteers";
import { Events } from "@/components/site/Events";
import { Testimonials } from "@/components/site/Testimonials";
import { CallToAction } from "@/components/site/CallToAction";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <About />
      <Causes />
      <Stats />
      <Volunteers />
      <Events />
      <Testimonials />
      <CallToAction />
    </SiteLayout>
  );
}
