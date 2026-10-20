"use client";

import { useEffect, useRef } from "react";
import type { NewsItem } from "@/lib/content";
import { localePath } from "@/lib/i18n";

export type PreviewData = { lang: "vi" | "en"; item: NewsItem };

// Phải trùng DRAFT_KEY trong src/app/[lang]/xem-truoc-tin/DraftArticle.tsx
const DRAFT_KEY = "news-preview";

// Ghi bản nháp trước khi mở xem trước (iframe cùng origin, cùng tab nên đọc được sessionStorage;
// ảnh mới chọn là URL blob: vẫn hiển thị được trong iframe)
export function saveDraft(item: NewsItem) {
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(item));
  } catch {}
}

// Xem trước bài đang soạn (chưa lưu): nhúng trang /[lang]/xem-truoc-tin của site vào iframe,
// nên giao diện giống hệt trang chi tiết tin thật (header, font, bộ ảnh, footer).
export function NewsPreview({ data, onClose }: { data: PreviewData; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const label = data.lang === "vi" ? "Tiếng Việt" : "English";

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && dialog.current.close()}
      className="m-auto h-[94vh] w-[min(1400px,96vw)] max-w-none overflow-hidden border border-rule bg-night p-0 text-bone backdrop:bg-black/70"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-rule bg-night-2 px-4 py-3">
          <p className="text-sm">
            Xem trước <span className="text-ash">· {label} · chưa lưu</span>
          </p>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="border border-rule px-3 py-1.5 text-sm hover:border-bone/50"
          >
            Đóng
          </button>
        </div>
        <iframe src={localePath(data.lang, "/xem-truoc-tin")} title="Xem trước bài viết" className="w-full flex-1 border-0" />
      </div>
    </dialog>
  );
}
