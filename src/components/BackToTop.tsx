"use client";

import { useEffect, useState } from "react";

// Nút cuộn lên đầu trang, xếp phía trên cụm nút Zalo/gọi điện ở góc phải dưới
// (góc trái dưới bị biểu tượng dev tools của Next.js che khi chạy `next dev`).
// Chỉ hiện sau khi người dùng đã cuộn xuống một đoạn.
export function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={label}
      title={label}
      tabIndex={visible ? 0 : -1}
      className={`fixed right-5 bottom-[8.75rem] z-30 grid size-11 place-items-center rounded-full border border-bone/30 bg-night/90 text-bone shadow-lg shadow-black/30 backdrop-blur transition-all duration-300 hover:bg-signal hover:text-white print:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 5l-7 7h4v7h6v-7h4z" fill="currentColor" />
      </svg>
    </button>
  );
}
