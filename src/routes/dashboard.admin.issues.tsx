import { createFileRoute } from "@tanstack/react-router";
import { Search, Filter } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { NGO_ISSUES } from "@/lib/mock-data";
import { UrgencyBadge, StatusBadge } from "./dashboard.admin.index";

export const Route = createFileRoute("/dashboard/admin/issues")({
  head: () => ({ meta: [{ title: "All Issues — Saarthi AI" }] }),
  component: () => <RoleGuard allow="admin"><AdminIssuesPage /></RoleGuard>,
});

function AdminIssuesPage() {
  return (
    <DashboardLayout title="All Issues" subtitle="Every reported issue across the platform.">
      <div className="rounded-2xl bg-card p-5 shadow-soft border border-border/60">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-1.5 text-sm w-full sm:w-80">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input className="w-full bg-transparent outline-none" placeholder="Search by title or ID…" />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <button className="inline-flex items-center gap-1 rounded-lg border border-input px-3 py-1.5 hover:bg-secondary">
              <Filter className="h-4 w-4" /> Filter
            </button>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr className="border-b border-border">
                <th className="py-2 pr-3">ID</th>
                <th className="py-2 pr-3">Title</th>
                <th className="py-2 pr-3">Category</th>
                <th className="py-2 pr-3">Urgency</th>
                <th className="py-2 pr-3">Status</th>
                <th className="py-2">Assigned</th>
              </tr>
            </thead>
            <tbody>
              {[...NGO_ISSUES, ...NGO_ISSUES].map((i, idx) => (
                <tr key={`${i.id}-${idx}`} className="border-b border-border last:border-0">
                  <td className="py-3 pr-3 font-mono text-xs text-muted-foreground">{i.id}</td>
                  <td className="py-3 pr-3 font-medium">{i.title}</td>
                  <td className="py-3 pr-3 text-muted-foreground">{i.category}</td>
                  <td className="py-3 pr-3"><UrgencyBadge urgency={i.urgency} /></td>
                  <td className="py-3 pr-3"><StatusBadge status={i.status} /></td>
                  <td className="py-3 text-muted-foreground">{i.assigned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
