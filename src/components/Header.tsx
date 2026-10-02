"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Content } from "@/lib/content";
import { contact } from "@/lib/content";
import { localePath, otherLocale, routes, stripLocale, type Locale } from "@/lib/i18n";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

type Props = {
  lang: Locale;
  nav: Content["nav"];
  ui: Content["ui"];
  services: { id: string; name: string }[];
};

export function Header({ lang, nav, ui, services }: Props) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const path = stripLocale(pathname);
  const lp = (p: string) => localePath(lang, p);

  const items = [
    { href: routes.home, label: nav.home },
    { href: routes.about, label: nav.about },
    { href: routes.services, label: nav.services },
    { href: routes.projects, label: nav.projects },
    { href: routes.news, label: nav.news },
    { href: routes.contact, label: nav.contact },
  ];
  const serviceLinks = services.map((s) => ({ href: `${routes.services}/${s.id}`, label: s.name }));
  const isCurrent = (href: string) =>
    href === path || (href !== "/" && href.startsWith("/") && path.startsWith(href + "/"));
  const switchHref = localePath(otherLocale(lang), path);

  // Đóng menu di động bằng phím Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Bấm logo khi đang ở trang chủ thì cuộn lên đầu
  const onLogoClick = (e: React.MouseEvent) => {
    setOpen(false);
    if (path === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-rule/60 bg-night/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5 md:px-8">
        <Link href={lp("/")} onClick={onLogoClick} className="flex shrink-0 items-center gap-2.5" aria-label={ui.homeAria}>
          <Logo />
          <span className="display text-lg">Quảng Phú</span>
        </Link>

        <nav aria-label={ui.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm text-bone/75">
            {items.map((item) =>
              item.href === routes.services ? (
                <li key={item.href} className="group relative">
                  <Link
                    href={lp(item.href)}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    aria-haspopup="true"
                    className={`${linkClass} inline-flex items-center gap-1.5`}
                  >
                    {item.label}
                    <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true" className="transition-transform group-focus-within:rotate-180 group-hover:rotate-180">
                      <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </Link>
                  {/* Menu thả xuống: mở khi rê chuột hoặc khi Tab vào */}
                  <div className="invisible absolute top-full left-1/2 -translate-x-1/2 pt-5 opacity-0 transition-[opacity,visibility] group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="w-72 border border-rule bg-night-2 py-2 shadow-2xl shadow-black/30">
                      {serviceLinks.map((s, i) => (
                        <li key={s.href}>
                          <Link
                            href={lp(s.href)}
                            aria-current={path === s.href ? "page" : undefined}
                            className="flex items-baseline gap-3 px-4 py-2.5 text-bone/85 transition-colors hover:bg-tile hover:text-bone aria-[current=page]:text-signal"
                          >
                            <span className="font-mono text-xs text-ash">0{i + 1}</span>
                            {s.label}
                          </Link>
                        </li>
                      ))}
                      <li className="mt-2 border-t border-rule pt-2">
                        <Link href={lp(routes.services)} className="block px-4 py-2.5 text-ash transition-colors hover:text-bone">
                          {ui.allServices}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={lp(item.href)} aria-current={isCurrent(item.href) ? "page" : undefined} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={contact.phoneHref} className="mr-1 hidden text-sm font-semibold tracking-wide transition-colors hover:text-signal sm:block">
            {contact.phone}
          </a>
          {/* Thẻ <a> thường (không dùng Link): đổi ngôn ngữ là đổi layout gốc, tải lại trang
              để thẻ <html> và giao diện sáng/tối được dựng lại đúng. */}
          <a
            href={switchHref}
            hrefLang={otherLocale(lang)}
            aria-label={ui.switchLang}
            title={ui.switchLang}
            className="grid h-10 min-w-10 place-items-center border border-rule px-2 font-mono text-xs text-bone/80 transition-colors hover:border-bone/50 hover:text-bone"
          >
            {ui.switchLangShort}
          </a>
          <ThemeToggle label={ui.theme} />
          <button
            type="button"
            className="grid size-10 place-items-center border border-rule lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? ui.closeMenu : ui.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              {open ? (
                <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.6" />
              ) : (
                <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.6" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu di động nổi đè lên trang, không đẩy nội dung xuống */}
      {open && (
        <>
          <div aria-hidden="true" className="absolute inset-x-0 top-full h-dvh bg-black/60 lg:hidden" onClick={() => setOpen(false)} />
          <nav
            id="mobile-nav"
            aria-label={ui.mobileNav}
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-y border-rule bg-night shadow-2xl shadow-black/40 lg:hidden"
          >
            <ul className="mx-auto max-w-[1200px] px-5 py-2">
              {items.map((item) => (
                <li key={item.href} className="border-b border-rule/70 last:border-0">
                  <div className="flex items-center justify-between">
                    <Link
                      href={lp(item.href)}
                      aria-current={isCurrent(item.href) ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className="block flex-1 py-3 text-[15px] aria-[current=page]:text-signal"
                    >
                      {item.label}
                    </Link>
                    {/* Chữ "Dịch vụ" mở trang dịch vụ; mũi tên mở danh sách dịch vụ con */}
                    {item.href === routes.services && (
                      <button
                        type="button"
                        aria-expanded={servicesOpen}
                        aria-controls="mobile-services"
                        aria-label={servicesOpen ? ui.hideServices : ui.showServices}
                        onClick={() => setServicesOpen((v) => !v)}
                        className="-mr-2 grid size-11 place-items-center text-ash"
                      >
                        <svg width="14" height="9" viewBox="0 0 14 9" aria-hidden="true" className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}>
                          <path d="M1 1l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {item.href === routes.services && servicesOpen && (
                    <ul id="mobile-services" className="mb-3 ml-3 border-l border-rule pl-4">
                      {serviceLinks.map((s) => (
                        <li key={s.href}>
                          <Link
                            href={lp(s.href)}
                            aria-current={path === s.href ? "page" : undefined}
                            onClick={() => setOpen(false)}
                            className="block py-2 text-sm text-ash aria-[current=page]:text-signal"
                          >
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}

const linkClass =
  "transition-colors hover:text-bone aria-[current=page]:text-bone aria-[current=page]:underline aria-[current=page]:decoration-signal aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8";
