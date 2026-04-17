import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  tone?: "primary" | "accent" | "destructive" | "success";
}

const toneMap = {
  primary: "bg-primary-soft text-primary",
  accent: "bg-accent-soft text-accent-foreground",
  destructive: "bg-destructive/10 text-destructive",
  success: "bg-success/10 text-success",
} as const;

export function StatCard({ label, value, change, icon: Icon, tone = "primary" }: StatCardProps) {
  const positive = change?.startsWith("+");
  return (
    <div className="rounded-2xl bg-card p-5 shadow-soft border border-border/60">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
        </div>
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${toneMap[tone]}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
      {change && (
        <p className={`mt-3 text-xs font-medium ${positive ? "text-success" : "text-destructive"}`}>
          {change} vs last week
        </p>
      )}
    </div>
  );
}
