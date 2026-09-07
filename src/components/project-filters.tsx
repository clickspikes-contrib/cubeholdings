"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "./project-card";
import type { Project } from "@/data/projects";

type Sort = "default" | "size" | "units";

/** Client-side filtering over a pre-rendered project list. */
export function ProjectFilters({
  projects,
  initialArea,
}: {
  projects: Project[];
  initialArea?: string;
}) {
  const areas = useMemo(
    () => [...new Set(projects.map((p) => p.area))].sort(),
    [projects],
  );
  const [area, setArea] = useState<string>(
    initialArea && areas.includes(initialArea) ? initialArea : "All",
  );
  const [sort, setSort] = useState<Sort>("default");

  const shown = useMemo(() => {
    const list =
      area === "All" ? projects : projects.filter((p) => p.area === area);
    const sorted = [...list];
    if (sort === "size")
      sorted.sort((a, b) => (b.landKatha ?? 0) - (a.landKatha ?? 0));
    if (sort === "units") sorted.sort((a, b) => b.apartments - a.apartments);
    return sorted;
  }, [projects, area, sort]);

  return (
    <>
      {/* Filter bar lifts over the header panel, echoing the hero card edge. */}
      <div className="card relative -mt-8 flex flex-wrap items-center justify-between gap-5 border border-[var(--line)] p-4 shadow-sm lg:-mt-10 lg:p-5">
        <div className="flex flex-wrap items-center gap-2">
          {["All", ...areas].map((a) => (
            <button
              key={a}
              onClick={() => setArea(a)}
              aria-pressed={area === a}
              className={`focus-ring rounded-full px-4 py-2 text-sm transition-colors ${
                area === a
                  ? "bg-ink-900 text-white dark:bg-brand-500"
                  : "bg-[var(--surface-2)] hover:text-brand-600"
              }`}
            >
              {a}
              {a !== "All" && (
                <span className="ml-2 text-[0.75rem] opacity-60">
                  {projects.filter((p) => p.area === a).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2.5 text-sm">
          <span className="text-[var(--muted)]">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="focus-ring cursor-pointer rounded-full bg-[var(--surface-2)] px-4 py-2 text-sm"
          >
            <option value="default">Default</option>
            <option value="size">Land area</option>
            <option value="units">Apartments</option>
          </select>
        </label>
      </div>

      <p className="mt-8 text-sm text-[var(--muted)]">
        Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
        {area !== "All" && ` in ${area}`}
      </p>

      {shown.length > 0 ? (
        <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <ProjectCard key={p.slug} project={p} priority={i < 3} />
          ))}
        </div>
      ) : (
        <p className="py-24 text-center text-[var(--muted)]">
          No projects match this filter yet.
        </p>
      )}
    </>
  );
}
