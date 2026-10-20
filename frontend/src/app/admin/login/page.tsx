"use client";

import { useActionState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { login } from "../actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, {});

  return (
    <main className="relative grid min-h-screen place-items-center px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle label="Đổi giao diện sáng / tối" />
      </div>
      <form action={action} className="w-full max-w-sm space-y-4 border border-rule bg-night-2 p-6">
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
