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
          <SheetHead lang={lang} sheet="01" topic={t.capabilityTopic}>
            {t.capabilityTitle}
          </SheetHead>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <p className="max-w-[52ch] leading-relaxed text-ash" data-reveal="up">
                {t.capabilityBody}
              </p>
              <figure className="mt-8">
                <div data-reveal="wipe">
                  <Photo image={t.capabilityImage} sizes="(min-width: 1024px) 520px, 100vw" className="aspect-[4/3] border border-rule" />
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
        </div>
      </section>

      {/* Ban lãnh đạo */}
      <section className="bg-night-3 py-14 md:py-20">
        <div className={wrap}>
          <SheetHead lang={lang} sheet="02" topic={t.leadersTopic}>
            {t.leadersTitle}
          </SheetHead>
          <div className="space-y-12 md:space-y-14">
            {c.leaders.map((l, i) => (
              <article
                key={l.name}
                className={`grid gap-6 md:items-center md:gap-12 ${
                  i % 2 ? "md:grid-cols-[minmax(0,1fr)_300px]" : "md:grid-cols-[300px_minmax(0,1fr)]"
                }`}
              >
                <div data-reveal="wipe" className={`max-w-[240px] md:max-w-none ${i % 2 ? "md:order-2" : ""}`}>
                  {l.photo ? (
                    <Photo image={l.photo} sizes="300px" className="aspect-[4/5]" />
                  ) : (
                    <PortraitPlaceholder label={c.ui.portraitPending} />
                  )}
                </div>
                <div data-reveal="up">
                  <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule pb-3">
                    <h3 className="text-lg font-semibold uppercase">{l.name}</h3>
                    <p className="text-xs font-semibold text-signal uppercase">{l.role}</p>
                  </header>
                  <ul className="mt-4 space-y-1.5 text-sm leading-relaxed text-bone/85">
                    {l.credentials.map((cred) => (
                      <li key={cred} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-signal" />
                        {cred}
                      </li>
                    ))}
                  </ul>
                  <blockquote className="mt-5 max-w-[60ch] border-l-2 border-signal pl-4 text-sm leading-relaxed text-ash italic">{l.quote}</blockquote>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Đội ngũ nhân lực */}
      <section className="blueprint border-y border-rule bg-night-2 py-16 md:py-24">
        <div className={wrap}>
          <SheetHead lang={lang} sheet="03" topic={t.teamTopic}>
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

// Ô ảnh chờ cho chân dung lãnh đạo, vẽ như bản phác bằng nét.
function PortraitPlaceholder({ label }: { label: string }) {
  return (
    <div className="blueprint relative grid aspect-[4/5] place-items-center border border-rule bg-night-2">
      <svg viewBox="0 0 200 240" className="w-1/2 text-bone/30" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <ellipse cx="100" cy="88" rx="40" ry="50" />
          <path d="M84 134v14c-36 8-58 30-64 72M116 134v14c36 8 58 30 64 72" />
          <path d="M100 30v190" strokeDasharray="4 4" className="text-signal" stroke="currentColor" opacity="0.6" />
        </g>
      </svg>
      <p className="sheet-label absolute bottom-4 left-4 text-ash">{label}</p>
    </div>
  );
}
