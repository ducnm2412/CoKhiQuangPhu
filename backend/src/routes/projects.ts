import { Router, type Request } from "express";
import { ObjectId } from "mongodb";
import multer from "multer";
import { requireAdmin } from "../auth.js";
import { deleteImage, uploadImage } from "../cloudinary.js";
import { projects, type ProjectDoc, type ProjectLangFields } from "../db.js";
import { TranslateError, translateTexts } from "../translate.js";
import { MAX_GALLERY, altFromName, slugify } from "./news.js";

type Lang = "vi" | "en";
const MAX_IMAGE = 4 * 1024 * 1024; // 4MB
export const CATEGORY_COUNT = 4; // khớp projectCategories của frontend

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: MAX_IMAGE }, defParamCharset: "utf8" }).fields([
  { name: "image", maxCount: 1 },
  { name: "gallery", maxCount: MAX_GALLERY },
]);
const sorted = { order: 1, createdAt: -1 } as const;

// ——— Công khai ———

// Dạng dự án cho trang công khai (đúng kiểu Project của frontend)
function toItem(doc: ProjectDoc, lang: Lang) {
  const t = doc[lang];
  const pos = (p: string | null) => p ?? undefined;
  return {
    slug: slugOf(doc, lang),
    slugs: { vi: doc.slug, en: slugOf(doc, "en") }, // để nút đổi ngôn ngữ chuyển đúng dự án
    title: t.title,
    category: doc.category,
    year: doc.year,
    place: t.place,
    summary: t.summary,
    body: t.body,
    image: { src: doc.image.url, alt: t.imageAlt, position: pos(doc.image.position) },
    images: doc.gallery.map((g, i) => ({ src: g.url, alt: g.alt[lang] || `${t.title} (${i + 2})`, position: pos(g.position) })),
    highlights: t.highlights,
  };
}

const langOf = (req: Request): Lang => (req.query.lang === "en" ? "en" : "vi");
const slugOf = (doc: ProjectDoc, lang: Lang) => (lang === "en" && doc.slugEn) || doc.slug;

export const publicProjects = Router();

publicProjects.get("/", async (req, res) => {
  const docs = await projects().find({ published: true }).sort(sorted).toArray();
  res.json(docs.map((d) => toItem(d, langOf(req))));
});

publicProjects.get("/:slug", async (req, res) => {
  // Tìm theo slug của cả hai ngôn ngữ; trang sẽ chuyển hướng về slug đúng của ngôn ngữ đang xem
  const s = req.params.slug;
  const doc = await projects().findOne({ $or: [{ slug: s }, { slugEn: s }], published: true });
  if (!doc) return void res.status(404).json({ error: "Không tìm thấy dự án." });
  res.json(toItem(doc, langOf(req)));
});

// ——— Quản trị ———

type Body = Record<string, unknown>;
const str = (body: Body, key: string) => String(body[key] ?? "").trim();
const lines = (s: string) => s.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

function langFields(body: Body, lang: Lang): Omit<ProjectLangFields, "imageAlt"> | string {
  const label = lang === "vi" ? "tiếng Việt" : "tiếng Anh";
  const f = {
    title: str(body, `${lang}.title`),
    place: str(body, `${lang}.place`),
    summary: str(body, `${lang}.summary`),
    body: str(body, `${lang}.body`),
    highlights: lines(str(body, `${lang}.highlights`)), // mỗi dòng một điểm nổi bật
  };
  if (!f.title || !f.summary || !f.body) return `Bản ${label}: cần nhập tên dự án, tóm tắt và mô tả.`;
  return f;
}

const parseId = (id: unknown) => (typeof id === "string" && ObjectId.isValid(id) ? new ObjectId(id) : null);
const notFound = { error: "Không tìm thấy dự án." };

// Slug chưa dùng: thêm -2, -3… nếu trùng
async function uniqueSlug(title: string) {
  const base = slugify(title);
  const re = { $regex: `^${base}(-\\d+)?$` };
  const docs = await projects().find({ $or: [{ slug: re }, { slugEn: re }] }, { projection: { slug: 1, slugEn: 1 } }).toArray();
  const taken = new Set(docs.flatMap((d) => [d.slug, d.slugEn]));
  let slug = base;
  for (let i = 2; taken.has(slug); i++) slug = `${base}-${i}`;
  return slug;
}

// Thêm (POST /) và sửa (PUT /:id), multipart/form-data — cùng cách với tin tức:
// - "image": ảnh chính (bắt buộc với dự án mới; sửa không gửi thì giữ ảnh cũ)
// - "gallery": ảnh phụ mới; "galleryKeep": URL các ảnh phụ cũ muốn giữ, theo thứ tự
// - "autoTranslate" = "1": máy chủ tự dịch bản tiếng Anh từ bản tiếng Việt
// Slug đặt một lần lúc tạo, sửa tên không đổi slug để link cũ không hỏng.
async function save(req: Request, id: ObjectId | null): Promise<[number, object]> {
  const body = (req.body ?? {}) as Body;
  const category = Number(body.category);
  if (!Number.isInteger(category) || category < 0 || category >= CATEGORY_COUNT) return [400, { error: "Hãy chọn hạng mục." }];
  const year = str(body, "year");
  const vi = langFields(body, "vi");
  if (typeof vi === "string") return [400, { error: vi }];
  let en;
  if (body.autoTranslate === "1") {
    try {
      const [title, place, summary, text, ...highlights] = await translateTexts([vi.title, vi.place, vi.summary, vi.body, ...vi.highlights]);
      en = { title, place, summary, body: text, highlights };
    } catch (e) {
      if (e instanceof TranslateError) return [e.status, { error: `Không tự dịch được sang tiếng Anh: ${e.message}` }];
      throw e;
    }
  } else {
    en = langFields(body, "en");
    if (typeof en === "string") return [400, { error: en }];
  }

  const files = (req.files ?? {}) as Record<string, Express.Multer.File[] | undefined>;
  const file = files.image?.[0];
  const newGallery = files.gallery ?? [];
  if ([file, ...newGallery].some((f) => f && !f.mimetype.startsWith("image/"))) return [400, { error: "File tải lên phải là ảnh." }];
  if (!id && !file) return [400, { error: "Dự án mới cần có ảnh chính." }];

  const col = projects();
  const existing = id ? await col.findOne({ _id: id }) : null;
  if (id && !existing) return [404, notFound];
  const first = existing ? null : await col.findOne({}, { sort: { order: 1 }, projection: { order: 1 } });

  const keepUrls = [body.galleryKeep ?? []].flat().map(String);
  const oldGallery = existing?.gallery ?? [];
  const kept = keepUrls.map((url) => oldGallery.find((g) => g.url === url)).filter((g) => !!g);
  const removed = oldGallery.filter((g) => !keepUrls.includes(g.url));
  if (kept.length + newGallery.length > MAX_GALLERY) return [400, { error: `Tối đa ${MAX_GALLERY} ảnh phụ mỗi dự án.` }];

  const [uploaded, ...added] = await Promise.all([
    file ? uploadImage(file.buffer) : null,
    ...newGallery.map((f) => uploadImage(f.buffer)),
  ]);
  const image = uploaded ? { ...uploaded, position: null } : existing!.image;
  const gallery = [
    ...kept,
    ...(added as { url: string; publicId: string }[]).map((g, i) => {
      const alt = altFromName(newGallery[i].originalname);
      return { ...g, position: null, alt: { vi: alt, en: alt } };
    }),
  ];
  const coverAlt = file ? altFromName(file.originalname) : "";
  const withAlt = (f: Omit<ProjectLangFields, "imageAlt">, lang: Lang): ProjectLangFields => ({
    ...f,
    imageAlt: coverAlt || existing?.[lang].imageAlt || f.title,
  });
  const fields = {
    slug: existing ? existing.slug : await uniqueSlug(vi.title),
    // Dự án mới có slug tiếng Anh riêng; dự án cũ không có thì bản tiếng Anh dùng chung slug (giữ link cũ)
    slugEn: existing ? existing.slugEn : await uniqueSlug(en.title),
    published: body.published === "on" || body.published === "true",
    order: existing ? existing.order : (first?.order ?? 1) - 1,
    category,
    year,
    image,
    gallery,
    vi: withAlt(vi, "vi"),
    en: withAlt(en, "en"),
    updatedAt: new Date(),
  };

  if (existing) {
    await col.updateOne({ _id: existing._id }, { $set: fields });
    await Promise.all([uploaded && deleteImage(existing.image.publicId), ...removed.map((g) => deleteImage(g.publicId))]);
    return [200, { ...existing, ...fields }];
  }
  const doc = { _id: new ObjectId(), ...fields, createdAt: new Date() };
  await col.insertOne(doc);
  return [201, doc];
}

export const adminProjects = Router();
adminProjects.use(requireAdmin);

adminProjects.get("/", async (_req, res) => {
  res.json(await projects().find().sort(sorted).toArray());
});

adminProjects.get("/:id", async (req, res) => {
  const _id = parseId(req.params.id);
  const doc = _id && (await projects().findOne({ _id }));
  if (!doc) return void res.status(404).json(notFound);
  res.json(doc);
});

adminProjects.post("/", upload, async (req, res) => {
  const [status, data] = await save(req, null);
  res.status(status).json(data);
});

adminProjects.put("/:id", upload, async (req, res) => {
  const _id = parseId(req.params.id);
  if (!_id) return void res.status(404).json(notFound);
  const [status, data] = await save(req, _id);
  res.status(status).json(data);
});

adminProjects.patch("/:id/publish", async (req, res) => {
  const _id = parseId(req.params.id);
  const doc = _id && (await projects().findOne({ _id }));
  if (!doc) return void res.status(404).json(notFound);
  await projects().updateOne({ _id: doc._id }, { $set: { published: !doc.published, updatedAt: new Date() } });
  res.json({ published: !doc.published });
});

adminProjects.delete("/:id", async (req, res) => {
  const _id = parseId(req.params.id);
  const doc = _id && (await projects().findOneAndDelete({ _id }));
  if (!doc) return void res.status(404).json(notFound);
  await Promise.all([doc.image, ...doc.gallery].map((g) => deleteImage(g.publicId)));
  res.status(204).end();
});
