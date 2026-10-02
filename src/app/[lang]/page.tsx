import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/ContactSection";
import { CountUp } from "@/components/CountUp";
import { BirdsAroundPhoto } from "@/components/FlyingBirds";
import { Gallery } from "@/components/Gallery";
import { HeroDrawing } from "@/components/HeroDrawing";
import { PartnerLogos } from "@/components/PartnerLogos";
import { ProjectGrid } from "@/components/ProjectGrid";
import { SheetHead } from "@/components/SheetHead";
import { Photo } from "@/components/ui";
import { getContent } from "@/lib/content";
import { hasLocale, localePath, routes } from "@/lib/i18n";

const wrap = "mx-auto max-w-[1200px] px-5 md:px-8";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getContent(lang);
  const lp = (p: string) => localePath(lang, p);

  return (
    <main>
      {/* Hero */}
      <section className="blueprint border-b border-rule/60">
        <div className={`${wrap} pt-12 pb-10 md:pt-16`}>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)]">
            <div>
              <h1 className="display">
                <span className="block text-4xl font-semibold text-ash md:text-6xl">{t.hero.weAre}</span>
                <span className="mt-2 block text-[4.1rem] leading-[0.92] whitespace-nowrap sm:text-[7rem] lg:text-[7.4rem] xl:text-[8.6rem]">
                  Quảng Phú<span className="text-signal">.</span>
                </span>
              </h1>
              <p className="mt-6 flex max-w-[40ch] gap-4 text-lg leading-snug font-medium md:text-[1.4rem]">
                <span aria-hidden="true" className="mt-[0.7em] h-px w-10 shrink-0 bg-signal" />
                {t.hero.tagline}
              </p>
            </div>
            <HeroDrawing label={t.hero.drawingLabel} title={t.hero.drawingTitle} />
          </div>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-8 md:mt-12">
            <dl className="flex flex-wrap gap-x-14 gap-y-6">
              {t.stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="mt-1.5 text-sm text-ash">{s.label}</dt>
                  <dd className="display text-5xl md:text-6xl">
                    <CountUp value={s.value} />
                  </dd>
                </div>
              ))}
            </dl>
            <a href="#ve-chung-toi" className="label hidden items-center gap-3 text-ash transition-colors hover:text-bone sm:flex">
              {t.hero.scroll}
              <svg width="12" height="16" viewBox="0 0 12 16" aria-hidden="true">
                <path d="M6 0v14M1 9l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Về chúng tôi */}
      <section id="ve-chung-toi" className="relative overflow-hidden py-16 md:py-24">
        {/* Mặt trống đồng lớn xoay chậm phía sau, tràn khỏi mép phải */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 -right-[45%] aspect-square w-[150vw] -translate-y-1/2 md:-right-[14%] md:w-[min(1050px,78vw)]"
        >
          <div className="drum h-full w-full" />
        </div>
        <div className={`${wrap} relative grid items-center gap-10 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:gap-16`}>
          {/* Chim Lạc bay vòng quanh ảnh; lớp chim nằm ngoài khối "wipe" để không bị cắt theo khung ảnh */}
          <div className="relative">
            <div data-reveal="wipe">
              <Photo image={t.homeAbout.image} sizes="(min-width: 768px) 560px, 100vw" className="aspect-[5/4]" eager />
            </div>
            <BirdsAroundPhoto />
          </div>
          <div data-reveal-group="up">
            <p className="label flex items-center gap-3 text-bronze">
              <span aria-hidden="true" className="h-px w-8 bg-bronze" />
              Quảng Phú
            </p>
            <h2 className="display mt-4 text-5xl md:text-[4.2rem]">
              {t.homeAbout.title1}
              <br />
              <span className="text-signal">{t.homeAbout.title2}</span>
            </h2>
            <p className="mt-6 max-w-[46ch] leading-relaxed text-ash">{t.homeAbout.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#lien-he"
                className="bg-signal px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-signal-deep"
              >
                {t.homeAbout.quote}
              </a>
              <Link
                href={lp(routes.about)}
                className="border border-bone/60 px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-bone hover:text-night"
              >
                {t.homeAbout.more}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Một thoáng tác phẩm */}
      <section id="tac-pham" className="pb-16 md:pb-24" aria-labelledby="tac-pham-title">
        <div className={`${wrap} flex flex-wrap items-end justify-between gap-6`}>
          <h2 id="tac-pham-title" className="display" data-reveal="up">
            <span className="block text-xl font-semibold text-ash">{t.works.kicker}</span>
            <span className="block text-5xl md:text-6xl">{t.works.title}</span>
          </h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-ash md:text-right" data-reveal="fade">
            {t.products.map((p) => (
              <li key={p.id}>
                <Link href={lp(`${routes.services}/${p.id}`)} className="transition-colors hover:text-bone">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal="fade">
          <Gallery rows={t.gallery} t={t.works} />
        </div>
      </section>

      {/* Dự án */}
      <section id="du-an" className="bg-night-2 py-16 md:py-24">
        <div className={wrap}>
          <h2 className="display mb-10 text-5xl md:mb-12 md:text-6xl" data-reveal="up">
            {t.homeProjects.title}
          </h2>
          <ProjectGrid projects={t.projects.slice(0, 4)} categories={t.projectCategories} />
          <div className="mt-16 flex justify-center">
            <Link
              href={lp(routes.projects)}
              className="border border-bone/60 px-6 py-3 text-sm font-semibold transition-colors hover:bg-bone hover:text-night"
            >
              {t.homeProjects.all} ({t.projects.length})
            </Link>
          </div>
        </div>
      </section>

      {/* Khách hàng */}
      <section className="bg-night-3 py-16 md:py-20">
        <div className={wrap}>
          <SheetHead lang={lang} sheet="05" topic={t.homeClients.topic}>
            {t.homeClients.title}
          </SheetHead>
          <ul className="-mt-4 flex flex-wrap gap-2" data-reveal="up">
            {t.clientTypes.map((c) => (
              <li key={c} className="border border-rule px-3 py-1.5 text-sm text-ash">
                {c}
              </li>
            ))}
          </ul>
          <PartnerLogos lang={lang} />
        </div>
      </section>

      <ContactSection lang={lang} sheet="06" />
    </main>
  );
}
