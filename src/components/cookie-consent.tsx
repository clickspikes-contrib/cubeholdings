"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";

const KEY = "cube-consent";

export type Consent = "granted" | "denied";

// Fallback for private browsing and blocked-storage modes, where localStorage
// throws on write. Without it the choice cannot be read back and the banner
// would reappear the instant it was dismissed. It lasts for this page only,
// so such a visitor is asked again next time — which is the safe direction.
let memory: Consent | null = null;

/** Reads the stored choice. Returns null when the visitor has not chosen yet. */
export function getConsent(): Consent | null {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "granted" || v === "denied") return v;
  } catch {
    // Ignored: fall through to whatever this page has in memory.
  }
  return memory;
}

/**
 * Forgets the stored choice so the banner asks again. Withdrawing has to be as
 * easy as granting, which is what the footer's "Cookie settings" link is for.
 */
export function resetConsent() {
  memory = null;
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Ignored: `memory` above is the fallback when storage is unavailable.
  }
  window.dispatchEvent(new CustomEvent("cube-consent", { detail: null }));
}

/** Re-reads the choice on this tab's own updates and on changes in another. */
export function subscribe(onChange: () => void) {
  window.addEventListener("cube-consent", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("cube-consent", onChange);
    window.removeEventListener("storage", onChange);
  };
}

// The server cannot read localStorage, so it reports "decided" and renders
// nothing. React swaps in the real value straight after hydration, which is
// what useSyncExternalStore exists for — no flash of a banner for visitors
// who already answered, and no server/client markup mismatch.
const decided = () => "granted" as const;

/**
 * Asks before anything that sets a cookie is loaded.
 *
 * Nothing on the site currently sets one — this is here so analytics can be
 * added behind it rather than bolted on afterwards. Accept and decline are
 * given equal weight on purpose: a decline hidden behind a second click is
 * not consent, and under GDPR it is not a valid basis for tracking either.
 */
export function CookieConsent() {
  const consent = useSyncExternalStore(subscribe, getConsent, decided);
  const show = consent === null;
  const ref = useRef<HTMLDivElement>(null);

  // The bar is fixed, so it hangs over whatever is at the bottom of the page —
  // on a long page that is the last row of the footer, which measured as
  // genuinely unreachable until the bar was dismissed. Padding the body by the
  // bar's own height gives that content somewhere to scroll to. The floating
  // controls in both bottom corners have to clear it too, so the same height
  // is published as a variable they read. It is measured rather than guessed
  // because the bar grows as its text wraps on narrow screens.
  useEffect(() => {
    const el = ref.current;
    const root = document.documentElement;
    const clear = () => {
      root.style.removeProperty("--floating-offset");
      document.body.style.removeProperty("padding-bottom");
    };
    if (!show || !el) {
      clear();
      return;
    }
    const ro = new ResizeObserver(([entry]) => {
      const h = entry.contentRect.height;
      root.style.setProperty("--floating-offset", `${h + 24}px`);
      document.body.style.paddingBottom = `${h}px`;
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      clear();
    };
  }, [show]);

  const choose = (value: Consent) => {
    memory = value;
    try {
      localStorage.setItem(KEY, value);
    } catch {
      // Storage unavailable — `memory` above already holds it for this page.
    }
    // Tells this tab's subscriber to re-read, which is what hides the bar.
    window.dispatchEvent(new CustomEvent("cube-consent", { detail: value }));

    // Withdrawing needs more than unmounting the component: that removes the
    // tag, but gtag.js has already run and would keep reporting from memory
    // for the rest of the visit. A reload is the only way to be rid of it.
    //
    // The test is whether the script is actually on the page, not what the
    // previous answer was — reopening this banner from the footer clears the
    // answer to null first, so comparing against "granted" missed exactly the
    // path the footer link creates, and left gtag running after a withdrawal.
    if (
      value === "denied" &&
      document.querySelector('script[src*="googletagmanager"]')
    ) {
      window.location.reload();
    }
  };

  if (!show) return null;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t bg-[var(--surface)] shadow-2xl"
    >
      <div className="shell flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="text-[0.8125rem] leading-relaxed text-[var(--muted)]">
          We use cookies to see how the site is used, so we can improve it.
          Nothing is loaded until you choose.{" "}
          <Link href="/terms" className="focus-ring link-underline text-[var(--fg)]">
            Terms &amp; conditions
          </Link>
        </p>

        <div className="flex shrink-0 gap-3">
          <button
            onClick={() => choose("denied")}
            className="focus-ring btn btn-ghost !py-3 text-[0.8125rem]"
          >
            Decline
          </button>
          <button
            onClick={() => choose("granted")}
            className="focus-ring btn btn-dark !py-3 text-[0.8125rem]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
