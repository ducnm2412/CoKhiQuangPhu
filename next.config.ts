import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Nhúng CSS (Tailwind, ~10KB) thẳng vào HTML: bỏ một yêu cầu chặn hiển thị, cải thiện FCP/LCP
    inlineCss: true,
  },
};

export default nextConfig;
