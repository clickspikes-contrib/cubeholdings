"use client";

import { useState } from "react";
import { site } from "@/lib/site";

type State = "idle" | "sending" | "sent";

/**
 * No backend exists yet, so the form composes a mailto: draft. Swap the
 * handler for a POST to an API route when a mail service is wired up.
 */
export function EnquiryForm({
  project,
  compact = false,
}: {
  project?: string;
  compact?: boolean;
}) {
  const [state, setState] = useState<State>("idle");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");

    const data = new FormData(e.currentTarget);
    const subject = project
      ? `Enquiry: ${project}`
      : "Website enquiry";
    const body = [
      `Name: ${data.get("name")}`,
      `Mobile: ${data.get("mobile")}`,
      `Email: ${data.get("email")}`,
      project ? `Project: ${project}` : null,
      "",
      String(data.get("message") ?? ""),
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setState("sent");
  }

  // Filled fields with a hairline read as more current than outlined boxes,
  // and the focus ring lands on the field itself rather than a browser default.
  const field =
    "w-full rounded-[0.875rem] border border-[var(--line)] bg-[var(--surface-2)] px-4 py-3.5 text-[0.9375rem] outline-none transition-all duration-200 placeholder:text-[var(--muted)] focus:border-brand-500 focus:bg-[var(--surface)] focus:ring-4 focus:ring-brand-500/12";

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className={compact ? "space-y-3" : "grid gap-3 sm:grid-cols-2"}>
        <label className="block">
          <span className="sr-only">Full name</span>
          <input name="name" required placeholder="Full name" className={field} />
        </label>
        <label className="block">
          <span className="sr-only">Mobile</span>
          <input
            name="mobile"
            required
            type="tel"
            placeholder="Mobile"
            className={field}
          />
        </label>
      </div>

      <label className="block">
        <span className="sr-only">Email address</span>
        <input
          name="email"
          required
          type="email"
          placeholder="Email address"
          className={field}
        />
      </label>

      <label className="block">
        <span className="sr-only">Message</span>
        <textarea
          name="message"
          rows={compact ? 3 : 4}
          placeholder={
            project
              ? `I would like to know more about ${project}.`
              : "How can we help?"
          }
          className={`${field} resize-none`}
        />
      </label>

      <button
        type="submit"
        disabled={state === "sending"}
        className="focus-ring w-full rounded-full bg-ink-900 px-6 py-3.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 disabled:opacity-60 dark:bg-brand-500 dark:text-white"
      >
        {state === "sent" ? "Opening your email app…" : "Send enquiry"}
      </button>

      <p className="text-xs leading-relaxed text-[var(--muted)]">
        We respect your privacy. Your details are used only to answer this
        enquiry. Prefer to talk? Call{" "}
        <a href={`tel:${site.sales}`} className="underline underline-offset-2">
          {site.sales}
        </a>
        .
      </p>
    </form>
  );
}
