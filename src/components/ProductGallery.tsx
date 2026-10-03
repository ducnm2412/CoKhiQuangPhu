"use client";

import { useState } from "react";
import type { Img } from "@/lib/content";
import { Photo } from "./ui";

// Bộ ảnh ở trang chi tiết dịch vụ: ảnh chính lớn, bên dưới là hàng ảnh nhỏ nằm ngang.
// Bấm ảnh nhỏ để đổi ảnh chính.
export function ProductGallery({ images }: { images: Img[] }) {
  const [active, setActive] = useState(0);
  const main = images[active];

  return (
    // min-w-0: cho phép cột lưới co lại để hàng ảnh nhỏ tự cuộn ngang thay vì làm tràn trang
    <div className="min-w-0">
      <div data-reveal="wipe">
        <Photo key={main.src} image={main} sizes="(min-width: 1024px) 620px, 100vw" className="aspect-[4/3]" eager />
      </div>

      {images.length > 1 && (
        <ul className="no-scrollbar mt-3 flex gap-3 overflow-x-auto">
          {images.map((img, i) => (
            <li key={img.src} className="w-[calc((100%-2.25rem)/4)] min-w-20 shrink-0">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={img.alt}
                aria-current={i === active ? "true" : undefined}
                className="block w-full border-2 border-transparent opacity-60 transition hover:opacity-100 aria-[current=true]:border-signal aria-[current=true]:opacity-100"
              >
                <Photo image={img} sizes="160px" className="aspect-[4/3]" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
