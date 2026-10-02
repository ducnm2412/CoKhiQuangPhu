import type { Metadata } from "next";
import { Archivo, Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { FloatingContact } from "@/components/FloatingContact";
import { Header } from "@/components/Header";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteFooter } from "@/components/SiteFooter";
import { contact, getContent } from "@/lib/content";
import { hasLocale, locales } from "@/lib/i18n";
import "../globals.css";

const head = Archivo({
  variable: "--font-head",
  subsets: ["latin", "vietnamese"],
  axes: ["wdth"],
});

const body = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const code = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
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
    alternates: { languages: { vi: "/vi", en: "/en" } },
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
        <Header lang={lang} nav={t.nav} ui={t.ui} services={t.products.map((p) => ({ id: p.id, name: p.name }))} />
        {children}
        <SiteFooter lang={lang} />
        <FloatingContact callLabel={t.ui.callNow} zaloLabel={t.ui.zaloChat} />
        <ScrollReveal />
      </body>
    </html>
  );
}
