import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CountUp } from "@/components/CountUp";
import { BirdsAroundPhoto } from "@/components/FlyingBirds";
import { Gallery } from "@/components/Gallery";
import { PartnerLogos } from "@/components/PartnerLogos";
import { ProjectGrid } from "@/components/ProjectGrid";
import { SheetHead } from "@/components/SheetHead";
import { Photo } from "@/components/ui";
import { getContent } from "@/lib/content";
import { hasLocale, localePath, routes } from "@/lib/i18n";

const wrap = "mx-auto max-w-[1200px] px-5 md:px-8";
const brand = "Quảng Phú";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getContent(lang);
  const lp = (p: string) => localePath(lang, p);

  return (
    <main>
      {/* Hero: ảnh công trình thật làm nền, phủ tối dần về phía chữ. Khối này luôn nền tối ở cả hai giao diện. */}
      <section className="relative isolate overflow-hidden border-b border-rule/60 bg-[#0d0d0d] text-white">
        {/* Di động: ảnh là một dải phía trên, chữ nằm dưới. Màn hình lớn: ảnh phủ 70% bên phải để khối xe
            (nằm giữa ảnh) không bị tiêu đề che; phần bên trái hòa vào nền tối. */}
        <div className="absolute inset-x-0 top-0 -z-10 h-[300px] sm:h-[420px] lg:inset-y-0 lg:left-[30%] lg:h-auto">
          <Image
            src={t.hero.photo.src}
            alt={t.hero.photo.alt}
            fill
            sizes="(min-width: 1024px) 70vw, 100vw"
            loading="eager"
            fetchPriority="high"
            className="object-cover"
            style={{ objectPosition: t.hero.photo.position }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/15 to-transparent lg:bg-gradient-to-r lg:via-[#0d0d0d]/45 lg:to-transparent"
          />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 hidden h-2/5 bg-gradient-to-t from-[#0d0d0d]/85 to-transparent lg:block" />
        </div>

        <div className={`${wrap} flex flex-col pt-[250px] pb-10 sm:pt-[350px] lg:min-h-[calc(100dvh-4rem)] lg:justify-center lg:pt-16`}>
          <h1 className="display">
            <span className="hero-in block text-4xl font-semibold text-white/60 md:text-6xl">{t.hero.weAre}</span>
            {/* Tên công ty hiện từng chữ cái; trình đọc màn hình đọc bản chữ liền ở dưới */}
            <span aria-hidden="true" className="mt-2 block text-[4.1rem] leading-[0.92] whitespace-nowrap sm:text-[7rem] lg:text-[6.2rem] xl:text-[7.8rem]">
              {[...brand].map((ch, i) => (
                <span key={i} className="hero-in inline-block whitespace-pre" style={{ "--d": 200 + i * 55 } as React.CSSProperties}>
                  {ch}
                </span>
              ))}
              <span className="hero-dot inline-block text-signal" style={{ "--d": 200 + brand.length * 55 + 150 } as React.CSSProperties}>
                .
              </span>
            </span>
            <span className="sr-only">{brand}.</span>
          </h1>
          <p className="mt-6 flex max-w-[40ch] gap-4 text-lg leading-snug font-medium md:text-[1.4rem]">
            <span aria-hidden="true" className="hero-line mt-[0.7em] h-px w-10 shrink-0 bg-signal" style={{ "--d": 900 } as React.CSSProperties} />
            <span className="hero-in" style={{ "--d": 1000 } as React.CSSProperties}>
              {t.hero.tagline}
            </span>
          </p>

          <div className="hero-in mt-10 flex flex-wrap items-end justify-between gap-8 md:mt-14" style={{ "--d": 1250 } as React.CSSProperties}>
            <dl className="flex flex-wrap gap-x-14 gap-y-6">
              {t.stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="mt-1.5 text-sm text-white/65">{s.label}</dt>
                  <dd className="display text-5xl md:text-6xl">
                    <CountUp value={s.value} />
                  </dd>
                </div>
              ))}
            </dl>
            <p className="sheet-label hidden items-center gap-3 text-white/75 sm:flex">
              <span aria-hidden="true" className="h-px w-8 bg-signal" />
              {t.hero.photoLabel}
            </p>
          </div>
        </div>
      </section>

      {/* Về chúng tôi */}
      <section id="ve-chung-toi" className="relative overflow-hidden py-16 md:py-24">
        {/* Mặt trống đồng lớn xoay chậm phía sau, tràn khỏi mép phải */}
        <div
          aria-hidden="true"
          data-loop
          className="pointer-events-none absolute top-1/2 -right-[35%] aspect-square w-[110vw] -translate-y-1/2 md:-right-[14%] md:w-[min(1050px,78vw)]"
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
    </main>
  );
}
