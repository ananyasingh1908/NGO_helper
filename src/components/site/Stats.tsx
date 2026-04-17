import { STATS } from "@/lib/mock-data";

export function Stats() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-bold sm:text-4xl">{s.value}</p>
            <p className="mt-1 text-sm uppercase tracking-wider text-primary-foreground/75">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
