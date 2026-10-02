import Link from "next/link";
import { getContent } from "@/lib/content";
import { localePath, type Locale } from "@/lib/i18n";

const wrap = "mx-auto max-w-[1200px] px-5 md:px-8";

// Khối mở đầu cho các trang con: đường dẫn, nhãn bản vẽ, tiêu đề lớn, đoạn giới thiệu.
export function PageHero({
  lang,
  crumb,
  parent,
  sheet,
  topic,
  title,
  lead,
  aside,
}: {
  lang: Locale;
  crumb: string;
  parent?: { href: string; label: string };
  sheet: string;
  topic: string;
  title: string;
  lead: React.ReactNode;
  aside?: React.ReactNode;
}) {
  const t = getContent(lang);
  return (
    <section className="blueprint border-b border-rule/60">
      <div className={`${wrap} pt-10 pb-12 md:pt-14 md:pb-16`}>
        <nav aria-label={t.ui.breadcrumb} className="text-sm text-ash">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href={localePath(lang, "/")} className="hover:text-bone">{t.nav.home}</Link>
            </li>
            <li aria-hidden="true">/</li>
            {parent && (
              <>
                <li>
                  <Link href={localePath(lang, parent.href)} className="hover:text-bone">{parent.label}</Link>
                </li>
                <li aria-hidden="true">/</li>
              </>
            )}
            <li aria-current="page" className="text-bone">{crumb}</li>
          </ol>
        </nav>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <div data-reveal-group="up">
            <p className="sheet-label text-signal">
              {t.ui.sheet} {sheet} · {topic}
            </p>
            <h1 className="display mt-8 text-[3.4rem] leading-[1.08] sm:text-7xl lg:text-[6.2rem]">
              {title}
              <span className="text-signal">.</span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ash">{lead}</p>
          </div>
          {aside && <div data-reveal="up">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
