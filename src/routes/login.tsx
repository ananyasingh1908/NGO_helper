import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Shield, Building2, HandHeart, User, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { useAuth, ROLE_HOME, type Role } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Saarthi AI" },
      { name: "description", content: "Sign in to your Saarthi AI dashboard." },
    ],
  }),
  component: LoginPage,
});

const ROLES: {
  value: Role;
  title: string;
  desc: string;
  icon: typeof Shield;
}[] = [
  { value: "admin", title: "Admin", desc: "Platform-wide oversight & self-healing controls", icon: Shield },
  { value: "ngo", title: "NGO", desc: "Manage issues, tasks and volunteer assignments", icon: Building2 },
  { value: "volunteer", title: "Volunteer", desc: "View tasks, update status, chat with NGO", icon: HandHeart },
  { value: "public", title: "Public User", desc: "Report issues and track your submissions", icon: User },
];

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("admin");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
    navigate({ to: ROLE_HOME[role] });
  };

  return (
    <SiteLayout>
      <section className="bg-section py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-stretch gap-8 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-2 rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-8 text-primary-foreground shadow-card">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/15">
              <Sparkles className="h-5 w-5" />
            </span>
            <h1 className="mt-4 text-3xl font-bold">Welcome back to Saarthi AI</h1>
            <p className="mt-3 text-primary-foreground/80">
              Pick a role to preview the matching dashboard. (Mock authentication —
              no real backend yet.)
            </p>
            <ul className="mt-8 space-y-3 text-sm text-primary-foreground/85">
              <li>• Live self-healing monitoring</li>
              <li>• Real-time task allocation</li>
              <li>• NGO ↔ Volunteer messaging</li>
              <li>• Issue analytics & reports</li>
            </ul>
          </div>

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 rounded-3xl bg-card p-6 shadow-card sm:p-8"
          >
            <h2 className="text-xl font-semibold">Sign in</h2>
            <p className="text-sm text-muted-foreground">Select your role to continue.</p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {ROLES.map((r) => {
                const active = role === r.value;
                return (
                  <button
                    type="button"
                    key={r.value}
                    onClick={() => setRole(r.value)}
                    className={`flex items-start gap-3 rounded-xl border-2 p-4 text-left transition ${
                      active
                        ? "border-primary bg-primary-soft"
                        : "border-border hover:border-primary/40 hover:bg-secondary"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${
                        active ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground/70"
                      }`}
                    >
                      <r.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-semibold">{r.title}</p>
                      <p className="text-xs text-muted-foreground">{r.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 grid gap-4">
              <label className="text-sm font-medium">
                Email (optional for demo)
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-1.5 block w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <label className="text-sm font-medium">
                Password
                <input
                  type="password"
                  placeholder="••••••••"
                  className="mt-1.5 block w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
            </div>

            <Button type="submit" size="lg" className="mt-6 w-full">
              Continue as {ROLES.find((r) => r.value === role)?.title}
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              No account? Just pick a role — this is a demo experience.
            </p>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
