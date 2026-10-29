import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { SheetHead } from "@/components/SheetHead";
import { Photo } from "@/components/ui";
import { getContent } from "@/lib/content";
import { alternatesFor, hasLocale } from "@/lib/i18n";

const wrap = "mx-auto max-w-[1200px] px-5 md:px-8";

export async function generateMetadata({ params }: PageProps<"/[lang]/ve-chung-toi">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getContent(lang).aboutPage;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: alternatesFor(lang, "/ve-chung-toi"),
  };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/ve-chung-toi">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getContent(lang);
  const t = c.aboutPage;
  const headcount = c.teams.reduce((n, team) => n + team.count, 0);

  return (
    <main>
      <PageHero
        lang={lang}
        crumb={c.nav.about}
        title={t.title}
        lead={t.lead}
        aside={
          <dl className="grid grid-cols-2 gap-px border border-rule bg-rule">
            {c.companyFacts.map((f) => (
              <div key={f.term} className="bg-night px-5 py-4">
                <dt className="sheet-label text-ash">{f.term}</dt>
                <dd className="mt-1.5 font-semibold">{f.value}</dd>
              </div>
            ))}
          </dl>
        }
      />

      {/* Năng lực */}
      <section className="py-16 md:py-24">
        <div className={wrap}>
          <SheetHead topic={t.capabilityTopic}>
            {t.capabilityTitle}
          </SheetHead>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <p className="max-w-[52ch] leading-relaxed text-ash" data-reveal="up">
                {t.founded}
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2" data-reveal-group="up">
                {t.fields.map((f) => (
                  <li key={f.title} className="border border-rule bg-night-3/60 px-4 py-3">
                    <h3 className="display text-lg">{f.title}</h3>
                    <p className="mt-1 text-sm leading-snug text-ash">{f.body}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 max-w-[52ch] leading-relaxed text-ash" data-reveal="up">
                {t.team}
              </p>
              <figure className="mt-8">
                <div className="flex flex-col gap-3 lg:flex-row" data-reveal="wipe">
                  {/* Giữ đúng tỷ lệ gốc để không bị cắt: điện thoại xếp dọc, máy tính xếp ngang
                      (độ rộng mỗi ảnh tỷ lệ với tỷ lệ khung nên hai ảnh cao bằng nhau) */}
                  {t.capabilityImages.map((im, i) => (
                    <div key={im.src} className="lg:min-w-0 lg:basis-0" style={{ flexGrow: i === 0 ? 1600 / 1149 : 3 / 4 }}>
                      <Photo image={im} sizes="(min-width: 1024px) 340px, 100vw" className={`${i === 0 ? "aspect-[1600/1149]" : "aspect-[3/4]"} border border-rule`} />
                    </div>
                  ))}
                </div>
                <figcaption className="mt-3 text-sm text-ash">{t.capabilityCaption}</figcaption>
              </figure>
            </div>

            <ol className="self-start border-t border-rule" data-reveal-group="up">
              {c.strengths.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[3.5rem_1fr] gap-2 border-b border-rule py-7">
                  <span className="display text-4xl text-signal">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="display text-2xl">{s.title}</h3>
                    <p className="mt-2 max-w-[52ch] leading-relaxed text-ash">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Phương châm */}
          <div className="mt-14 grid gap-8 border-t border-rule pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16" data-reveal="up">
            <div>
              <p className="sheet-label text-signal">{t.mottoTitle}</p>
              <p className="display mt-3 text-3xl leading-tight md:text-4xl">
                {t.mottoSlogan.map((w, i) => (
                  <span key={w}>
                    {i > 0 && <span className="mx-2 text-signal">–</span>}
                    {w}
                  </span>
                ))}
              </p>
            </div>
            <div className="space-y-4 text-[1.05rem] leading-relaxed text-bone/85">
              {t.mottoBody.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Đội ngũ nhân lực */}
      <section className="blueprint border-y border-rule bg-night-2 py-16 md:py-24">
        <div className={wrap}>
          <SheetHead topic={t.teamTopic}>
            {t.teamTitle.replace("{n}", String(headcount))}
          </SheetHead>
          <p className="-mt-4 mb-10 max-w-[60ch] leading-relaxed text-ash md:mb-12" data-reveal="up">
            {t.teamBody}
          </p>

          <ul className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4" data-reveal="up">
            {c.teams.map((team) => (
              <li key={team.name} className="flex flex-col bg-night-2 p-6">
                <p className="display text-6xl">
                  {team.count}
                  <span className="ml-2 align-top font-sans text-sm font-medium tracking-normal text-ash normal-case">{t.people}</span>
                </p>
                <h3 className="mt-4 text-sm font-semibold uppercase">{team.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">{team.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {c.teamPhotos.map((img) => (
              <figure key={img.src} data-reveal="wipe">
                <Photo image={img} sizes="(min-width: 768px) 580px, 100vw" className="aspect-[16/9]" />
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
