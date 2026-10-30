import Image from "next/image";
import Link from "next/link";
import { contact, getContent } from "@/lib/content";
import { localePath, routes, type Locale } from "@/lib/i18n";
import { Logo } from "./Logo";

const wrap = "mx-auto max-w-[1200px] px-5 md:px-8";

export function SiteFooter({ lang }: { lang: Locale }) {
  const t = getContent(lang);
  const sitemap = [
    [routes.home, t.nav.home],
    [routes.about, t.nav.about],
    [routes.services, t.nav.services],
    [routes.projects, t.nav.projects],
    [routes.news, t.nav.news],
    [routes.contact, t.nav.contact],
  ] as const;

  return (
    <footer id="lien-he" className="relative overflow-hidden border-t border-rule bg-night">
      {/* Logo mờ làm nền */}
      <Image
        src="/images/logo.png"
        alt=""
        aria-hidden
        width={312}
        height={320}
        className="pointer-events-none absolute z-0 md:z-10 top-[22%] md:top-1/2 left-1/2 md:left-[30%] w-[min(70vw,420px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.12] select-none"
      />
      <div className={`${wrap} relative grid grid-cols-2 gap-8 pt-10 md:gap-14`}>
        <div>
          <p className="text-xs tracking-[0.15em] text-ash uppercase">{t.footer.sitemap}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {sitemap.map(([href, label]) => (
              <li key={href}>
                <Link href={localePath(lang, href)} className="hover:text-signal">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.15em] text-ash uppercase">{t.footer.office}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>{t.company.address}</li>
            <li>
              Hotline: <a href={contact.phoneHref} className="hover:text-signal">{contact.phone}</a>
            </li>
          </ul>
          <p className="mt-8 text-xs tracking-[0.15em] text-ash uppercase">{t.footer.social}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={contact.facebookHref} className="hover:text-signal">Fanpage</a>
            </li>
            <li>
              <a href={contact.zaloHref} target="_blank" rel="noopener noreferrer" className="hover:text-signal">Zalo</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={`${wrap} relative grid gap-8 py-10 md:grid-cols-2 md:items-stretch md:gap-14`}>
        <div className="flex flex-col">
          <Link href={localePath(lang, "/")} className="flex w-fit items-center gap-2.5" aria-label={t.ui.homeAria}>
            <Logo />
            <span className="display text-lg">{t.company.brand}</span>
          </Link>
          <a
            href={`mailto:${contact.email}`}
            className="mt-7 w-fit border-b-2 border-signal pb-1 text-[clamp(1.05rem,4.9vw,2rem)] md:text-[clamp(1.05rem,2.5vw,2rem)] leading-tight font-semibold tracking-tight whitespace-nowrap transition-colors hover:text-signal"
          >
            {contact.email}
          </a>
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

      <div className="relative border-t border-rule">
        <p className={`${wrap} py-4 text-xs text-ash`}>
          © {t.company.name} · MST {contact.taxCode}
        </p>
      </div>
    </footer>
  );
}
