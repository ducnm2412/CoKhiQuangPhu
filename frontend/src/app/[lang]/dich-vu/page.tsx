import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProcessSection } from "@/components/ProcessSection";
import { SheetHead } from "@/components/SheetHead";
import { Photo } from "@/components/ui";
import { getContent } from "@/lib/content";
import { alternatesFor, hasLocale, localePath, routes } from "@/lib/i18n";
import { getProjects } from "@/lib/projects";

const wrap = "mx-auto max-w-[1200px] px-5 md:px-8";

export async function generateMetadata({ params }: PageProps<"/[lang]/dich-vu">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getContent(lang).servicesPage;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: alternatesFor(lang, "/dich-vu"),
  };
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/dich-vu">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getContent(lang);
  const projects = await getProjects(lang);
  const t = c.servicesPage;

  return (
    <main>
      <h1 className="sr-only">{t.title}</h1>

      <section className="py-16 md:py-24">
        <div className={`${wrap} grid gap-5 sm:grid-cols-2 lg:grid-cols-4`} data-reveal-group="up">
          {/* Thẻ dọc: ảnh tràn thẻ, số thứ tự ở trên, tên đè lên nền tối ở dưới; rê chuột ảnh phóng và hiện mũi tên */}
          {c.products.map((p, i) => (
            <Link
              key={p.id}
              href={localePath(lang, `${routes.services}/${p.id}`)}
              className="group relative block aspect-[3/4] overflow-hidden bg-night-2"
            >
              {p.images[0] && (
                <div className="absolute inset-0">
                  <Photo
                    image={p.images[0]}
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                    className="h-full transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent via-45% to-transparent" />
              <span className="absolute top-5 left-5 font-mono text-sm text-white drop-shadow">0{i + 1}</span>
              <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
                <span className="mb-4 block h-0.5 w-10 bg-signal transition-all duration-500 group-hover:w-20" />
                <h2 className="display text-2xl leading-tight md:text-[1.7rem]">{p.name}</h2>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-signal opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  {t.viewDetail} <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ProcessSection lang={lang} />

      {/* Sản phẩm đã chế tác: lưới ảnh dự án, cứ 6 ảnh thì ảnh đầu to gấp đôi; rê chuột hiện thông tin, bấm mở dự án */}
      {projects.length > 0 && (
        <section className="py-16 md:py-24">
          <div className={wrap}>
            <SheetHead topic={t.galleryTopic}>{t.galleryTitle}</SheetHead>
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4" data-reveal-group="up">
              {projects.slice(0, 6).map((pr, i) => (
                <li key={pr.slug} className={i % 6 === 0 ? "col-span-2 row-span-2" : ""}>
                  <Link
                    href={localePath(lang, `${routes.projects}/${pr.slug}`)}
                    className="group relative block h-full overflow-hidden"
                  >
                    <Photo
                      image={pr.image}
                      sizes={i % 6 === 0 ? "(min-width: 768px) 760px, 100vw" : "(min-width: 768px) 380px, 50vw"}
                      className="aspect-[3/2] h-full transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 md:p-6">
                      <p className="text-xs text-white/70">
                        <span className="text-signal">{c.projectCategories[pr.category]}</span>
                        {pr.year && <> · {pr.year}</>}
                        {pr.place && <> · {pr.place}</>}
                      </p>
                      <h3 className={`mt-1.5 leading-snug font-semibold uppercase ${i % 6 === 0 ? "text-lg md:text-2xl" : "text-sm md:text-base"}`}>
                        {pr.title}
                      </h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-12 flex justify-center">
              <Link
                href={localePath(lang, routes.projects)}
                className="border border-bone/60 px-6 py-3 text-sm font-semibold transition-colors hover:bg-bone hover:text-night"
              >
                {c.homeProjects.all}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Câu hỏi thường gặp */}
      <section className="py-16 md:py-24">
        <div className={`${wrap} grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16`}>
          <SheetHead topic={t.faqTopic}>
            {t.faqTitle}
          </SheetHead>
          <div className="border-t border-rule" data-reveal-group="up">
            {c.faqs.map((f) => (
              <details key={f.q} className="group border-b border-rule">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="grid size-7 shrink-0 place-items-center border border-rule text-ash transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-[62ch] pb-6 leading-relaxed text-ash">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
