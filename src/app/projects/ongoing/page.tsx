import type { Metadata } from "next";
import { ProjectIndex } from "@/components/project-index";
import { byStatus } from "@/data/projects";

export const metadata: Metadata = {
  title: "Ongoing projects",
  description:
    "Residential developments currently under construction by Cube Holdings Ltd. across Bashundhara, Uttara, Banani and Jolshiri Abashon.",
};

export default function OngoingPage() {
  return (
    <ProjectIndex
      eyebrow="Under construction"
      title="Ongoing projects"
      lead="Developments currently on site. Each listing shows the plot, structure and unit plan as approved."
      projects={byStatus("ongoing")}
    />
  );
}
