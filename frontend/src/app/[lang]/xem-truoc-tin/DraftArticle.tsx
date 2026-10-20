"use client";

import { useSyncExternalStore } from "react";
import { NewsArticle } from "@/components/NewsArticle";
import { getContent, type NewsItem } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

// Khoá sessionStorage mà form quản trị ghi bản nháp vào trước khi mở trang này trong iframe
export const DRAFT_KEY = "news-preview";

const read = () => {
  try {
    return sessionStorage.getItem(DRAFT_KEY);
  } catch {
    return null;
  }
};

export function DraftArticle({ lang, others }: { lang: Locale; others: NewsItem[] }) {
  // Đọc bản nháp sau khi vào trình duyệt (server không có sessionStorage)
  const raw = useSyncExternalStore(() => () => {}, read, () => undefined);
  if (raw === undefined) return null;

  const item: NewsItem | null = raw ? JSON.parse(raw) : null;
  if (!item) {
    return <main className="mx-auto max-w-[1200px] px-5 py-24 text-ash md:px-8">Không có bản nháp để xem trước.</main>;
  }
  return <NewsArticle lang={lang} c={getContent(lang)} item={item} others={others} />;
}
