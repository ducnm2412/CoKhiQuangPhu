import { contact } from "@/lib/content";

// Nút gọi điện và Zalo cố định ở góc phải dưới màn hình, trên mọi trang.
export function FloatingContact({ callLabel, zaloLabel }: { callLabel: string; zaloLabel: string }) {
  return (
    <div className="fixed right-5 bottom-5 z-30 flex flex-col gap-3 print:hidden">
      <a
        href={contact.zaloHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={zaloLabel}
        title={zaloLabel}
        className="grid size-12 place-items-center rounded-full bg-[#0068ff] text-white shadow-lg shadow-black/30 transition-transform hover:scale-105"
      >
        {/* Chữ "Zalo" trong bong bóng chat */}
        <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16 3C8.3 3 2 8.4 2 15c0 3.6 1.9 6.9 4.9 9.1L6 29l5.2-2.6c1.5.4 3.1.6 4.8.6 7.7 0 14-5.4 14-12S23.7 3 16 3z" fill="#fff" />
          <text x="16" y="18.6" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8.4" fontWeight="700" fill="#0068ff">
            Zalo
          </text>
        </svg>
      </a>
      <a
        href={contact.phoneHref}
        aria-label={callLabel}
        title={`${callLabel} ${contact.phone}`}
        className="relative grid size-12 place-items-center rounded-full bg-signal text-white shadow-lg shadow-black/30 transition-transform hover:scale-105"
      >
        {/* Vòng lan tỏa nhẹ để gợi ý bấm gọi; tắt khi người xem giảm chuyển động */}
        <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-signal/50 motion-reduce:hidden" style={{ animationDuration: "2s" }} />
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" className="relative">
          <path
            d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"
            fill="currentColor"
          />
        </svg>
      </a>
    </div>
  );
}
