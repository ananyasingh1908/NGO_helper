import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Volunteers } from "@/components/site/Volunteers";
import { CallToAction } from "@/components/site/CallToAction";

export const Route = createFileRoute("/volunteers")({
  head: () => ({
    meta: [
      { title: "Volunteers — Saarthi AI" },
      { name: "description", content: "Meet the volunteers powering Saarthi AI's on-ground impact." },
    ],
  }),
  component: VolunteersPage,
});

function VolunteersPage() {
  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Our Volunteers</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/85">
            Real people, real time given. They are the reason Saarthi works.
          </p>
        </div>
      </section>
      <Volunteers />
      <CallToAction />
    </SiteLayout>
  );
}
