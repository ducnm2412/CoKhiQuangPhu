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

// Dự án: mỗi dự án một document, chứa cả bản tiếng Việt và tiếng Anh.
export type ProjectLangFields = { title: string; place: string; summary: string; body: string; highlights: string[]; imageAlt: string };
export type ProjectImage = { url: string; publicId: string | null; position: string | null }; // publicId null = ảnh tĩnh của frontend
export type ProjectDoc = {
  _id: ObjectId;
  slug: string; // đường dẫn bản tiếng Việt: /vi/du-an/[slug]
  slugEn?: string; // đường dẫn bản tiếng Anh; dự án cũ không có thì dùng chung slug
  order: number; // nhỏ hơn đứng trước
  published: boolean;
  category: number; // vị trí trong projectCategories của frontend
  year: string;
  image: ProjectImage;
  gallery: (ProjectImage & { alt: { vi: string; en: string } })[];
  vi: ProjectLangFields;
  en: ProjectLangFields;
  createdAt: Date;
  updatedAt: Date;
};

const client = new MongoClient(env.mongoUri);

export async function connectDb() {
  await client.connect();
  await news().createIndex({ slug: 1 }, { unique: true });
  await news().createIndex({ slugEn: 1 }, { unique: true, sparse: true });
  await projects().createIndex({ slug: 1 }, { unique: true });
  await projects().createIndex({ slugEn: 1 }, { unique: true, sparse: true });
}

export const news = () => client.db(env.mongoDb).collection<NewsDoc>("news");
export const projects = () => client.db(env.mongoDb).collection<ProjectDoc>("projects");
