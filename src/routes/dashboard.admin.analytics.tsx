import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { ANALYTICS_CATEGORIES, ANALYTICS_TREND, URGENCY_SPLIT } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/admin/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Saarthi AI" }] }),
  component: () => <RoleGuard allow="admin"><AnalyticsPage /></RoleGuard>,
});

const PIE_COLORS = ["hsl(var(--destructive))", "var(--accent)", "var(--primary)", "var(--muted-foreground)"];

function AnalyticsPage() {
  return (
    <DashboardLayout title="Analytics" subtitle="Trends across reported issues, urgency and resolution.">
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Issues by Category" subtitle="Last 30 days">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ANALYTICS_CATEGORIES}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="value" fill="var(--primary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Urgency Distribution" subtitle="All open issues">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={URGENCY_SPLIT} dataKey="value" innerRadius={60} outerRadius={100} paddingAngle={3}>
                {URGENCY_SPLIT.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            {URGENCY_SPLIT.map((u, i) => (
              <div key={u.name} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                {u.name} <span className="ml-auto font-semibold">{u.value}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Reported vs Resolved" subtitle="Weekly completion rate" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ANALYTICS_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Line type="monotone" dataKey="reported" stroke="var(--accent)" strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="resolved" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </DashboardLayout>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl bg-card p-5 shadow-soft border border-border/60 ${className}`}>
      <div>
        <h3 className="font-semibold">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}
