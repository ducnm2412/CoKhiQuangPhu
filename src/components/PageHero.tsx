import Link from "next/link";
import { getContent } from "@/lib/content";
import { localePath, type Locale } from "@/lib/i18n";

const wrap = "mx-auto max-w-[1200px] px-5 md:px-8";

// Khối mở đầu gọn cho các trang con: đường dẫn, tiêu đề, một câu giới thiệu.
export function PageHero({
  lang,
  crumb,
  parent,
  title,
  lead,
  aside,
}: {
  lang: Locale;
  crumb: string;
  parent?: { href: string; label: string };
  title: string;
  lead: React.ReactNode;
  aside?: React.ReactNode;
}) {
  const t = getContent(lang);
  return (
    <section className="blueprint border-b border-rule/60">
      <div className={`${wrap} pt-8 pb-10 md:pt-10 md:pb-14`}>
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

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <div data-reveal-group="up">
            <h1 className="display text-[2.8rem] leading-[1.08] sm:text-6xl lg:text-[4.6rem]">
              {title}
              <span className="text-signal">.</span>
            </h1>
            <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-ash">{lead}</p>
          </div>
          {aside && <div data-reveal="up">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
