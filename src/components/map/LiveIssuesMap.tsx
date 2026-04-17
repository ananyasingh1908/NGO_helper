import { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Filter, Layers, X } from "lucide-react";
import { MAP_ISSUES, type MapIssue, type Urgency, type IssueStatus } from "@/lib/mock-data";

const URGENCY_COLOR: Record<Urgency, string> = {
  High: "#dc2626",
  Medium: "#f59e0b",
  Low: "#16a34a",
};

const STATUS_COLOR: Record<IssueStatus, string> = {
  Open: "bg-destructive/10 text-destructive",
  "In Progress": "bg-accent/15 text-amber-700",
  Resolved: "bg-success/10 text-success",
};

function makeIcon(color: string) {
  return L.divIcon({
    className: "saarthi-marker",
    html: `<span style="background:${color}" class="block h-5 w-5 rounded-full border-2 border-white shadow-[0_0_0_2px_rgba(0,0,0,0.15)] ring-4 ring-[${color}]/25"></span>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}

interface Props {
  /** Hide the "Assign to me" action when used in NGO view */
  variant?: "ngo" | "volunteer";
}

export function LiveIssuesMap({ variant = "ngo" }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);

  const [selected, setSelected] = useState<MapIssue | null>(null);
  const [category, setCategory] = useState<string>("all");
  const [urgency, setUrgency] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [unassignedOnly, setUnassignedOnly] = useState(false);

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(MAP_ISSUES.map((i) => i.category)))],
    [],
  );

  const filtered = useMemo(() => {
    return MAP_ISSUES.filter((i) => {
      if (category !== "all" && i.category !== category) return false;
      if (urgency !== "all" && i.urgency !== urgency) return false;
      if (status !== "all" && i.status !== status) return false;
      if (unassignedOnly && i.assigned) return false;
      return true;
    });
  }, [category, urgency, status, unassignedOnly]);

  // init map once
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    const map = L.map(mapRef.current, {
      center: [12.9716, 77.5946],
      zoom: 12,
      scrollWheelZoom: true,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);
    mapInstance.current = map;
    layerRef.current = L.layerGroup().addTo(map);

    return () => {
      map.remove();
      mapInstance.current = null;
      layerRef.current = null;
    };
  }, []);

  // re-render markers when filters change
  useEffect(() => {
    const layer = layerRef.current;
    const map = mapInstance.current;
    if (!layer || !map) return;
    layer.clearLayers();

    filtered.forEach((issue) => {
      const marker = L.marker([issue.lat, issue.lng], {
        icon: makeIcon(URGENCY_COLOR[issue.urgency]),
      });
      marker.on("click", () => setSelected(issue));
      marker.bindTooltip(issue.title, { direction: "top", offset: [0, -10] });
      marker.addTo(layer);
    });

    if (filtered.length > 0) {
      const bounds = L.latLngBounds(filtered.map((i) => [i.lat, i.lng] as [number, number]));
      map.fitBounds(bounds.pad(0.2), { animate: true, maxZoom: 14 });
    }
  }, [filtered]);

  const flyTo = (issue: MapIssue) => {
    setSelected(issue);
    mapInstance.current?.flyTo([issue.lat, issue.lng], 15, { duration: 0.8 });
  };

  return (
    <div className="rounded-2xl border border-border/60 bg-card shadow-soft overflow-hidden">
      {/* Filters bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-secondary/40 px-4 py-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Filter className="h-3.5 w-3.5" /> Filters
        </div>
        <Select value={category} onChange={setCategory} options={categories} label="Category" />
        <Select
          value={urgency}
          onChange={setUrgency}
          options={["all", "High", "Medium", "Low"]}
          label="Urgency"
        />
        <Select
          value={status}
          onChange={setStatus}
          options={["all", "Open", "In Progress", "Resolved"]}
          label="Status"
        />
        <label className="ml-auto inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-secondary">
          <input
            type="checkbox"
            checked={unassignedOnly}
            onChange={(e) => setUnassignedOnly(e.target.checked)}
            className="h-3.5 w-3.5 accent-primary"
          />
          Unassigned only
        </label>
      </div>

      <div className="grid lg:grid-cols-3">
        {/* Map */}
        <div className="relative lg:col-span-2">
          <div ref={mapRef} className="h-[460px] w-full lg:h-[560px]" />

          {/* Legend */}
          <div className="absolute bottom-3 left-3 z-[1000] rounded-lg border border-border bg-background/95 p-2.5 text-xs shadow-card backdrop-blur">
            <div className="mb-1.5 flex items-center gap-1 font-semibold">
              <Layers className="h-3 w-3" /> Urgency
            </div>
            <div className="space-y-1">
              {(Object.keys(URGENCY_COLOR) as Urgency[]).map((u) => (
                <div key={u} className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: URGENCY_COLOR[u] }}
                  />
                  {u}
                </div>
              ))}
            </div>
          </div>

          {/* Selected popup overlay */}
          {selected && (
            <div className="absolute right-3 top-3 z-[1000] w-72 rounded-xl border border-border bg-card p-4 shadow-elevated">
              <button
                onClick={() => setSelected(null)}
                className="absolute right-2 top-2 rounded p-1 text-muted-foreground hover:bg-secondary"
                aria-label="Close"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: URGENCY_COLOR[selected.urgency] }}
                />
                <span className="font-mono text-[10px] text-muted-foreground">
                  {selected.id}
                </span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_COLOR[selected.status]}`}>
                  {selected.status}
                </span>
              </div>
              <p className="mt-2 font-semibold leading-snug">{selected.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{selected.description}</p>
              <div className="mt-3 space-y-1 border-t border-border pt-3 text-xs">
                <p>
                  <MapPin className="mr-1 inline h-3 w-3" />
                  {selected.location}
                </p>
                <p className="text-muted-foreground">
                  Assigned: <span className="font-medium text-foreground">{selected.assigned ?? "Unassigned"}</span>
                </p>
                <p className="text-muted-foreground">Reported {selected.reportedAt}</p>
              </div>
              {variant === "volunteer" && !selected.assigned && (
                <button className="mt-3 w-full rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
                  Accept this task
                </button>
              )}
              {variant === "ngo" && !selected.assigned && (
                <button className="mt-3 w-full rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground hover:bg-accent/90">
                  Assign volunteer
                </button>
              )}
            </div>
          )}
        </div>

        {/* Side list */}
        <aside className="max-h-[560px] overflow-y-auto border-t border-border lg:border-l lg:border-t-0">
          <div className="sticky top-0 border-b border-border bg-card px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Issues on map
            </p>
            <p className="mt-0.5 text-sm font-semibold">{filtered.length} matching</p>
          </div>
          <ul className="divide-y divide-border">
            {filtered.map((i) => (
              <li key={i.id}>
                <button
                  onClick={() => flyTo(i)}
                  className={`block w-full px-4 py-3 text-left transition hover:bg-secondary ${
                    selected?.id === i.id ? "bg-primary-soft" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: URGENCY_COLOR[i.urgency] }}
                    />
                    <span className="font-mono text-[10px] text-muted-foreground">{i.id}</span>
                    <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_COLOR[i.status]}`}>
                      {i.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium leading-snug">{i.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{i.location}</p>
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-4 py-10 text-center text-sm text-muted-foreground">
                No issues match the current filters.
              </li>
            )}
          </ul>
        </aside>
      </div>
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  label: string;
}) {
  return (
    <label className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium">
      <span className="text-muted-foreground">{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-foreground outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o === "all" ? "All" : o}
          </option>
        ))}
      </select>
    </label>
  );
}
