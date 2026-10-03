"use client";

import { useSyncExternalStore } from "react";
import type { Content, Project } from "@/lib/content";
import { projectCategorySlugs } from "@/lib/i18n";
import { ProjectGrid } from "./ProjectGrid";

const ALL = -1;

// Loại đang lọc nằm ở phần # của đường dẫn (vd. /du-an#tuong-bac-ho) để chia sẻ được
// và để menu "Dự án" trên header mở thẳng đúng loại.
const subscribe = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};
const readHash = () => window.location.hash.slice(1);

export function ProjectBrowser({
  projects,
  categories,
  t,
}: {
  projects: Project[];
  categories: string[];
  t: Content["projectsPage"];
}) {
  const hash = useSyncExternalStore(subscribe, readHash, () => "");
  const filter = projectCategorySlugs.indexOf(hash); // -1 = tất cả
  const shown = filter === ALL ? projects : projects.filter((p) => p.category === filter);
  const options = [{ id: ALL, slug: "tat-ca", label: t.all }, ...categories.map((label, id) => ({ id, slug: projectCategorySlugs[id], label }))];

  return (
    <>
      {/* Điểm neo cho từng loại: mở /du-an#loại sẽ cuộn tới danh sách */}
      {options.map((o) => (
        <span key={o.slug} id={o.slug} />
      ))}

      <div className="mb-12 border-b border-rule pb-6 md:mb-16">
        <div role="group" aria-label={t.filter} className="flex flex-wrap gap-2">
          {options.map((o) => (
            <a
              key={o.id}
              href={`#${o.slug}`}
              aria-current={filter === o.id ? "true" : undefined}
              className="border border-rule px-4 py-2 text-sm transition-colors hover:border-bone/60 aria-[current=true]:border-signal aria-[current=true]:bg-signal aria-[current=true]:text-white"
            >
              {o.label}
            </a>
          ))}
        </div>
        <p aria-live="polite" className="sr-only">
          {t.showing.replace("{n}", String(shown.length))}
        </p>
      </div>

      <ProjectGrid key={filter} projects={shown} categories={categories} />
    </>
  );
}
