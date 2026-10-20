import { v2 as cloudinary } from "cloudinary";
import { env } from "./env.js";

// Đọc CLOUDINARY_URL (cloudinary://<key>:<secret>@<cloud_name>) từ biến môi trường.
cloudinary.config({ secure: true });

export async function uploadImage(buffer: Buffer): Promise<{ url: string; publicId: string }> {
  const result = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: env.cloudinaryFolder, resource_type: "image" }, (err, res) => (err || !res ? reject(err) : resolve(res)))
      .end(buffer);
  });
  return { url: result.secure_url, publicId: result.public_id };
}

export async function deleteImage(publicId: string | null) {
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId).catch(() => {}); // ảnh mồ côi trên Cloudinary không làm hỏng thao tác chính
}
