"use client";

// Đổi giao diện sáng / tối. Lựa chọn lưu trong localStorage; script trong layout
// đặt data-theme trước khi trang hiện ra nên không bị nháy màu.
export function ThemeToggle({ label }: { label: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid size-10 place-items-center border border-rule text-bone/80 transition-colors hover:border-bone/50 hover:text-bone"
    >
      {/* Mặt trăng khi đang tối (bấm để sang sáng), mặt trời khi đang sáng */}
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="light:hidden">
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="hidden light:block">
        <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </g>
      </svg>
    </button>
  );
}
