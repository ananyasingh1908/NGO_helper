import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Phone,
  PhoneOff,
  Mic,
  MessageCircle,
  ExternalLink,
  Volume2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { Button } from "@/components/ui/button";
import { IVR_MENU, SUPPORT_WHATSAPP, buildWhatsAppLink } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/public/report-channels")({
  head: () => ({
    meta: [
      { title: "Report by IVR or WhatsApp — Saarthi AI" },
      {
        name: "description",
        content: "Report a community issue using a voice call (IVR) or WhatsApp chat.",
      },
    ],
  }),
  component: () => (
    <RoleGuard allow="public">
      <DashboardLayout
        title="Report via IVR or WhatsApp"
        subtitle="No app needed — call our number or send a WhatsApp message."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <IVRPanel />
          <WhatsAppPanel />
        </div>
      </DashboardLayout>
    </RoleGuard>
  ),
});

type CallState = "idle" | "ringing" | "menu" | "voice" | "summary";

function IVRPanel() {
  const [state, setState] = useState<CallState>("idle");
  const [seconds, setSeconds] = useState(0);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [transcript, setTranscript] = useState("");
  const [location, setLocation] = useState("");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (state === "idle") {
      setSeconds(0);
      if (timerRef.current) window.clearInterval(timerRef.current);
      return;
    }
    timerRef.current = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [state]);

  // mock voice-to-text after 2.5s in voice mode
  useEffect(() => {
    if (state !== "voice") return;
    const id = window.setTimeout(() => {
      setLocation("MG Road, near metro station");
      setTranscript(
        "There is no streetlight on the footpath for the last three nights. It is dangerous for elderly people walking from the metro at night.",
      );
      setState("summary");
    }, 2800);
    return () => window.clearTimeout(id);
  }, [state]);

  const startCall = () => {
    setSelectedKey(null);
    setTranscript("");
    setLocation("");
    setState("ringing");
    window.setTimeout(() => setState("menu"), 1500);
  };

  const endCall = () => setState("idle");

  const press = (key: string) => {
    setSelectedKey(key);
    setState("voice");
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const selected = IVR_MENU.find((m) => m.key === selectedKey);

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
      <div className="bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground">
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
              <Phone className="h-3 w-3" /> IVR voice call
            </span>
            <h2 className="mt-3 text-xl font-bold">Report by phone call</h2>
            <p className="mt-1 text-sm text-primary-foreground/80">
              Toll-free: <span className="font-semibold">1800-SAARTHI</span>
            </p>
          </div>
          <span
            className={`relative flex h-12 w-12 items-center justify-center rounded-full ${
              state === "idle" ? "bg-white/15" : "bg-white text-primary"
            }`}
          >
            {state !== "idle" && (
              <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
            )}
            <Phone className="relative h-5 w-5" />
          </span>
        </div>
      </div>

      <div className="p-6">
        {state === "idle" && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Simulate the IVR experience your callers see. Tap below to start a mock call.
            </p>
            <Button onClick={startCall} size="lg" className="mt-5 gap-2">
              <Phone className="h-4 w-4" /> Start mock call
            </Button>
          </div>
        )}

        {state !== "idle" && (
          <>
            <div className="flex items-center justify-between rounded-xl bg-secondary px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Call in progress
                  </p>
                  <p className="font-mono text-sm font-semibold">
                    {mm}:{ss}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex gap-0.5" aria-hidden>
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="block w-0.5 rounded-full bg-primary"
                      style={{
                        height: `${6 + ((i * 4 + seconds * 3) % 14)}px`,
                        animation: "pulse 0.9s ease-in-out infinite",
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </span>
                <Volume2 className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {state === "ringing" && (
              <p className="mt-4 text-center text-sm text-muted-foreground">Connecting…</p>
            )}

            {state === "menu" && (
              <div className="mt-4">
                <p className="text-sm">
                  <span className="font-semibold">Saarthi: </span>
                  Welcome to Saarthi AI. Please select your issue type.
                </p>
                <ul className="mt-3 space-y-2">
                  {IVR_MENU.map((m) => (
                    <li key={m.key}>
                      <button
                        onClick={() => press(m.key)}
                        className="flex w-full items-center justify-between rounded-lg border border-border bg-background px-4 py-2.5 text-left text-sm hover:border-primary hover:bg-primary-soft"
                      >
                        <span className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 font-mono text-sm font-bold text-primary">
                            {m.key}
                          </span>
                          {m.label}
                        </span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {state === "voice" && (
              <div className="mt-5 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-soft">
                  <Mic className="h-8 w-8 animate-pulse text-primary" />
                </div>
                <p className="mt-3 text-sm font-medium">Listening… please describe the issue.</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  You pressed <span className="font-semibold">{selected?.key}</span> ·{" "}
                  {selected?.label}
                </p>
              </div>
            )}

            {state === "summary" && (
              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-2 text-success">
                  <CheckCircle2 className="h-5 w-5" />
                  <p className="text-sm font-semibold">Report captured</p>
                </div>
                <Field label="Issue type" value={selected?.label ?? "—"} />
                <Field label="Category" value={selected?.category ?? "—"} />
                <Field label="Detected location" value={location} />
                <Field label="Voice transcript" value={transcript} multiline />
                <p className="rounded-lg bg-secondary/60 px-3 py-2 text-xs text-muted-foreground">
                  This call has been logged as a new issue and routed to the nearest NGO.
                </p>
              </div>
            )}

            <Button
              onClick={endCall}
              variant="outline"
              size="sm"
              className="mt-5 w-full gap-2 text-destructive hover:text-destructive"
            >
              <PhoneOff className="h-4 w-4" /> End call
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  multiline,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className={`mt-0.5 text-sm ${multiline ? "" : "truncate"}`}>{value || "—"}</p>
    </div>
  );
}

function WhatsAppPanel() {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const link = buildWhatsAppLink(location, description);

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
              <MessageCircle className="h-3 w-3" /> WhatsApp
            </span>
            <h2 className="mt-3 text-xl font-bold">Report on WhatsApp</h2>
            <p className="mt-1 text-sm text-white/85">
              Chat with our AI assistant on{" "}
              <span className="font-semibold">{SUPPORT_WHATSAPP.display}</span>
            </p>
          </div>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-emerald-600">
            <MessageCircle className="h-5 w-5" />
          </span>
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm text-muted-foreground">
          Pre-fill your message below. We'll open WhatsApp with your report ready to send.
          Our AI assistant will ask a few quick follow-up questions and confirm that a
          coordinator will be assigned shortly.
        </p>

        <div className="mt-5 space-y-3">
          <label className="block text-sm font-medium">
            Location
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. MG Road, near metro station"
              className="mt-1.5 block w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <label className="block text-sm font-medium">
            Describe the issue
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Tell us what's happening, when it started, and how urgent it is."
              className="mt-1.5 block w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
        </div>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-card"
        >
          <MessageCircle className="h-4 w-4" /> Open WhatsApp chat
          <ExternalLink className="h-3.5 w-3.5 opacity-80" />
        </a>

        <div className="mt-5 rounded-xl border border-border bg-secondary/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            What our AI assistant will ask
          </p>
          <ol className="mt-2 space-y-1.5 text-sm text-foreground/85">
            <li>1. Could you share your exact location or a nearby landmark?</li>
            <li>2. How urgent is this — is anyone in immediate danger?</li>
            <li>3. Can you share a photo of the issue?</li>
          </ol>
          <p className="mt-3 rounded-md bg-emerald-50 px-3 py-2 text-xs text-emerald-900">
            ✅ Final reply: <em>"Thanks! Someone will be appointed shortly to assist with your issue."</em>
          </p>
        </div>
      </div>
    </div>
  );
}
