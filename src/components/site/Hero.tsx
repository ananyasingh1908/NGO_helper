import { Link } from "@tanstack/react-router";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO_IMAGE } from "@/lib/mock-data";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Volunteers helping children in a community program"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-foreground/20" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-2 lg:px-8 lg:py-40">
        <div className="text-background">
          <span className="inline-flex items-center gap-2 rounded-full bg-background/10 px-3 py-1 text-xs font-medium text-background backdrop-blur">
            <Heart className="h-3.5 w-3.5 text-accent" /> Saarthi AI · Smart Resource Allocation
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            Give Them a Chance.<br />
            <span className="text-accent">Be Their Saarthi.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-background/80 sm:text-lg">
            We connect citizens, NGOs and volunteers with AI-driven task allocation —
            so help reaches the right place, at the right time, every time.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-card"
            >
              <Link to="/report">
                Report an Issue <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-background/40 bg-background/5 text-background hover:bg-background/15"
            >
              <Link to="/login">Get Involved</Link>
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-background/80">
            <div className="flex -space-x-2">
              {[
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=70",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=70",
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=70",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=70",
              ].map((src) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="h-9 w-9 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
            <p>
              Joined by <span className="font-semibold text-background">3,200+</span> volunteers across India.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
