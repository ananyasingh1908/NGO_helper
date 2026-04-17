import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Award, Clock } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/volunteer/profile")({
  head: () => ({ meta: [{ title: "My Profile — Saarthi AI" }] }),
  component: () => <RoleGuard allow="volunteer"><VolunteerProfile /></RoleGuard>,
});

const SKILLS = ["First Aid", "Logistics", "Driving", "Translation (Hindi/English/Kannada)"];
const AVAILABILITY = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function VolunteerProfile() {
  return (
    <DashboardLayout title="My Profile" subtitle="Keep your skills and availability up to date.">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-card p-6 shadow-soft border border-border/60 text-center">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=70"
            alt="Profile"
            className="mx-auto h-24 w-24 rounded-full object-cover"
          />
          <h2 className="mt-4 text-lg font-semibold">Rohan Mehta</h2>
          <p className="text-sm text-muted-foreground">Logistics Lead · Bengaluru</p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <Stat label="Tasks" value="31" />
            <Stat label="Hours" value="124" />
            <Stat label="Rating" value="4.9" />
          </div>
          <Button variant="outline" size="sm" className="mt-5 w-full">Edit photo</Button>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl bg-card p-6 shadow-soft border border-border/60">
            <div className="flex items-center gap-2"><Award className="h-4 w-4 text-primary" /><h3 className="font-semibold">Skills</h3></div>
            <div className="mt-4 flex flex-wrap gap-2">
              {SKILLS.map((s) => (
                <span key={s} className="rounded-full bg-primary-soft px-3 py-1 text-sm font-medium text-primary">{s}</span>
              ))}
              <button className="rounded-full border border-dashed border-border px-3 py-1 text-sm text-muted-foreground hover:border-primary hover:text-primary">+ Add skill</button>
            </div>
          </div>

          <div className="rounded-2xl bg-card p-6 shadow-soft border border-border/60">
            <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /><h3 className="font-semibold">Weekly Availability</h3></div>
            <div className="mt-4 grid grid-cols-7 gap-2">
              {AVAILABILITY.map((d, i) => (
                <button
                  key={d}
                  className={`rounded-xl border-2 px-2 py-3 text-center text-xs font-medium transition ${
                    i < 5 ? "border-primary bg-primary-soft text-primary" : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  <p>{d}</p>
                  <p className="mt-1 text-[10px] opacity-75">{i < 5 ? "9–6" : "Off"}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-card p-6 shadow-soft border border-border/60">
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /><h3 className="font-semibold">Service Area</h3></div>
            <p className="mt-2 text-sm text-muted-foreground">Bengaluru — 10 km radius from Indiranagar</p>
            <Button size="sm" variant="outline" className="mt-3">Update area</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-secondary px-2 py-3">
      <p className="text-lg font-bold">{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}
