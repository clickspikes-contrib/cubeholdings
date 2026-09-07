import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./logo";
import { stats } from "@/data/projects";

const columns = [
  {
    title: "Projects",
    links: [
      { href: "/projects/ongoing", label: `Ongoing (${stats.ongoing})` },
      { href: "/projects/upcoming", label: "Upcoming" },
      { href: "/projects/handed-over", label: `Handed over (${stats.handedOver})` },
      { href: "/projects", label: "All projects" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/careers", label: "Careers" },
      { href: "/blog", label: "Journal" },
      { href: "/landowners", label: "For landowners" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/contact", label: "Contact us" },
      { href: "/client-stories", label: "Client stories" },
      { href: "/terms", label: "Terms & conditions" },
    ],
  },
];

const socials = [
  { href: site.social.facebook, label: "Facebook" },
  { href: site.social.instagram, label: "Instagram" },
  { href: site.social.youtube, label: "YouTube" },
  { href: site.social.linkedin, label: "LinkedIn" },
];

export function SiteFooter() {
  return (
    <footer className="band mt-20 border-t lg:mt-28">
      <div className="shell py-16 lg:py-20">
        {/* Split headline, mirroring the reference's closing statement */}
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <h2 className="display text-[clamp(1.75rem,4.5vw,3rem)]">
            Building Dhaka&apos;s Addresses{" "}
            <span className="text-[var(--muted)]">with Care and Craft</span>
          </h2>

          <address className="not-italic lg:pt-2 lg:text-right">
            <p className="text-[0.9375rem] leading-relaxed text-[var(--muted)]">
              {site.office.building}
              <br />
              {site.office.line}
            </p>
            <a
              href={`tel:${site.hotlineTel}`}
              className="focus-ring mt-3 inline-block text-[0.9375rem] transition-colors hover:text-brand-600"
            >
              {site.hotline}
            </a>
          </address>
        </div>

        <div className="rule my-12" />

        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo className="dark-logo h-9 w-auto" />
            <p className="mt-5 max-w-xs text-[0.875rem] leading-relaxed text-[var(--muted)]">
              Residential and commercial developments across Dhaka since{" "}
              {site.since}. Member of REHAB.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="focus-ring rounded-full border px-4 py-2 text-xs transition-colors hover:border-brand-500 hover:text-brand-600"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="label">{col.title}</h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="focus-ring link-underline text-[0.9375rem] text-[var(--muted)] transition-colors hover:text-brand-600"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="rule my-12" />

        <div className="flex flex-col gap-4 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Cube Holdings Limited. All rights
            reserved.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a
              href={`mailto:${site.email}`}
              className="focus-ring transition-colors hover:text-brand-600"
            >
              {site.email}
            </a>
            <Link
              href="/terms"
              className="focus-ring transition-colors hover:text-brand-600"
            >
              Terms &amp; conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
