import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** translate distance in px */
  y?: number;
}

/**
 * Scroll-triggered fade + rise. Respects prefers-reduced-motion.
 *
 * IMPORTANT: starts visible (so SSR markup is not invisible / unclickable).
 * After mount on the client we hide it again only if it's still off-screen,
 * then reveal on intersection. This avoids the "blank page" hydration flash.
 */
export function Reveal({ children, className = "", delay = 0, y = 16 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    const inView =
      rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom > 0;

    if (inView) {
      // already visible on first paint — leave it shown, no animation needed
      setVisible(true);
      return;
    }

    // Off-screen: hide, then reveal on intersection
    setVisible(false);
    setArmed(true);

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

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transform: visible ? "translate3d(0,0,0)" : `translate3d(0, ${y}px, 0)`,
        opacity: visible ? 1 : 0,
      }}
      className={`${armed ? "transition-all duration-700 ease-out will-change-transform" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
