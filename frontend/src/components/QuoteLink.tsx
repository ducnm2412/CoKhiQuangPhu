"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { hasLocale, localePath, routes } from "@/lib/i18n";

// Liên kết "Yêu cầu báo giá": mở trang Liên hệ theo ngôn ngữ đang xem.
export function QuoteLink({ className, children }: { className?: string; children: React.ReactNode }) {
  const { lang } = useParams<{ lang: string }>();
  return (
    <Link href={localePath(hasLocale(lang) ? lang : "vi", routes.contact)} className={className}>
      {children}
    </Link>
  );
}
