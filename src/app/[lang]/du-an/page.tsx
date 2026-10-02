import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/ContactSection";
import { PageHero } from "@/components/PageHero";
import { ProjectBrowser } from "@/components/ProjectBrowser";
import { SheetHead } from "@/components/SheetHead";
import { getContent } from "@/lib/content";
import { hasLocale } from "@/lib/i18n";

const wrap = "mx-auto max-w-[1200px] px-5 md:px-8";

export async function generateMetadata({ params }: PageProps<"/[lang]/du-an">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getContent(lang).projectsPage;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { languages: { vi: "/vi/du-an", en: "/en/du-an" } },
  };
}

export default async function ProjectsPage({ params }: PageProps<"/[lang]/du-an">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getContent(lang);
  const t = c.projectsPage;

  return (
    <main>
      <PageHero
        lang={lang}
        crumb={c.nav.projects}
        sheet="01"
        topic={c.nav.projects}
        title={t.title}
        lead={t.lead}
        aside={
          <dl className="grid grid-cols-2 gap-px border border-rule bg-rule">
            <div className="bg-night px-5 py-4">
              <dt className="sheet-label text-ash">{t.statProjects}</dt>
              <dd className="display mt-1.5 text-4xl">{c.projects.length}</dd>
            </div>
            <div className="bg-night px-5 py-4">
              <dt className="sheet-label text-ash">{t.statCeremonies}</dt>
              <dd className="display mt-1.5 text-4xl">{c.ceremonies.length}</dd>
            </div>
            <div className="col-span-2 bg-night px-5 py-4">
              <dt className="sheet-label text-ash">{t.statCategories}</dt>
              <dd className="mt-1.5 font-semibold">{c.projectCategories.join(" · ")}</dd>
            </div>
          </dl>
        }
      />

      {/* Dòng thời gian đại lễ */}
      <section className="blueprint border-b border-rule bg-night-2 py-16 md:py-20">
        <div className={wrap}>
          <SheetHead lang={lang} sheet="02" topic={t.ceremoniesTopic}>
            {t.ceremoniesTitle}
          </SheetHead>
          <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5" data-reveal-group="up">
            <span aria-hidden="true" data-reveal="line" className="absolute top-[5px] right-0 left-0 hidden h-px bg-signal lg:block" />
            {c.ceremonies.map((cer) => (
              <li key={cer.code} className="relative">
                <span aria-hidden="true" className="block size-[11px] rounded-full bg-signal" />
                <p className="mt-5 flex items-baseline gap-3">
                  <span className="display text-5xl">{cer.code}</span>
                  <span className="font-mono text-sm text-ash">{cer.year}</span>
                </p>
                <p className="mt-2 max-w-[28ch] text-sm leading-relaxed text-ash">{cer.name}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Danh sách dự án */}
      <section className="py-16 md:py-24">
        <div className={wrap}>
          <SheetHead lang={lang} sheet="03" topic={t.listTopic}>
            {t.listTitle}
          </SheetHead>
          <ProjectBrowser projects={c.projects} categories={c.projectCategories} t={t} />
        </div>
      </section>

      <ContactSection lang={lang} sheet="04" />
    </main>
  );
}
