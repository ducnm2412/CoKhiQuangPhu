import Link from "next/link";
import { notFound } from "next/navigation";
import { ApiError, type NewsDoc } from "@/lib/api";
import { adminApi } from "@/lib/auth";
import { NewsForm } from "../NewsForm";

export default async function EditNewsPage({ params }: PageProps<"/admin/news/[id]">) {
  const { id } = await params;
  const d = await adminApi<NewsDoc>(`/news/${encodeURIComponent(id)}`).catch((e) => {
    if (e instanceof ApiError && e.status === 404) notFound();
    throw e;
  });

  return (
    <>
      <Link href="/admin/news" className="text-sm text-ash hover:text-bone">← Tin tức</Link>
      <h1 className="mt-2 mb-6 text-2xl font-semibold">Sửa tin</h1>
      <NewsForm
        initial={{
          id,
          published: d.published,
          imageUrl: d.image.url,
          gallery: d.gallery ?? [],
          vi: d.vi,
          en: d.en,
        }}
      />
    </>
  );
}
