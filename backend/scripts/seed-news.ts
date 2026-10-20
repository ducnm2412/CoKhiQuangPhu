// Nạp các tin ban đầu (scripts/news-seed.json) vào MongoDB, ảnh (lấy từ frontend/public) upload lên Cloudinary.
// Chạy: npm run seed:news
// - Bài chưa có (theo slug): thêm mới.
// - Bài đã có nhưng ảnh còn là ảnh tĩnh (/images/...): chỉ chuyển ảnh lên Cloudinary.
// - Bài đã có ảnh trên Cloudinary: giữ nguyên.
import { readFileSync } from "node:fs";
import { v2 as cloudinary } from "cloudinary";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Thiếu MONGODB_URI trong backend/.env");
if (!process.env.CLOUDINARY_URL) throw new Error("Thiếu CLOUDINARY_URL trong backend/.env");
cloudinary.config({ secure: true });
const folder = process.env.CLOUDINARY_FOLDER || "cokhi/news";

const publicDir = new URL("../../frontend/public/", import.meta.url);

async function uploadLocal(url: string, slug: string) {
  const file = new URL(url.replace(/^\//, ""), publicDir);
  // public_id cố định theo slug: chạy lại script không tạo ảnh trùng
  const res = await cloudinary.uploader.upload(`data:image/webp;base64,${readFileSync(file).toString("base64")}`, {
    folder,
    public_id: slug,
    overwrite: true,
    resource_type: "image",
  });
  return { url: res.secure_url, publicId: res.public_id };
}

const items = JSON.parse(readFileSync(new URL("./news-seed.json", import.meta.url), "utf8"));
const client = await new MongoClient(uri).connect();
const col = client.db(process.env.MONGODB_DB || "cokhi").collection("news");
await col.createIndex({ slug: 1 }, { unique: true });

for (const item of items) {
  const existing = await col.findOne({ slug: item.slug });
  if (existing?.image?.publicId) {
    console.log(`= ${item.slug}: đã có, bỏ qua`);
    continue;
  }
  const localUrl = existing?.image?.url ?? item.image.url;
  const uploaded = await uploadLocal(localUrl, item.slug);
  const image = { ...item.image, ...(existing?.image ?? {}), ...uploaded };
  const now = new Date();
  if (existing) {
    await col.updateOne({ _id: existing._id }, { $set: { image, updatedAt: now } });
    console.log(`~ ${item.slug}: đã chuyển ảnh lên Cloudinary`);
  } else {
    await col.insertOne({ ...item, image, createdAt: now, updatedAt: now });
    console.log(`+ ${item.slug}: đã thêm`);
  }
}
await client.close();
