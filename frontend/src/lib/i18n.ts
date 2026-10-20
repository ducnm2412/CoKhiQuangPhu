export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "vi";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

// Tên trang trên đường dẫn bản tiếng Anh. Thư mục trong src/app giữ tên tiếng Việt;
// src/proxy.ts viết lại (rewrite) /en/news → /en/tin-tuc để dùng chung trang.
// Chỉ dịch đoạn đầu; mã bài/dự án/dịch vụ phía sau giữ nguyên.
export const enSegments: Record<string, string> = {
  "ve-chung-toi": "about",
  "dich-vu": "services",
  "du-an": "projects",
  "tin-tuc": "news",
  "xem-truoc-tin": "news-preview",
};
export const viSegments: Record<string, string> = Object.fromEntries(Object.entries(enSegments).map(([vi, en]) => [en, vi]));

// Đổi đoạn đầu của đường dẫn theo bảng: ("/du-an/a80", enSegments) → "/projects/a80"
const mapFirstSegment = (path: string, table: Record<string, string>) =>
  path.replace(/^\/([^/?#]+)/, (m, seg: string) => (table[seg] ? `/${table[seg]}` : m));

// Gắn tiền tố ngôn ngữ vào đường dẫn gốc (tiếng Việt): ("en", "/du-an") → "/en/projects", ("vi", "/du-an") → "/vi/du-an".
// Liên kết neo (#lien-he) giữ nguyên.
export function localePath(lang: Locale, path: string) {
  if (path.startsWith("#")) return path;
  const p = lang === "en" ? mapFirstSegment(path, enSegments) : path;
  return `/${lang}${p === "/" ? "" : p}`;
}

// Bỏ tiền tố ngôn ngữ, trả về đường dẫn gốc (tiếng Việt): "/en/projects/a80" → "/du-an/a80"
export function stripLocale(pathname: string) {
  const rest = pathname.replace(/^\/(vi|en)(?=\/|$)/, "");
  return rest === "" ? "/" : mapFirstSegment(rest, viSegments);
}

// Địa chỉ gốc của website (đặt NEXT_PUBLIC_SITE_URL khi đổi tên miền) — dùng cho URL tuyệt đối trong thẻ SEO.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://co-khi-quang-phu.vercel.app";

// Thẻ canonical + hreflang cho một trang: ("en", "/du-an") → canonical /en/projects, kèm bản vi, en và x-default.
export function alternatesFor(lang: Locale, path: string) {
  return {
    canonical: localePath(lang, path),
    languages: { vi: localePath("vi", path), en: localePath("en", path), "x-default": localePath("vi", path) },
  };
}

export const otherLocale = (lang: Locale): Locale => (lang === "vi" ? "en" : "vi");

// Mã các loại dự án theo ngôn ngữ, cùng thứ tự với `projectCategories` trong content.ts
// (dùng cho /vi/du-an#mã, /en/projects#code); `all` là mã của bộ lọc "Tất cả".
export const projectCategorySlugs: Record<Locale, { all: string; list: string[] }> = {
  vi: { all: "tat-ca", list: ["xe-nghi-truong", "tuong-bac-ho", "tuong-dai-phu-dieu", "qua-tang-doi-ngoai"] },
  en: { all: "all", list: ["ceremonial-floats", "ho-chi-minh-statues", "monuments-reliefs", "diplomatic-gifts"] },
};

// Đường dẫn gốc các trang (tiếng Việt); bản tiếng Anh do localePath() đổi tên
export const routes = {
  home: "/",
  about: "/ve-chung-toi",
  services: "/dich-vu",
  projects: "/du-an",
  news: "/tin-tuc",
  contact: "#lien-he",
};
