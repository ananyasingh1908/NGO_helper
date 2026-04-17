import { createFileRoute } from "@tanstack/react-router";
import { Upload, FileText, Download } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/ngo/reports")({
  head: () => ({ meta: [{ title: "Reports — Saarthi AI" }] }),
  component: ReportsPage,
});

const REPORTS = [
  { name: "March 2025 — Field Report", size: "2.4 MB", date: "01 Apr 2025" },
  { name: "Q1 Impact Summary", size: "890 KB", date: "28 Mar 2025" },
  { name: "Volunteer Hours Audit", size: "1.1 MB", date: "12 Mar 2025" },
];

function ReportsPage() {
  return (
    <DashboardLayout title="Reports" subtitle="Upload monthly reports and impact summaries.">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl bg-card p-5 shadow-soft border border-border/60">
          <h2 className="font-semibold">Recent uploads</h2>
          <ul className="mt-4 divide-y divide-border">
            {REPORTS.map((r) => (
              <li key={r.name} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <FileText className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.size} · {r.date}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="gap-1">
                  <Download className="h-3.5 w-3.5" /> Download
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border-2 border-dashed border-border bg-card p-8 text-center shadow-soft">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary">
            <Upload className="h-5 w-5" />
          </span>
          <h3 className="mt-3 font-semibold">Upload report</h3>
          <p className="mt-1 text-xs text-muted-foreground">PDF, DOCX or XLSX, up to 10 MB</p>
          <Button className="mt-4 w-full">Choose file</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
