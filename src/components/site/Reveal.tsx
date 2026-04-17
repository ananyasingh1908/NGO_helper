import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** translate distance in px */
  y?: number;
  as?: "div" | "section" | "article" | "li";
}

/**
 * Scroll-triggered fade + rise. Respects prefers-reduced-motion.
 */
export function Reveal({ children, className = "", delay = 0, y = 16, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = {
    transitionDelay: `${delay}ms`,
    transform: visible ? "translate3d(0,0,0)" : `translate3d(0, ${y}px, 0)`,
    opacity: visible ? 1 : 0,
  } as const;

  return (
    // @ts-expect-error - dynamic tag
    <Tag
      ref={ref}
      style={style}
      className={`transition-all duration-700 ease-out will-change-transform ${className}`}
    >
      {children}
    </Tag>
  );
}
