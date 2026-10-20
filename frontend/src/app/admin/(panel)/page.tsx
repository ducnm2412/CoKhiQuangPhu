import Image from "next/image";
import Link from "next/link";
import type { NewsDoc } from "@/lib/api";
import { adminApi } from "@/lib/auth";

const dateFmt = new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeStyle: "short", timeZone: "Asia/Ho_Chi_Minh" });

export default async function AdminDashboard() {
  const docs = await adminApi<NewsDoc[]>("/news");
  const published = docs.filter((d) => d.published).length;
  const recent = [...docs].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5);

  const stats = [
    { label: "Tổng số tin", value: docs.length },
    { label: "Đang hiển thị", value: published },
    { label: "Đang ẩn", value: docs.length - published },
  ];

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Tổng quan</h1>
        <Link href="/admin/news/new" className="bg-signal px-4 py-2 text-sm font-semibold text-white hover:bg-signal-deep">+ Thêm tin</Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="border border-rule bg-night-2 p-5">
            <p className="text-sm text-ash">{s.label}</p>
            <p className="mt-2 text-3xl font-semibold tabular-nums">{s.value}</p>
          </div>
        ))}
      </div>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Cập nhật gần đây</h2>
          <Link href="/admin/news" className="text-sm text-ash hover:text-bone">Xem tất cả →</Link>
        </div>
        {recent.length === 0 ? (
          <p className="text-ash">Chưa có bài nào.</p>
        ) : (
          <ul className="divide-y divide-rule border border-rule bg-night-2">
            {recent.map((d) => (
              <li key={d._id}>
                <Link href={`/admin/news/${d._id}`} className="flex items-center gap-4 p-3 transition-colors hover:bg-tile">
                  <div className="relative h-12 w-16 shrink-0 overflow-hidden bg-tile">
                    <Image src={d.image.url} alt="" fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{d.vi.title}</p>
                    <p className="text-sm text-ash">Sửa lúc {dateFmt.format(new Date(d.updatedAt))}</p>
                  </div>
                  <span className={`shrink-0 px-2 py-0.5 text-xs ${d.published ? "bg-green-600/15 text-green-600" : "bg-tile text-ash"}`}>
                    {d.published ? "Hiện" : "Ẩn"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
