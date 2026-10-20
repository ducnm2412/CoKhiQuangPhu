import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, enSegments, hasLocale, viSegments } from "@/lib/i18n";
import { SESSION_COOKIE, hasValidSession } from "@/lib/session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Trang quản trị: không có tiền tố ngôn ngữ; chưa đăng nhập → về trang đăng nhập.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (pathname === "/admin/login") return;
    if (hasValidSession(request.cookies.get(SESSION_COOKIE)?.value)) return;
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const [, lang = "", segment = "", ...rest] = pathname.split("/");

  // Đường dẫn chưa có tiền tố ngôn ngữ ("/", "/du-an") → chuyển sang bản tiếng Việt ("/vi", "/vi/du-an").
  if (!hasLocale(lang)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  // Tên trang theo ngôn ngữ: bản tiếng Anh dùng /en/news, /en/projects… (xem enSegments trong lib/i18n.ts).
  const tail = rest.length ? `/${rest.join("/")}` : "";
  const to = (seg: string) => {
    const url = request.nextUrl.clone();
    url.pathname = `/${lang}/${seg}${tail}`;
    return url;
  };
  if (lang === "en") {
    // /en/news → hiển thị trang /en/tin-tuc (địa chỉ trên trình duyệt giữ nguyên)
    if (viSegments[segment]) return NextResponse.rewrite(to(viSegments[segment]));
    // Link cũ /en/tin-tuc → /en/news
    if (enSegments[segment]) return NextResponse.redirect(to(enSegments[segment]), 308);
  } else if (viSegments[segment]) {
    // Gõ nhầm tên tiếng Anh ở bản tiếng Việt: /vi/news → /vi/tin-tuc
    return NextResponse.redirect(to(viSegments[segment]), 308);
  }
}

export const config = {
  // Bỏ qua API, file tĩnh của Next, ảnh trong public và mọi đường dẫn có đuôi file
  matcher: ["/((?!api|_next|images|logo-doitac|favicon.ico|.*\\..*).*)"],
};
