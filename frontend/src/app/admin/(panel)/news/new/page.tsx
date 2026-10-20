import Link from "next/link";
import { NewsForm, emptyNews } from "../NewsForm";

export default function NewNewsPage() {
  return (
    <>
      <Link href="/admin/news" className="text-sm text-ash hover:text-bone">← Tin tức</Link>
      <h1 className="mt-2 mb-6 text-2xl font-semibold">Thêm tin</h1>
      <NewsForm initial={emptyNews} />
    </>
  );
}
