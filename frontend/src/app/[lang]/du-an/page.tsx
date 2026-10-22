import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ProjectBrowser } from "@/components/ProjectBrowser";
import { SheetHead } from "@/components/SheetHead";
import { getContent } from "@/lib/content";
import { alternatesFor, hasLocale } from "@/lib/i18n";

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

  return (
    <main>
      <PageHero
        lang={lang}
        crumb={c.nav.projects}
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
          <SheetHead topic={t.ceremoniesTopic}>
            {t.ceremoniesTitle}
          </SheetHead>
          <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5" data-reveal-group="up">
            <span aria-hidden="true" data-reveal="line" className="absolute top-[5px] right-0 left-0 hidden h-px bg-signal lg:block" />
            {c.ceremonies.map((cer, i) => (
              <li key={cer.code} className="relative pl-7 lg:pl-0">
                {/* Mobile: chấm đỏ nằm ngang với mã đại lễ, đường kẻ dọc nối các mốc. Desktop: chấm trên đường kẻ ngang */}
                <span aria-hidden="true" className="absolute top-[0.55em] left-0 size-[11px] rounded-full bg-signal lg:static lg:block" />
                {i < c.ceremonies.length - 1 && (
                  <span aria-hidden="true" className="absolute top-[1.4em] bottom-[-2rem] left-[5px] w-px bg-signal/40 lg:hidden" />
                )}
                <p className="flex items-baseline gap-3 lg:mt-5">
                  <span className="display text-5xl leading-none">{cer.code}</span>
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
          <SheetHead topic={t.listTopic}>
            {t.listTitle}
          </SheetHead>
          <ProjectBrowser projects={c.projects} categories={c.projectCategories} t={t} lang={lang} />
        </div>
      </section>
    </main>
  );
}
