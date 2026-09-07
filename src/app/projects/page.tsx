import type { Metadata } from "next";
import { ProjectIndex } from "@/components/project-index";
import { projects, stats } from "@/data/projects";

export const metadata: Metadata = {
  title: "All projects",
  description:
    "Every residential and commercial development by CubeSense Properties — ongoing, upcoming and handed over.",
};

export default async function AllProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ area?: string }>;
}) {
  const { area } = await searchParams;

  return (
    <ProjectIndex
      eyebrow={`${stats.total} developments`}
      title="Every project"
      lead={`Ongoing, upcoming and handed over — ${stats.apartments} apartments across ${stats.areas} of Dhaka's prime addresses.`}
      projects={projects}
      initialArea={area}
    />
  );
}
