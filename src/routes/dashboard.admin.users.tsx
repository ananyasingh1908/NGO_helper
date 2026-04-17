import { createFileRoute } from "@tanstack/react-router";
import { Search, MoreVertical } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/admin/users")({
  head: () => ({ meta: [{ title: "Users & NGOs — Saarthi AI" }] }),
  component: UsersPage,
});

const USERS = [
  { name: "Helping Hands Foundation", type: "NGO", location: "Bengaluru", status: "Verified", count: "48 volunteers" },
  { name: "CleanCity Initiative", type: "NGO", location: "Mumbai", status: "Verified", count: "32 volunteers" },
  { name: "Aanya Sharma", type: "Volunteer", location: "Bengaluru", status: "Active", count: "24 tasks done" },
  { name: "Rohan Mehta", type: "Volunteer", location: "Bengaluru", status: "Active", count: "31 tasks done" },
  { name: "Karthik R.", type: "Public", location: "Bengaluru", status: "Active", count: "12 reports" },
  { name: "Project Annapurna", type: "NGO", location: "Delhi", status: "Pending", count: "—" },
];

function UsersPage() {
  return (
    <DashboardLayout title="Users & NGOs" subtitle="Manage onboarded organizations and individuals.">
      <div className="rounded-2xl bg-card p-5 shadow-soft border border-border/60">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-1.5 text-sm w-full sm:w-80">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input className="w-full bg-transparent outline-none" placeholder="Search users…" />
          </div>
          <Button>Invite User</Button>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr className="border-b border-border">
                <th className="py-2 pr-3">Name</th>
                <th className="py-2 pr-3">Type</th>
                <th className="py-2 pr-3">Location</th>
                <th className="py-2 pr-3">Status</th>
                <th className="py-2 pr-3">Activity</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {USERS.map((u) => (
                <tr key={u.name} className="border-b border-border last:border-0">
                  <td className="py-3 pr-3 font-medium">{u.name}</td>
                  <td className="py-3 pr-3">
                    <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold">{u.type}</span>
                  </td>
                  <td className="py-3 pr-3 text-muted-foreground">{u.location}</td>
                  <td className="py-3 pr-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        u.status === "Verified" || u.status === "Active"
                          ? "bg-success/10 text-success"
                          : "bg-accent/15 text-accent-foreground"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 pr-3 text-muted-foreground">{u.count}</td>
                  <td className="py-3 text-right">
                    <button className="rounded-md p-1 text-muted-foreground hover:bg-secondary">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
