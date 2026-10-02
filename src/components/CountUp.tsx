"use client";

import { useEffect, useRef, useState } from "react";

// Đếm từ 0 lên con số đầu tiên trong chuỗi ("120+" → 0…120 rồi "+").
// Máy chủ render sẵn giá trị cuối, nên không có JS vẫn hiển thị đúng.
export function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const [n, setN] = useState(target);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      setN(0);
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  if (!match) return <>{value}</>;
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}
