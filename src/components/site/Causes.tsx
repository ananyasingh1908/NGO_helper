import { ArrowUpRight } from "lucide-react";
import { CAUSES } from "@/lib/mock-data";
import { Reveal } from "./Reveal";

const urgencyTone: Record<string, string> = {
  Critical: "bg-destructive/10 text-destructive",
  High: "bg-accent/15 text-accent-foreground",
  Medium: "bg-primary-soft text-primary",
};

export function Causes() {
  return (
    <section className="bg-section py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-accent">
                Featured Causes
              </span>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                Find a Cause Worth <span className="text-primary">Your Time.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              Live campaigns currently powered by Saarthi AI. Every action you take
              helps us reroute resources where they're needed most.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CAUSES.map((c, i) => {
            const pct = Math.round((c.raised / c.goal) * 100);
            return (
              <Reveal key={c.id} delay={i * 100}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-elevated">
                  <div className="relative aspect-[5/3] overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    <span
                      className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${urgencyTone[c.urgency] ?? ""}`}
                    >
                      {c.urgency} priority
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-semibold leading-snug">{c.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">
                      {c.description}
                    </p>

                    <div className="mt-5">
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span className="text-muted-foreground">Raised</span>
                        <span className="text-primary">{pct}%</span>
                      </div>
                      <div className="mt-1.5 h-2 w-full rounded-full bg-secondary">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-primary to-accent"
                          style={{ width: `${Math.min(100, pct)}%` }}
                        />
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <span>₹{c.raised.toLocaleString()}</span>
                        <span>Goal ₹{c.goal.toLocaleString()}</span>
                      </div>
                    </div>

                    <button className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2">
                      Support this cause <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
