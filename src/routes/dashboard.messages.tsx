import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Search, Phone, Video } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MESSAGES } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/messages")({
  head: () => ({ meta: [{ title: "Messages — Saarthi AI" }] }),
  component: MessagesPage,
});

const CONTACTS = [
  { name: "Helping Hands NGO", last: "Great! 42 packets…", time: "10:24", unread: 2, online: true },
  { name: "Aanya Sharma", last: "On my way!", time: "09:50", unread: 0, online: true },
  { name: "Project Annapurna", last: "Can you cover Sat?", time: "Yest.", unread: 1, online: false },
  { name: "CleanCity NGO", last: "Thanks for the photo.", time: "Mon", unread: 0, online: false },
];

function MessagesPage() {
  const [active, setActive] = useState(0);
  const [draft, setDraft] = useState("");

  return (
    <DashboardLayout title="Messages" subtitle="Coordinate with NGOs and volunteers.">
      <div className="grid gap-4 lg:grid-cols-[320px_1fr] h-[70vh] min-h-[500px]">
        {/* Contacts */}
        <aside className="rounded-2xl bg-card shadow-soft border border-border/60 flex flex-col overflow-hidden">
          <div className="p-3 border-b border-border">
            <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-1.5 text-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input className="w-full bg-transparent outline-none" placeholder="Search…" />
            </div>
          </div>
          <ul className="flex-1 overflow-y-auto">
            {CONTACTS.map((c, i) => (
              <li key={c.name}>
                <button
                  onClick={() => setActive(i)}
                  className={`w-full text-left px-3 py-3 flex items-center gap-3 transition border-l-4 ${
                    i === active ? "bg-primary-soft border-primary" : "border-transparent hover:bg-secondary"
                  }`}
                >
                  <div className="relative">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                      {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                    {c.online && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success border-2 border-card" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm font-semibold">{c.name}</p>
                      <span className="text-[10px] text-muted-foreground">{c.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="truncate text-xs text-muted-foreground">{c.last}</p>
                      {c.unread > 0 && (
                        <span className="ml-2 rounded-full bg-accent px-1.5 text-[10px] font-bold text-accent-foreground">{c.unread}</span>
                      )}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Chat */}
        <section className="rounded-2xl bg-card shadow-soft border border-border/60 flex flex-col overflow-hidden">
          <header className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                {CONTACTS[active].name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </span>
              <div>
                <p className="font-semibold">{CONTACTS[active].name}</p>
                <p className="text-xs text-success">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="rounded-lg p-2 text-muted-foreground hover:bg-secondary"><Phone className="h-4 w-4" /></button>
              <button className="rounded-lg p-2 text-muted-foreground hover:bg-secondary"><Video className="h-4 w-4" /></button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-section/40">
            {MESSAGES.map((m, i) => {
              const me = m.from === "me";
              return (
                <div key={i} className={`flex ${me ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                      me
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-card border border-border rounded-bl-sm"
                    }`}
                  >
                    <p>{m.text}</p>
                    <p className={`mt-1 text-[10px] ${me ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{m.time}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDraft("");
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="submit"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </section>
      </div>
    </DashboardLayout>
  );
}
