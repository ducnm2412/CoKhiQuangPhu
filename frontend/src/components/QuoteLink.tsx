// Liên kết "Yêu cầu báo giá": cuộn xuống phần liên hệ ở footer.
export function QuoteLink({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <a href="#lien-he" className={className}>
      {children}
    </a>
  );
}
