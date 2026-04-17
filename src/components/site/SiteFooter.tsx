import { Link } from "@tanstack/react-router";
import { Sparkles, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { SITE } from "@/lib/mock-data";

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background mt-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold">{SITE.name}</span>
          </div>
          <p className="mt-4 text-sm text-background/70 leading-relaxed">
            {SITE.description}
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/10 text-background/80 hover:bg-accent hover:text-accent-foreground transition"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-background/90">
            Explore
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-background/70">
            <li><Link to="/" className="hover:text-accent">Home</Link></li>
            <li><Link to="/about" className="hover:text-accent">About</Link></li>
            <li><Link to="/issues" className="hover:text-accent">Issues</Link></li>
            <li><Link to="/volunteers" className="hover:text-accent">Volunteers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-background/90">
            Get Involved
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-background/70">
            <li><Link to="/report" className="hover:text-accent">Report an issue</Link></li>
            <li><Link to="/login" className="hover:text-accent">Volunteer login</Link></li>
            <li><Link to="/login" className="hover:text-accent">NGO partner</Link></li>
            <li><a href="#" className="hover:text-accent">Donate</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-background/90">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-background/70">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-accent" /> {SITE.address}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-accent" /> {SITE.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent" /> {SITE.email}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-background/60 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Built with care for stronger communities.</p>
        </div>
      </div>
    </footer>
  );
}
