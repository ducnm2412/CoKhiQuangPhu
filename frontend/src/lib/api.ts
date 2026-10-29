import "server-only";

// Gọi backend (thư mục backend/). Chỉ dùng phía server: token quản trị không bao giờ lộ ra trình duyệt.
const API_URL = (process.env.API_URL || "http://localhost:4000").replace(/\/$/, "");

export type NewsLangFields = { tag: string; title: string; summary: string; body: string[]; imageAlt: string };
export type NewsDoc = {
  _id: string;
  slug: string;
  slugEn?: string;
  order: number;
  published: boolean;
  image: { url: string; publicId: string | null; position: string | null };
  gallery?: { url: string; publicId: string }[];
  vi: NewsLangFields;
  en: NewsLangFields;
  createdAt: string;
  updatedAt: string;
};

export type ProjectLangFields = { title: string; place: string; summary: string; body: string; highlights: string[]; imageAlt: string };
export type ProjectImage = { url: string; publicId: string | null; position: string | null };
export type ProjectDoc = {
  _id: string;
  slug: string;
  slugEn?: string;
  order: number;
  published: boolean;
  category: number;
  year: string;
  image: ProjectImage;
  gallery: (ProjectImage & { alt: { vi: string; en: string } })[];
  vi: ProjectLangFields;
  en: ProjectLangFields;
  createdAt: string;
  updatedAt: string;
};

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function api<T>(path: string, init: RequestInit & { token?: string } = {}): Promise<T> {
  const { token, headers, ...rest } = init;
  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...headers },
  }).catch((cause) => {
    throw new Error(`Không kết nối được backend tại ${API_URL}. Backend đã chạy chưa? (npm run dev:be)`, { cause });
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new ApiError(res.status, body?.error ?? `Lỗi API (${res.status})`);
  }
  return (res.status === 204 ? undefined : await res.json()) as T;
}
