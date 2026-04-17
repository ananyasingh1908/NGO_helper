import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Causes } from "@/components/site/Causes";
import { CallToAction } from "@/components/site/CallToAction";

export const Route = createFileRoute("/issues")({
  head: () => ({
    meta: [
      { title: "Active Issues — Saarthi AI" },
      { name: "description", content: "Browse community issues currently being addressed by NGOs and volunteers." },
    ],
  }),
  component: IssuesPage,
});

function IssuesPage() {
  return (
    <SiteLayout>
      <section className="bg-section py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">Live Now</span>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Active Community Issues</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            These are the highest-priority causes Saarthi AI is currently routing
            volunteers and resources to.
          </p>
        </div>
      </section>
      <Causes />
      <CallToAction />
    </SiteLayout>
  );
}
