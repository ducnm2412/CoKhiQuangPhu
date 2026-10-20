"use client";

import { startTransition, useActionState, useRef, useState } from "react";
import { saveNews, translateTexts, type FormState } from "../../actions";
import { compressImage } from "./compressImage";
import type { NewsItem } from "@/lib/content";
import { NewsPreview, saveDraft, type PreviewData } from "./NewsPreview";

type LangValues = { tag: string; title: string; summary: string; body: string[]; imageAlt?: string };
export type NewsFormValues = {
  id: string | null;
  published: boolean;
  imageUrl: string | null;
  gallery: { url: string; publicId: string }[];
  vi: LangValues;
  en: LangValues;
};

const emptyLang: LangValues = { tag: "", title: "", summary: "", body: [] };
export const emptyNews: NewsFormValues = {
  id: null, published: true, imageUrl: null, gallery: [], vi: emptyLang, en: emptyLang,
};

const MAX_GALLERY = 20; // khớp giới hạn của backend

// Ảnh phụ trong form: ảnh đã lưu (có publicId) hoặc ảnh mới chọn (có file, chưa upload)
type GalleryItem = { key: string; url: string; publicId?: string; file?: File };

const input = "mt-1 block w-full border border-rule bg-night px-3 py-2 outline-none focus:border-signal";
const LANGS = [
  { key: "vi", label: "Tiếng Việt" },
  { key: "en", label: "English" },
] as const;

export function NewsForm({ initial }: { initial: NewsFormValues }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveNews.bind(null, initial.id), {});
  const [tab, setTab] = useState<"vi" | "en">("vi");
  const [preview, setPreview] = useState(initial.imageUrl);
  const [gallery, setGallery] = useState<GalleryItem[]>(() =>
    initial.gallery.map((g) => ({ key: g.publicId, url: g.url, publicId: g.publicId })),
  );

  const addGallery = (files: FileList | null) => {
    if (!files) return;
    const picked = [...files].slice(0, MAX_GALLERY - gallery.length);
    setGallery((g) => [...g, ...picked.map((file) => ({ key: crypto.randomUUID(), url: URL.createObjectURL(file), file }))]);
  };
  const removeGallery = (key: string) => setGallery((g) => g.filter((item) => item.key !== key));

  // Nén ảnh bìa và ảnh phụ mới rồi mới gửi sang server action.
  // Dùng onSubmit (không dùng form action) để màn hình chờ hiện ngay khi bấm, kể cả lúc đang nén ảnh;
  // sau khi nén xong, action phải chạy trong startTransition thì `pending` mới cập nhật.
  // `compressing` phủ khoảng nén ảnh; sau đó `pending` của action tiếp quản.
  const [compressing, setCompressing] = useState(false);
  const busy = compressing || pending;
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return; // chặn bấm Lưu lần nữa khi đang lưu
    const form = new FormData(e.currentTarget);
    setCompressing(true);
    try {
      const cover = form.get("image");
      if (cover instanceof File && cover.size > 0) form.set("image", await compressImage(cover));
      for (const item of gallery) if (item.file) form.append("gallery", await compressImage(item.file));
      startTransition(() => action(form));
    } finally {
      setCompressing(false);
    }
  };

  // Xem trước: đọc giá trị đang nhập (chưa lưu) của tab ngôn ngữ đang mở
  const formRef = useRef<HTMLFormElement>(null);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const openPreview = () => {
    const form = new FormData(formRef.current!);
    const get = (k: string) => String(form.get(`${tab}.${k}`) ?? "").trim();
    const title = get("title") || (tab === "vi" ? "(Chưa có tiêu đề)" : "(No title)");
    const item: NewsItem = {
      slug: "xem-truoc",
      tag: get("tag"),
      title,
      summary: get("summary"),
      body: get("body").split(/\r?\n\s*\r?\n/).map((p) => p.trim()).filter(Boolean),
      // Chưa chọn ảnh bìa: ô ảnh trống (GIF trong suốt 1px) để vẫn thấy bố cục
      image: { src: preview ?? "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", alt: title },
      gallery: gallery.map((g, i) => ({ src: g.url, alt: `${title} (${i + 2})` })),
    };
    saveDraft(item);
    setPreviewData({ lang: tab, item });
  };

  // Bản tiếng Anh: chỉ hiện sau khi bấm "Dịch sang tiếng Anh" (hoặc bài đã có sẵn bản Anh).
  // Chưa hiện mà bấm Lưu → gửi autoTranslate=1, backend tự dịch từ bản tiếng Việt.
  const [en, setEn] = useState<LangValues | null>(initial.en.title ? initial.en : null);
  const [enVersion, setEnVersion] = useState(0); // đổi key để ô nhập nhận lại giá trị mới sau khi dịch
  const [translating, setTranslating] = useState(false);
  const [translateError, setTranslateError] = useState("");
  const field = (name: string) => formRef.current!.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement;
  const translateToEn = async () => {
    const keys = ["title", "tag", "summary"] as const;
    const head = keys.map((k) => field(`vi.${k}`).value.trim());
    const paras = field("vi.body").value.split(/\r?\n\s*\r?\n/).map((p) => p.trim()).filter(Boolean);
    if (!head[0] && !paras.length) return setTranslateError("Hãy nhập nội dung tiếng Việt trước.");
    if (en && !confirm("Ghi đè bản tiếng Anh hiện tại bằng bản dịch mới?")) return;

    setTranslating(true);
    setTranslateError("");
    const res = await translateTexts([...head, ...paras]).catch(() => ({ error: "Không dịch được, thử lại sau." }) as const);
    setTranslating(false);
    if (!("texts" in res) || !res.texts) return setTranslateError(res.error ?? "Không dịch được.");

    const [title, tag, summary, ...body] = res.texts;
    setEn({ title, tag, summary, body });
    setEnVersion((n) => n + 1);
    setTab("en");
  };

  const submit = (
    <div className="space-y-3">
      {state.error && <p className="text-sm text-signal">{state.error}</p>}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={openPreview}
          className="border border-rule px-5 py-2.5 font-semibold transition-colors hover:border-bone/50"
        >
          Xem trước
        </button>
        <button disabled={busy} className="bg-signal px-5 py-2.5 font-semibold text-white hover:bg-signal-deep disabled:opacity-60">
          {busy ? "Đang lưu…" : "Lưu"}
        </button>
      </div>
    </div>
  );

  return (
    <form ref={formRef} onSubmit={submitForm} className="grid items-start gap-8 lg:grid-cols-2">
      {previewData && <NewsPreview data={previewData} onClose={() => setPreviewData(null)} />}

      {/* Màn hình chờ khi đang lưu: phủ toàn trang, chặn mọi thao tác để không bấm Lưu nhiều lần */}
      {busy && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-50 grid cursor-wait place-items-center bg-night/80 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="size-10 animate-spin rounded-full border-4 border-rule border-t-signal" aria-hidden="true" />
            <p className="text-sm">{compressing ? "Đang xử lý ảnh…" : "Đang lưu bài viết…"}</p>
          </div>
        </div>
      )}
      {/* Cột trái: ảnh và thiết lập */}
      <div className="space-y-5">
        <label className="group block cursor-pointer">
          <span className="mb-1 block text-sm">Ảnh bìa {initial.id && <span className="text-ash">(để trống nếu giữ ảnh cũ)</span>}</span>
          <span className="relative block aspect-[3/2] overflow-hidden border border-dashed border-rule bg-tile transition-colors group-hover:border-bone/50">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element -- xem trước cả ảnh cục bộ (blob:) chưa upload
              <img src={preview} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="grid h-full place-items-center text-sm text-ash">Bấm để chọn ảnh</span>
            )}
          </span>
          <input
            name="image"
            type="file"
            accept="image/*"
            required={!initial.id}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setPreview(URL.createObjectURL(f));
            }}
            className="mt-2 block w-full text-sm text-ash file:mr-3 file:border file:border-rule file:bg-night-2 file:px-3 file:py-1.5 file:text-bone"
          />
        </label>

        <div>
          <p className="mb-1 text-sm">
            Ảnh phụ <span className="text-ash">{gallery.length}/{MAX_GALLERY}</span>
          </p>
          <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {gallery.map((item) => (
              <li key={item.key} className="relative aspect-[4/3] overflow-hidden bg-tile">
                {/* eslint-disable-next-line @next/next/no-img-element -- xem trước cả ảnh cục bộ (blob:) chưa upload */}
                <img src={item.url} alt="" className="h-full w-full object-cover" />
                {item.publicId && <input type="hidden" name="galleryKeep" value={item.publicId} />}
                {item.file && <span className="absolute bottom-1 left-1 bg-signal px-1.5 text-[11px] text-white">Mới</span>}
                <button
                  type="button"
                  onClick={() => removeGallery(item.key)}
                  aria-label="Bỏ ảnh này"
                  className="absolute top-1 right-1 grid size-6 place-items-center bg-black/70 text-sm text-white hover:bg-signal"
                >
                  ✕
                </button>
              </li>
            ))}
            {gallery.length < MAX_GALLERY && (
              <li>
                <label className="grid aspect-[4/3] cursor-pointer place-items-center border border-dashed border-rule bg-tile text-center text-xs text-ash transition-colors hover:border-bone/50 hover:text-bone">
                  <span>
                    <span className="block text-2xl leading-none">+</span>
                    Thêm ảnh
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                    onChange={(e) => {
                      addGallery(e.target.files);
                      e.target.value = ""; // cho phép chọn lại cùng file
                    }}
                  />
                </label>
              </li>
            )}
          </ul>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input name="published" type="checkbox" defaultChecked={initial.published} />
          Hiển thị trên trang
        </label>

        <div className="hidden lg:block">{submit}</div>
      </div>

      {/* Cột phải: nội dung hai ngôn ngữ */}
      <div>
        <div role="tablist" className="flex flex-wrap items-center border-b border-rule">
          {LANGS.filter((l) => l.key === "vi" || en).map((l) => (
            <button
              key={l.key}
              type="button"
              role="tab"
              aria-selected={tab === l.key}
              onClick={() => setTab(l.key)}
              className={`px-4 py-2 text-sm ${tab === l.key ? "border-b-2 border-signal font-semibold" : "text-ash"}`}
            >
              {l.label}
            </button>
          ))}
          <button
            type="button"
            onClick={translateToEn}
            disabled={translating}
            className="ml-2 px-3 py-2 text-sm text-ash transition-colors hover:text-bone disabled:opacity-60"
          >
            {translating ? "Đang dịch…" : en ? "↻ Dịch lại sang tiếng Anh" : "Dịch sang tiếng Anh →"}
          </button>
        </div>
        {translateError && <p className="pt-2 text-sm text-signal">{translateError}</p>}
        {!en && <input type="hidden" name="autoTranslate" value="1" />}

        {/* Các tab đang có luôn nằm trong form (chỉ ẩn đi) để gửi đủ dữ liệu */}
        {LANGS.map(({ key }) => {
          const v = key === "vi" ? initial.vi : en;
          if (!v) return null;
          return (
            <div key={`${key}-${key === "en" ? enVersion : 0}`} hidden={tab !== key} className="space-y-4 pt-4">
              <label className="block text-sm">
                Tiêu đề
                <input name={`${key}.title`} defaultValue={v.title} className={input} />
              </label>
              <label className="block text-sm">
                Nhãn chủ đề
                <input name={`${key}.tag`} defaultValue={v.tag} placeholder="Năng lực, Dự án…" className={input} />
              </label>
              <label className="block text-sm">
                Tóm tắt
                <textarea name={`${key}.summary`} defaultValue={v.summary} rows={2} className={input} />
              </label>
              <label className="block text-sm">
                Nội dung
                <textarea name={`${key}.body`} defaultValue={v.body.join("\n\n")} rows={10} className={input} />
              </label>
            </div>
          );
        })}

        {/* Màn hình nhỏ: hai cột xếp chồng, nút Lưu nằm cuối form */}
        <div className="mt-6 lg:hidden">{submit}</div>
      </div>
    </form>
  );
}
