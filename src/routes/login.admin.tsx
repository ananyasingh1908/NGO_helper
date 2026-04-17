import { Shield } from "lucide-react";
import { buildLoginRoute } from "@/components/auth/RoleLoginPage";

export const Route = buildLoginRoute("/login/admin", {
  role: "admin",
  icon: Shield,
  bullets: [
    "Live self-healing system & auto-reassignment",
    "Cross-organization analytics & reports",
    "Manage users, NGOs and permissions",
    "Issue priority escalation controls",
  ],
  hint: "Restricted to platform administrators only.",
});
