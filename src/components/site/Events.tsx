import { Calendar, MapPin } from "lucide-react";
import { EVENTS } from "@/lib/mock-data";
import { Reveal } from "./Reveal";

export function Events() {
  return (
    <section className="bg-section py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-accent">
                Get Together
              </span>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                Join Our Upcoming <span className="text-primary">Events.</span>
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {EVENTS.map((e, i) => (
            <Reveal key={e.title} delay={i * 100}>
              <article className="group h-full overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-elevated">
                <div className="relative aspect-[5/3] overflow-hidden">
                  <img
                    src={e.image}
                    alt={e.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute left-4 top-4 rounded-xl bg-accent text-accent-foreground px-3 py-2 text-center shadow-card transition group-hover:scale-110">
                    <p className="text-xs font-semibold uppercase">{e.date.split(" ")[1]}</p>
                    <p className="text-lg font-bold leading-none">{e.date.split(" ")[0]}</p>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold leading-snug">{e.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{e.desc}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> 9:00 AM
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> Bengaluru
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
