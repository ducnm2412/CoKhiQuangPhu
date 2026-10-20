import type { Metadata } from "next";
import { InlineScript } from "@/components/InlineScript";
import { themeScript } from "@/lib/theme";
import "../globals.css";

export const metadata: Metadata = {
  title: "Quản trị — Quảng Phú",
  robots: { index: false, follow: false },
};

// Layout gốc riêng cho trang quản trị (trang công khai dùng layout trong [lang]).
export default function AdminRootLayout({ children }: LayoutProps<"/admin">) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="min-h-screen font-[system-ui,sans-serif] antialiased">
        <InlineScript html={themeScript} />
        {children}
      </body>
    </html>
  );
}
