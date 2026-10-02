export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "vi";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

// Gắn tiền tố ngôn ngữ vào đường dẫn trong trang: ("en", "/du-an") → "/en/du-an".
// Liên kết neo (#lien-he) giữ nguyên.
export function localePath(lang: Locale, path: string) {
  if (path.startsWith("#")) return path;
  return `/${lang}${path === "/" ? "" : path}`;
}

// Bỏ tiền tố ngôn ngữ: "/en/du-an" → "/du-an"
export function stripLocale(pathname: string) {
  const rest = pathname.replace(/^\/(vi|en)(?=\/|$)/, "");
  return rest === "" ? "/" : rest;
}

// Địa chỉ gốc của website (đặt NEXT_PUBLIC_SITE_URL khi đổi tên miền) — dùng cho URL tuyệt đối trong thẻ SEO.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://co-khi-quang-phu.vercel.app";

// Thẻ canonical + hreflang cho một trang: ("en", "/du-an") → canonical /en/du-an, kèm bản vi, en và x-default.
export function alternatesFor(lang: Locale, path: string) {
  const p = path === "/" ? "" : path;
  return {
    canonical: `/${lang}${p}`,
    languages: { vi: `/vi${p}`, en: `/en${p}`, "x-default": `/vi${p}` },
  };
}

export const otherLocale = (lang: Locale): Locale => (lang === "vi" ? "en" : "vi");

// Đường dẫn các trang (giống nhau cho cả hai ngôn ngữ)
export const routes = {
  home: "/",
  about: "/ve-chung-toi",
  services: "/dich-vu",
  projects: "/du-an",
  news: "/tin-tuc",
  contact: "#lien-he",
};
