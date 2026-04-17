import { VOLUNTEERS } from "@/lib/mock-data";

export function Volunteers() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">
            Our People
          </span>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            Meet the Volunteers Behind <br className="hidden sm:block" />
            <span className="text-primary">Every Success Story.</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VOLUNTEERS.map((v) => (
            <div
              key={v.name}
              className="group overflow-hidden rounded-2xl bg-card shadow-card transition hover:shadow-elevated"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={v.image}
                  alt={v.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="font-semibold">{v.name}</h3>
                <p className="text-sm text-muted-foreground">{v.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
