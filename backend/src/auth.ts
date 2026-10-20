import { timingSafeEqual } from "node:crypto";
import type { RequestHandler } from "express";
import { rateLimit } from "express-rate-limit";
import { SignJWT, jwtVerify } from "jose";
import { env } from "./env.js";

// Đăng nhập quản trị: tên đăng nhập + mật khẩu (ADMIN_USERNAME, ADMIN_PASSWORD) → JWT gửi kèm header Authorization: Bearer <token>.
export const TOKEN_TTL = 60 * 60 * 24 * 7; // 7 ngày
const secret = new TextEncoder().encode(env.jwtSecret);

// So sánh thời gian không đổi, tránh đoán dần từng ký tự qua thời gian phản hồi
function safeEqual(input: unknown, expected: string) {
  if (typeof input !== "string") return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function checkCredentials(username: unknown, password: unknown) {
  // Kiểm tra cả hai (không dừng sớm) để không lộ tên đăng nhập nào đúng
  const okUser = safeEqual(typeof username === "string" ? username.trim() : username, env.adminUsername);
  const okPass = safeEqual(password, env.adminPassword);
  return okUser && okPass;
}

export function signToken() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_TTL}s`)
    .sign(secret);
}

export const requireAdmin: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.match(/^Bearer (.+)$/)?.[1];
  try {
    if (!token) throw new Error();
    await jwtVerify(token, secret);
    next();
  } catch {
    res.status(401).json({ error: "Chưa đăng nhập hoặc phiên đã hết hạn." });
  }
};

// Chống dò mật khẩu: tối đa 10 lần thử mỗi 15 phút cho mỗi IP.
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: { error: "Thử quá nhiều lần, vui lòng đợi 15 phút." },
});
