import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { EnquiryForm } from "@/components/enquiry-form";
import { Reveal } from "@/components/reveal";
import { stats } from "@/data/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "For landowners",
  description:
    "Partner with Cube Holdings Ltd. on a joint venture. Share your land and turn it into an address that holds its value.",
};

const STEPS = [
  {
    n: "01",
    t: "We visit the land",
    d: "We look at the plot, the road frontage, orientation and what the neighbourhood is becoming — then tell you honestly what it can support.",
  },
  {
    n: "02",
    t: "We propose the terms",
    d: "A clear share of the built area, a schedule and a written agreement. Everything you need to compare our offer against any other.",
  },
  {
    n: "03",
    t: "We design and approve",
    d: "Our architects prepare the scheme and we take it through RAJUK approval, keeping you across every revision.",
  },
  {
    n: "04",
    t: "We build and hand over",
    d: "Construction to the agreed specification, on a schedule you can hold us to, ending with your share handed over complete.",
  },
];

export default function LandownersPage() {
  return (
    <>
      <PageHeader
        image="/projects/nongor-1.jpeg"
        eyebrow="For landowners"
        title={
          <>
            Share your land.
            <br />
            Keep the upside.
          </>
        }
        lead="A joint venture with us turns an idle plot into a finished address — without you carrying the cost or the risk of building it."
      />

      <section className="shell py-20 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Reveal>
              <p className="label">How a partnership works</p>
              <h2 className="display mt-5 max-w-xl text-[clamp(2rem,4vw,3rem)]">
                Four steps, nothing hidden.
              </h2>
            </Reveal>

            <div className="mt-14 space-y-3">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 70}>
                  <article className="card flex gap-6 border border-[var(--line)] p-7">
                    <span className="font-mono text-xs text-brand-600">
                      {s.n}
                    </span>
                    <div>
                      <h3 className="display text-[1.5rem] leading-tight">
                        {s.t}
                      </h3>
                      <p className="mt-2.5 max-w-xl text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                        {s.d}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120} className="mt-14">
              <p className="label">Why owners choose us</p>
              <dl className="mt-7 grid gap-3 sm:grid-cols-3">
                {[
                  { n: `${stats.total}`, l: "Projects delivered and underway" },
                  { n: `${new Date().getFullYear() - stats.since}`, l: "Years of practice in Dhaka" },
                  { n: "REHAB", l: "Association member" },
                ].map((f) => (
                  <div key={f.l} className="card border border-[var(--line)] p-6">
                    <dt className="display text-[2.25rem] leading-none">
                      {f.n}
                    </dt>
                    <dd className="mt-2.5 text-[0.8125rem] leading-snug text-[var(--muted)]">
                      {f.l}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="card border border-[var(--line)] bg-[var(--surface-2)] p-7">
              <h2 className="display text-[1.75rem] leading-tight">
                Tell us about your land
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                Send the location and plot size and we will come back with an
                honest view of what it can become.
              </p>
              <div className="mt-6">
                <EnquiryForm project="Landowner partnership" compact />
              </div>

              <div className="rule my-7" />

              <a
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
                  "Hello, I own land and would like to discuss a joint venture.",
                )}`}
                target="_blank"
                rel="noreferrer noopener"
                className="focus-ring inline-flex rounded-full border px-4 py-2 text-xs transition-colors hover:border-brand-500 hover:text-brand-600"
              >
                Discuss on WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t bg-ink-950 text-paper">
        <div className="shell py-20 lg:py-24">
          <p className="display max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05]">
            See what we have built before you decide who to build with.
          </p>
          <Link
            href="/projects/handed-over"
            className="btn mt-10 bg-brand-500 text-white"
          >
            View handed-over projects
          </Link>
        </div>
      </section>
    </>
  );
}
