import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join CubeSense Properties — a forward-thinking real estate developer in Dhaka where innovation, integrity and excellence drive everything we do.",
};

const REASONS = [
  {
    t: "An environment that invites ideas",
    d: "We encourage creativity and new thinking, and give it somewhere to go rather than filing it away.",
  },
  {
    t: "Room to grow professionally",
    d: "We develop our team through learning, added responsibility and a real path into leadership.",
  },
  {
    t: "Genuine collaboration",
    d: "Our culture runs on teamwork — every member contributes to what the company delivers.",
  },
  {
    t: "Integrity and excellence",
    d: "We work to strong values and hold the highest standards on every project we take on.",
  },
  {
    t: "Balance we actually respect",
    d: "Professional responsibility matters, and so does the life you have outside of it.",
  },
  {
    t: "A company still growing",
    d: "As we expand, so do the opportunities for people who want to build something lasting.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        image="/projects/muhurta-1.jpeg"
        eyebrow="Careers"
        title={
          <>
            Build a career
            <br />
            worth building.
          </>
        }
        lead="Join a forward-thinking organisation where innovation, integrity and excellence drive everything we do."
      />

      <section className="shell py-20 lg:py-24">
        <Reveal>
          <p className="label">Why work with us</p>
          <h2 className="display mt-5 max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)]">
            A professional, innovative and collaborative place to work.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r, i) => (
            <Reveal key={r.t} delay={(i % 3) * 90}>
              <article className="border-t pt-6">
                <h3 className="display text-[1.5rem] leading-tight">{r.t}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                  {r.d}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t bg-[var(--surface-2)]">
        <div className="shell py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <Reveal>
              <p className="label">Open application</p>
              <h2 className="display mt-5 text-[clamp(2rem,4vw,3rem)]">
                Send us your CV.
              </h2>
              <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-[var(--muted)]">
                We do not always have a role posted, but we always read good
                applications. Tell us what you do well and where you would like
                to take it, and our HR team will be in touch when something
                fits.
              </p>
            </Reveal>

            <Reveal delay={100} className="card border border-[var(--line)] p-8">
              <p className="label">Apply via email</p>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent("Career application")}`}
                className="focus-ring display mt-4 block break-all text-[1.5rem] transition-colors hover:text-brand-600"
              >
                {site.email}
              </a>
              <p className="mt-6 text-[0.875rem] leading-relaxed text-[var(--muted)]">
                Attach your CV as a PDF and put the role you are interested in
                in the subject line.
              </p>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent("Career application")}`}
                className="btn btn-dark mt-7"
              >
                Apply now
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
