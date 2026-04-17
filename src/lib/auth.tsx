import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "admin" | "ngo" | "volunteer" | "public";

export interface AuthUser {
  name: string;
  email: string;
  role: Role;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (role: Role) => void;
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

  const login = (role: Role) => {
    const u: AuthUser = {
      name: defaultName[role],
      email: `${role}@saarthi.ai`,
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
