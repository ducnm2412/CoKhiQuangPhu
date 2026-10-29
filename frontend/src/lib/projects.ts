import "server-only";
import { api, ApiError } from "./api";
import type { Project } from "./content";
import type { Locale } from "./i18n";

// Dự án cho trang công khai, lấy từ backend (đã ở đúng dạng Project).
export function getProjects(lang: Locale) {
  return api<Project[]>(`/api/projects?lang=${lang}`);
}

export async function getProjectBySlug(lang: Locale, slug: string) {
  try {
    return await api<Project>(`/api/projects/${encodeURIComponent(slug)}?lang=${lang}`);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) return null;
    throw e;
  }
}
