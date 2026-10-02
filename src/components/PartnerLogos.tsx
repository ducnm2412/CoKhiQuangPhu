import Image from "next/image";
import { partnersFor } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

// Lưới logo đối tác. Ô nền sáng cố định để logo giữ đúng màu ở cả giao diện sáng lẫn tối.
export function PartnerLogos({ lang }: { lang: Locale }) {
  const partners = partnersFor(lang);
  return (
    <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5" data-reveal-group="up">
      {partners.map((p) => (
        <li key={p.logo} className="group flex flex-col items-center gap-3">
          <div className="grid h-28 w-full place-items-center border border-rule bg-[#f7f7f4] p-4 md:h-32">
            <Image
              src={p.logo}
              alt={p.name}
              width={160}
              height={160}
              className="max-h-20 w-auto object-contain transition-transform group-hover:scale-105 md:max-h-24"
            />
          </div>
          <p className="text-center text-xs leading-snug text-ash">{p.name}</p>
        </li>
      ))}
    </ul>
  );
}
