import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { projects, stats, areas } from "@/data/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Since 2012, Cube Holdings Ltd. has built residential and commercial developments across Dhaka. A REHAB member committed to quality, integrity and long-term relationships.",
};

const PRINCIPLES = [
  {
    n: "01",
    t: "Design that works",
    d: "Every plan starts with how a family actually moves through a home — light, cross-ventilation, storage and usable floor area before anything decorative.",
  },
  {
    n: "02",
    t: "Quality without exception",
    d: "Premium construction materials, modern engineering practice and innovative design, checked at every stage rather than signed off at the end.",
  },
  {
    n: "03",
    t: "Integrity in writing",
    d: "Clear documentation, an honest payment schedule and after-sales service that continues long past the day we hand over the keys.",
  },
  {
    n: "04",
    t: "Built to outlast us",
    d: "Structural durability and a peaceful environment, so the building still reads well twenty years from now.",
  },
];

export default function AboutPage() {
  const cover = projects.find((p) => p.images.length >= 2);

  return (
    <>
      <PageHeader
        image="/projects/bandhan-1.jpeg"
        eyebrow={`Established ${site.since} · Dhaka`}
        title={
          <>
            A home is more than
            <br />
            just a structure.
          </>
        }
        lead="It is a reflection of comfort, security, lifestyle and lasting value — and that belief has shaped everything we have built since 2012."
      />

      {/* Narrative */}
      <section className="shell py-20 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr]">
          <Reveal className="max-w-2xl space-y-6 text-[1.0625rem] leading-relaxed">
            <p>
              Since {site.since}, Cube Holdings Ltd. has been committed to
              transforming urban living in Bangladesh through carefully designed
              residential and commercial developments that combine modern
              architecture, premium quality and a sense of permanence.
            </p>
            <p className="text-[var(--muted)]">
              Driven by innovation and guided by integrity, we have become one of
              the trusted names in the real estate industry here. That standing
              rests on professionalism, customer satisfaction, architectural
              excellence and long-term relationships with both clients and
              landowners.
            </p>
            <p className="text-[var(--muted)]">
              From apartments and contemporary commercial spaces to
              eco-conscious developments, we build communities that elevate how
              people live — places where families grow, businesses do well and
              plans made today still make sense in a generation.
            </p>
            <p className="text-[var(--muted)]">
              We are proud to be a member of the Real Estate &amp; Housing
              Association of Bangladesh (REHAB) and to hold to the highest
              ethical and professional standards in the industry.
            </p>
          </Reveal>

          {cover && (
            <Reveal delay={120} className="grid grid-cols-2 gap-3 self-start">
              <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-[var(--surface-2)]">
                <Image
                  src={cover.images[0]}
                  alt={cover.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-[var(--surface-2)]">
                <Image
                  src={cover.images[1]}
                  alt=""
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>
              <blockquote className="card flex items-center border border-[var(--line)] p-6">
                <p className="display text-[1.5rem] leading-tight">
                  “The address of your dreams.”
                </p>
              </blockquote>
            </Reveal>
          )}
        </div>
      </section>

      {/* Principles */}
      <section className="border-y bg-[var(--surface-2)]">
        <div className="shell py-20 lg:py-24">
          <Reveal>
            <p className="label">What we hold to</p>
            <h2 className="display mt-5 max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)]">
              Quality is never compromised.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.n} delay={(i % 2) * 90}>
                <article className="border-t pt-6">
                  <span className="font-mono text-xs text-brand-600">{p.n}</span>
                  <h3 className="display mt-4 text-[1.625rem]">{p.t}</h3>
                  <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                    {p.d}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Figures */}
      <section className="shell py-20 lg:py-24">
        <Reveal>
          <p className="label">By the numbers</p>
        </Reveal>
        <dl className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: stats.total, l: "Projects delivered and underway" },
            { n: stats.apartments, l: "Apartments planned or built" },
            { n: stats.handedOver, l: "Buildings handed over" },
            { n: new Date().getFullYear() - stats.since, l: "Years in practice" },
          ].map((s) => (
            <div key={s.l} className="card border border-[var(--line)] p-7">
              <dt className="display text-[3rem] leading-none tabular-nums">
                {s.n}
              </dt>
              <dd className="mt-3 text-[0.875rem] leading-snug text-[var(--muted)]">
                {s.l}
              </dd>
            </div>
          ))}
        </dl>

        <Reveal delay={100} className="mt-14">
          <p className="label">Where we build</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {areas.map((a) => (
              <Link
                key={a}
                href={`/projects?area=${encodeURIComponent(a)}`}
                className="focus-ring rounded-full border px-5 py-2.5 text-sm transition-colors hover:border-brand-500 hover:text-brand-600"
              >
                {a}
                <span className="ml-2 text-xs opacity-60">
                  {projects.filter((p) => p.area === a).length}
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Closing */}
      <section className="border-t bg-ink-950 text-paper">
        <div className="shell py-20 lg:py-24">
          <p className="display max-w-4xl text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05]">
            We do not only build properties. We create places where families
            grow, businesses thrive and dreams come to life.
          </p>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/projects/ongoing"
              className="btn bg-brand-500 text-white"
            >
              See what we are building
            </Link>
            <Link
              href="/contact"
              className="focus-ring rounded-full border border-white/25 px-6 py-3.5 text-sm font-medium transition-colors hover:bg-white/10"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
