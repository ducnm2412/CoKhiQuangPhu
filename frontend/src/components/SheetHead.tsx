import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

// Tiêu đề section, đánh số như tờ bản vẽ trong một bộ hồ sơ.
export function SheetHead({
  lang,
  sheet,
  topic,
  children,
}: {
  lang: Locale;
  sheet: string;
  topic: string;
  children: React.ReactNode;
}) {
  return (
    <header className="mb-10 md:mb-12" data-reveal-group="up">
      <p className="sheet-label text-signal">
        {getContent(lang).ui.sheet} {sheet} · {topic}
      </p>
      <h2 className="display mt-4 text-5xl md:text-6xl">{children}</h2>
    </header>
  );
}
