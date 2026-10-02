"use client";

export const PRODUCT_EVENT = "qp:select-product";

// Liên kết tới form báo giá, đồng thời chọn sẵn sản phẩm tương ứng trong form.
export function QuoteLink({
  product,
  className,
  children,
}: {
  product: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href="#lien-he"
      onClick={() => window.dispatchEvent(new CustomEvent(PRODUCT_EVENT, { detail: product }))}
      className={className}
    >
      {children}
    </a>
  );
}
