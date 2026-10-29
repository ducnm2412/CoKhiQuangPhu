"use client";

import Link from "next/link";
import { useTransition } from "react";
import { deleteProject, toggleProjectPublish } from "../../actions";

export function ProjectRowActions({ id, published, title }: { id: string; published: boolean; title: string }) {
  const [pending, start] = useTransition();
  const btn = "border border-rule px-3 py-1.5 text-sm hover:border-bone disabled:opacity-50";

  return (
    <div className="flex justify-end gap-2">
      <Link href={`/admin/projects/${id}`} className={btn}>Sửa</Link>
      <button disabled={pending} onClick={() => start(() => toggleProjectPublish(id))} className={btn}>
        {published ? "Ẩn" : "Hiện"}
      </button>
      <button
        disabled={pending}
        onClick={() => {
          if (confirm(`Xóa dự án "${title}"? Không thể hoàn tác.`)) start(() => deleteProject(id));
        }}
        className={`${btn} text-signal`}
      >
        Xóa
      </button>
    </div>
  );
}
