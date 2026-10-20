import { Router, type Request } from "express";
import { ObjectId } from "mongodb";
import multer from "multer";
import { requireAdmin } from "../auth.js";
import { deleteImage, uploadImage } from "../cloudinary.js";
import { news, type NewsDoc, type NewsLangFields } from "../db.js";
import { TranslateError, translateTexts } from "../translate.js";

type Lang = "vi" | "en";
const MAX_IMAGE = 4 * 1024 * 1024; // 4MB

export const MAX_GALLERY = 20;

// defParamCharset: đọc đúng tên file có dấu tiếng Việt
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: MAX_IMAGE }, defParamCharset: "utf8" }).fields([
  { name: "image", maxCount: 1 },
  { name: "gallery", maxCount: MAX_GALLERY },
]);
const sorted = { order: 1, createdAt: -1 } as const;

// ——— Công khai ———

// Dạng bài cho trang công khai (đúng kiểu NewsItem của frontend)
function toItem(doc: NewsDoc, lang: Lang) {
  const t = doc[lang];
  return {
    slug: slugOf(doc, lang),
    slugs: { vi: doc.slug, en: slugOf(doc, "en") }, // để nút đổi ngôn ngữ chuyển đúng bài
    tag: t.tag,
    title: t.title,
    summary: t.summary,
    body: t.body,
    image: { src: doc.image.url, alt: t.imageAlt, position: doc.image.position ?? undefined },
    gallery: (doc.gallery ?? []).map((g, i) => ({ src: g.url, alt: g.alt || `${t.imageAlt || t.title} (${i + 2})` })),
  };
}

const langOf = (req: Request): Lang => (req.query.lang === "en" ? "en" : "vi");
const slugOf = (doc: NewsDoc, lang: Lang) => (lang === "en" && doc.slugEn) || doc.slug;

export const publicNews = Router();

publicNews.get("/", async (req, res) => {
  const docs = await news().find({ published: true }).sort(sorted).toArray();
  res.json(docs.map((d) => toItem(d, langOf(req))));
});

publicNews.get("/:slug", async (req, res) => {
  // Tìm theo slug của cả hai ngôn ngữ; trang sẽ chuyển hướng về slug đúng của ngôn ngữ đang xem
  const s = req.params.slug;
  const doc = await news().findOne({ $or: [{ slug: s }, { slugEn: s }], published: true });
  if (!doc) return void res.status(404).json({ error: "Không tìm thấy bài." });
  res.json(toItem(doc, langOf(req)));
});

// ——— Quản trị ———

type Body = Record<string, unknown>;
const str = (body: Body, key: string) => String(body[key] ?? "").trim();

// Mô tả ảnh (alt) lấy từ tên file: "tuong-bac-ho_dung.webp" → "tuong bac ho dung"
const altFromName = (name: string) => name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();

function langFields(body: Body, lang: Lang): Omit<NewsLangFields, "imageAlt"> | string {
  const label = lang === "vi" ? "tiếng Việt" : "tiếng Anh";
  const f = {
    tag: str(body, `${lang}.tag`),
    title: str(body, `${lang}.title`),
    summary: str(body, `${lang}.summary`),
    // Các đoạn cách nhau bằng một dòng trống
    body: str(body, `${lang}.body`).split(/\r?\n\s*\r?\n/).map((p) => p.trim()).filter(Boolean),
  };
  if (!f.title || !f.summary || !f.body.length) return `Bản ${label}: cần nhập tiêu đề, tóm tắt và nội dung.`;
  return f;
}

const parseId = (id: unknown) => (typeof id === "string" && ObjectId.isValid(id) ? new ObjectId(id) : null);
const notFound = { error: "Không tìm thấy bài." };

// "Nâng cấp xưởng Bắc Ninh" → "nang-cap-xuong-bac-ninh"
const slugify = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "d").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80).replace(/-+$/, "") || "tin";

// Slug chưa dùng (xét cả slug tiếng Việt lẫn tiếng Anh): thêm -2, -3… nếu trùng
// excludeId: bỏ qua chính bài đang đặt slug (để không tự "trùng" với mình)
async function uniqueSlug(title: string, excludeId?: ObjectId) {
  const base = slugify(title);
  const re = { $regex: `^${base}(-\\d+)?$` };
  const docs = await news()
    .find({ $or: [{ slug: re }, { slugEn: re }], ...(excludeId ? { _id: { $ne: excludeId } } : {}) }, { projection: { slug: 1, slugEn: 1 } })
    .toArray();
  const taken = new Set(docs.flatMap((d) => [d.slug, d.slugEn]));
  let slug = base;
  for (let i = 2; taken.has(slug); i++) slug = `${base}-${i}`;
  return slug;
}

// Thêm (POST /) và sửa (PUT /:id) dùng chung, nhận multipart/form-data:
// - "image": ảnh bìa (bắt buộc với bài mới; sửa bài không gửi thì giữ ảnh cũ)
// - "gallery": ảnh phụ mới (nhiều file), thêm vào cuối bộ ảnh
// - "galleryKeep": publicId các ảnh phụ cũ muốn giữ, theo thứ tự; ảnh cũ không có trong danh sách bị xóa
// - "autoTranslate" = "1": không gửi bản tiếng Anh, máy chủ tự dịch từ bản tiếng Việt
// Slug và thứ tự do máy chủ tự đặt: bài mới lên đầu danh sách; khi sửa giữ nguyên để link cũ không hỏng.
async function save(req: Request, id: ObjectId | null): Promise<[number, object]> {
  const body = (req.body ?? {}) as Body;
  const vi = langFields(body, "vi");
  if (typeof vi === "string") return [400, { error: vi }];
  let en;
  if (body.autoTranslate === "1") {
    try {
      const [title, tag, summary, ...paras] = await translateTexts([vi.title, vi.tag, vi.summary, ...vi.body]);
      en = { title, tag, summary, body: paras };
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
  if (!id && !file) return [400, { error: "Bài mới cần có ảnh bìa." }];

  const col = news();
  const existing = id ? await col.findOne({ _id: id }) : null;
  if (id && !existing) return [404, notFound];
  const first = existing ? null : await col.findOne({}, { sort: { order: 1 }, projection: { order: 1 } });

  const keepIds = [body.galleryKeep ?? []].flat().map(String);
  const oldGallery = existing?.gallery ?? [];
  const kept = keepIds.map((pid) => oldGallery.find((g) => g.publicId === pid)).filter((g) => !!g);
  const removed = oldGallery.filter((g) => !keepIds.includes(g.publicId));
  if (kept.length + newGallery.length > MAX_GALLERY) return [400, { error: `Tối đa ${MAX_GALLERY} ảnh phụ mỗi bài.` }];

  const [uploaded, ...added] = await Promise.all([
    file ? uploadImage(file.buffer) : null,
    ...newGallery.map((f) => uploadImage(f.buffer)),
  ]);
  // Ảnh mới căn giữa; giữ ảnh cũ thì giữ luôn vị trí cắt sẵn có (các bài nhập từ dữ liệu cũ)
  const image = uploaded ? { ...uploaded, position: null } : existing!.image;
  const gallery = [
    ...kept,
    ...(added as { url: string; publicId: string }[]).map((g, i) => ({ ...g, alt: altFromName(newGallery[i].originalname) })),
  ];
  // Ảnh bìa mới: mô tả lấy theo tên file (không có thì dùng tiêu đề); giữ ảnh cũ thì giữ mô tả cũ
  const coverAlt = file ? altFromName(file.originalname) : "";
  const withAlt = (f: Omit<NewsLangFields, "imageAlt">, lang: Lang): NewsLangFields => ({
    ...f,
    imageAlt: coverAlt || existing?.[lang].imageAlt || f.title,
  });
  const fields = {
    slug: existing ? existing.slug : await uniqueSlug(vi.title),
    slugEn: existing?.slugEn ?? (await uniqueSlug(en.title)),
    published: body.published === "on" || body.published === "true",
    order: existing ? existing.order : (first?.order ?? 1) - 1,
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

export const adminNews = Router();
adminNews.use(requireAdmin);

adminNews.get("/", async (_req, res) => {
  res.json(await news().find().sort(sorted).toArray());
});

adminNews.get("/:id", async (req, res) => {
  const _id = parseId(req.params.id);
  const doc = _id && (await news().findOne({ _id }));
  if (!doc) return void res.status(404).json(notFound);
  res.json(doc);
});

adminNews.post("/", upload, async (req, res) => {
  const [status, data] = await save(req, null);
  res.status(status).json(data);
});

adminNews.put("/:id", upload, async (req, res) => {
  const _id = parseId(req.params.id);
  if (!_id) return void res.status(404).json(notFound);
  const [status, data] = await save(req, _id);
  res.status(status).json(data);
});

adminNews.patch("/:id/publish", async (req, res) => {
  const _id = parseId(req.params.id);
  const doc = _id && (await news().findOne({ _id }));
  if (!doc) return void res.status(404).json(notFound);
  await news().updateOne({ _id: doc._id }, { $set: { published: !doc.published, updatedAt: new Date() } });
  res.json({ published: !doc.published });
});

adminNews.delete("/:id", async (req, res) => {
  const _id = parseId(req.params.id);
  const doc = _id && (await news().findOneAndDelete({ _id }));
  if (!doc) return void res.status(404).json(notFound);
  await Promise.all([doc.image, ...(doc.gallery ?? [])].map((g) => deleteImage(g.publicId)));
  res.status(204).end();
});

// Bài chưa có slug tiếng Anh (nhập trước khi có tính năng này): sinh từ tiêu đề tiếng Anh
export async function backfillSlugEn() {
  for (const doc of await news().find({ slugEn: { $exists: false } }).toArray()) {
    // Chỉ ghi khi bài vẫn chưa có slugEn: an toàn nếu hai tiến trình khởi động cùng lúc
    await news().updateOne(
      { _id: doc._id, slugEn: { $exists: false } },
      { $set: { slugEn: await uniqueSlug(doc.en.title, doc._id) } },
    );
  }
}
