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
