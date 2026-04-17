import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList, Users, AlertTriangle, CheckCircle2, Activity } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { ADMIN_STATS, ACTIVITY_TIMELINE, NGO_ISSUES } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/admin/")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Saarthi AI" }] }),
  component: () => <RoleGuard allow="admin"><AdminOverview /></RoleGuard>,
});

const ICONS = [ClipboardList, Users, AlertTriangle, CheckCircle2];

function AdminOverview() {
  return (
    <DashboardLayout
      title="Welcome back, Asha 👋"
      subtitle="Here's what's happening across Saarthi AI today."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ADMIN_STATS.map((s, i) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.value.toLocaleString()}
            change={s.change}
            icon={ICONS[i]}
            tone={s.tone}
          />
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl bg-card p-5 shadow-soft border border-border/60">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Recent Issues</h2>
            <button className="text-xs font-medium text-primary hover:underline">View all</button>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="py-2 pr-3">ID</th>
                  <th className="py-2 pr-3">Title</th>
                  <th className="py-2 pr-3">Urgency</th>
                  <th className="py-2 pr-3">Status</th>
                  <th className="py-2">Assigned</th>
                </tr>
              </thead>
              <tbody>
                {NGO_ISSUES.map((i) => (
                  <tr key={i.id} className="border-b border-border last:border-0">
                    <td className="py-3 pr-3 font-mono text-xs text-muted-foreground">{i.id}</td>
                    <td className="py-3 pr-3 font-medium">{i.title}</td>
                    <td className="py-3 pr-3">
                      <UrgencyBadge urgency={i.urgency} />
                    </td>
                    <td className="py-3 pr-3">
                      <StatusBadge status={i.status} />
                    </td>
                    <td className="py-3 text-muted-foreground">{i.assigned}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl bg-card p-5 shadow-soft border border-border/60">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <h2 className="font-semibold">Activity Feed</h2>
          </div>
          <ul className="mt-4 space-y-4">
            {ACTIVITY_TIMELINE.map((a, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1 flex-shrink-0 h-2 w-2 rounded-full bg-primary" />
                <div>
                  <p className="text-sm">{a.text}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}

export function UrgencyBadge({ urgency }: { urgency: string }) {
  const map: Record<string, string> = {
    Critical: "bg-destructive/10 text-destructive",
    High: "bg-accent/15 text-accent-foreground",
    Medium: "bg-primary-soft text-primary",
    Low: "bg-secondary text-foreground/70",
  };
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${map[urgency] ?? ""}`}>{urgency}</span>;
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "In Progress": "bg-primary-soft text-primary",
    Open: "bg-accent/15 text-accent-foreground",
    Resolved: "bg-success/10 text-success",
    Pending: "bg-secondary text-foreground/70",
    Completed: "bg-success/10 text-success",
  };
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${map[status] ?? "bg-secondary text-foreground/70"}`}>{status}</span>;
}
