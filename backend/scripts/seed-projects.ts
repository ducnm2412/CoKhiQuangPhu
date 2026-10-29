// Nạp các dự án ban đầu (scripts/projects-seed.json) vào MongoDB, ảnh (lấy từ frontend/public) upload lên Cloudinary.
// Chạy: npm run seed:projects
// - Dự án chưa có (theo slug): thêm mới.
// - Dự án đã có nhưng còn ảnh tĩnh (/images/...): chỉ chuyển các ảnh đó lên Cloudinary.
// - Ảnh đã ở trên Cloudinary: giữ nguyên.
import { readFileSync } from "node:fs";
import { extname } from "node:path";
import { v2 as cloudinary } from "cloudinary";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Thiếu MONGODB_URI trong backend/.env");
if (!process.env.CLOUDINARY_URL) throw new Error("Thiếu CLOUDINARY_URL trong backend/.env");
cloudinary.config({ secure: true });
const folder = process.env.CLOUDINARY_FOLDER || "cokhi/news";

const publicDir = new URL("../../frontend/public/", import.meta.url);
const mime: Record<string, string> = { ".webp": "image/webp", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png" };

type Image = { url: string; publicId: string | null; position: string | null };

// Ảnh tĩnh → Cloudinary; public_id cố định nên chạy lại script không tạo ảnh trùng
async function toCloud<T extends Image>(img: T, publicId: string): Promise<T> {
  if (img.publicId) return img;
  const data = readFileSync(new URL(img.url.replace(/^\//, ""), publicDir)).toString("base64");
  const res = await cloudinary.uploader.upload(`data:${mime[extname(img.url).toLowerCase()] ?? "image/webp"};base64,${data}`, {
    folder,
    public_id: publicId,
    overwrite: true,
    resource_type: "image",
  });
  return { ...img, url: res.secure_url, publicId: res.public_id };
}

const items = JSON.parse(readFileSync(new URL("./projects-seed.json", import.meta.url), "utf8"));
const client = await new MongoClient(uri).connect();
const col = client.db(process.env.MONGODB_DB || "cokhi").collection("projects");
await col.createIndex({ slug: 1 }, { unique: true });

for (const item of items) {
  const existing = await col.findOne({ slug: item.slug });
  const src = existing ?? item;
  if (src.image.publicId && src.gallery.every((g: Image) => g.publicId)) {
    console.log(`= ${item.slug}: đã có, bỏ qua`);
    continue;
  }
  const image = await toCloud(src.image, `du-an-${item.slug}`);
  const gallery = [];
  for (const [i, g] of src.gallery.entries()) gallery.push(await toCloud(g, `du-an-${item.slug}-${i + 2}`));
  const now = new Date();
  if (existing) {
    await col.updateOne({ _id: existing._id }, { $set: { image, gallery, updatedAt: now } });
    console.log(`~ ${item.slug}: đã chuyển ảnh lên Cloudinary`);
  } else {
    await col.insertOne({ ...item, image, gallery, createdAt: now, updatedAt: now });
    console.log(`+ ${item.slug}: đã thêm (${1 + gallery.length} ảnh)`);
  }
}
await client.close();
