import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Clock, MapPin } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { VOLUNTEER_TASKS } from "@/lib/mock-data";
import { StatusBadge } from "./dashboard.admin.index";

export const Route = createFileRoute("/dashboard/volunteer/")({
  head: () => ({ meta: [{ title: "Volunteer Tasks — Saarthi AI" }] }),
  component: VolunteerOverview,
});

function VolunteerOverview() {
  return (
    <DashboardLayout title="Hello, Rohan 👋" subtitle="Here are your active and upcoming tasks.">
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryTile label="Active" value={1} tone="primary" />
        <SummaryTile label="Pending" value={1} tone="accent" />
        <SummaryTile label="Completed (30d)" value={18} tone="success" />
      </div>

      <div className="mt-6 space-y-3">
        {VOLUNTEER_TASKS.map((t) => (
          <div key={t.id} className="rounded-2xl bg-card p-5 shadow-soft border border-border/60">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                  <StatusBadge status={t.status} />
                </div>
                <p className="mt-1.5 font-medium">{t.title}</p>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {t.due}</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Bengaluru</span>
                </div>
              </div>
              <div className="flex gap-2">
                {t.status !== "Completed" && (
                  <>
                    <Button size="sm" variant="outline">Update</Button>
                    <Button size="sm" className="gap-1 bg-success text-success-foreground hover:bg-success/90">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Mark done
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

function SummaryTile({ label, value, tone }: { label: string; value: number; tone: "primary" | "accent" | "success" }) {
  const colors = {
    primary: "bg-primary-soft text-primary",
    accent: "bg-accent-soft text-accent-foreground",
    success: "bg-success/10 text-success",
  } as const;
  return (
    <div className="rounded-2xl bg-card p-5 shadow-soft border border-border/60">
      <div className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${colors[tone]}`}>
        <CheckCircle2 className="h-4 w-4" />
      </div>
      <p className="mt-3 text-3xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
