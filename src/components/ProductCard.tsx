import Link from "next/link";
import { getContent, type Product } from "@/lib/content";
import { localePath, routes, type Locale } from "@/lib/i18n";
import { QuoteLink } from "./QuoteLink";
import { ImagePlaceholder, Photo } from "./ui";

// Thẻ thông tin cơ bản của một dịch vụ, dẫn sang trang chi tiết.
export function ProductCard({
  lang,
  product: p,
  index,
  compact = false,
}: {
  lang: Locale;
  product: Product;
  index: number;
  compact?: boolean;
}) {
  const t = getContent(lang);
  const href = localePath(lang, `${routes.services}/${p.id}`);
  const cover = p.images[0];
  const ratio = compact ? "aspect-[3/2]" : "aspect-[16/10]";

  return (
    <article className="group flex flex-col border border-rule bg-night-2">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="block overflow-hidden">
        {cover ? (
          <Photo
            image={cover}
            sizes="(min-width: 1024px) 560px, 100vw"
            className={`${ratio} transition-transform duration-700 group-hover:scale-[1.03]`}
          />
        ) : (
          <ImagePlaceholder label={t.ui.imagePending} className={`${ratio} border-0`} />
        )}
      </Link>

      <div className={`flex flex-1 flex-col ${compact ? "p-5" : "p-6 md:p-8"}`}>
        <p className="sheet-label text-signal">
          {t.ui.detail} 0{index + 1}
        </p>
        <h3 className={`display mt-3 ${compact ? "text-2xl" : "text-3xl md:text-[2.4rem]"}`}>
          <Link href={href} className="hover:text-signal">
            {p.name}
          </Link>
        </h3>
        <p className="mt-3 leading-relaxed text-ash">{p.summary}</p>
        {!compact && (
          <p className="mt-4 border-t border-rule pt-4 text-sm text-ash">
            <span className="text-bone">{t.servicesPage.audience}:</span> {p.audience}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-6">
          <Link
            href={href}
            className="border border-bone/60 px-5 py-3 text-sm font-semibold transition-colors hover:bg-bone hover:text-night"
          >
            {t.servicesPage.viewDetail}
          </Link>
          {!compact && (
            <QuoteLink product={p.name} className="text-sm font-semibold text-signal hover:underline">
              {t.servicesPage.requestQuote}
            </QuoteLink>
          )}
        </div>
      </div>
    </article>
  );
}
