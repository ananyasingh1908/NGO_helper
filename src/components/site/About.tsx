import { CheckCircle2, Users, Activity } from "lucide-react";
import { ABOUT_IMAGE } from "@/lib/mock-data";
import { Reveal } from "./Reveal";

const points = [
  {
    icon: Activity,
    title: "Real-time issue routing",
    text: "AI matches every reported issue to the nearest qualified volunteer or NGO.",
  },
  {
    icon: Users,
    title: "Self-healing operations",
    text: "Delayed or failed tasks are auto-reassigned before they impact lives.",
  },
  {
    icon: CheckCircle2,
    title: "Transparent impact",
    text: "Citizens can track every report from submitted to resolved.",
  },
];

export function About() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-primary-soft -z-10" />
            <img
              src={ABOUT_IMAGE}
              alt="Volunteers and community members working together"
              className="rounded-2xl object-cover shadow-card aspect-[4/3] w-full transition duration-500 hover:scale-[1.02] hover:shadow-elevated"
            />
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-card p-4 shadow-elevated sm:block">
              <p className="text-3xl font-bold text-primary">98%</p>
              <p className="text-xs text-muted-foreground">Issues acknowledged in &lt; 30 min</p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal delay={80}>
            <span className="text-sm font-semibold uppercase tracking-wider text-accent">
              Welcome to Saarthi
            </span>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              You're the Hope of <span className="text-primary">Others.</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Saarthi AI is a smart platform that helps governments, NGOs and citizens
              allocate volunteer time, donations and emergency resources where they
              matter most. From a pothole on your street to disaster relief at scale —
              we orchestrate help intelligently.
            </p>
          </Reveal>

          <ul className="mt-8 space-y-5">
            {points.map((p, i) => (
              <Reveal key={p.title} delay={150 + i * 80}>
                <li className="group flex gap-4 rounded-xl p-2 -mx-2 transition hover:bg-secondary/40">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary transition group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="text-sm text-muted-foreground">{p.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
