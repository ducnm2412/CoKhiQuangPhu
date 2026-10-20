// Nén ảnh ngay trên trình duyệt trước khi gửi: thu về tối đa 2000px cạnh dài, định dạng WebP.
// Nhờ vậy một lần lưu gửi được nhiều ảnh mà vẫn dưới giới hạn ~4,5MB/request của Vercel.
const MAX_SIDE = 2000;
const QUALITY = 0.85;

export async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/gif") return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", QUALITY));
    // Ảnh vốn đã nhỏ hơn bản nén thì giữ nguyên
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".webp", { type: "image/webp" });
  } catch {
    return file; // trình duyệt không đọc được ảnh: gửi nguyên bản, backend sẽ kiểm tra
  }
}
