import Image from "next/image";
import { partnersFor } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

// Dải logo đối tác chạy ngang (dùng chung .marquee-* với Gallery). Ô nền sáng cố định để logo giữ đúng màu ở cả giao diện sáng lẫn tối.
export function PartnerLogos({ lang }: { lang: Locale }) {
  const partners = partnersFor(lang);
  return (
    <div data-loop className="marquee-row mt-10">
      <ul className="marquee-track">
        {/* Lặp 2 lần để dải logo chạy liền mạch; bản lặp ẩn với trình đọc màn hình */}
        {[0, 1].map((copy) =>
          partners.map((p) => (
            <li key={`${copy}-${p.logo}`} aria-hidden={copy === 1 || undefined} className="flex w-40 shrink-0 flex-col items-center gap-3 md:w-48">
              <div className="grid h-28 w-full place-items-center border border-rule bg-[#f7f7f4] p-4 md:h-32">
                <Image
                  src={p.logo}
                  alt={copy === 1 ? "" : p.name}
                  width={160}
                  height={160}
                  unoptimized // logo nhỏ: dùng file gốc, không nén lại để giữ nét
                  className="max-h-20 w-auto object-contain md:max-h-24"
                />
              </div>
              <p className="text-center text-xs leading-snug text-ash">{p.name}</p>
            </li>
          )),
        )}
      </ul>
    </div>
  );
}
