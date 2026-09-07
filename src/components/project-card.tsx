import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

const STATUS_LABEL: Record<Project["status"], string> = {
  ongoing: "Ongoing",
  "handed-over": "Handed over",
  upcoming: "Upcoming",
};

function Meta({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) {
  return (
    <span className="flex items-center gap-1.5 whitespace-nowrap text-[0.8125rem] text-[var(--muted)]">
      <svg
        viewBox="0 0 24 24"
        className="size-4 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={path} />
      </svg>
      {children}
    </span>
  );
}

const ICON = {
  bed: "M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18v2M21 18v2M3 14h18M7 10V7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3",
  floors: "M4 21V8l8-5 8 5v13M4 21h16M9 21v-5h6v5",
  car: "M5 17h14M6 17l-1.4-4.2A2 2 0 0 1 6.5 10h11a2 2 0 0 1 1.9 2.8L18 17M7 20v-3m10 3v-3",
  pin: "M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z M12 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z",
};

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const cover = project.images[0];
  // "2650 SFT & 1770 SFT" -> lead with the largest quoted plan.
  const size = project.size?.split(/\s*[&,]\s*/)[0]?.trim();

  return (
    <Link href={`/projects/${project.slug}`} className="focus-ring group block">
      <article>
        <div className="card-hover relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-[var(--surface-2)]">
          {cover && (
            <Image
              src={cover}
              alt={`${project.name} — ${project.area}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              className="img-zoom object-cover"
            />
          )}
          <span className="absolute left-3.5 top-3.5 rounded-full bg-white/92 px-3 py-1.5 text-[0.6875rem] font-semibold text-ink-900 shadow-sm backdrop-blur-md">
            {STATUS_LABEL[project.status]}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {project.bedrooms && <Meta path={ICON.bed}>{project.bedrooms} Bed</Meta>}
          {project.apartments > 0 && (
            <Meta path={ICON.floors}>{project.apartments} Units</Meta>
          )}
          {project.parking > 0 && (
            <Meta path={ICON.car}>{project.parking} Parking</Meta>
          )}
        </div>

        <h3 className="display mt-2.5 text-[1.375rem] transition-colors group-hover:text-brand-600">
          {project.name}
          {project.nameBn && (
            <span className="bn ml-2 text-[0.9375rem] font-normal text-[var(--muted)]">
              {project.nameBn}
            </span>
          )}
        </h3>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
          {size && (
            <span className="text-[0.9375rem] font-semibold text-brand-600">
              {size}
            </span>
          )}
          <span className="line-clamp-1 text-[0.8125rem] text-[var(--muted)]">
            {project.area}
          </span>
        </div>
      </article>
    </Link>
  );
}
