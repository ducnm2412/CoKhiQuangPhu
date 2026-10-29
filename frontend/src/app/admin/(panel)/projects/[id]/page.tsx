import Link from "next/link";
import { notFound } from "next/navigation";
import { ApiError, type ProjectDoc } from "@/lib/api";
import { adminApi } from "@/lib/auth";
import { getContent } from "@/lib/content";
import { ProjectForm } from "../ProjectForm";

export default async function EditProjectPage({ params }: PageProps<"/admin/projects/[id]">) {
  const { id } = await params;
  const d = await adminApi<ProjectDoc>(`/projects/${encodeURIComponent(id)}`).catch((e) => {
    if (e instanceof ApiError && e.status === 404) notFound();
    throw e;
  });

  return (
    <>
      <Link href="/admin/projects" className="text-sm text-ash hover:text-bone">← Dự án</Link>
      <h1 className="mt-2 mb-6 text-2xl font-semibold">Sửa dự án</h1>
      <ProjectForm
        categories={getContent("vi").projectCategories}
        initial={{
          id,
          published: d.published,
          category: d.category,
          year: d.year,
          imageUrl: d.image.url,
          gallery: d.gallery.map((g) => g.url),
          vi: d.vi,
          en: d.en,
        }}
      />
    </>
  );
}
