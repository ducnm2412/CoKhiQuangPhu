import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api, ApiError } from "./api";
import { SESSION_COOKIE, hasValidSession } from "./session";

export async function login(username: string, password: string) {
  const { token, expiresIn } = await api<{ token: string; expiresIn: number }>("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: expiresIn,
  });
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
}

// Token quản trị hiện tại; chưa đăng nhập → về trang đăng nhập.
export async function requireToken() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token || !hasValidSession(token)) redirect("/admin/login");
  return token;
}

// Gọi API quản trị kèm token; backend trả 401 (token sai/hết hạn) → về trang đăng nhập.
export async function adminApi<T>(path: string, init: RequestInit = {}) {
  const token = await requireToken();
  try {
    return await api<T>(`/api/admin${path}`, { ...init, token });
  } catch (e) {
    if (e instanceof ApiError && e.status === 401) redirect("/admin/login");
    throw e;
  }
}
