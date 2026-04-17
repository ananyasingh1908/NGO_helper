import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { About } from "@/components/site/About";
import { Stats } from "@/components/site/Stats";
import { Testimonials } from "@/components/site/Testimonials";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Saarthi AI" },
      { name: "description", content: "Learn how Saarthi AI uses smart allocation to amplify community impact." },
      { property: "og:title", content: "About Saarthi AI" },
      { property: "og:description", content: "How we orchestrate help intelligently across India." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">About Saarthi AI</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/85">
            A modern allocation engine for civic action — built so every reported
            issue meets the right responder.
          </p>
        </div>
      </section>
      <About />
      <Stats />
      <Testimonials />
    </SiteLayout>
  );
}
