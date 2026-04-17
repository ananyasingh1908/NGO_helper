import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, ClipboardList } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { UrgencyBadge, StatusBadge } from "./dashboard.admin.index";

export const Route = createFileRoute("/dashboard/public/")({
  head: () => ({ meta: [{ title: "My Reports — Saarthi AI" }] }),
  component: PublicDashboard,
});

const MY_REPORTS = [
  { id: "SR-3201", title: "Streetlight outage near 5th Main", category: "Utilities", urgency: "Medium", status: "In Progress", date: "12 Apr" },
  { id: "SR-3187", title: "Garbage overflow at park gate", category: "Sanitation", urgency: "High", status: "Resolved", date: "08 Apr" },
  { id: "SR-3155", title: "Pothole on 2nd Cross", category: "Infrastructure", urgency: "Medium", status: "Resolved", date: "01 Apr" },
];

function PublicDashboard() {
  return (
    <DashboardLayout title="Your Reports" subtitle="Track every issue you've submitted.">
      <div className="rounded-2xl bg-card p-5 shadow-soft border border-border/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-primary" />
            <h2 className="font-semibold">{MY_REPORTS.length} active reports</h2>
          </div>
          <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/report"><Plus className="mr-1 h-4 w-4" /> New report</Link>
          </Button>
        </div>

        <div className="mt-5 space-y-3">
          {MY_REPORTS.map((r) => (
            <div key={r.id} className="rounded-xl border border-border bg-background p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{r.id}</span>
                    <UrgencyBadge urgency={r.urgency} />
                  </div>
                  <p className="mt-1.5 font-medium">{r.title}</p>
                  <p className="text-xs text-muted-foreground">{r.category} · Reported {r.date}</p>
                </div>
                <StatusBadge status={r.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
