import { decodeJwt } from "jose";

// Token do backend cấp, lưu trong cookie httpOnly. Frontend chỉ xem hạn dùng để điều hướng;
// việc kiểm tra chữ ký là của backend (mọi API quản trị đều xác thực lại).
export const SESSION_COOKIE = "admin_token";

export function hasValidSession(token: string | undefined) {
  if (!token) return false;
  try {
    const { exp } = decodeJwt(token);
    return !exp || exp * 1000 > Date.now();
  } catch {
    return false;
  }
}
