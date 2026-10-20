"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { logout } from "../actions";

const icon = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, "aria-hidden": true } as const;

const NAV = [
  {
    href: "/admin",
    label: "Tổng quan",
    exact: true,
    icon: (
      <svg {...icon}>
        <rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" />
        <rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" />
      </svg>
    ),
  },
  {
    href: "/admin/news",
    label: "Tin tức",
    icon: (
      <svg {...icon}>
        <path d="M4 5h13v14H6a2 2 0 0 1-2-2zM17 9h3v8a2 2 0 0 1-2 2" /><path d="M7 9h7M7 13h7M7 17h4" />
      </svg>
    ),
  },
];

// Menu bên trái. Trên điện thoại thu thành thanh trên cùng, bấm nút ☰ để mở.
export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string, exact?: boolean) => (exact ? pathname === href : pathname.startsWith(href));

  return (
    <aside className="sticky top-0 z-30 border-b border-rule bg-night-2 md:h-screen md:border-r md:border-b-0">
      <div className="flex h-16 items-center justify-between px-4 md:h-20">
        <Link href="/admin" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Logo className="h-9" />
          <span className="text-sm leading-tight">
            <span className="block font-semibold">Quảng Phú</span>
            <span className="text-ash">Quản trị</span>
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Mở menu"
          className="grid size-10 place-items-center border border-rule md:hidden"
        >
          <svg {...icon}>{open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>
        </button>
      </div>

      <div className={`${open ? "flex" : "hidden"} flex-col md:flex md:h-[calc(100vh-5rem)]`}>
        <nav className="flex-1 space-y-1 px-3 py-2">
          {NAV.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                  active ? "bg-signal text-white" : "text-bone/80 hover:bg-tile hover:text-bone"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/vi/tin-tuc"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-bone/80 transition-colors hover:bg-tile hover:text-bone"
          >
            <svg {...icon}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>
            Xem trang web
          </Link>
        </nav>

        <div className="flex items-center gap-2 border-t border-rule p-3">
          <ThemeToggle label="Đổi giao diện sáng / tối" />
          <form action={logout} className="flex-1">
            <button className="flex h-10 w-full items-center justify-center gap-2 border border-rule text-sm text-bone/80 transition-colors hover:border-bone/50 hover:text-bone">
              <svg {...icon}><path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10" /></svg>
              Đăng xuất
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
