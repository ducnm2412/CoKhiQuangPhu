import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale } from "@/lib/i18n";

// Đường dẫn chưa có tiền tố ngôn ngữ ("/", "/du-an") → chuyển sang bản tiếng Việt ("/vi", "/vi/du-an").
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (hasLocale(pathname.split("/")[1] ?? "")) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Bỏ qua API, file tĩnh của Next, ảnh trong public và mọi đường dẫn có đuôi file
  matcher: ["/((?!api|_next|images|logo-doitac|favicon.ico|.*\\..*).*)"],
};
