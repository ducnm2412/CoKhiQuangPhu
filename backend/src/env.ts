// Biến môi trường bắt buộc: thiếu thì dừng ngay lúc khởi động thay vì lỗi giữa chừng.
function required(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Thiếu biến môi trường ${name}`);
  return v;
}

export const env = {
  port: Number(process.env.PORT) || 4000,
  corsOrigin: (process.env.CORS_ORIGIN || "http://localhost:3000").split(",").map((s) => s.trim()),
  mongoUri: required("MONGODB_URI"),
  mongoDb: process.env.MONGODB_DB || "cokhi",
  cloudinaryFolder: process.env.CLOUDINARY_FOLDER || "cokhi/news",
  adminUsername: process.env.ADMIN_USERNAME || "admin",
  adminPassword: required("ADMIN_PASSWORD"),
  jwtSecret: required("JWT_SECRET"),
  // Tuỳ chọn: thiếu thì nút "Dịch sang tiếng Anh" báo lỗi, phần còn lại vẫn chạy
  googleTranslateKey: process.env.GOOGLE_TRANSLATE_API_KEY || "",
};

if (env.jwtSecret.length < 32) throw new Error("JWT_SECRET phải có ít nhất 32 ký tự");
required("CLOUDINARY_URL");
