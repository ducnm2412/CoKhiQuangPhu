import Link from "next/link";
import type { Content, NewsItem } from "@/lib/content";
import { localePath, routes, type Locale } from "@/lib/i18n";
import { NewsCard } from "./NewsCard";
import { ProductGallery } from "./ProductGallery";
import { Photo } from "./ui";

const wrap = "mx-auto max-w-[1200px] px-5 md:px-8";

// Thân trang chi tiết tin. Dùng chung cho trang thật (/tin-tuc/[slug]) và trang xem trước bài đang soạn
// ở trang quản trị (/xem-truoc-tin), để bản xem trước giống hệt giao diện thật.
export function NewsArticle({ lang, c, item, others }: { lang: Locale; c: Content; item: NewsItem; others: NewsItem[] }) {
  const t = c.newsPage;

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

          {item.gallery?.length ? (
            // Có ảnh phụ: ảnh lớn + hàng ảnh nhỏ, bấm để xem toàn màn hình
            <div className="mt-10 max-w-[56rem]">
              <ProductGallery images={[item.image, ...item.gallery]} t={c.works} />
            </div>
          ) : (
            <div className="mt-10 max-w-[56rem]" data-reveal="wipe">
              <Photo image={item.image} sizes="(min-width: 1024px) 900px, 100vw" className="aspect-[16/9]" eager />
            </div>
          )}

          <div className="mt-10 max-w-[65ch] space-y-5 text-[17px] leading-relaxed text-bone/85">
            {item.body.map((para, i) => (
              <p key={i}>{para}</p>
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
      {others.length > 0 && (
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
      )}
    </main>
  );
}
