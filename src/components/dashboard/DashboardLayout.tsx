import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Activity,
  Users,
  ClipboardList,
  MessageSquare,
  BarChart3,
  Bell,
  LogOut,
  Menu,
  X,
  Sparkles,
  Search,
  Plus,
  FileText,
  User,
  Map,
  Phone,
} from "lucide-react";
import { useAuth, ROLE_LOGIN, type Role } from "@/lib/auth";
import { NOTIFICATIONS } from "@/lib/mock-data";

interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
}

const NAV: Record<Role, NavItem[]> = {
  admin: [
    { to: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
    { to: "/dashboard/admin/self-healing", label: "Self-Healing", icon: Activity },
    { to: "/dashboard/admin/users", label: "Users & NGOs", icon: Users },
    { to: "/dashboard/admin/issues", label: "All Issues", icon: ClipboardList },
    { to: "/dashboard/admin/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  ],
  ngo: [
    { to: "/dashboard/ngo", label: "Overview", icon: LayoutDashboard },
    { to: "/dashboard/ngo/map", label: "Live Map", icon: Map },
    { to: "/dashboard/ngo/issues", label: "Issues", icon: ClipboardList },
    { to: "/dashboard/ngo/create", label: "Create Issue", icon: Plus },
    { to: "/dashboard/ngo/reports", label: "Reports", icon: FileText },
    { to: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  ],
  volunteer: [
    { to: "/dashboard/volunteer", label: "My Tasks", icon: ClipboardList },
    { to: "/dashboard/volunteer/map", label: "Live Map", icon: Map },
    { to: "/dashboard/volunteer/profile", label: "Profile", icon: User },
    { to: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  ],
  public: [
    { to: "/dashboard/public", label: "My Reports", icon: ClipboardList },
    { to: "/report", label: "New Report", icon: Plus },
    { to: "/dashboard/public/report-channels", label: "IVR & WhatsApp", icon: Phone },
  ],
};

const ROLE_LABEL: Record<Role, string> = {
  admin: "Admin",
  ngo: "NGO Partner",
  volunteer: "Volunteer",
  public: "Citizen",
};

export function DashboardLayout({ children, title, subtitle }: { children: ReactNode; title: string; subtitle?: string }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) navigate({ to: "/login" });
  }, [user, navigate]);
  // suppress unused warning if not used elsewhere
  void ROLE_LOGIN;

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!user) return null;

  const nav = NAV[user.role];
  const unread = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <div className="min-h-screen bg-section flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-sidebar-border bg-sidebar transition-transform lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="font-semibold tracking-tight text-sidebar-foreground">Saarthi AI</span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="rounded-md p-1 text-sidebar-foreground/70 hover:bg-sidebar-accent lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-4 py-4">
          <div className="rounded-xl bg-sidebar-accent/60 p-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-sidebar-foreground">{user.name}</p>
                <p className="truncate text-xs text-sidebar-foreground/70">{ROLE_LABEL[user.role]}</p>
              </div>
            </div>
          </div>
        </div>

        <nav className="px-3 pb-6">
          <p className="px-2 pt-2 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
            Navigation
          </p>
          <ul className="mt-2 space-y-1">
            {nav.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  activeOptions={{ exact: true }}
                  activeProps={{ className: "bg-sidebar-primary text-sidebar-primary-foreground shadow-soft" }}
                  inactiveProps={{ className: "text-sidebar-foreground/85 hover:bg-sidebar-accent hover:text-sidebar-foreground" }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                >
                  <n.icon className="h-4 w-4" /> {n.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={() => {
              logout();
              navigate({ to: "/" });
            }}
            className="mt-6 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </nav>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-foreground/40 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-border bg-background/90 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              className="rounded-md p-2 text-foreground/70 hover:bg-secondary lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden md:flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-1.5 text-sm text-muted-foreground w-72">
              <Search className="h-4 w-4" />
              <input className="w-full bg-transparent outline-none" placeholder="Search issues, volunteers…" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen((v) => !v)}
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-foreground/70 hover:bg-secondary"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                {unread > 0 && (
                  <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                    {unread}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl border border-border bg-popover p-2 shadow-elevated">
                  <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Notifications
                  </p>
                  <ul className="space-y-1">
                    {NOTIFICATIONS.map((n, i) => (
                      <li key={i} className="flex items-start gap-3 rounded-lg p-3 hover:bg-secondary">
                        <span className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${n.unread ? "bg-accent" : "bg-muted-foreground/30"}`} />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm">{n.title}</p>
                          <p className="text-xs text-muted-foreground">{n.time} ago</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <Link
              to="/"
              className="hidden sm:inline-flex h-9 items-center rounded-lg border border-input bg-background px-3 text-sm font-medium hover:bg-secondary"
            >
              View site
            </Link>
          </div>
        </header>

        <div className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
              {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
