import Image from "next/image";
import Link from "next/link";
import { projects, stats } from "@/data/projects";

const CHIPS = ["Apartment", "Duplex", "Commercial"];

export function Hero() {
  const feature =
    projects.find((p) => p.slug === "bohota" && p.images.length) ??
    projects.find((p) => p.images.length)!;

  return (
    <section className="px-2 pt-2 lg:px-3 lg:pt-3">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-ink-950 lg:rounded-[2.5rem]">
        <Image
          src={feature.images[0]}
          alt={`${feature.name}, ${feature.area}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Legibility scrim: darkest at the lower left where the headline sits. */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/45 to-ink-950/55" />

        <div className="relative flex min-h-[560px] flex-col justify-end px-6 pb-12 pt-28 sm:min-h-[640px] lg:min-h-[720px] lg:px-14 lg:pb-16">
          <div className="flex flex-wrap gap-2">
            {CHIPS.map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs text-white backdrop-blur-sm"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <h1 className="display text-[clamp(2.5rem,6.5vw,5rem)] text-white">
              Build Your Future,
              <br />
              One Home at a Time.
            </h1>

            <div className="lg:pb-3">
              <p className="max-w-sm text-[0.9375rem] leading-relaxed text-white/70">
                Residential and commercial developments across Bashundhara,
                Uttara, Banani and Jolshiri Abashon — designed for comfort,
                built to last since {stats.since}.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/projects/ongoing" className="btn btn-light">
                  Explore properties
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="btn border border-white/30 text-white hover:bg-white/10"
                >
                  Talk to sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
