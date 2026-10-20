// Script nội tuyến chạy ngay khi trình duyệt đọc HTML (trước lần vẽ đầu tiên).
// Phía client đổi type thành text/plain để React không cảnh báo về thẻ <script> (theo hướng dẫn
// "Preventing flash before hydration" của Next 16); suppressHydrationWarning bỏ qua chỗ khác nhau này.
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
