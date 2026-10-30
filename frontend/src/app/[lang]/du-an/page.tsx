import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectBrowser } from "@/components/ProjectBrowser";
import { SheetHead } from "@/components/SheetHead";
import { getContent } from "@/lib/content";
import { alternatesFor, hasLocale } from "@/lib/i18n";
import { getProjects } from "@/lib/projects";

const wrap = "mx-auto max-w-[1200px] px-5 md:px-8";

export async function generateMetadata({ params }: PageProps<"/[lang]/du-an">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getContent(lang).projectsPage;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: alternatesFor(lang, "/du-an"),
  };
}

export default async function ProjectsPage({ params }: PageProps<"/[lang]/du-an">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getContent(lang);
  const t = c.projectsPage;
  const projects = await getProjects(lang);

  return (
    <main>
      <h1 className="sr-only">{t.title}</h1>

      {/* Danh sách dự án */}
      <section className="py-16 md:py-24">
        <div className={wrap}>
          <SheetHead topic={t.listTopic}>
            {t.listTitle}
          </SheetHead>
          <ProjectBrowser projects={projects} categories={c.projectCategories} t={t} lang={lang} />
        </div>
      </section>
    </main>
  );
}
