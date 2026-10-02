import { contact, getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { QuoteForm } from "./QuoteForm";

const wrap = "mx-auto max-w-[1200px] px-5 md:px-8";

// Khối "Nhận báo giá" dùng chung cho mọi trang: tiêu đề, form một hàng, số điện thoại.
export function ContactSection({ lang, sheet, product }: { lang: Locale; sheet: string; product?: string }) {
  const t = getContent(lang);

  return (
    <section id="lien-he" className="blueprint border-t border-rule bg-night-3 py-14 md:py-20">
      <div className={wrap} data-reveal="up">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div>
            <p className="sheet-label text-signal">
              {t.ui.sheet} {sheet} · {t.quote.topic}
            </p>
            <h2 className="display mt-3 text-[2.6rem] md:text-[3.4rem]">
              {t.quote.title1} <span className="text-signal">{t.quote.title2}</span>
            </h2>
          </div>
          <p className="text-ash">
            {t.quote.orCall}{" "}
            <a href={contact.phoneHref} className="font-semibold whitespace-nowrap text-bone hover:text-signal">
              {contact.phone}
            </a>{" "}
            ·{" "}
            <a
              href={contact.zaloHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-bone underline underline-offset-4 hover:text-signal"
            >
              Zalo
            </a>
          </p>
        </div>

        <div id="bao-gia" className="mt-8 scroll-mt-24">
          <QuoteForm t={t.quote} services={t.products.map((p) => p.name)} initialProduct={product} />
        </div>
      </div>
    </section>
  );
}
