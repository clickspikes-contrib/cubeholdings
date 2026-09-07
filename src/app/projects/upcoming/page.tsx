import type { Metadata } from "next";
import { ProjectIndex } from "@/components/project-index";
import { byStatus } from "@/data/projects";

export const metadata: Metadata = {
  title: "Upcoming projects",
  description:
    "Forthcoming residential developments from Cube Holdings Ltd. Register early interest before launch.",
};

export default function UpcomingPage() {
  return (
    <ProjectIndex
      eyebrow="In planning"
      title="Upcoming"
      lead="Developments approved and preparing to break ground. Register early to see plans before launch."
      projects={byStatus("upcoming")}
    />
  );
}
