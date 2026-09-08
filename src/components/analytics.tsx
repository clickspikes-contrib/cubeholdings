"use client";

import { useSyncExternalStore } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { site } from "@/lib/site";
import { getConsent, subscribe } from "./cookie-consent";

/**
 * Loads GA4 only for visitors who accepted.
 *
 * The gtag script is not on the page at all until then — declining means no
 * request to googletagmanager.com and no cookie, rather than a script that
 * loads and promises not to look. Accepting swaps this in immediately, with
 * no reload, because the banner notifies the same store this reads.
 */
export function Analytics() {
  // Unlike the banner, this defaults to "no answer yet" on the server, so
  // analytics is never rendered into the static HTML that every visitor gets.
  const consent = useSyncExternalStore(subscribe, getConsent, () => null);

  if (consent !== "granted") return null;
  return <GoogleAnalytics gaId={site.gaId} />;
}
