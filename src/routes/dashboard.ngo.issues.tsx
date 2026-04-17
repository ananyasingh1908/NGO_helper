import { createFileRoute } from "@tanstack/react-router";
import { Search, LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { NGO_ISSUES } from "@/lib/mock-data";
import { UrgencyBadge, StatusBadge } from "./dashboard.admin.index";

export const Route = createFileRoute("/dashboard/ngo/issues")({
  head: () => ({ meta: [{ title: "NGO Issues — Saarthi AI" }] }),
  component: () => <RoleGuard allow="ngo"><NgoIssuesPage /></RoleGuard>,
});

function NgoIssuesPage() {
  const [view, setView] = useState<"cards" | "table">("cards");

  return (
    <DashboardLayout title="Issues" subtitle="Track issues your NGO is working on.">
      <div className="rounded-2xl bg-card p-5 shadow-soft border border-border/60">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-1.5 text-sm w-full sm:w-80">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input className="w-full bg-transparent outline-none" placeholder="Search issues…" />
          </div>
          <div className="inline-flex rounded-lg border border-input bg-background p-0.5">
            <button
              onClick={() => setView("cards")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${
                view === "cards" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" /> Cards
            </button>
            <button
              onClick={() => setView("table")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${
                view === "table" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              <List className="h-3.5 w-3.5" /> Table
            </button>
          </div>
        </div>

        {view === "cards" ? (
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {NGO_ISSUES.map((i) => (
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
        ) : (
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
                {NGO_ISSUES.map((i) => (
                  <tr key={i.id} className="border-b border-border last:border-0">
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
        )}
      </div>
    </DashboardLayout>
  );
}
