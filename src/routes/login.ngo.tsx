import { Building2 } from "lucide-react";
import { buildLoginRoute } from "@/components/auth/RoleLoginPage";

export const Route = buildLoginRoute("/login/ngo", {
  role: "ngo",
  icon: Building2,
  bullets: [
    "Real-time live issues map for your zone",
    "Create issues and assign volunteers",
    "Track resolution SLAs and performance",
    "Direct messaging with field volunteers",
  ],
  hint: "For verified NGO partners and coordinators.",
});
