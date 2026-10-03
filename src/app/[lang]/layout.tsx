import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import Script from "next/script";
import { FloatingContact } from "@/components/FloatingContact";
import { Header } from "@/components/Header";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteFooter } from "@/components/SiteFooter";
import { contact, getContent } from "@/lib/content";
import { alternatesFor, hasLocale, locales, siteUrl } from "@/lib/i18n";
import "../globals.css";

// Font tự cắt gọn (src/fonts): mỗi độ đậm là một file duy nhất chứa đủ chữ Latin và tiếng Việt,
// thay cho 3 file/độ đậm của Google Fonts. Archivo được cố định ở độ rộng 72 (kiểu chữ tiêu đề).
const head = localFont({
  variable: "--font-head",
  src: [
    { path: "../../fonts/archivo-condensed-600.woff2", weight: "600" },
    { path: "../../fonts/archivo-condensed-800.woff2", weight: "800" },
  ],
  display: "swap",
});

const body = localFont({
  variable: "--font-body",
  src: [
    { path: "../../fonts/be-vietnam-pro-400.woff2", weight: "400" },
    { path: "../../fonts/be-vietnam-pro-500.woff2", weight: "500" },
    { path: "../../fonts/be-vietnam-pro-600.woff2", weight: "600" },
  ],
  display: "swap",
  // Không tải trước: CSS đã nhúng trong HTML nên trình duyệt vẫn tìm thấy font sớm
  preload: false,
});

const code = localFont({
  variable: "--font-code",
  src: "../../fonts/jetbrains-mono-400.woff2",
  weight: "400",
  display: "swap",
  // Chỉ dùng cho nhãn chữ nhỏ
  preload: false,
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Chỉ /vi và /en; ngôn ngữ khác trả về 404.
export const dynamicParams = false;

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getContent(lang);
  return {
    title: t.meta.title,
    description: t.meta.description,
    metadataBase: new URL(siteUrl),
    alternates: alternatesFor(lang, "/"),
  };
}

// Chạy trước khi trang hiện ra: áp giao diện người xem đã chọn (mặc định là tối, đúng thiết kế gốc).
const themeScript = `try{if(localStorage.getItem("theme")==="light")document.documentElement.dataset.theme="light"}catch(e){}`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getContent(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: t.company.name,
    telephone: "+84961031318",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Thôn Quảng Bố, Xã Quảng Phú",
      addressLocality: "Huyện Lương Tài",
      addressRegion: "Bắc Ninh",
      addressCountry: "VN",
    },
    hasMap: contact.mapsHref,
  };

  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${head.variable} ${body.variable} ${code.variable} antialiased`}
    >
      <body className="min-h-full font-sans">
        <Script id="theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header lang={lang} nav={t.nav} ui={t.ui} services={t.products.map((p) => ({ id: p.id, name: p.name }))}
          projectCategories={t.projectCategories}
        />
        {children}
        <SiteFooter lang={lang} />
        <FloatingContact callLabel={t.ui.callNow} zaloLabel={t.ui.zaloChat} />
        <ScrollReveal />
      </body>
    </html>
  );
}
