import { User } from "lucide-react";
import { buildLoginRoute } from "@/components/auth/RoleLoginPage";

export const Route = buildLoginRoute("/login/public", {
  role: "public",
  icon: User,
  bullets: [
    "Report issues by form, IVR call or WhatsApp",
    "Track every report you've submitted",
    "Get notified when help is dispatched",
    "Stay informed about your community",
  ],
  hint: "For citizens reporting issues in their area.",
});
