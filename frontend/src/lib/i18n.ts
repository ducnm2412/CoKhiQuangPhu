export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "vi";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

// Đường dẫn bản tiếng Anh. Thư mục trong src/app và mã trong content.ts giữ tiếng Việt (đường dẫn gốc);
// src/proxy.ts viết lại (rewrite) /en/projects/ceremonial-float-a80 → /en/du-an/khoi-xe-nghi-truong-a80
// để dùng chung trang. Bài tin có slug tiếng Anh riêng lưu trong database, không nằm ở đây.

// Tên trang
export const enSegments: Record<string, string> = {
  "ve-chung-toi": "about",
  "dich-vu": "services",
  "du-an": "projects",
  "tin-tuc": "news",
  "lien-he": "contact",
  "xem-truoc-tin": "news-preview",
};

// Mã dịch vụ (id trong content.ts) và dự án (slug trong content.ts). Thêm dịch vụ/dự án mới thì thêm dòng ở đây;
// thiếu thì bản tiếng Anh dùng tạm mã tiếng Việt.
const enItems: Record<string, Record<string, string>> = {
  "dich-vu": {
    "xe-nghi-truong": "ceremonial-parade-floats",
    "tuong-bac-ho": "ho-chi-minh-statues",
    "tuong-chan-dung-tho": "ancestral-portrait-statues",
    "qua-tang-my-thuat": "gifts-decorative-art",
  },
  "du-an": {
    "bieu-tuong-quyet-tu-bo-tu-lenh-thu-do": "determined-to-die-symbol-hanoi-capital-command",
    "tuong-bac-ho-voi-chien-si-bien-phong": "uncle-ho-with-border-guard-soldier",
    "tuong-bac-ho-doc-bao-nhan-dan": "uncle-ho-reading-nhan-dan-newspaper",
    "khoi-xe-nghi-truong-a80": "ceremonial-float-a80",
    "khoi-xe-nghi-truong-a50": "ceremonial-float-a50",
    "cum-tuong-chien-si-dien-bien": "dien-bien-soldiers-sculpture-group",
    "tuong-bac-ho-khoi-xe-a80": "ho-chi-minh-statue-a80-float",
    "khoi-xe-quoc-huy-dbp70": "national-emblem-float-dien-bien-phu-70",
    "khoi-xe-quoc-huy-dbp60": "national-emblem-float-dien-bien-phu-60",
    "tuong-bac-ho-san-khau-le-ky-niem": "ho-chi-minh-statue-anniversary-stage",
    "khoi-xe-ky-nguyen-phat-trien-moi": "new-era-of-development-float",
    "tuong-ban-than-bac-ho-hoi-truong": "ho-chi-minh-bust-assembly-hall",
    "phu-dieu-cum-tuong-chien-si-khoi-xe": "relief-and-soldier-sculptures-float",
    "tac-pham-la-co": "flag-installation",
  },
};

const invert = (t: Record<string, string>) => Object.fromEntries(Object.entries(t).map(([vi, en]) => [en, vi]));
const viSegments = invert(enSegments);
const viItems = Object.fromEntries(Object.entries(enItems).map(([seg, t]) => [seg, invert(t)]));

// Đổi hai đoạn đầu (tên trang, mã mục) giữa tiếng Việt và tiếng Anh; phần #… phía sau giữ nguyên.
// toEnPath("/du-an/khoi-xe-nghi-truong-a80#x") → "/projects/ceremonial-float-a80#x"
export function toEnPath(viPath: string) {
  return viPath.replace(/^\/([^/?#]+)(?:\/([^/?#]+))?/, (m, seg: string, item?: string) => {
    if (!enSegments[seg]) return m;
    return `/${enSegments[seg]}${item ? `/${enItems[seg]?.[item] ?? item}` : ""}`;
  });
}
// toViPath("/projects/ceremonial-float-a80") → "/du-an/khoi-xe-nghi-truong-a80"; nhận cả mã tiếng Việt ("/projects/khoi-xe-…")
export function toViPath(enPath: string) {
  return enPath.replace(/^\/([^/?#]+)(?:\/([^/?#]+))?/, (m, seg: string, item?: string) => {
    const vi = viSegments[seg] ?? (enSegments[seg] ? seg : undefined);
    if (!vi) return m;
    return `/${vi}${item ? `/${viItems[vi]?.[item] ?? item}` : ""}`;
  });
}
// Đoạn đầu có phải tên trang tiếng Anh không (dùng ở proxy)
export const isEnSegment = (seg: string) => seg in viSegments;

// Gắn tiền tố ngôn ngữ vào đường dẫn gốc (tiếng Việt): ("en", "/du-an") → "/en/projects", ("vi", "/du-an") → "/vi/du-an".
// Liên kết neo (#lien-he) giữ nguyên.
export function localePath(lang: Locale, path: string) {
  if (path.startsWith("#")) return path;
  const p = lang === "en" ? toEnPath(path) : path;
  return `/${lang}${p === "/" ? "" : p}`;
}

// Bỏ tiền tố ngôn ngữ, trả về đường dẫn gốc (tiếng Việt): "/en/projects/ceremonial-float-a80" → "/du-an/khoi-xe-nghi-truong-a80"
export function stripLocale(pathname: string) {
  const rest = pathname.replace(/^\/(vi|en)(?=\/|$)/, "");
  return rest === "" ? "/" : toViPath(rest);
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
  contact: "/lien-he",
};
