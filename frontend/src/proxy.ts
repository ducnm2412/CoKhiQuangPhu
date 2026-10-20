import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, isEnSegment, toEnPath, toViPath } from "@/lib/i18n";
import { SESSION_COOKIE, hasValidSession } from "@/lib/session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Trang quản trị: không có tiền tố ngôn ngữ; chưa đăng nhập → về trang đăng nhập.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (pathname === "/admin/login") return;
    if (hasValidSession(request.cookies.get(SESSION_COOKIE)?.value)) return;
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const lang = pathname.split("/")[1] ?? "";

  // Đường dẫn chưa có tiền tố ngôn ngữ ("/", "/du-an") → chuyển sang bản tiếng Việt ("/vi", "/vi/du-an").
  if (!hasLocale(lang)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  // Đường dẫn theo ngôn ngữ (xem toEnPath/toViPath trong lib/i18n.ts):
  // bản tiếng Anh dùng /en/projects/ceremonial-float-a80, trang thật nằm ở /en/du-an/khoi-xe-nghi-truong-a80.
  const rest = pathname.slice(lang.length + 1) || "/";
  const viPath = toViPath(rest); // đường dẫn gốc (tiếng Việt)
  const go = (path: string, redirect: boolean) => {
    const url = request.nextUrl.clone();
    url.pathname = `/${lang}${path === "/" ? "" : path}`;
    return redirect ? NextResponse.redirect(url, 308) : NextResponse.rewrite(url);
  };
  if (lang === "en") {
    const enPath = toEnPath(viPath);
    // Link cũ hoặc gõ mã tiếng Việt (/en/tin-tuc, /en/projects/khoi-xe-…) → đường dẫn tiếng Anh chuẩn
    if (rest !== enPath) return go(enPath, true);
    // /en/projects/ceremonial-float-a80 → hiển thị trang /en/du-an/khoi-xe-nghi-truong-a80 (địa chỉ giữ nguyên)
    if (viPath !== rest) return go(viPath, false);
  } else if (isEnSegment(rest.split("/")[1] ?? "")) {
    // Gõ nhầm đường dẫn tiếng Anh ở bản tiếng Việt: /vi/news → /vi/tin-tuc
    return go(viPath, true);
  }
}

export const config = {
  // Bỏ qua API, file tĩnh của Next, ảnh trong public và mọi đường dẫn có đuôi file
  matcher: ["/((?!api|_next|images|logo-doitac|favicon.ico|.*\\..*).*)"],
};
