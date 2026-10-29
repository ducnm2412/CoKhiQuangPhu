"use client";

import { startTransition, useActionState, useRef, useState } from "react";
import { saveProject, translateTexts, type FormState } from "../../actions";
import { compressImage } from "../news/compressImage";

type LangValues = { title: string; place: string; summary: string; body: string; highlights: string[] };
export type ProjectFormValues = {
  id: string | null;
  published: boolean;
  category: number;
  year: string;
  imageUrl: string | null;
  gallery: string[]; // URL ảnh phụ đã lưu
  vi: LangValues;
  en: LangValues;
};

const emptyLang: LangValues = { title: "", place: "", summary: "", body: "", highlights: [] };
export const emptyProject: ProjectFormValues = {
  id: null, published: true, category: 0, year: String(new Date().getFullYear()), imageUrl: null, gallery: [], vi: emptyLang, en: emptyLang,
};

const MAX_GALLERY = 20; // khớp giới hạn của backend

// Ảnh phụ trong form: ảnh đã lưu (keep = URL gửi lại cho backend) hoặc ảnh mới chọn (có file, chưa upload)
type GalleryItem = { key: string; url: string; keep?: string; file?: File };

const input = "mt-1 block w-full border border-rule bg-night px-3 py-2 outline-none focus:border-signal";
const LANGS = [
  { key: "vi", label: "Tiếng Việt" },
  { key: "en", label: "English" },
] as const;

// categories: tên hạng mục (projectCategories tiếng Việt), truyền từ trang server để không đưa cả content.ts xuống trình duyệt
export function ProjectForm({ initial, categories }: { initial: ProjectFormValues; categories: string[] }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveProject.bind(null, initial.id), {});
  const [tab, setTab] = useState<"vi" | "en">("vi");
  const [preview, setPreview] = useState(initial.imageUrl);
  const [gallery, setGallery] = useState<GalleryItem[]>(() => initial.gallery.map((url) => ({ key: url, url, keep: url })));

  const addGallery = (files: FileList | null) => {
    if (!files) return;
    const picked = [...files].slice(0, MAX_GALLERY - gallery.length);
    setGallery((g) => [...g, ...picked.map((file) => ({ key: crypto.randomUUID(), url: URL.createObjectURL(file), file }))]);
  };
  const removeGallery = (key: string) => setGallery((g) => g.filter((item) => item.key !== key));

  // Nén ảnh rồi mới gửi sang server action (giống form tin tức)
  const [compressing, setCompressing] = useState(false);
  const busy = compressing || pending;
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
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

  // Bản tiếng Anh: chỉ hiện sau khi bấm "Dịch sang tiếng Anh" (hoặc dự án đã có sẵn bản Anh).
  // Chưa hiện mà bấm Lưu → gửi autoTranslate=1, backend tự dịch từ bản tiếng Việt.
  const formRef = useRef<HTMLFormElement>(null);
  const [en, setEn] = useState<LangValues | null>(initial.en.title ? initial.en : null);
  const [enVersion, setEnVersion] = useState(0);
  const [translating, setTranslating] = useState(false);
  const [translateError, setTranslateError] = useState("");
  const field = (name: string) => formRef.current!.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement;
  const translateToEn = async () => {
    const head = (["title", "place", "summary", "body"] as const).map((k) => field(`vi.${k}`).value.trim());
    const highlights = field("vi.highlights").value.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (!head[0] && !head[3]) return setTranslateError("Hãy nhập nội dung tiếng Việt trước.");
    if (en && !confirm("Ghi đè bản tiếng Anh hiện tại bằng bản dịch mới?")) return;

    setTranslating(true);
    setTranslateError("");
    const res = await translateTexts([...head, ...highlights]).catch(() => ({ error: "Không dịch được, thử lại sau." }) as const);
    setTranslating(false);
    if (!("texts" in res) || !res.texts) return setTranslateError(res.error ?? "Không dịch được.");

    const [title, place, summary, body, ...hl] = res.texts;
    setEn({ title, place, summary, body, highlights: hl });
    setEnVersion((n) => n + 1);
    setTab("en");
  };

  const submit = (
    <div className="space-y-3">
      {state.error && <p className="text-sm text-signal">{state.error}</p>}
      <button disabled={busy} className="w-full bg-signal px-5 py-2.5 font-semibold text-white hover:bg-signal-deep disabled:opacity-60">
        {busy ? "Đang lưu…" : "Lưu"}
      </button>
    </div>
  );

  return (
    <form ref={formRef} onSubmit={submitForm} className="grid items-start gap-8 lg:grid-cols-2">
      {busy && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-50 grid cursor-wait place-items-center bg-night/80 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="size-10 animate-spin rounded-full border-4 border-rule border-t-signal" aria-hidden="true" />
            <p className="text-sm">{compressing ? "Đang xử lý ảnh…" : "Đang lưu dự án…"}</p>
          </div>
        </div>
      )}
      {/* Cột trái: ảnh và thiết lập */}
      <div className="space-y-5">
        <label className="group block cursor-pointer">
          <span className="mb-1 block text-sm">Ảnh chính {initial.id && <span className="text-ash">(để trống nếu giữ ảnh cũ)</span>}</span>
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
                {item.keep && <input type="hidden" name="galleryKeep" value={item.keep} />}
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
                      e.target.value = "";
                    }}
                  />
                </label>
              </li>
            )}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="block text-sm">
            Hạng mục
            <select name="category" defaultValue={initial.category} className={input}>
              {categories.map((c, i) => (
                <option key={c} value={i}>{c}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            Năm
            <input name="year" defaultValue={initial.year} placeholder="2025" className={input} />
          </label>
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

        {LANGS.map(({ key }) => {
          const v = key === "vi" ? initial.vi : en;
          if (!v) return null;
          return (
            <div key={`${key}-${key === "en" ? enVersion : 0}`} hidden={tab !== key} className="space-y-4 pt-4">
              <label className="block text-sm">
                Tên dự án
                <input name={`${key}.title`} defaultValue={v.title} className={input} />
              </label>
              <label className="block text-sm">
                Địa điểm
                <input name={`${key}.place`} defaultValue={v.place} placeholder="Hà Nội" className={input} />
              </label>
              <label className="block text-sm">
                Tóm tắt <span className="text-ash">(1–2 dòng, hiện ở thẻ dự án)</span>
                <textarea name={`${key}.summary`} defaultValue={v.summary} rows={2} className={input} />
              </label>
              <label className="block text-sm">
                Mô tả
                <textarea name={`${key}.body`} defaultValue={v.body} rows={6} className={input} />
              </label>
              <label className="block text-sm">
                Điểm nổi bật <span className="text-ash">(mỗi dòng một ý, có thể để trống)</span>
                <textarea
                  name={`${key}.highlights`}
                  defaultValue={v.highlights.join("\n")}
                  rows={6}
                  placeholder={
                    key === "vi"
                      ? "Ví dụ:\nChế tác từ đồng đúc nguyên khối, phủ ánh kim vàng.\nChân đế đen gắn biển chữ nổi viền vàng.\nKhung bảo vệ bằng kính acrylic trong suốt."
                      : "Example:\nSolid cast bronze with a gold metallic finish.\nBlack base with a raised gold-rimmed plaque.\nClear acrylic display case."
                  }
                  className={`${input} placeholder:text-ash/60`}
                />
              </label>
            </div>
          );
        })}

        <div className="mt-6 lg:hidden">{submit}</div>
      </div>
    </form>
  );
}
