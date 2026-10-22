import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { NewsArticle } from "@/components/NewsArticle";
import { getContent } from "@/lib/content";
import { hasLocale, localePath, locales } from "@/lib/i18n";
import { getNewsBySlug, getNewsList } from "@/lib/news";

// Dựng sẵn các bài đang có lúc build (mỗi ngôn ngữ một slug riêng);
// bài thêm sau từ trang quản trị được dựng khi có người mở lần đầu.
export async function generateStaticParams() {
  const perLang = await Promise.all(locales.map(async (lang) => (await getNewsList(lang)).map((n) => ({ lang, slug: n.slug }))));
  return perLang.flat();
}

export async function generateMetadata({ params }: PageProps<"/[lang]/tin-tuc/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const item = await getNewsBySlug(lang, slug);
  if (!item) return {};
  const vi = localePath("vi", `/tin-tuc/${item.slugs?.vi ?? item.slug}`);
  const en = localePath("en", `/tin-tuc/${item.slugs?.en ?? item.slug}`);
  return {
    title: `${item.title} — ${getContent(lang).company.brand}`,
    description: item.summary,
    alternates: { canonical: lang === "en" ? en : vi, languages: { vi, en, "x-default": vi } },
  };
}

export default async function NewsArticlePage({ params }: PageProps<"/[lang]/tin-tuc/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const item = await getNewsBySlug(lang, slug);
  if (!item) notFound();
  // Mở bằng slug của ngôn ngữ kia (vd. bấm đổi ngôn ngữ) → chuyển về slug đúng của ngôn ngữ này
  if (item.slug !== decodeURIComponent(slug)) permanentRedirect(localePath(lang, `/tin-tuc/${item.slug}`));
  const others = (await getNewsList(lang)).filter((n) => n.slug !== item.slug);

  return <NewsArticle lang={lang} c={getContent(lang)} item={item} others={others} />;
}
