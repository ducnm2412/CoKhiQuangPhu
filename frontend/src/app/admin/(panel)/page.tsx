import Image from "next/image";
import Link from "next/link";
import type { NewsDoc, ProjectDoc } from "@/lib/api";
import { adminApi } from "@/lib/auth";

const dateFmt = new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeStyle: "short", timeZone: "Asia/Ho_Chi_Minh" });

type Row = { _id: string; published: boolean; updatedAt: string; image: { url: string }; vi: { title: string } };

export default async function AdminDashboard() {
  const [news, projects] = await Promise.all([adminApi<NewsDoc[]>("/news"), adminApi<ProjectDoc[]>("/projects")]);

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Tổng quan</h1>
        <div className="flex gap-2">
          <Link href="/admin/projects/new" className="border border-rule px-4 py-2 text-sm font-semibold hover:border-bone/50">+ Thêm dự án</Link>
          <Link href="/admin/news/new" className="bg-signal px-4 py-2 text-sm font-semibold text-white hover:bg-signal-deep">+ Thêm tin</Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Stats title="Tin tức" docs={news} />
        <Stats title="Dự án" docs={projects} />
      </div>

      <div className="mt-10 grid gap-10 xl:grid-cols-2">
        <Recent title="Tin cập nhật gần đây" base="/admin/news" docs={news} empty="Chưa có bài nào." />
        <Recent title="Dự án cập nhật gần đây" base="/admin/projects" docs={projects} empty="Chưa có dự án nào." />
      </div>
    </>
  );
}

function Stats({ title, docs }: { title: string; docs: Row[] }) {
  const published = docs.filter((d) => d.published).length;
  const stats = [
    { label: "Tổng số", value: docs.length },
    { label: "Đang hiển thị", value: published },
    { label: "Đang ẩn", value: docs.length - published },
  ];
  return (
    <div className="border border-rule bg-night-2 p-5">
      <p className="font-semibold">{title}</p>
      <div className="mt-3 grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-sm text-ash">{s.label}</p>
            <p className="mt-1 text-3xl font-semibold tabular-nums">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Recent({ title, base, docs, empty }: { title: string; base: string; docs: Row[]; empty: string }) {
  const recent = [...docs].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5);
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Link href={base} className="text-sm text-ash hover:text-bone">Xem tất cả →</Link>
      </div>
      {recent.length === 0 ? (
        <p className="text-ash">{empty}</p>
      ) : (
        <ul className="divide-y divide-rule border border-rule bg-night-2">
          {recent.map((d) => (
            <li key={d._id}>
              <Link href={`${base}/${d._id}`} className="flex items-center gap-4 p-3 transition-colors hover:bg-tile">
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
  );
}
