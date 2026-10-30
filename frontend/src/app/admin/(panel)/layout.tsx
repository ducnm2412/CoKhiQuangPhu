import Image from "next/image";
import { requireToken } from "@/lib/auth";
import { AdminSidebar } from "./AdminSidebar";

// Khung chung cho các trang quản trị cần đăng nhập: menu bên trái, nội dung bên phải.
export default async function PanelLayout({ children }: LayoutProps<"/admin">) {
  await requireToken();

  return (
    <div className="min-h-screen md:grid md:grid-cols-[240px_minmax(0,1fr)]">
      <AdminSidebar />
      {/* Logo mờ làm nền, giống footer trang chính */}
      <Image
        src="/images/logo.png"
        alt=""
        aria-hidden
        width={312}
        height={320}
        className="pointer-events-none fixed top-1/2 left-1/2 w-[min(70vw,420px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.12] select-none md:left-[calc(50%+120px)]"
      />
      <main className="relative mx-auto w-full max-w-[1100px] px-4 py-6 md:px-8 md:py-8">{children}</main>
    </div>
  );
}
