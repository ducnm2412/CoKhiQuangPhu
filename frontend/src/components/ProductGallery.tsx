"use client";

import { useRef, useState } from "react";
import type { Content, Img } from "@/lib/content";
import { Lightbox, type LightboxHandle } from "./Lightbox";
import { Photo } from "./ui";

// Bộ ảnh ở trang chi tiết dịch vụ / dự án: ảnh chính lớn, bên dưới là hàng ảnh nhỏ nằm ngang.
// Bấm ảnh nhỏ để đổi ảnh chính; bấm ảnh chính để xem ảnh lớn toàn màn hình.
export function ProductGallery({ images, t }: { images: Img[]; t: Content["works"] }) {
  const [active, setActive] = useState(0);
  const main = images[active];
  const lightbox = useRef<LightboxHandle>(null);

  return (
    // min-w-0: cho phép cột lưới co lại để hàng ảnh nhỏ tự cuộn ngang thay vì làm tràn trang
    <div className="min-w-0">
      <div data-reveal="wipe">
        <button
          type="button"
          onClick={() => lightbox.current?.open(active)}
          aria-label={`${t.view}: ${main.alt}`}
          className="group block w-full cursor-zoom-in"
        >
          <Photo
            key={main.src}
            image={main}
            sizes="(min-width: 1024px) 720px, 100vw"
            className="aspect-[4/3] transition-opacity group-hover:opacity-90"
            fit="contain"
            quality={90}
            eager
          />
        </button>
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

      <Lightbox ref={lightbox} images={images} t={t} />
    </div>
  );
}
