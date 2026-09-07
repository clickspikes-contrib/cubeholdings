import Link from "next/link";

/** Section title on the left, optional supporting copy and link on the right. */
export function SectionHeading({
  title,
  lead,
  href,
  linkLabel,
}: {
  title: React.ReactNode;
  lead?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-2xl">
        <h2 className="display text-[clamp(1.875rem,4vw,2.875rem)]">{title}</h2>
        {lead && (
          <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-[var(--muted)]">
            {lead}
          </p>
        )}
      </div>

      {href && linkLabel && (
        <Link href={href} className="btn btn-dark shrink-0">
          {linkLabel}
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      )}
    </div>
  );
}
