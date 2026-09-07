"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 1600;

// Decelerating curve: fast off the mark, easing into the final value.
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Counts from zero to `value` the first time it scrolls into view.
 *
 * The final value is what renders on the server, and it stays put whenever
 * motion is reduced or IntersectionObserver is missing — so the real figure
 * is always in the DOM for search engines and assistive tech, animation or
 * not. `display` is only ever driven from inside the rAF loop, which keeps
 * the effect free of the cascading renders a setState-in-effect would cause.
 */
export function CountUp({
  value,
  suffix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let start = 0;

    const step = (now: number) => {
      if (!start) start = now;
      const t = Math.min((now - start) / DURATION, 1);
      setDisplay(Math.round(easeOutExpo(t) * value));
      if (t < 1) frame = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        // Reset to zero and run in the same frame, so the jump back is
        // never painted on its own.
        frame = requestAnimationFrame((now) => {
          setDisplay(0);
          start = now;
          frame = requestAnimationFrame(step);
        });
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
