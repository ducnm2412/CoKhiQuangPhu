import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/ContactSection";
import { NewsCard } from "@/components/NewsCard";
import { PageHero } from "@/components/PageHero";
import { getContent } from "@/lib/content";
import { hasLocale } from "@/lib/i18n";

const wrap = "mx-auto max-w-[1200px] px-5 md:px-8";

export async function generateMetadata({ params }: PageProps<"/[lang]/tin-tuc">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getContent(lang).newsPage;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { languages: { vi: "/vi/tin-tuc", en: "/en/tin-tuc" } },
  };
}

export default async function NewsPage({ params }: PageProps<"/[lang]/tin-tuc">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getContent(lang);
  const t = c.newsPage;
  const [first, ...rest] = c.news;

  return (
    <main>
      <PageHero lang={lang} crumb={c.nav.news} sheet="01" topic={t.title} title={t.title} lead={t.lead} />

      <section className="py-16 md:py-24">
        <div className={wrap}>
          <div className="border-b border-rule pb-14 md:pb-20" data-reveal="up">
            <NewsCard lang={lang} item={first} readMore={t.readMore} featured />
          </div>
          <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-8" data-reveal-group="up">
            {rest.map((item) => (
              <NewsCard key={item.slug} lang={lang} item={item} readMore={t.readMore} />
            ))}
          </div>
        </div>
      </section>

      <ContactSection lang={lang} sheet="02" />
    </main>
  );
}
