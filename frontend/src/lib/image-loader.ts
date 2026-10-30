// Loader ảnh cho next/image, thay cho bộ tối ưu ảnh của Vercel (gói miễn phí hết hạn mức thì trả lỗi 402, ảnh không hiện).
// - Ảnh Cloudinary: Cloudinary tự thu nhỏ theo bề rộng, tự chọn định dạng (f_auto) và chất lượng.
// - Ảnh tĩnh trong /public (đã là .webp): trả nguyên file.
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const marker = "/image/upload/";
  if (src.startsWith("https://res.cloudinary.com/") && src.includes(marker)) {
    const q = quality ? `q_${quality}` : "q_auto";
    return src.replace(marker, `${marker}f_auto,${q},c_limit,w_${width}/`);
  }
  return src;
}
