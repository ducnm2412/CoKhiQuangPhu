"use client";

import { useState } from "react";
import type { Content, Project } from "@/lib/content";
import { ProjectGrid } from "./ProjectGrid";

const ALL = -1;

export function ProjectBrowser({
  projects,
  categories,
  t,
}: {
  projects: Project[];
  categories: string[];
  t: Content["projectsPage"];
}) {
  const [filter, setFilter] = useState(ALL);
  const shown = filter === ALL ? projects : projects.filter((p) => p.category === filter);
  const count = (c: number) => (c === ALL ? projects.length : projects.filter((p) => p.category === c).length);
  const options = [{ id: ALL, label: t.all }, ...categories.map((label, id) => ({ id, label }))];

  return (
    <>
      <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-6 md:mb-16">
        <div role="group" aria-label={t.filter} className="flex flex-wrap gap-2">
          {options.map((o) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={filter === o.id}
              onClick={() => setFilter(o.id)}
              className="border border-rule px-4 py-2 text-sm transition-colors hover:border-bone/60 aria-pressed:border-signal aria-pressed:bg-signal aria-pressed:text-white"
            >
              {o.label} <span className="ml-1 font-mono text-xs opacity-70">{count(o.id)}</span>
            </button>
          ))}
        </div>
        <p aria-live="polite" className="text-sm text-ash">
          {t.showing.replace("{n}", String(shown.length))}
        </p>
      </div>

      <ProjectGrid key={filter} projects={shown} categories={categories} />
    </>
  );
}
