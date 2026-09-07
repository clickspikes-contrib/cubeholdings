import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { byStatus } from "@/data/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Client stories",
  description:
    "Walk through completed CubeSense buildings, see the quality we deliver, and hear from the families living in them.",
};

export default function ClientStoriesPage() {
  const delivered = byStatus("handed-over").filter((p) => p.images.length);

  return (
    <>
      <PageHeader
        image="/projects/suprobhat-1.jpeg"
        eyebrow="For clients"
        title="The buildings speak first."
        lead="Video walkthroughs and project tours are on our YouTube channel. Until then, here is every building we have completed and handed to its owners."
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={site.social.youtube}
            target="_blank"
            rel="noreferrer noopener"
            className="btn btn-dark"
          >
            Watch on YouTube
          </a>
          <Link
            href="/contact"
            className="btn btn-ghost"
          >
            Arrange a site visit
          </Link>
        </div>
      </PageHeader>

      <section className="shell py-20 lg:py-24">
        <Reveal>
          <p className="label">Completed and occupied</p>
          <h2 className="display mt-5 max-w-2xl text-[clamp(2rem,4vw,3rem)]">
            {delivered.length} buildings, handed over.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {delivered.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 80}>
              <Link href={`/projects/${p.slug}`} className="focus-ring group block">
                <div className="card-hover relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-[var(--surface-2)]">
                  <Image
                    src={p.images[0]}
                    alt={`${p.name}, ${p.area}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="img-zoom object-cover"
                  />
                </div>
                <h3 className="display mt-4 text-[1.375rem] transition-colors group-hover:text-brand-600">
                  {p.name}
                </h3>
                <p className="mt-1 text-[0.875rem] text-[var(--muted)]">
                  {p.area} · {p.apartments} apartments · {p.floors}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
