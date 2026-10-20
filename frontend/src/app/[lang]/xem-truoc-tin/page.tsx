import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getNewsList } from "@/lib/news";
import { DraftArticle } from "./DraftArticle";

// Trang xem trước bài đang soạn ở trang quản trị (mở trong iframe của nút "Xem trước").
// Nằm trong layout thật của site nên có đủ header, font, footer giống trang chi tiết tin.
export const metadata: Metadata = {
  title: "Xem trước — Quảng Phú",
  robots: { index: false, follow: false },
};

export default async function DraftPreviewPage({ params }: PageProps<"/[lang]/xem-truoc-tin">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  // "Tin khác" lấy như trang thật; nếu backend lỗi thì vẫn xem trước được phần bài viết
  const others = await getNewsList(lang).catch(() => []);
  return <DraftArticle lang={lang} others={others} />;
}
