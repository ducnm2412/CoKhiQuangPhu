import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ProductGallery } from "@/components/ProductGallery";
import { ProjectGrid } from "@/components/ProjectGrid";
import { QuoteLink } from "@/components/QuoteLink";
import { SheetHead } from "@/components/SheetHead";
import { getContent } from "@/lib/content";
import { alternatesFor, hasLocale, localePath, locales, routes } from "@/lib/i18n";

const wrap = "mx-auto max-w-[1200px] px-5 md:px-8";

export function generateStaticParams() {
  // Slug dự án giống nhau ở mọi ngôn ngữ
  return locales.flatMap((lang) => getContent(lang).projects.map((p) => ({ lang, slug: p.slug })));
}

// Chỉ các dự án đã khai báo; đường dẫn khác trả về 404.
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/du-an/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const p = getContent(lang).projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.title} — Quảng Phú`,
    description: p.body.slice(0, 160),
    alternates: alternatesFor(lang, `/du-an/${slug}`),
  };
}

export default async function ProjectDetailPage({ params }: PageProps<"/[lang]/du-an/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getContent(lang);
  const t = c.projectsPage;
  const p = c.projects.find((x) => x.slug === slug);
  if (!p) notFound();

  const images = [p.image, ...(p.images ?? [])];
  // Dự án liên quan: cùng hạng mục trước, rồi bù bằng các dự án khác, tối đa 4
  const sameCategory = c.projects.filter((x) => x.slug !== p.slug && x.category === p.category);
  const rest = c.projects.filter((x) => x.slug !== p.slug && x.category !== p.category);
  const related = [...sameCategory, ...rest].slice(0, 4);

  return (
    <main>
      <PageHero
        lang={lang}
        parent={{ href: routes.projects, label: c.nav.projects }}
        crumb={p.title}
        title={p.title}
        lead={c.projectCategories[p.category]}
        asideTop
        compactTitle
        aside={
          <dl className="grid grid-cols-2 gap-px border border-rule bg-rule">
            <Spec term={t.yearLabel}>{p.year}</Spec>
            <Spec term={t.placeLabel}>{p.place}</Spec>
            <div className="col-span-2 bg-night px-5 py-4">
              <dt className="sheet-label text-ash">{t.categoryLabel}</dt>
              <dd className="mt-1.5 font-semibold text-signal">{c.projectCategories[p.category]}</dd>
            </div>
          </dl>
        }
      />

      {/* Ảnh + mô tả */}
      <section className="py-16 md:py-24">
        <div className={`${wrap} grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16`}>
          <ProductGallery images={images} />

          <div data-reveal-group="up">
            <h2 className="display text-4xl md:text-5xl">{t.overview}</h2>
            <p className="mt-5 text-lg leading-relaxed text-bone/90">{p.body}</p>

            {p.highlights && p.highlights.length > 0 && (
              <>
                <h3 className="sheet-label mt-10 text-ash">{t.highlightsTitle}</h3>
                <ol className="mt-3 border-t border-rule">
                  {p.highlights.map((h, i) => (
                    <li key={h} className="flex gap-4 border-b border-rule py-3.5 text-[15px] leading-relaxed">
                      <span className="font-mono text-xs leading-6 text-signal">0{i + 1}</span>
                      {h}
                    </li>
                  ))}
                </ol>
              </>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <QuoteLink className="bg-signal px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-signal-deep">
                {c.servicesPage.requestQuote}
              </QuoteLink>
              <Link
                href={localePath(lang, routes.projects)}
                className="border border-bone/60 px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-bone hover:text-night"
              >
                {t.backAll}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dự án liên quan */}
      {related.length > 0 && (
        <section className="blueprint border-y border-rule bg-night-3 py-16 md:py-24">
          <div className={wrap}>
            <SheetHead lang={lang} sheet="01" topic={t.otherTopic}>
              {t.otherTitle}
            </SheetHead>
            <ProjectGrid projects={related} categories={c.projectCategories} lang={lang} viewDetail={t.viewDetail} />
          </div>
        </section>
      )}
    </main>
  );
}

function Spec({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="bg-night px-5 py-4">
      <dt className="sheet-label text-ash">{term}</dt>
      <dd className="mt-1.5 font-semibold">{children}</dd>
    </div>
  );
}
