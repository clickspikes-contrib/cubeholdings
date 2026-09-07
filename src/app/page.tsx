import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { StatsStrip } from "@/components/stats-strip";
import { byStatus, projects, areas, stats } from "@/data/projects";
import { site } from "@/lib/site";

export default function Home() {
  const ongoing = byStatus("ongoing")
    .filter((p) => p.images.length)
    .slice(0, 6);
  const feature = projects.find(
    (p) => p.slug === "uttshov" && p.images.length >= 3,
  );
  const secondary = projects.find(
    (p) => p.slug === "bristi" && p.images.length >= 2,
  );

  return (
    <>
      <Hero />

      {/* ——— Approach + bento ——— */}
      <section className="shell py-20 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <h2 className="display text-[clamp(1.875rem,4vw,2.875rem)]">
              Your home should do more
              <br className="hidden sm:block" /> than simply exist.
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-[var(--muted)] lg:pt-2">
              Since {site.since} we have built across Dhaka, combining modern
              architecture, premium materials and a standard of finish we do not
              compromise on.
            </p>
          </div>
        </Reveal>

        {/* Bento: large image, copy card, stacked image + price card */}
        <div className="mt-12 grid gap-4 lg:grid-cols-[1.6fr_1fr_1.1fr]">
          {feature && (
            <Reveal className="group relative min-h-[320px] overflow-hidden rounded-[1.25rem] bg-[var(--surface-2)] lg:min-h-[420px]">
              <Image
                src={feature.images[1] ?? feature.images[0]}
                alt={feature.name}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="img-zoom object-cover"
              />
            </Reveal>
          )}

          <Reveal delay={90} className="card flex flex-col justify-between border border-[var(--line)] p-7">
            <div>
              <h3 className="display text-[1.5rem] leading-tight">
                Big things happen in well-planned spaces.
              </h3>
              <p className="mt-4 text-[0.875rem] leading-relaxed text-[var(--muted)]">
                Thoughtful design and smart organisation let you use every inch
                — cross-ventilation, real storage and floor area that works
                rather than merely counts.
              </p>
            </div>
            <Link href="/about" className="btn btn-ghost mt-8 self-start">
              Our approach
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </Reveal>

          <Reveal delay={160} className="flex flex-col gap-4">
            {secondary && (
              <div className="group relative min-h-[180px] flex-1 overflow-hidden rounded-[1.25rem] bg-[var(--surface-2)]">
                <Image
                  src={secondary.images[0]}
                  alt={secondary.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="img-zoom object-cover"
                />
              </div>
            )}
            <div className="card border border-[var(--line)] p-6">
              <p className="label">Studio to penthouse</p>
              <p className="display mt-2 text-[1.5rem]">770 – 3,920 sft</p>
              <Link href="/projects" className="btn btn-dark mt-5 w-full justify-center">
                Explore properties
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ——— Stats ——— */}
      <section className="shell pb-20 lg:pb-24">
        <Reveal>
          <StatsStrip />
        </Reveal>
      </section>

      {/* ——— Areas ——— */}
      <section className="band py-20 lg:py-24">
        <div className="shell">
          <Reveal className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="grid grid-cols-2 gap-3">
              {areas.map((area) => {
                const count = projects.filter((p) => p.area === area).length;
                return (
                  <Link
                    key={area}
                    href={`/projects?area=${encodeURIComponent(area)}`}
                    className="focus-ring card card-hover border border-[var(--line)] p-5 hover:border-brand-400"
                  >
                    <span className="display text-[2rem] leading-none text-brand-600">
                      {count}
                    </span>
                    <span className="mt-2 block text-[0.875rem]">{area}</span>
                  </Link>
                );
              })}
            </div>

            <div>
              <h2 className="display text-[clamp(1.875rem,4vw,2.875rem)]">
                Addresses chosen for how they will live in ten years.
              </h2>
              <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                We build where the fundamentals hold — planned plots, real road
                access and neighbourhoods with somewhere to go. {stats.total}{" "}
                developments across {stats.areas} of Dhaka&apos;s most considered
                locations.
              </p>
              <Link href="/projects" className="btn btn-dark mt-8">
                Find your address
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ——— Ongoing projects ——— */}
      <section className="shell py-20 lg:py-28">
        <Reveal>
          <SectionHeading
            title="Explore our ongoing homes"
            lead="Each development is planned around light, air and the way families actually live — with specifications you can verify on site."
            href="/projects/ongoing"
            linkLabel={`See all ${byStatus("ongoing").length}`}
          />
        </Reveal>

        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {ongoing.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 80}>
              <ProjectCard project={p} priority={i < 3} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ——— Closing CTA ——— */}
      <section className="px-2 pb-2 lg:px-3 lg:pb-3">
        <Reveal className="relative overflow-hidden rounded-[1.75rem] bg-ink-950 lg:rounded-[2.5rem]">
          {feature?.images[2] && (
            <Image
              src={feature.images[2]}
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-45"
            />
          )}
          <div className="relative px-6 py-20 text-center lg:py-28">
            <h2 className="display mx-auto max-w-3xl text-[clamp(1.875rem,4.5vw,3.25rem)] text-white">
              Ready to make your dream home a reality?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-white/70">
              Explore a curated selection of developments that align with how
              you want to live — or share your land and let us build on it.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/projects/ongoing" className="btn btn-light">
                Get started
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link
                href="/landowners"
                className="btn border border-white/30 text-white hover:bg-white/10"
              >
                I own land
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
