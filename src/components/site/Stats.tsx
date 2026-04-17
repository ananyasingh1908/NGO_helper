import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/mock-data";

function parseValue(v: string): { num: number; suffix: string; prefix: string } {
  const match = v.match(/^([^\d]*)([\d,]+)([^\d]*)$/);
  if (!match) return { num: 0, suffix: v, prefix: "" };
  return {
    prefix: match[1] || "",
    num: Number(match[2].replace(/,/g, "")),
    suffix: match[3] || "",
  };
}

function CountUp({ value }: { value: string }) {
  const { num, suffix, prefix } = parseValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  // Start at the final number so SSR shows the real value, then animate on the client.
  const [display, setDisplay] = useState(num);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(num);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const duration = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(num * eased));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [num]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="text-center transition-transform duration-300 hover:scale-105"
          >
            <p className="text-3xl font-bold sm:text-4xl">
              <CountUp value={s.value} />
            </p>
            <p className="mt-1 text-sm uppercase tracking-wider text-primary-foreground/75">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
