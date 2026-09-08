"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

const FORM_URL = "https://app.unisense.ai/forms/LpmuAP9l8kfqt-Xh8MOEEA";

/**
 * Chat-style enquiry launcher: a floating button in the bottom-left that
 * opens the hosted enquiry form in a panel above it. It sits on the left so
 * it does not fight the back-to-top control in the opposite corner.
 *
 * The form is a third-party page on another origin, so its height cannot be
 * measured from here — the panel is sized to the viewport instead and the
 * iframe scrolls internally, which keeps the whole form reachable on a phone
 * as well as a desktop.
 */
export function EnquiryWidget() {
  const [open, setOpen] = useState(false);
  // Mount the iframe only after the first open: the form pulls in its own JS,
  // and there is no reason to pay for that on a visit that never opens it.
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Escape closes, and focus goes back to the button that opened it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Move focus into the panel when it opens so keyboard and screen-reader
  // users land on the form rather than being left behind on the page.
  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  return (
    <>
      {/* Backdrop: only on small screens, where the panel covers most of the
          viewport and the page behind it should not be tappable. */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 sm:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="false"
        aria-label={`Enquire with ${site.short}`}
        tabIndex={-1}
        inert={!open}
        className={`fixed bottom-[calc(var(--floating-offset)+4.5rem)] left-4 z-50 flex w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border bg-[var(--surface)] shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] sm:left-6 ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0"
        }`}
        style={{
          transformOrigin: "bottom left",
          // Fill the space between the launcher and the top of the screen, so
          // the form gets every pixel available without ever overflowing it.
          height: "min(640px, calc(100dvh - var(--floating-offset) - 6rem))",
        }}
      >
        <div className="flex items-center justify-between gap-3 border-b bg-[var(--surface-2)] px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Talk to us</p>
            <p className="truncate text-xs text-[var(--muted)]">
              We usually reply within a day
            </p>
          </div>
          <button
            onClick={() => {
              setOpen(false);
              buttonRef.current?.focus();
            }}
            aria-label="Close enquiry form"
            className="focus-ring grid size-8 shrink-0 place-items-center rounded-full transition-colors hover:bg-[var(--surface)]"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="relative flex-1">
          {loaded && (
            <iframe
              src={FORM_URL}
              title={`${site.short} enquiry form`}
              onLoad={() => setReady(true)}
              className="size-full border-0"
              // The form posts its own data; it needs scripts, its own origin
              // and the ability to submit. Nothing beyond that is granted.
              sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
            />
          )}
          {!ready && (
            <div className="absolute inset-0 grid place-items-center bg-[var(--surface)]">
              <p className="text-xs text-[var(--muted)]">Loading form…</p>
            </div>
          )}
        </div>
      </div>

      <button
        ref={buttonRef}
        onClick={() => {
          setLoaded(true);
          setOpen((v) => !v);
        }}
        aria-expanded={open}
        aria-label={open ? "Close enquiry form" : "Open enquiry form"}
        className="focus-ring fixed bottom-[var(--floating-offset)] left-4 z-50 grid size-14 place-items-center rounded-full bg-brand-600 text-white shadow-lg transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 active:scale-95 sm:left-6"
      >
        <svg
          viewBox="0 0 24 24"
          className={`absolute size-6 transition-all duration-300 ${
            open ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          className={`absolute size-6 transition-all duration-300 ${
            open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </>
  );
}
