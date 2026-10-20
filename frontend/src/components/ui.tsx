import Image from "next/image";
import type { Img } from "@/lib/content";

// Ảnh cắt theo khung (tỷ lệ do className quy định).
export function Photo({
  image,
  sizes,
  className = "",
  eager = false,
}: {
  image: Img;
  sizes: string;
  className?: string;
  eager?: boolean; // ảnh lớn ở màn hình đầu: tải ngay thay vì tải lười
}) {
  return (
    <div className={`relative overflow-hidden bg-tile ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : undefined}
        className="object-cover"
        style={{ objectPosition: image.position ?? "50% 50%" }}
      />
    </div>
  );
}

// Ô ảnh chờ khi chưa có ảnh thật: nền lưới bản vẽ và một dòng chú thích.
export function ImagePlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`blueprint relative grid place-items-center border border-rule bg-night-2 ${className}`}
    >
      <svg viewBox="0 0 120 120" className="w-1/4 text-bone/25" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="10" y="10" width="100" height="100" />
          <path d="M10 10l100 100M110 10L10 110" strokeDasharray="4 4" />
        </g>
      </svg>
      <p className="sheet-label absolute bottom-4 left-4 text-ash">{label}</p>
    </div>
  );
}
