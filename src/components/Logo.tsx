// Chữ "QP" ghép từ hai vòng tròn và một chân đế — như hình chiếu một khối đúc.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      width="30"
      height="26"
      viewBox="0 0 30 26"
      className={className}
      aria-hidden="true"
    >
      <circle cx="10" cy="11" r="7.5" fill="none" stroke="#d52b1e" strokeWidth="3.2" />
      <path d="M14 15.5l4 4.5" stroke="#d52b1e" strokeWidth="3.2" />
      <path d="M19.5 3.5h4a4.5 4.5 0 0 1 0 9h-4V25" fill="none" stroke="#d52b1e" strokeWidth="3.2" />
    </svg>
  );
}
