import { HandHeart } from "lucide-react";
import { buildLoginRoute } from "@/components/auth/RoleLoginPage";

export const Route = buildLoginRoute("/login/volunteer", {
  role: "volunteer",
  icon: HandHeart,
  bullets: [
    "See nearby tasks on a live map",
    "Update task status from the field",
    "Chat directly with your NGO coordinator",
    "Manage skills, availability and profile",
  ],
  hint: "For onboarded Saarthi volunteers.",
});
