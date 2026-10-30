import Link from "next/link";
import { getContent, type Product } from "@/lib/content";
import { localePath, routes, type Locale } from "@/lib/i18n";
import { ImagePlaceholder, Photo } from "./ui";

// Thẻ dịch vụ: ảnh và tên, cả thẻ dẫn sang trang chi tiết.
export function ProductCard({
  lang,
  product: p,
  compact = false,
}: {
  lang: Locale;
  product: Product;
  compact?: boolean;
}) {
  const t = getContent(lang);
  const href = localePath(lang, `${routes.services}/${p.id}`);
  const cover = p.images[0];
  const ratio = compact ? "aspect-[3/2]" : "aspect-[16/10]";

  return (
    <article className="group border border-rule bg-night-2">
      <Link href={href} className="block">
        <div className="overflow-hidden">
          {cover ? (
            <Photo
              image={cover}
              sizes="(min-width: 1024px) 560px, 100vw"
              className={`${ratio} transition-transform duration-700 group-hover:scale-[1.03]`}
            />
          ) : (
            <ImagePlaceholder label={t.ui.imagePending} className={`${ratio} border-0`} />
          )}
        </div>
        <h3 className={`display decoration-2 underline-offset-[0.2em] transition-colors group-hover:text-signal group-hover:underline ${compact ? "p-5 text-2xl" : "p-6 text-3xl md:p-8 md:text-[2.4rem]"}`}>
          {p.name}
        </h3>
      </Link>
    </article>
  );
}
