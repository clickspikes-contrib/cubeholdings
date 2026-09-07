import type { Metadata } from "next";
import { ProjectIndex } from "@/components/project-index";
import { byStatus } from "@/data/projects";

export const metadata: Metadata = {
  title: "Handed over projects",
  description:
    "Completed residential and commercial buildings delivered by CubeSense Properties in Dhaka.",
};

export default function HandedOverPage() {
  return (
    <ProjectIndex
      eyebrow="Completed and delivered"
      title="Handed over"
      lead="Buildings finished, handed to their owners and lived in. The clearest record of what we build."
      projects={byStatus("handed-over")}
    />
  );
}
