"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ApiError } from "@/lib/api";
import { adminApi, login as apiLogin, logout as apiLogout } from "@/lib/auth";

export type FormState = { error?: string };

// Tổng dung lượng ảnh mỗi lần lưu (Vercel giới hạn request ~4,5MB). Trình duyệt đã nén ảnh trước khi gửi.
const MAX_UPLOAD = 4 * 1024 * 1024;

// ——— Đăng nhập ———

export async function login(_: FormState, form: FormData): Promise<FormState> {
  try {
    await apiLogin(String(form.get("username") ?? ""), String(form.get("password") ?? ""));
  } catch (e) {
    return { error: e instanceof ApiError ? e.message : "Không kết nối được máy chủ." };
  }
  redirect("/admin");
}

export async function logout() {
  await apiLogout();
  redirect("/admin/login");
}

// ——— Tin tức ———

function revalidateNews() {
  revalidatePath("/[lang]/tin-tuc", "layout");
  revalidatePath("/[lang]/xem-truoc-tin", "page"); // phần "Tin khác" của trang xem trước
  revalidatePath("/admin", "layout");
}

// Chuyển nguyên form (kể cả ảnh) sang backend; backend kiểm tra dữ liệu và upload ảnh lên Cloudinary.
export async function saveNews(id: string | null, _: FormState, form: FormData): Promise<FormState> {
  const image = form.get("image");
  if (image instanceof File && image.size === 0) form.delete("image");
  const total = [...form.values()].reduce((n, v) => n + (v instanceof File ? v.size : 0), 0);
  if (total > MAX_UPLOAD) return { error: "Ảnh quá nặng cho một lần lưu (tối đa 4MB). Hãy lưu bớt ảnh, rồi sửa bài để thêm tiếp." };

  try {
    await adminApi(id ? `/news/${id}` : "/news", { method: id ? "PUT" : "POST", body: form });
  } catch (e) {
    if (e instanceof ApiError) return { error: e.message };
    throw e;
  }
  revalidateNews();
  redirect("/admin/news");
}

export async function deleteNews(id: string) {
  await adminApi(`/news/${id}`, { method: "DELETE" });
  revalidateNews();
}

export async function togglePublish(id: string) {
  await adminApi(`/news/${id}/publish`, { method: "PATCH" });
  revalidateNews();
}

// ——— Dịch tự động (Google Cloud Translation, gọi qua backend) ———

export async function translateTexts(texts: string[]): Promise<{ texts?: string[]; error?: string }> {
  try {
    return await adminApi<{ texts: string[] }>("/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texts, source: "vi", target: "en" }),
    });
  } catch (e) {
    if (e instanceof ApiError) return { error: e.message };
    throw e;
  }
}
