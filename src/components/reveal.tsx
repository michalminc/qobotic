"use client";

import { useEffect, useRef, useState } from "react";

type Direction = "up" | "left" | "right" | "fade";

type Props = {
  children: React.ReactNode;
  // Animation direction. "up" (default) slides from below, "left" from the left, etc.
  direction?: Direction;
  // Delay in ms before starting the transition.
  delay?: number;
  // Duration in ms.
  duration?: number;
  // Initial translate distance in px.
  distance?: number;
  // Trigger only once (default) or every time the element re-enters the viewport.
  once?: boolean;
  className?: string;
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  distance = 24,
  once = true,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect users who prefer reduced motion — show immediately, no animation.
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  const offset = (() => {
    switch (direction) {
      case "up":    return `translate3d(0, ${distance}px, 0)`;
      case "left":  return `translate3d(${-distance}px, 0, 0)`;
      case "right": return `translate3d(${distance}px, 0, 0)`;
      case "fade":  return "translate3d(0, 0, 0)";
    }
  })();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0, 0, 0)" : offset,
        transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
