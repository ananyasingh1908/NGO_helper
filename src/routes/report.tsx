import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, MapPin, Camera } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Report an Issue — Saarthi AI" },
      { name: "description", content: "Report a community issue and Saarthi AI will route it to the right NGO or volunteer." },
    ],
  }),
  component: ReportPage,
});

const CATEGORIES = ["Sanitation", "Infrastructure", "Health", "Education", "Utilities", "Welfare"];
const URGENCY = ["Low", "Medium", "High", "Critical"];

function ReportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: CATEGORIES[0],
    urgency: URGENCY[1],
    location: "",
    description: "",
    name: "",
    phone: "",
  });

  const update = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <SiteLayout>
      <section className="bg-section py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <aside className="lg:col-span-1">
            <span className="text-sm font-semibold uppercase tracking-wider text-accent">
              Public Reporting
            </span>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Report an Issue</h1>
            <p className="mt-3 text-muted-foreground">
              Tell us what's wrong. Saarthi AI will assign the nearest qualified
              volunteer or NGO and keep you posted.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Routed in under 30 minutes",
                "Live status updates",
                "Verified resolution photo",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> {t}
                </li>
              ))}
            </ul>
          </aside>

          <form
            onSubmit={onSubmit}
            className="lg:col-span-2 rounded-3xl bg-card p-6 shadow-card sm:p-8"
          >
            {submitted ? (
              <div className="flex flex-col items-center py-10 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 className="h-7 w-7" />
                </span>
                <h2 className="mt-4 text-xl font-semibold">Issue submitted!</h2>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Reference ID <span className="font-mono">#SR-{Math.floor(Math.random() * 9000) + 1000}</span>.
                  We've routed it to the nearest NGO. You'll get an SMS update soon.
                </p>
                <Button className="mt-6" onClick={() => setSubmitted(false)}>
                  Report another
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-semibold">Tell us what's happening</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Field label="Issue title" className="sm:col-span-2">
                    <input
                      required
                      value={form.title}
                      onChange={(e) => update("title", e.target.value)}
                      placeholder="e.g. Overflowing garbage near park"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Category">
                    <select value={form.category} onChange={(e) => update("category", e.target.value)} className={inputCls}>
                      {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </Field>
                  <Field label="Urgency">
                    <select value={form.urgency} onChange={(e) => update("urgency", e.target.value)} className={inputCls}>
                      {URGENCY.map((u) => <option key={u}>{u}</option>)}
                    </select>
                  </Field>
                  <Field label="Location" className="sm:col-span-2">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <input
                        required
                        value={form.location}
                        onChange={(e) => update("location", e.target.value)}
                        placeholder="Area, landmark or pin"
                        className={`${inputCls} pl-9`}
                      />
                    </div>
                  </Field>
                  <Field label="Description" className="sm:col-span-2">
                    <textarea
                      required
                      rows={4}
                      value={form.description}
                      onChange={(e) => update("description", e.target.value)}
                      placeholder="Add details that help volunteers respond faster…"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Your name">
                    <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Optional" className={inputCls} />
                  </Field>
                  <Field label="Phone">
                    <input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Optional" className={inputCls} />
                  </Field>
                </div>

                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2 text-sm text-muted-foreground hover:border-primary hover:text-primary"
                >
                  <Camera className="h-4 w-4" /> Attach a photo (optional)
                </button>

                <Button type="submit" size="lg" className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Submit Report
                </Button>
              </>
            )}
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

const inputCls =
  "block w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`text-sm font-medium ${className}`}>
      {label}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
