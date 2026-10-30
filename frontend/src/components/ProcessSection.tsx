import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { SheetHead } from "./SheetHead";

const wrap = "mx-auto max-w-[1200px] px-5 md:px-8";

// Biểu tượng cho 6 bước quy trình, theo thứ tự B1–B6
const processIcons = [
  // B1 Thu thập thông tin: sổ ghi chép
  <><rect key="a" x="6" y="3" width="12" height="18" rx="1.5" /><path key="b" d="M4 7h3M4 12h3M4 17h3M10 8h5M10 12h5" /></>,
  // B2 Ý tưởng: bóng đèn
  <><path key="a" d="M9 18h6M10 21h4" /><path key="b" d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z" /></>,
  // B3 Hồ sơ: thư mục
  <><path key="a" d="M3 7a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" /><path key="b" d="M8 4h8v4" /></>,
  // B4 Kế hoạch: bảng kiểm
  <><rect key="a" x="5" y="4" width="14" height="17" rx="1.5" /><path key="b" d="M9 3h6v3H9zM8 11l1 1 2-2M13 11h3M8 16l1 1 2-2M13 16h3" /></>,
  // B5 Triển khai: bánh răng
  <><circle key="a" cx="12" cy="12" r="3" /><path key="b" d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" /></>,
  // B6 Tổng kết: tài liệu đã duyệt
  <><path key="a" d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7Z" /><path key="b" d="M14 3v4h4M9 15l2 2 4-4" /></>,
];

// Quy trình đặt hàng 6 bước, dùng ở trang Dịch vụ và trang chi tiết từng dịch vụ.
export function ProcessSection({ lang }: { lang: Locale }) {
  const c = getContent(lang);
  const t = c.servicesPage;

  return (
    <section className="blueprint border-y border-rule bg-night-2 py-16 md:py-24">
      <div className={wrap}>
        <SheetHead topic={t.processTopic}>
          {t.processTitle}
        </SheetHead>
        <ol className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-6" data-reveal-group="up">
          {c.process.map((step, i) => (
            <li key={step.title} className="relative flex flex-col items-center text-center">
              {/* Dây nối sang bước kế tiếp (chỉ trên máy tính, khi 6 bước nằm một hàng) */}
              {i < c.process.length - 1 && (
                <span
                  aria-hidden="true"
                  data-reveal="line"
                  className="absolute top-14 left-1/2 hidden h-px w-[calc(100%+1.25rem)] border-t-2 border-dashed border-signal/60 lg:block"
                />
              )}
              <div className="relative z-10 grid size-24 place-items-center rounded-full bg-night-3 text-signal md:size-28">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-9" aria-hidden="true">
                  {processIcons[i]}
                </svg>
                <span className="absolute top-0 right-0 grid size-9 place-items-center rounded-full bg-signal text-sm font-semibold text-white">
                  B{i + 1}
                </span>
              </div>
              <p className="mt-5 max-w-[16ch] text-sm leading-snug font-semibold md:text-base">{step.title}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
