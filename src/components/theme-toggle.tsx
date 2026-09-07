"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

/** Must match the transition duration in globals.css. */
const TRANSITION_MS = 280;

/**
 * Turns the colour crossfade on for one theme change, then off again, so the
 * transition never applies during ordinary hover or scrolling.
 */
function withTransition(apply: () => void, timer: { current: number }) {
  const root = document.documentElement;
  root.classList.add("theme-transition");
  window.clearTimeout(timer.current);

  apply();

  timer.current = window.setTimeout(() => {
    root.classList.remove("theme-transition");
  }, TRANSITION_MS);
}

/** Reads the theme the pre-paint script already applied to <html>. */
function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", onChange);
  return () => {
    mo.disconnect();
    mq.removeEventListener("change", onChange);
  };
}

function isDarkNow() {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "dark") return true;
  if (attr === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeToggle() {
  // Server renders the light icon; the client corrects after hydration.
  const dark = useSyncExternalStore(subscribe, isDarkNow, () => false);
  const timer = useRef(0);

  useEffect(() => {
    // A change at the OS level repaints the page without going through the
    // button, so crossfade that too — otherwise it snaps.
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      if (!document.documentElement.hasAttribute("data-theme")) {
        withTransition(() => {}, timer);
      }
    };
    mq.addEventListener("change", onSystemChange);

    // Captured for cleanup: the ref object is stable, so reading .current
    // off it at teardown gives the latest pending timeout.
    const pending = timer;

    return () => {
      mq.removeEventListener("change", onSystemChange);
      // Drop the class if we unmount mid-crossfade, otherwise it stays on
      // <html> and slows every later interaction.
      window.clearTimeout(pending.current);
      document.documentElement.classList.remove("theme-transition");
    };
  }, []);

  function toggle() {
    const next = !dark;
    withTransition(() => {
      document.documentElement.setAttribute(
        "data-theme",
        next ? "dark" : "light",
      );
      try {
        localStorage.setItem("cube-theme", next ? "dark" : "light");
      } catch {}
    }, timer);
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="focus-ring grid size-9 place-items-center rounded-full border transition-colors hover:bg-[var(--surface-2)]"
    >
      {/* Both icons are always rendered and cross-faded, so the switch reads
          as one motion rather than a swap. */}
      <span className="grid size-4 place-items-center">
        <svg
          viewBox="0 0 24 24"
          className={`col-start-1 row-start-1 size-4 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            dark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-50 opacity-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path
            d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
            strokeLinejoin="round"
          />
        </svg>

        <svg
          viewBox="0 0 24 24"
          className={`col-start-1 row-start-1 size-4 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            dark
              ? "rotate-90 scale-50 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path
            d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </button>
  );
}
