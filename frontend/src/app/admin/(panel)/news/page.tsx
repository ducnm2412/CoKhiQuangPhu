import Image from "next/image";
import Link from "next/link";
import type { NewsDoc } from "@/lib/api";
import { adminApi } from "@/lib/auth";
import { NewsRowActions } from "./NewsRowActions";

export default async function AdminNewsList() {
  const docs = await adminApi<NewsDoc[]>("/news");

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Tin tức <span className="text-ash">({docs.length})</span></h1>
        <Link href="/admin/news/new" className="bg-signal px-4 py-2 text-sm font-semibold text-white hover:bg-signal-deep">+ Thêm tin</Link>
      </div>

      {docs.length === 0 ? (
        <p className="text-ash">Chưa có bài nào.</p>
      ) : (
        <div className="overflow-x-auto border border-rule bg-night-2">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="border-b border-rule text-left text-ash">
              <tr>
                <th className="w-24 p-3 font-medium">Ảnh</th>
                <th className="p-3 font-medium">Tiêu đề</th>
                <th className="w-28 p-3 font-medium">Trạng thái</th>
                <th className="w-48 p-3 text-right font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {docs.map((d) => (
                <tr key={d._id} className="transition-colors hover:bg-tile/60">
                  <td className="p-3">
                    <div className="relative h-12 w-16 overflow-hidden bg-tile">
                      <Image src={d.image.url} alt="" fill sizes="64px" className="object-cover" />
                    </div>
                  </td>
                  <td className="max-w-0 p-3">
                    <p className="truncate font-medium">{d.vi.title}</p>
                    <p className="truncate text-ash">/{d.slug}{d.slugEn && d.slugEn !== d.slug && <> · EN: /{d.slugEn}</>}</p>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 text-xs ${d.published ? "bg-green-600/15 text-green-600" : "bg-tile text-ash"}`}>
                      {d.published ? "Đang hiện" : "Đang ẩn"}
                    </span>
                  </td>
                  <td className="p-3">
                    <NewsRowActions id={d._id} published={d.published} title={d.vi.title} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
