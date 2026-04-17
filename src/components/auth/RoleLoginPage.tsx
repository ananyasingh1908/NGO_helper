import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type ComponentType } from "react";
import {
  Shield,
  Building2,
  HandHeart,
  User,
  Sparkles,
  ArrowLeft,
  type LucideIcon,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { useAuth, ROLE_HOME, ROLE_META, type Role } from "@/lib/auth";

interface Config {
  role: Role;
  icon: LucideIcon;
  bullets: string[];
  hint: string;
}

export function buildLoginRoute(path: string, cfg: Config) {
  return createFileRoute(path as any)({
    head: () => ({
      meta: [
        { title: `${ROLE_META[cfg.role].title} — Sign in | Saarthi AI` },
        {
          name: "description",
          content: `Sign in to the ${ROLE_META[cfg.role].title}. ${ROLE_META[cfg.role].tagline}`,
        },
      ],
    }),
    component: () => <RoleLoginPage cfg={cfg} />,
  });
}

export function RoleLoginPage({ cfg }: { cfg: Config }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const meta = ROLE_META[cfg.role];
  const Icon = cfg.icon;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // mock auth — accept anything
    setTimeout(() => {
      login(cfg.role, undefined, email || undefined);
      navigate({ to: ROLE_HOME[cfg.role] });
    }, 350);
  };

  return (
    <SiteLayout>
      <section className="bg-section py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Choose a different role
          </Link>

          <div className="mt-6 grid items-stretch gap-8 lg:grid-cols-5">
            <div
              className={`lg:col-span-2 rounded-3xl bg-gradient-to-br ${meta.accent} p-8 text-white shadow-card`}
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                <Icon className="h-5 w-5" />
              </span>
              <h1 className="mt-5 text-3xl font-bold">{meta.title}</h1>
              <p className="mt-3 text-white/85">{meta.tagline}</p>
              <ul className="mt-8 space-y-3 text-sm text-white/85">
                {cfg.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex items-center gap-2 text-xs text-white/70">
                <Sparkles className="h-3.5 w-3.5" /> Powered by Saarthi AI
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="lg:col-span-3 rounded-3xl bg-card p-6 shadow-card sm:p-8"
            >
              <h2 className="text-xl font-semibold">Sign in to your account</h2>
              <p className="mt-1 text-sm text-muted-foreground">{cfg.hint}</p>

              <div className="mt-6 grid gap-4">
                <label className="text-sm font-medium">
                  Email address
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={`you@${cfg.role}.org`}
                    className="mt-1.5 block w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
                <label className="text-sm font-medium">
                  Password
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="mt-1.5 block w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="mt-6 w-full"
              >
                {submitting ? "Signing in…" : `Continue to ${meta.title}`}
              </Button>

              <div className="mt-5 rounded-lg bg-secondary/60 p-3 text-xs text-muted-foreground">
                <strong className="font-semibold text-foreground">Demo mode:</strong> any
                email/password works. You'll only access the {meta.title} after sign-in.
              </div>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Not the right portal?{" "}
                <Link to="/login" className="font-medium text-primary hover:underline">
                  Switch role
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

// Re-export icons so route files can import without re-adding lucide
export const LOGIN_ICONS = { Shield, Building2, HandHeart, User } as Record<string, ComponentType>;
