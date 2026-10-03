import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { SheetHead } from "@/components/SheetHead";
import { getContent } from "@/lib/content";
import { alternatesFor, hasLocale } from "@/lib/i18n";

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
  const t = c.servicesPage;

  return (
    <main>
      <PageHero lang={lang} crumb={c.nav.services} title={t.title} lead={t.lead} />

      <section className="py-16 md:py-24">
        <div className={`${wrap} grid gap-6 md:grid-cols-2`} data-reveal-group="up">
          {c.products.map((p, i) => (
            <ProductCard key={p.id} lang={lang} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Quy trình */}
      <section className="blueprint border-y border-rule bg-night-2 py-16 md:py-24">
        <div className={wrap}>
          <SheetHead lang={lang} sheet="01" topic={t.processTopic}>
            {t.processTitle}
          </SheetHead>
          <ol className="relative grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-6" data-reveal-group="up">
            <span aria-hidden="true" data-reveal="line" className="absolute top-[5px] right-0 left-0 hidden h-px bg-rule lg:block" />
            {c.process.map((step, i) => (
              <li key={step.title} className="relative">
                <span aria-hidden="true" className="block size-[11px] rounded-full bg-signal" />
                <p className="mt-5 text-sm font-semibold uppercase">
                  <span className="font-mono">0{i + 1}</span> · {step.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ash">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Câu hỏi thường gặp */}
      <section className="py-16 md:py-24">
        <div className={`${wrap} grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16`}>
          <SheetHead lang={lang} sheet="02" topic={t.faqTopic}>
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
