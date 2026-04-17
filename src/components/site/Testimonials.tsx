import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/mock-data";
import { Reveal } from "./Reveal";

export function Testimonials() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-accent">
              Voices of Impact
            </span>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              What Our Community <span className="text-primary">Says.</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="group relative h-full rounded-2xl bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated">
                <Quote className="absolute right-5 top-5 h-8 w-8 text-primary-soft transition group-hover:scale-110 group-hover:text-primary/30" />
                <blockquote className="text-sm leading-relaxed text-foreground/90">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-transparent transition group-hover:ring-primary/30"
                  />
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
