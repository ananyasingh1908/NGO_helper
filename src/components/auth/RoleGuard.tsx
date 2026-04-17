import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth, ROLE_HOME, ROLE_LOGIN, type Role } from "@/lib/auth";

interface Props {
  allow: Role;
  children: React.ReactNode;
}

/**
 * Strict role guard.
 * - No session → redirect to that role's login page.
 * - Wrong role → redirect to their own dashboard home.
 */
export function RoleGuard({ allow, children }: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate({ to: ROLE_LOGIN[allow] });
      return;
    }
    if (user.role !== allow) {
      navigate({ to: ROLE_HOME[user.role] });
    }
  }, [user, allow, navigate]);

  if (!user || user.role !== allow) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-section">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          Verifying access…
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
