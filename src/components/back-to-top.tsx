"use client";

import { useEffect, useState } from "react";

/**
 * Appears once the reader is well past the fold. Shows scroll progress as a
 * ring around the arrow, so the control doubles as a position indicator.
 */
export function BackToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const scrolled = window.scrollY;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(scrolled / max, 1) : 0);
      setVisible(scrolled > window.innerHeight * 0.9);
    };

    // rAF-throttled: scroll fires far more often than we need to repaint.
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const R = 21;
  const C = 2 * Math.PI * R;

  return (
    <button
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        })
      }
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`focus-ring group fixed bottom-[var(--floating-offset)] right-6 z-40 grid size-12 place-items-center rounded-full border bg-[var(--surface)] shadow-lg transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[var(--surface-2)] ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-3 scale-90 opacity-0"
      }`}
    >
      {/* Progress ring */}
      <svg
        viewBox="0 0 48 48"
        className="absolute inset-0 size-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-brand-500"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - progress)}
          style={{ transition: "stroke-dashoffset 120ms linear" }}
        />
      </svg>

      <svg
        viewBox="0 0 24 24"
        className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </button>
  );
}
