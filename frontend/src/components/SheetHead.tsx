// Tiêu đề section: nhãn chủ đề nhỏ màu đỏ + tiêu đề lớn.
export function SheetHead({ topic, children }: { topic: string; children: React.ReactNode }) {
  return (
    <header className="mb-10 md:mb-12" data-reveal-group="up">
      <p className="sheet-label text-signal">{topic}</p>
      <h2 className="display mt-4 text-5xl md:text-6xl">{children}</h2>
    </header>
  );
}
