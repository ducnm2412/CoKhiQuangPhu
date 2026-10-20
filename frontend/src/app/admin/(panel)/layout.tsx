import { requireToken } from "@/lib/auth";
import { AdminSidebar } from "./AdminSidebar";

// Khung chung cho các trang quản trị cần đăng nhập: menu bên trái, nội dung bên phải.
export default async function PanelLayout({ children }: LayoutProps<"/admin">) {
  await requireToken();

  return (
    <div className="min-h-screen md:grid md:grid-cols-[240px_minmax(0,1fr)]">
      <AdminSidebar />
      <main className="mx-auto w-full max-w-[1100px] px-4 py-6 md:px-8 md:py-8">{children}</main>
    </div>
  );
}
