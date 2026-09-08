"use client";

import { resetConsent } from "./cookie-consent";

/**
 * Reopens the consent banner. The footer is a server component, so this small
 * client island is all that needs shipping to give visitors a way back to a
 * choice they have already made.
 */
export function CookieSettingsLink() {
  return (
    <button
      onClick={resetConsent}
      className="focus-ring text-left transition-colors hover:text-brand-600"
    >
      Cookie settings
    </button>
  );
}
