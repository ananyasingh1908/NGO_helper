import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { LiveIssuesMap } from "@/components/map/LiveIssuesMap";
import { RoleGuard } from "@/components/auth/RoleGuard";

export const Route = createFileRoute("/dashboard/volunteer/map")({
  head: () => ({
    meta: [
      { title: "Nearby Tasks Map — Volunteer | Saarthi AI" },
      { name: "description", content: "See nearby unassigned tasks on a live map and accept them." },
    ],
  }),
  component: () => (
    <RoleGuard allow="volunteer">
      <DashboardLayout
        title="Nearby Tasks"
        subtitle="See live issues near you. Accept a task to be assigned."
      >
        <LiveIssuesMap variant="volunteer" />
      </DashboardLayout>
    </RoleGuard>
  ),
});
