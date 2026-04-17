import { createFileRoute, Link } from "@tanstack/react-router";
import { ClipboardList, Users, AlertTriangle, CheckCircle2 } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { NGO_ISSUES } from "@/lib/mock-data";
import { UrgencyBadge, StatusBadge } from "./dashboard.admin.index";

export const Route = createFileRoute("/dashboard/ngo/")({
  head: () => ({ meta: [{ title: "NGO Dashboard — Saarthi AI" }] }),
  component: NgoOverview,
});

function NgoOverview() {
  return (
    <DashboardLayout title="Helping Hands Foundation" subtitle="Your impact this month, at a glance.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Open Issues" value={42} change="+8%" icon={ClipboardList} tone="primary" />
        <StatCard label="Active Volunteers" value={48} change="+3%" icon={Users} tone="accent" />
        <StatCard label="Urgent" value={6} change="-2%" icon={AlertTriangle} tone="destructive" />
        <StatCard label="Resolved (30d)" value={134} change="+22%" icon={CheckCircle2} tone="success" />
      </div>

      <div className="mt-6 rounded-2xl bg-card p-5 shadow-soft border border-border/60">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Recent Issues</h2>
          <Button asChild size="sm" variant="outline"><Link to="/dashboard/ngo/issues">View all</Link></Button>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {NGO_ISSUES.slice(0, 4).map((i) => (
            <div key={i.id} className="rounded-xl border border-border bg-background p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">{i.id}</span>
                <UrgencyBadge urgency={i.urgency} />
              </div>
              <p className="mt-2 font-medium">{i.title}</p>
              <p className="text-xs text-muted-foreground">{i.category}</p>
              <div className="mt-3 flex items-center justify-between">
                <StatusBadge status={i.status} />
                <span className="text-xs text-muted-foreground">{i.assigned}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
