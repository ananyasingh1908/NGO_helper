import { createFileRoute } from "@tanstack/react-router";
import { Activity, AlertOctagon, RefreshCw, ArrowUp, Zap, TrendingUp } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { SELF_HEALING_TASKS, SELF_HEALING_METRICS, ACTIVITY_TIMELINE } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/admin/self-healing")({
  head: () => ({ meta: [{ title: "Self-Healing — Saarthi AI" }] }),
  component: () => <RoleGuard allow="admin"><SelfHealingPage /></RoleGuard>,
});

const STATUS_STYLE = {
  failed: { bg: "bg-destructive/10", text: "text-destructive", label: "Failed", dot: "bg-destructive" },
  delayed: { bg: "bg-accent/15", text: "text-accent-foreground", label: "Delayed", dot: "bg-accent" },
  resolved: { bg: "bg-success/10", text: "text-success", label: "Resolved", dot: "bg-success" },
} as const;

const METRIC_ICONS = [AlertOctagon, TrendingUp, RefreshCw, Zap];

function SelfHealingPage() {
  return (
    <DashboardLayout
      title="Self-Healing System"
      subtitle="Intelligent monitoring and auto-recovery of delayed or failed tasks."
    >
      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SELF_HEALING_METRICS.map((m, i) => {
          const Icon = METRIC_ICONS[i];
          return (
            <div key={m.label} className="rounded-2xl bg-card p-5 shadow-soft border border-border/60">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {m.label}
                </p>
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <p className="mt-2 text-3xl font-bold">{m.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Live monitor */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-card p-5 shadow-soft border border-border/60">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">Live Task Monitor</h2>
                <p className="text-xs text-muted-foreground">Auto-refreshes every 15s</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                System healthy
              </span>
            </div>

            <ul className="mt-5 space-y-3">
              {SELF_HEALING_TASKS.map((t) => {
                const s = STATUS_STYLE[t.status];
                return (
                  <li
                    key={t.id}
                    className="rounded-xl border border-border bg-background p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${s.dot}`} />
                          <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${s.bg} ${s.text}`}>
                            {s.label}
                          </span>
                        </div>
                        <p className="mt-1.5 font-medium">{t.issue}</p>
                        <p className="text-xs text-muted-foreground">
                          Assigned to <span className="font-medium text-foreground/80">{t.volunteer}</span>
                          {" · "}Time exceeded: <span className="font-medium">{t.timeExceeded}</span>
                        </p>
                      </div>
                      {t.status !== "resolved" && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="gap-1">
                            <RefreshCw className="h-3.5 w-3.5" /> Auto-Reassign
                          </Button>
                          <Button size="sm" className="gap-1 bg-accent text-accent-foreground hover:bg-accent/90">
                            <ArrowUp className="h-3.5 w-3.5" /> Escalate
                          </Button>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Timeline */}
        <div className="rounded-2xl bg-card p-5 shadow-soft border border-border/60">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <h2 className="font-semibold">Recovery Timeline</h2>
          </div>
          <ol className="mt-5 space-y-5 border-l-2 border-border pl-5">
            {ACTIVITY_TIMELINE.map((a, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[27px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                </span>
                <p className="text-sm">{a.text}</p>
                <p className="text-xs text-muted-foreground">{a.time}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </DashboardLayout>
  );
}
