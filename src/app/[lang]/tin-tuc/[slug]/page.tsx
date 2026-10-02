import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/ContactSection";
import { NewsCard } from "@/components/NewsCard";
import { Photo } from "@/components/ui";
import { getContent } from "@/lib/content";
import { alternatesFor, hasLocale, localePath, locales, routes } from "@/lib/i18n";

const wrap = "mx-auto max-w-[1200px] px-5 md:px-8";

export function generateStaticParams() {
  return locales.flatMap((lang) => getContent(lang).news.map((n) => ({ lang, slug: n.slug })));
}

// Chỉ các bài đã khai báo; đường dẫn khác trả về 404.
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/tin-tuc/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const item = getContent(lang).news.find((n) => n.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title} — Quảng Phú`,
    description: item.summary,
    alternates: alternatesFor(lang, `/tin-tuc/${slug}`),
  };
}

export default async function NewsArticlePage({ params }: PageProps<"/[lang]/tin-tuc/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getContent(lang);
  const t = c.newsPage;
  const item = c.news.find((n) => n.slug === slug);
  if (!item) notFound();
  const others = c.news.filter((n) => n.slug !== slug);

  return (
    <main>
      <article className="blueprint border-b border-rule/60">
        <div className={`${wrap} pt-10 pb-16 md:pt-14 md:pb-24`}>
          <nav aria-label={c.ui.breadcrumb} className="text-sm text-ash">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href={localePath(lang, "/")} className="hover:text-bone">{c.nav.home}</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={localePath(lang, routes.news)} className="hover:text-bone">{c.nav.news}</Link>
              </li>
            </ol>
          </nav>

          <header className="mt-10 max-w-[48rem]" data-reveal-group="up">
            <p className="sheet-label text-signal">{item.tag}</p>
            <h1 className="display mt-4 text-4xl md:text-[3.4rem]">{item.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-bone/90">{item.summary}</p>
          </header>

          <div className="mt-10 max-w-[56rem]" data-reveal="wipe">
            <Photo image={item.image} sizes="(min-width: 1024px) 900px, 100vw" className="aspect-[16/9]" eager />
          </div>

          <div className="mt-10 max-w-[65ch] space-y-5 text-[17px] leading-relaxed text-bone/85">
            {item.body.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          <Link
            href={localePath(lang, routes.news)}
            className="mt-10 inline-block border border-bone/60 px-5 py-3 text-sm font-semibold transition-colors hover:bg-bone hover:text-night"
          >
            {t.all}
          </Link>
        </div>
      </article>

      {/* Tin khác */}
      <section className="py-16 md:py-20">
        <div className={wrap}>
          <h2 className="display mb-10 text-4xl md:text-5xl">{t.more}</h2>
          <div className="grid gap-12 md:grid-cols-3 md:gap-8" data-reveal-group="up">
            {others.map((n) => (
              <NewsCard key={n.slug} lang={lang} item={n} readMore={t.readMore} />
            ))}
          </div>
        </div>
      </section>

      <ContactSection lang={lang} sheet="01" />
    </main>
  );
}
