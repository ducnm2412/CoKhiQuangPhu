import type { Project } from "@/lib/content";
import { Photo } from "./ui";

function ProjectCard({ p, indent, categories }: { p: Project; indent: boolean; categories: string[] }) {
  return (
    <article data-reveal="up" className={indent ? "md:pl-[7%]" : "md:pr-[7%]"}>
      <div data-reveal="wipe">
        <Photo image={p.image} sizes="(min-width: 768px) 520px, 100vw" className="aspect-[3/2]" />
      </div>
      <p className="mt-5 flex flex-wrap gap-x-3 text-xs text-ash">
        <span className="font-mono text-bone">{p.year}</span>
        <span>{p.place}</span>
        <span className="text-signal">{categories[p.category]}</span>
      </p>
      <h3 className="mt-2 text-xl leading-snug font-semibold uppercase md:text-[1.4rem]">{p.title}</h3>
      <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-ash">{p.body}</p>
    </article>
  );
}

// Hai cột so le: cột phải lùi xuống, mỗi cột thụt lề xen kẽ. Di động: một cột.
export function ProjectGrid({ projects, categories }: { projects: Project[]; categories: string[] }) {
  const left = projects.filter((_, i) => i % 2 === 0);
  const right = projects.filter((_, i) => i % 2 === 1);

  return (
    <>
      <div className="space-y-14 md:hidden">
        {projects.map((p) => (
          <ProjectCard key={p.title} categories={categories} p={p} indent={false} />
        ))}
      </div>

      <div className="hidden gap-[6%] md:grid md:grid-cols-2">
        <div className="space-y-24">
          {left.map((p, i) => (
            <ProjectCard key={p.title} categories={categories} p={p} indent={i % 2 === 0} />
          ))}
        </div>
        <div className={`space-y-24 ${right.length ? "pt-36" : ""}`}>
          {right.map((p, i) => (
            <ProjectCard key={p.title} categories={categories} p={p} indent={i % 2 === 1} />
          ))}
        </div>
      </div>
    </>
  );
}
