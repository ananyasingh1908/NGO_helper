import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { LiveIssuesMap } from "@/components/map/LiveIssuesMap";
import { RoleGuard } from "@/components/auth/RoleGuard";

export const Route = createFileRoute("/dashboard/ngo/map")({
  head: () => ({
    meta: [
      { title: "Live Issues Map — NGO | Saarthi AI" },
      { name: "description", content: "Real-time map of community issues for NGO coordinators." },
    ],
  }),
  component: () => (
    <RoleGuard allow="ngo">
      <DashboardLayout
        title="Live Issues Map"
        subtitle="Real-time view of all reported issues in your operating zone."
      >
        <LiveIssuesMap variant="ngo" />
      </DashboardLayout>
    </RoleGuard>
  ),
});
