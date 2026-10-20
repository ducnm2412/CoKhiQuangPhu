import Image from "next/image";

// Logo chính thức của Quảng Phú (public/images/logo.png, đã cắt viền từ public/Logo.png).
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/images/logo.png"
      alt="Quảng Phú"
      width={312}
      height={320}
      priority
      className={`h-10 w-auto ${className}`}
    />
  );
}
