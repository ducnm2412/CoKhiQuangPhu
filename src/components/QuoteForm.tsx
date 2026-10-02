"use client";

import { useEffect, useState } from "react";
import { contact, type Content } from "@/lib/content";
import { PRODUCT_EVENT } from "./QuoteLink";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "mt-1 block h-12 w-full border border-rule bg-night-2 px-3 text-[15px] text-bone outline-none transition-colors focus:border-bone/70";
const label = "text-sm text-ash";

// Form báo giá một hàng: họ tên, số điện thoại, dịch vụ.
export function QuoteForm({
  t,
  services,
  initialProduct = services[0],
}: {
  t: Content["quote"];
  services: string[];
  initialProduct?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [product, setProduct] = useState(initialProduct);

  // Nút "Yêu cầu báo giá" ở trang dịch vụ chọn sẵn dịch vụ tương ứng.
  useEffect(() => {
    const onSelect = (e: Event) => {
      setProduct((e as CustomEvent<string>).detail);
      setStatus((s) => (s === "sent" ? "idle" : s));
    };
    window.addEventListener(PRODUCT_EVENT, onSelect);
    return () => window.removeEventListener(PRODUCT_EVENT, onSelect);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/bao-gia", { method: "POST", body: new FormData(form) });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error);
      form.reset();
      setProduct(initialProduct);
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-wrap items-center justify-between gap-4 border border-rule bg-night-2 px-5 py-5" role="status">
        <p>
          <span className="font-semibold">{t.sent}</span> <span className="text-ash">{t.sentNote}</span>
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-semibold underline underline-offset-4 hover:text-signal"
        >
          {t.again}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.1fr_auto] lg:items-end">
        <label className="block">
          <span className={label}>{t.name}</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className={label}>{t.phone}</span>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            pattern="[0-9 +.\-]{9,15}"
            title={t.phoneHint}
            className={field}
          />
        </label>
        <label className="block">
          <span className={label}>{t.service}</span>
          <span className="relative block">
            <select
              name="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className={`${field} appearance-none pr-10`}
            >
              {services.map((p) => (
                <option key={p}>{p}</option>
              ))}
              <option>{t.other}</option>
            </select>
            <svg
              aria-hidden="true"
              width="12"
              height="8"
              viewBox="0 0 12 8"
              className="pointer-events-none absolute top-1/2 right-3.5 mt-[2px] -translate-y-1/2"
            >
              <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
        </label>
        <button
          type="submit"
          disabled={status === "sending"}
          className="h-12 bg-signal px-8 text-[15px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-signal-deep disabled:opacity-60"
        >
          {status === "sending" ? t.sending : t.submit}
        </button>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 border-l-2 border-signal bg-night-2 px-3 py-2 text-sm">
          {error || t.error} {t.errorTail} {contact.phone}.
        </p>
      )}
    </form>
  );
}
