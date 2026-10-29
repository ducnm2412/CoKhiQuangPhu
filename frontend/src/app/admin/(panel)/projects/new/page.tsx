import Link from "next/link";
import { getContent } from "@/lib/content";
import { ProjectForm, emptyProject } from "../ProjectForm";

export default function NewProjectPage() {
  return (
    <>
      <Link href="/admin/projects" className="text-sm text-ash hover:text-bone">← Dự án</Link>
      <h1 className="mt-2 mb-6 text-2xl font-semibold">Thêm dự án</h1>
      <ProjectForm initial={emptyProject} categories={getContent("vi").projectCategories} />
    </>
  );
}
