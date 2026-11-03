"use client";

import { useEffect, useState } from "react";

// Chữ gõ lặp lại như bàn phím: gõ từng chữ → dừng → xoá từng chữ → gõ lại.
// Phần chưa gõ vẫn giữ chỗ (trong suốt) nên dòng chữ không xô lệch; con trỏ đỏ nằm ngay sau chữ vừa gõ.
// Người dùng bật "giảm chuyển động" thì hiện đủ chữ, không lặp.
export function TypeLoop({
  text,
  suffix = "",
  startDelay = 300,
  typeMs = 110,
  eraseMs = 55,
  holdMs = 2600,
  pauseMs = 500,
}: {
  text: string;
  suffix?: string; // phần màu đỏ ở cuối (dấu chấm), gõ sau cùng
  startDelay?: number;
  typeMs?: number;
  eraseMs?: number;
  holdMs?: number; // giữ nguyên chữ đầy đủ trước khi xoá
  pauseMs?: number; // dừng khi đã xoá hết trước khi gõ lại
}) {
  const chars = [...text, ...suffix];
  const total = chars.length;
  const [n, setN] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(total);
      return;
    }
    let timer = 0;
    let count = 0;
    let erasing = false;
    const step = () => {
      if (!erasing) {
        count++;
        setN(count);
        if (count === total) {
          erasing = true;
          timer = window.setTimeout(step, holdMs);
        } else timer = window.setTimeout(step, typeMs);
      } else {
        count--;
        setN(count);
        if (count === 0) {
          erasing = false;
          timer = window.setTimeout(step, pauseMs);
        } else timer = window.setTimeout(step, eraseMs);
      }
    };
    timer = window.setTimeout(step, startDelay);
    return () => clearTimeout(timer);
  }, [total, startDelay, typeMs, eraseMs, holdMs, pauseMs]);

  const textLen = [...text].length;
  return (
    <>
      {chars.map((ch, i) => (
        <span
          key={i}
          className={`relative inline-block whitespace-pre ${i >= textLen ? "text-signal" : ""} ${i < n ? "" : "opacity-0"}`}
        >
          {ch}
          {i === n - 1 && <span className="type-cursor absolute top-[0.1em] -right-[0.08em] h-[0.8em] w-[0.06em] bg-signal" />}
        </span>
      ))}
      {n === 0 && <span className="type-cursor absolute h-[0.8em] w-[0.06em] translate-y-[0.1em] bg-signal" style={{ left: 0 }} />}
    </>
  );
}
