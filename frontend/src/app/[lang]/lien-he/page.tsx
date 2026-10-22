import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { SheetHead } from "@/components/SheetHead";
import { contact, getContent } from "@/lib/content";
import { alternatesFor, hasLocale } from "@/lib/i18n";

const wrap = "mx-auto max-w-[1200px] px-5 md:px-8";

export async function generateMetadata({ params }: PageProps<"/[lang]/lien-he">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getContent(lang).contactPage;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: alternatesFor(lang, "/lien-he"),
  };
}

// Một dòng thông tin: nhãn nhỏ + nội dung
function Item({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-rule py-6 first:pt-0">
      <dt className="sheet-label text-ash">{label}</dt>
      <dd className="mt-2">{children}</dd>
    </div>
  );
}

export default async function ContactPage({ params }: PageProps<"/[lang]/lien-he">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getContent(lang);
  const t = c.contactPage;
  const btn = "inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold transition-colors";

  return (
    <main>
      <PageHero
        lang={lang}
        crumb={c.nav.contact}
        title={t.title}
        lead={t.lead}
        aside={
          <div className="flex flex-wrap gap-3">
            <a href={contact.phoneHref} className={`${btn} bg-signal text-white hover:bg-signal-deep`}>
              {c.ui.callNow} · {contact.phone}
            </a>
            <a
              href={contact.zaloHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btn} border border-bone/60 hover:bg-bone hover:text-night`}
            >
              {c.ui.zaloChat}
            </a>
          </div>
        }
      />

      <section className="py-16 md:py-24">
        <div className={`${wrap} grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16`}>
          <div>
            <SheetHead topic={t.infoTopic}>{c.company.brand}</SheetHead>
            <dl data-reveal-group="up">
              <Item label={t.address}>
                <p className="text-lg leading-relaxed">{c.company.address}</p>
                <a
                  href={contact.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-semibold text-signal underline underline-offset-4"
                >
                  {t.directions} ↗
                </a>
              </Item>
              <Item label={t.phone}>
                <a href={contact.phoneHref} className="text-2xl font-semibold transition-colors hover:text-signal">
                  {contact.phone}
                </a>
              </Item>
              <Item label={t.email}>
                <a href={`mailto:${contact.email}`} className="text-lg break-all transition-colors hover:text-signal">
                  {contact.email}
                </a>
              </Item>
              <Item label={t.social}>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-lg">
                  <a href={contact.zaloHref} target="_blank" rel="noopener noreferrer" className="hover:text-signal">Zalo</a>
                  <a href={contact.facebookHref} target="_blank" rel="noopener noreferrer" className="hover:text-signal">Facebook</a>
                </div>
              </Item>
              <Item label={t.taxCode}>
                <p className="text-lg">{contact.taxCode}</p>
                <p className="mt-1 text-sm text-ash">{c.company.name}</p>
              </Item>
            </dl>
          </div>

          <div>
            <SheetHead topic={t.mapTopic}>{c.footer.maps}</SheetHead>
            <iframe
              src={contact.mapsEmbed}
              title={c.footer.mapTitle}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="aspect-[4/3] w-full border border-rule lg:aspect-auto lg:h-[calc(100%-9rem)] lg:min-h-[28rem]"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
