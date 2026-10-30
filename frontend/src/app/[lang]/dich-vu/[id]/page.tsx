import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ProcessSection } from "@/components/ProcessSection";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { QuoteLink } from "@/components/QuoteLink";
import { SheetHead } from "@/components/SheetHead";
import { ImagePlaceholder, Photo } from "@/components/ui";
import { getContent } from "@/lib/content";
import { alternatesFor, hasLocale, localePath, locales, projectCategorySlugs, routes } from "@/lib/i18n";
import { getProjects } from "@/lib/projects";

const wrap = "mx-auto max-w-[1200px] px-5 md:px-8";

export function generateStaticParams() {
  // Mã dịch vụ giống nhau ở mọi ngôn ngữ
  return locales.flatMap((lang) => getContent(lang).products.map((p) => ({ lang, id: p.id })));
}

// Chỉ 4 dịch vụ đã khai báo; đường dẫn khác trả về 404.
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/dich-vu/[id]">): Promise<Metadata> {
  const { lang, id } = await params;
  if (!hasLocale(lang)) return {};
  const p = getContent(lang).products.find((x) => x.id === id);
  if (!p) return {};
  return {
    title: `${p.name} — ${getContent(lang).company.brand}`,
    description: `${p.summary} ${p.body}`.slice(0, 160),
    alternates: alternatesFor(lang, `/dich-vu/${id}`),
  };
}

export default async function ServiceDetailPage({ params }: PageProps<"/[lang]/dich-vu/[id]">) {
  const { lang, id } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getContent(lang);
  const t = c.servicesPage;
  const index = c.products.findIndex((x) => x.id === id);
  if (index === -1) notFound();
  const p = c.products[index];

  const others = c.products.filter((x) => x.id !== p.id);
  const projects = (await getProjects(lang)).filter((x) => x.category === p.projectCategory).slice(0, 3);

  return (
    <main>
      <PageHero
        lang={lang}
        parent={{ href: routes.services, label: c.nav.services }}
        crumb={p.name}
        title={p.name}
        lead={p.summary}
        aside={
          <dl className="grid gap-px border border-rule bg-rule">
            <Spec term={t.audience}>{p.audience}</Spec>
            <Spec term={t.materials}>{p.materials.join(", ")}</Spec>
            <Spec term={t.sizes}>{p.sizes}</Spec>
          </dl>
        }
      />

      {/* Mô tả + ảnh */}
      <section className="py-16 md:py-24">
        <div className={`${wrap} grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16`}>
          {p.images.length > 0 ? (
            <ProductGallery images={p.images} t={c.works} />
          ) : (
            <ImagePlaceholder label={c.ui.imagePending} className="aspect-[4/3]" />
          )}

          <div data-reveal-group="up">
            <h2 className="display text-4xl md:text-5xl">{t.whatWeDo}</h2>
            <p className="mt-5 text-lg leading-relaxed text-bone/90">{p.body}</p>

            <h3 className="sheet-label mt-10 text-ash">{t.scope}</h3>
            <ol className="mt-3 border-t border-rule">
              {p.scope.map((s, i) => (
                <li key={s} className="flex gap-4 border-b border-rule py-3.5 text-[15px]">
                  <span className="font-mono text-xs leading-6 text-signal">0{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap gap-3">
              <QuoteLink
                className="bg-signal px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-signal-deep"
              >
                {t.requestQuote}
              </QuoteLink>
              <Link
                href={localePath(lang, routes.services)}
                className="border border-bone/60 px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-bone hover:text-night"
              >
                {t.all}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Giới thiệu năng lực + điểm nổi bật: đoạn giới thiệu ở trên, 3 điểm nổi bật xếp ngang bên dưới */}
      <section className="border-t border-rule bg-night-2 py-16 md:py-20">
        <div className={wrap}>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16" data-reveal="up">
            <div>
              <p className="sheet-label text-signal">{p.tagline}</p>
              <h2 className="display mt-3 text-3xl md:text-4xl">{t.highlightsTitle}</h2>
            </div>
            <p className="text-lg leading-relaxed text-bone/90">
              {/* **chữ đậm** trong nội dung */}
              {p.intro.split("**").map((part, i) => (i % 2 ? <strong key={i} className="font-semibold text-bone">{part}</strong> : part))}
            </p>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-3" data-reveal-group="up">
            {p.highlights.map((h, i) => (
              <li key={h.title} className="border-t-2 border-signal bg-night p-5 md:p-6">
                <span className="font-mono text-xs text-signal">0{i + 1}</span>
                <p className="mt-2 font-semibold uppercase leading-snug">{h.title}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ash">{h.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Dự án tiêu biểu: dự án cùng loại với dịch vụ (p.projectCategory) */}
      {projects.length > 0 && (
        <section className="py-16 md:py-24">
          <div className={wrap}>
            <SheetHead topic={t.projectsTopic}>{t.projectsTitle}</SheetHead>
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group="up">
              {projects.map((pr) => (
                <li key={pr.slug}>
                  <Link href={localePath(lang, `${routes.projects}/${pr.slug}`)} className="group block">
                    <div className="overflow-hidden">
                      <Photo image={pr.image} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="aspect-[3/2] transition-transform duration-500 group-hover:scale-[1.03]" />
                    </div>
                    <h3 className="mt-4 text-lg leading-snug font-semibold uppercase decoration-2 underline-offset-[0.2em] transition-colors group-hover:text-signal group-hover:underline">{pr.title}</h3>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-14 flex justify-center">
              <Link
                href={localePath(lang, `${routes.projects}#${projectCategorySlugs[lang].list[p.projectCategory]}`)}
                className="border border-bone/60 px-6 py-3 text-sm font-semibold transition-colors hover:bg-bone hover:text-night"
              >
                {t.allProjects}
              </Link>
            </div>
          </div>
        </section>
      )}

      <ProcessSection lang={lang} />

      {/* Dịch vụ khác */}
      <section className="blueprint border-y border-rule bg-night-3 py-16 md:py-24">
        <div className={wrap}>
          <SheetHead topic={t.otherTopic}>
            {t.otherTitle}
          </SheetHead>
          <div className="grid gap-5 md:grid-cols-3" data-reveal-group="up">
            {others.map((o) => (
              <ProductCard key={o.id} lang={lang} product={o} compact />
            ))}
          </div>
        </div>
      </section>
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
