import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Shield, Building2, HandHeart, User, ArrowRight, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import type { Role } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Saarthi AI" },
      {
        name: "description",
        content:
          "Choose your role to sign in to Saarthi AI — Admin, NGO, Volunteer or Citizen.",
      },
    ],
  }),
  component: LoginChoice,
});

interface RoleCard {
  role: Role;
  to: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  gradient: string;
}

const ROLES: RoleCard[] = [
  {
    role: "admin",
    to: "/login/admin",
    title: "Admin",
    desc: "Platform oversight, self-healing controls and user management.",
    icon: Shield,
    gradient: "from-primary to-primary/80",
  },
  {
    role: "ngo",
    to: "/login/ngo",
    title: "NGO Partner",
    desc: "Manage issues, dispatch volunteers and view the live issues map.",
    icon: Building2,
    gradient: "from-emerald-600 to-primary",
  },
  {
    role: "volunteer",
    to: "/login/volunteer",
    title: "Volunteer",
    desc: "View tasks on the map, update status, chat with your NGO.",
    icon: HandHeart,
    gradient: "from-accent to-amber-500",
  },
  {
    role: "public",
    to: "/login/public",
    title: "Citizen",
    desc: "Report issues via form, IVR call or WhatsApp and track them.",
    icon: User,
    gradient: "from-sky-500 to-primary",
  },
];

function LoginChoice() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  if (pathname !== "/login") {
    return <Outlet />;
  }

  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-section py-16 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(800px 400px at 10% 0%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%), radial-gradient(600px 400px at 90% 100%, color-mix(in oklab, var(--accent) 14%, transparent), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" /> Welcome back
              </span>
              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
                Sign in to Saarthi AI
              </h1>
              <p className="mt-3 text-base text-muted-foreground sm:text-lg">
                Choose the portal you want to access. Each role has its own dedicated
                workspace and features.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:gap-6">
            {ROLES.map((r, i) => (
              <Reveal key={r.role} delay={i * 80}>
                <Link
                  to={r.to}
                  className="group relative block overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:p-7"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${r.gradient} opacity-80`}
                  />
                  <div className="flex items-start gap-4">
                    <span
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${r.gradient} text-white shadow-soft transition-transform duration-300 group-hover:scale-110`}
                    >
                      <r.icon className="h-6 w-6" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">{r.title}</h2>
                        <ArrowRight className="h-4 w-4 -translate-x-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-primary" />
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
                      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">
                        Sign in as {r.title} →
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="mt-10 text-center text-sm text-muted-foreground">
              No account yet? Each role onboards differently — reach out at{" "}
              <a className="text-primary hover:underline" href="mailto:hello@saarthi.ai">
                hello@saarthi.ai
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
