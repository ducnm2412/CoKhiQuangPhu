import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90: ảnh lớn ở trang chi tiết (xem ảnh to, cần nét); còn lại mặc định 75
    qualities: [75, 90],
    // Ảnh tin tức upload từ trang quản trị
    remotePatterns: [new URL("https://res.cloudinary.com/**")],
  },
  experimental: {
    // Nhúng CSS (Tailwind, ~10KB) thẳng vào HTML: bỏ một yêu cầu chặn hiển thị, cải thiện FCP/LCP
    inlineCss: true,
    serverActions: {
      // Đủ cho ảnh tin tức tối đa 4MB (Vercel giới hạn request ~4,5MB)
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
