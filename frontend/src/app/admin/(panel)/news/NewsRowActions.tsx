"use client";

import Link from "next/link";
import { useTransition } from "react";
import { deleteNews, togglePublish } from "../../actions";

export function NewsRowActions({ id, published, title }: { id: string; published: boolean; title: string }) {
  const [pending, start] = useTransition();
  const btn = "border border-rule px-3 py-1.5 text-sm hover:border-bone disabled:opacity-50";

  return (
    <div className="flex justify-end gap-2">
      <Link href={`/admin/news/${id}`} className={btn}>Sửa</Link>
      <button disabled={pending} onClick={() => start(() => togglePublish(id))} className={btn}>
        {published ? "Ẩn" : "Hiện"}
      </button>
      <button
        disabled={pending}
        onClick={() => {
          if (confirm(`Xóa bài "${title}"? Không thể hoàn tác.`)) start(() => deleteNews(id));
        }}
        className={`${btn} text-signal`}
      >
        Xóa
      </button>
    </div>
  );
}
