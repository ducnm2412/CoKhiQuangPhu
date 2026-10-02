import Link from "next/link";
import { contact, getContent } from "@/lib/content";
import { localePath, routes, type Locale } from "@/lib/i18n";
import { Logo } from "./Logo";

const wrap = "mx-auto max-w-[1200px] px-5 md:px-8";

export function SiteFooter({ lang }: { lang: Locale }) {
  const t = getContent(lang);
  const items = [
    { href: routes.home, label: t.nav.home },
    { href: routes.about, label: t.nav.about },
    { href: routes.services, label: t.nav.services },
    { href: routes.projects, label: t.nav.projects },
    { href: routes.news, label: t.nav.news },
    { href: routes.contact, label: t.nav.contact },
  ];

  return (
    <footer className="border-t border-rule bg-night">
      <div className={`${wrap} grid gap-8 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:items-stretch md:gap-14`}>
        <div className="flex flex-col">
          <Link href={localePath(lang, "/")} className="flex w-fit items-center gap-2.5" aria-label={t.ui.homeAria}>
            <Logo />
            <span className="display text-lg">Quảng Phú</span>
          </Link>
          <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-ash">{t.company.address}</p>

          <nav aria-label={t.footer.sitemap} className="mt-6">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {items.map((item) => (
                <li key={item.href}>
                  <Link href={localePath(lang, item.href)} className="hover:text-signal">{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-6 text-sm text-ash">
            <li>
              <a href={contact.phoneHref} className="hover:text-bone">{contact.phone}</a>
            </li>
            <li>
              <a href={contact.zaloHref} target="_blank" rel="noopener noreferrer" className="hover:text-bone">Zalo</a>
            </li>
            <li>
              <a href={contact.facebookHref} className="hover:text-bone">Facebook</a>
            </li>
            <li>
              <a href={contact.mapsHref} target="_blank" rel="noopener noreferrer" className="hover:text-bone">
                {t.footer.maps}
              </a>
            </li>
          </ul>
        </div>

        <iframe
          src={contact.mapsEmbed}
          title={t.footer.mapTitle}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="h-48 w-full border border-rule md:h-full md:min-h-52"
        />
      </div>

      <div className="border-t border-rule">
        <p className={`${wrap} py-4 text-xs text-ash`}>
          © {t.company.name} · MST {contact.taxCode}
        </p>
      </div>
    </footer>
  );
}
