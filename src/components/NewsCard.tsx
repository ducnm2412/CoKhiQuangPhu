import Link from "next/link";
import type { NewsItem } from "@/lib/content";
import { localePath, routes, type Locale } from "@/lib/i18n";
import { Photo } from "./ui";

// Thẻ tin: ảnh, nhãn chủ đề, tiêu đề, một câu tóm tắt. `featured` = bản lớn, ảnh nằm cạnh chữ.
export function NewsCard({
  lang,
  item,
  readMore,
  featured = false,
}: {
  lang: Locale;
  item: NewsItem;
  readMore: string;
  featured?: boolean;
}) {
  const href = localePath(lang, `${routes.news}/${item.slug}`);

  return (
    <article className={`group ${featured ? "grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center md:gap-12" : "flex flex-col"}`}>
      <Link href={href} tabIndex={-1} aria-hidden="true" className="block overflow-hidden">
        <Photo
          image={item.image}
          sizes={featured ? "(min-width: 768px) 640px, 100vw" : "(min-width: 768px) 380px, 100vw"}
          className={`${featured ? "aspect-[16/10]" : "aspect-[3/2]"} transition-transform duration-700 group-hover:scale-[1.03]`}
        />
      </Link>
      <div className={featured ? "" : "mt-5"}>
        <p className="sheet-label text-signal">{item.tag}</p>
        <h3 className={`mt-2 font-semibold leading-snug ${featured ? "text-2xl md:text-3xl" : "text-lg"}`}>
          <Link href={href} className="transition-colors hover:text-signal">
            {item.title}
          </Link>
        </h3>
        <p className="mt-3 leading-relaxed text-ash">{item.summary}</p>
        <Link href={href} className="mt-4 inline-block text-sm font-semibold underline underline-offset-4 hover:text-signal">
          {readMore}
          <span className="sr-only">: {item.title}</span>
        </Link>
      </div>
    </article>
  );
}
