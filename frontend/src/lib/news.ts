import "server-only";
import { api, ApiError } from "./api";
import type { NewsItem } from "./content";
import type { Locale } from "./i18n";

// Tin tức cho trang công khai, lấy từ backend (đã ở đúng dạng NewsItem).
export function getNewsList(lang: Locale) {
  return api<NewsItem[]>(`/api/news?lang=${lang}`);
}

export async function getNewsBySlug(lang: Locale, slug: string) {
  try {
    return await api<NewsItem>(`/api/news/${encodeURIComponent(slug)}?lang=${lang}`);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) return null;
    throw e;
  }
}
