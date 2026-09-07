import { PageHeader } from "./page-header";
import { ProjectFilters } from "./project-filters";
import type { Project } from "@/data/projects";

export function ProjectIndex({
  eyebrow,
  title,
  lead,
  projects,
  initialArea,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  projects: Project[];
  initialArea?: string;
}) {
  // Lead with a frame from the set being shown, so the header reflects the page.
  const image = projects.find((p) => p.images.length)?.images[0];

  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} lead={lead} image={image} />
      <div className="shell pb-24 lg:pb-28">
        <ProjectFilters projects={projects} initialArea={initialArea} />
      </div>
    </>
  );
}
