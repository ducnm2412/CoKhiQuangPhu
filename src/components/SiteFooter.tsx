import Link from "next/link";
import { contact, getContent } from "@/lib/content";
import { localePath, type Locale } from "@/lib/i18n";
import { Logo } from "./Logo";

const wrap = "mx-auto max-w-[1200px] px-5 md:px-8";

export function SiteFooter({ lang }: { lang: Locale }) {
  const t = getContent(lang);

  return (
    <footer id="lien-he" className="border-t border-rule bg-night">
      <div className={`${wrap} grid gap-8 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:items-stretch md:gap-14`}>
        <div className="flex flex-col">
          <Link href={localePath(lang, "/")} className="flex w-fit items-center gap-2.5" aria-label={t.ui.homeAria}>
            <Logo />
            <span className="display text-lg">Quảng Phú</span>
          </Link>
          <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-ash">{t.company.address}</p>

          <a
            href={`mailto:${contact.email}`}
            className="mt-7 w-fit border-b-2 border-signal pb-1 text-[clamp(1.6rem,3.4vw,2.6rem)] leading-tight font-semibold tracking-tight break-all transition-colors hover:text-signal"
          >
            {contact.email}
          </a>

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
