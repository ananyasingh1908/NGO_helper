import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "admin" | "ngo" | "volunteer" | "public";

export interface AuthUser {
  name: string;
  email: string;
  role: Role;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (role: Role, name?: string, email?: string) => void;
  logout: () => void;
}

const STORAGE_KEY = "saarthi.auth";

const defaultName: Record<Role, string> = {
  admin: "Asha Admin",
  ngo: "Helping Hands NGO",
  volunteer: "Rohan Mehta",
  public: "Karthik R.",
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const login = (role: Role, name?: string, email?: string) => {
    const u: AuthUser = {
      name: name || defaultName[role],
      email: email || `${role}@saarthi.ai`,
      role,
    };
    setUser(u);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export const ROLE_HOME: Record<Role, string> = {
  admin: "/dashboard/admin",
  ngo: "/dashboard/ngo",
  volunteer: "/dashboard/volunteer",
  public: "/dashboard/public",
};

export const ROLE_LOGIN: Record<Role, string> = {
  admin: "/login/admin",
  ngo: "/login/ngo",
  volunteer: "/login/volunteer",
  public: "/login/public",
};

export const ROLE_META: Record<Role, { title: string; tagline: string; accent: string }> = {
  admin: {
    title: "Admin Portal",
    tagline: "Platform-wide oversight, self-healing controls, and user management.",
    accent: "from-primary to-primary/80",
  },
  ngo: {
    title: "NGO Portal",
    tagline: "Manage issues, dispatch volunteers, and track outcomes in real time.",
    accent: "from-emerald-600 to-primary",
  },
  volunteer: {
    title: "Volunteer Portal",
    tagline: "View your tasks, update progress, and coordinate with your NGO.",
    accent: "from-accent to-amber-500",
  },
  public: {
    title: "Citizen Portal",
    tagline: "Report issues by form, IVR call, or WhatsApp — and track resolution.",
    accent: "from-sky-500 to-primary",
  },
};
