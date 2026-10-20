"use client";

import Image from "next/image";
import { useActionState } from "react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { login } from "../actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, {});

  return (
    <main className="relative isolate grid min-h-screen place-items-center overflow-hidden px-4">
      {/* Ảnh nền: khối xe A80 của xưởng, phủ lớp tối để khung đăng nhập dễ đọc */}
      <Image
        src="/images/a80-khoi-xe-dem.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
        style={{ objectPosition: "48% 62%" }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/80" aria-hidden="true" />

      <div className="absolute top-4 right-4 bg-night-2/90 backdrop-blur">
        <ThemeToggle label="Đổi giao diện sáng / tối" />
      </div>
      <form action={action} className="w-full max-w-sm space-y-4 border border-rule bg-night-2/95 p-6 shadow-2xl backdrop-blur">
        <div className="flex items-center gap-3 pb-2">
          <Logo className="h-11" />
          <div className="leading-tight">
            <p className="font-semibold">Quảng Phú</p>
            <p className="text-sm text-ash">Cơ khí mỹ thuật</p>
          </div>
        </div>
        <h1 className="text-xl font-semibold">Đăng nhập quản trị</h1>
        <label className="block text-sm">
          Tên đăng nhập
          <input
            name="username"
            autoComplete="username"
            required
            autoFocus
            className="mt-1 block w-full border border-rule bg-night px-3 py-2 outline-none focus:border-signal"
          />
        </label>
        <label className="block text-sm">
          Mật khẩu
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            className="mt-1 block w-full border border-rule bg-night px-3 py-2 outline-none focus:border-signal"
          />
        </label>
        {state.error && <p className="text-sm text-signal">{state.error}</p>}
        <button disabled={pending} className="w-full bg-signal px-4 py-2 font-semibold text-white disabled:opacity-60">
          {pending ? "Đang đăng nhập…" : "Đăng nhập"}
        </button>
      </form>
    </main>
  );
}
