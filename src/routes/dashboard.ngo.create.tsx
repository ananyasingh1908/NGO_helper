import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/ngo/create")({
  head: () => ({ meta: [{ title: "Create Issue — Saarthi AI" }] }),
  component: () => <RoleGuard allow="ngo"><CreateIssuePage /></RoleGuard>,
});

const CATEGORIES = ["Sanitation", "Infrastructure", "Health", "Education", "Utilities", "Welfare"];
const URGENCY = ["Low", "Medium", "High", "Critical"];

function CreateIssuePage() {
  const [done, setDone] = useState(false);

  return (
    <DashboardLayout title="Create New Issue" subtitle="Add an issue to the platform and assign volunteers.">
      <div className="grid gap-6 lg:grid-cols-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
          className="lg:col-span-2 rounded-2xl bg-card p-6 shadow-soft border border-border/60"
        >
          {done ? (
            <div className="flex flex-col items-center py-10 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-7 w-7" />
              </span>
              <h2 className="mt-4 text-xl font-semibold">Issue created</h2>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Saarthi AI is matching the closest volunteer now. You'll see updates in your dashboard.
              </p>
              <Button className="mt-6" onClick={() => setDone(false)}>Create another</Button>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Title" className="sm:col-span-2">
                  <input required className={inputCls} placeholder="Short, clear title" />
                </Field>
                <Field label="Category">
                  <select className={inputCls}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
                </Field>
                <Field label="Urgency">
                  <select className={inputCls}>{URGENCY.map((u) => <option key={u}>{u}</option>)}</select>
                </Field>
                <Field label="Location" className="sm:col-span-2">
                  <input required className={inputCls} placeholder="Area or pin location" />
                </Field>
                <Field label="Description" className="sm:col-span-2">
                  <textarea rows={5} className={inputCls} placeholder="Describe the issue in detail" />
                </Field>
                <Field label="Required volunteers">
                  <input type="number" min={1} defaultValue={2} className={inputCls} />
                </Field>
                <Field label="Deadline">
                  <input type="date" className={inputCls} />
                </Field>
              </div>
              <Button type="submit" size="lg" className="mt-6">Publish issue</Button>
            </>
          )}
        </form>

        <aside className="rounded-2xl bg-primary text-primary-foreground p-6 shadow-card">
          <h3 className="font-semibold">Saarthi will:</h3>
          <ul className="mt-3 space-y-3 text-sm text-primary-foreground/85">
            <li>• Auto-assign the closest qualified volunteers</li>
            <li>• Set SLA timers based on urgency</li>
            <li>• Trigger self-healing if the task delays</li>
            <li>• Notify the reporter at every status change</li>
          </ul>
        </aside>
      </div>
    </DashboardLayout>
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
