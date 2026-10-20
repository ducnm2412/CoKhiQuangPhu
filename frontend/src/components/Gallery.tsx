"use client";

import { useRef } from "react";
import type { Content, Img } from "@/lib/content";
import { Lightbox, type LightboxHandle } from "./Lightbox";
import { Photo } from "./ui";

export function Gallery({ rows: gallery, t }: { rows: Img[][]; t: Content["works"] }) {
  const all = gallery.flat();
  // Chỉ số ảnh đầu tiên của mỗi hàng trong danh sách phẳng `all`
  const rowStarts = gallery.map((_, r) => gallery.slice(0, r).reduce((n, row) => n + row.length, 0));
  const lightbox = useRef<LightboxHandle>(null);
  const open = (i: number) => lightbox.current?.open(i);

  return (
    <>
      <div className="mt-10 space-y-4 overflow-hidden">
        {gallery.map((row, r) => {
          const start = rowStarts[r];
          return (
            <div key={r} data-loop className="marquee-row no-scrollbar">
              <ul className={`marquee-track ${r % 2 ? "marquee-reverse" : ""}`}>
                {/* Lặp 2 lần để dải ảnh chạy liền mạch; bản lặp ẩn với trình đọc màn hình */}
                {[0, 1].map((copy) =>
                  row.map((img, i) => (
                    <li
                      key={`${copy}-${img.src}`}
                      aria-hidden={copy === 1 || undefined}
                      className={`w-[72vw] shrink-0 sm:w-[44vw] lg:w-[27vw]`}
                    >
                      <button
                        type="button"
                        tabIndex={copy === 1 ? -1 : undefined}
                        onClick={() => open(start + i)}
                        aria-label={`${t.view}: ${img.alt}`}
                        className="group block w-full cursor-zoom-in"
                      >
                        <Photo
                          image={img}
                          sizes="(min-width: 1024px) 27vw, 72vw"
                          className="aspect-[3/2] transition-opacity group-hover:opacity-80"
                        />
                      </button>
                    </li>
                  )),
                )}
              </ul>
            </div>
          );
        })}
      </div>

      <Lightbox ref={lightbox} images={all} t={t} />
    </>
  );
}
