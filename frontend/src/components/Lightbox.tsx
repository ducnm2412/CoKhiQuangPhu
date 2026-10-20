"use client";

import Image from "next/image";
import { useCallback, useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import type { Content, Img } from "@/lib/content";

export type LightboxHandle = { open: (index: number) => void };

// Hộp xem ảnh lớn dùng chung: mở bằng ref.open(i); có nút trước/sau/đóng, phím mũi tên và Esc.
export function Lightbox({ images, t, ref }: { images: Img[]; t: Content["works"]; ref: Ref<LightboxHandle> }) {
  const total = images.length;
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const close = useCallback(() => dialogRef.current?.close(), []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + total) % total)),
    [total],
  );

  useImperativeHandle(ref, () => ({
    open: (i: number) => {
      setIndex(i);
      dialogRef.current?.showModal();
    },
  }));

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => setIndex(null);
    dialog.addEventListener("keydown", onKey);
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("keydown", onKey);
      dialog.removeEventListener("close", onClose);
    };
  }, [step]);

  const current = index === null ? null : images[index];

  return (
    <dialog
      ref={dialogRef}
      aria-label={t.dialog}
      onClick={(e) => e.target === e.currentTarget && close()}
      className="lightbox m-auto max-h-none max-w-none bg-transparent p-0 text-white backdrop:bg-black/90"
    >
      {current && (
        <figure className="flex w-[min(94vw,1280px)] flex-col">
          <div className="relative h-[min(78vh,820px)] w-full">
            <Image key={current.src} src={current.src} alt={current.alt} fill sizes="94vw" className="object-contain" />
          </div>
          <figcaption className="mt-4 flex items-center justify-between gap-4 px-1 text-sm">
            <span className="text-white/60">
              <span className="font-mono text-white">
                {String(index! + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
              </span>
              <span className="ml-3">{current.alt}</span>
            </span>
            <span className="flex shrink-0 gap-2">
              {total > 1 && (
                <>
                  <LightboxButton label={t.prev} onClick={() => step(-1)} d="M11 3L5 9l6 6" />
                  <LightboxButton label={t.next} onClick={() => step(1)} d="M7 3l6 6-6 6" />
                </>
              )}
              <LightboxButton label={t.close} onClick={close} d="M4 4l10 10M14 4L4 14" />
            </span>
          </figcaption>
        </figure>
      )}
    </dialog>
  );
}

function LightboxButton({ label, onClick, d }: { label: string; onClick: () => void; d: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-11 place-items-center border border-white/25 transition-colors hover:border-white"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <path d={d} fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </button>
  );
}
