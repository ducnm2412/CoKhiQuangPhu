import { MongoClient, type ObjectId } from "mongodb";
import { env } from "./env.js";

// Bài tin: mỗi bài một document, chứa cả bản tiếng Việt và tiếng Anh.
export type NewsLangFields = { tag: string; title: string; summary: string; body: string[]; imageAlt: string };
export type NewsDoc = {
  _id: ObjectId;
  slug: string; // đường dẫn bản tiếng Việt: /vi/tin-tuc/[slug]
  slugEn?: string; // đường dẫn bản tiếng Anh: /en/news/[slugEn] (bài cũ được bổ sung lúc khởi động)
  order: number; // nhỏ hơn đứng trước
  published: boolean;
  image: { url: string; publicId: string | null; position: string | null }; // ảnh bìa; publicId: ảnh trên Cloudinary (null = ảnh tĩnh của frontend)
  gallery?: { url: string; publicId: string; alt?: string }[]; // ảnh phụ, hiện ở trang chi tiết (bài cũ có thể chưa có trường này)
  vi: NewsLangFields;
  en: NewsLangFields;
  createdAt: Date;
  updatedAt: Date;
};

const client = new MongoClient(env.mongoUri);

export async function connectDb() {
  await client.connect();
  await news().createIndex({ slug: 1 }, { unique: true });
  await news().createIndex({ slugEn: 1 }, { unique: true, sparse: true });
}

export const news = () => client.db(env.mongoDb).collection<NewsDoc>("news");
