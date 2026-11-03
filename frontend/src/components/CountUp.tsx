"use client";

import { useEffect, useRef, useState } from "react";

// Đếm từ 1 lên con số đầu tiên trong chuỗi ("120+" → 1…120 rồi "+"), chạy lại mỗi lần hiện trên màn hình.
// Máy chủ render sẵn giá trị cuối, nên không có JS vẫn hiển thị đúng.
// delay: chờ (ms) trước khi đếm, dùng khi số nằm trong khối đang chạy hiệu ứng hiện ra.
export function CountUp({ value, duration = 1400, delay = 0 }: { value: string; duration?: number; delay?: number }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const [n, setN] = useState(target);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!match) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let timer = 0;
    const stop = () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
    // Mỗi lần số lọt vào màn hình (cuộn tới hoặc vào lại trang) thì đếm lại từ 1
    const io = new IntersectionObserver(([entry]) => {
      stop();
      if (!entry.isIntersecting) return;
      setN(1);
      timer = window.setTimeout(() => {
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          setN(Math.max(1, Math.round(target * (1 - Math.pow(1 - p, 3)))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }, delay);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration, delay]);

  if (!match) return <>{value}</>;
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}
