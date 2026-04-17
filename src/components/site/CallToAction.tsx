import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section className="bg-section py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-10 text-primary-foreground shadow-elevated sm:p-14">
          <div className="grid items-center gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold sm:text-3xl">
                Your one report can change someone's day.
              </h3>
              <p className="mt-2 text-primary-foreground/80">
                Saarthi AI routes every issue to the right hands in minutes. Try it now.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Link to="/report">Report an Issue</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link to="/login">Become a Volunteer</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
