import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/gallery";
import { EnquiryForm } from "@/components/enquiry-form";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { bySlug, projects, type Project } from "@/data/projects";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) return {};

  const desc = `${p.name} — a ${p.status === "handed-over" ? "completed" : p.status} development in ${p.area}. ${p.floors}, ${p.apartments} apartments of ${p.size}.`;

  return {
    title: p.name,
    description: desc,
    openGraph: {
      title: `${p.name} — ${p.area}`,
      description: desc,
      images: p.images.length ? [{ url: p.images[0] }] : undefined,
    },
  };
}

const STATUS_LABEL: Record<Project["status"], string> = {
  ongoing: "Ongoing",
  "handed-over": "Handed over",
  upcoming: "Upcoming",
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = bySlug(slug);
  if (!project) notFound();

  // Prefer neighbours in the same area, then fill from anywhere.
  const related = [
    ...projects.filter(
      (p) => p.slug !== project.slug && p.area === project.area && p.images.length,
    ),
    ...projects.filter(
      (p) => p.slug !== project.slug && p.area !== project.area && p.images.length,
    ),
  ].slice(0, 3);

  const specs = [
    { k: "Location", v: project.area },
    { k: "Land area", v: project.land },
    { k: "Structure", v: project.floors },
    { k: "Apartments", v: project.apartments ? String(project.apartments) : "" },
    { k: "Unit size", v: project.size },
    { k: "Bedrooms", v: project.bedrooms },
    { k: "Car parking", v: project.parking ? String(project.parking) : "" },
    { k: "Front road", v: project.frontRoad },
    { k: "Orientation", v: project.specialty },
    { k: "Basement", v: project.basements },
  ].filter((s) => s.v && s.v.toUpperCase() !== "N/A");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: project.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: project.address,
      addressLocality: project.area,
      addressRegion: "Dhaka",
      addressCountry: "BD",
    },
    numberOfAccommodationUnits: project.apartments || undefined,
    image: project.images[0] ? `${site.url}${project.images[0]}` : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="shell pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-[var(--muted)]">
          <Link href="/projects" className="focus-ring transition-colors hover:text-brand-600">
            Projects
          </Link>
          <span className="mx-2 opacity-50">/</span>
          <span>{project.name}</span>
        </nav>

        <header className="mt-8 flex flex-wrap items-end justify-between gap-6 border-b pb-10">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="badge">
                {STATUS_LABEL[project.status]}
              </span>
              <span className="text-sm text-[var(--muted)]">{project.area}</span>
            </div>
            <h1 className="display mt-4 text-[clamp(2.25rem,6vw,4rem)]">
              {project.name}
            </h1>
            {project.nameBn && (
              <p className="bn mt-2 text-xl text-[var(--muted)]">
                {project.nameBn}
              </p>
            )}
          </div>
          {project.specialty && (
            <p className="max-w-xs text-right text-[0.9375rem] leading-relaxed text-[var(--muted)]">
              {project.specialty}
            </p>
          )}
        </header>
      </div>

      <div className="shell py-10">
        <Gallery images={project.images} name={project.name} />
      </div>

      <div className="shell grid gap-14 pb-24 lg:grid-cols-[1.5fr_1fr] lg:pb-28">
        <div>
          <Reveal>
            <h2 className="label">Project schedule</h2>
            <dl className="mt-7 grid gap-3 sm:grid-cols-2">
              {specs.map((s) => (
                <div
                  key={s.k}
                  className="card border border-[var(--line)] px-5 py-4"
                >
                  <dt className="text-[0.75rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                    {s.k}
                  </dt>
                  <dd className="mt-1.5 text-[1.0625rem]">{s.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {project.address && (
            <Reveal delay={80} className="mt-12">
              <h2 className="label">Address</h2>
              <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed">
                {project.address}
              </p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  `${project.address}, Dhaka, Bangladesh`,
                )}`}
                target="_blank"
                rel="noreferrer noopener"
                className="focus-ring group mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand-600"
              >
                Open in Google Maps
                <svg viewBox="0 0 24 24" className="size-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </Reveal>
          )}
        </div>

        {/* Enquiry rail */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="card border border-[var(--line)] bg-[var(--surface-2)] p-7">
            <h2 className="display text-[1.75rem] leading-tight">
              Enquire about {project.name}
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
              Ask for the floor plan, payment schedule or a site visit. We
              usually reply within a day.
            </p>
            <div className="mt-6">
              <EnquiryForm project={project.name} compact />
            </div>

            <div className="rule my-7" />

            <div className="flex flex-wrap gap-2">
              <a
                href={`tel:${site.sales}`}
                className="focus-ring rounded-full border px-4 py-2 text-xs transition-colors hover:border-brand-500 hover:text-brand-600"
              >
                Call sales
              </a>
              <a
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
                  `Hello, I would like to know more about ${project.name}.`,
                )}`}
                target="_blank"
                rel="noreferrer noopener"
                className="focus-ring rounded-full border px-4 py-2 text-xs transition-colors hover:border-brand-500 hover:text-brand-600"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="border-t bg-[var(--surface-2)]">
          <div className="shell py-20 lg:py-24">
            <h2 className="display text-[clamp(1.75rem,3.5vw,2.5rem)]">
              Other projects
            </h2>
            <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 90}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
