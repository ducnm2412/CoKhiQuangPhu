import { env } from "./env.js";

// Dịch bằng Google Cloud Translation API (v2, xác thực bằng API key). Trả về cùng thứ tự với đầu vào.
export const MAX_TRANSLATE_CHARS = 30_000; // chặn yêu cầu quá lớn (Google tính phí theo số ký tự)

export class TranslateError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function translateTexts(texts: string[], source = "vi", target = "en"): Promise<string[]> {
  if (!env.googleTranslateKey) throw new TranslateError(503, "Chưa cấu hình GOOGLE_TRANSLATE_API_KEY ở backend.");
  if (texts.join("").length > MAX_TRANSLATE_CHARS) throw new TranslateError(400, "Nội dung quá dài để dịch một lần.");

  // Chỉ gửi chuỗi có chữ, rồi ghép lại đúng vị trí
  const idx = texts.map((t, i) => (t.trim() ? i : -1)).filter((i) => i >= 0);
  const out = [...texts];
  if (!idx.length) return out;

  const r = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(env.googleTranslateKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ q: idx.map((i) => texts[i]), source, target, format: "text" }),
  });
  const data = (await r.json().catch(() => null)) as
    | { data?: { translations: { translatedText: string }[] }; error?: { message: string } }
    | null;
  if (!r.ok || !data?.data) {
    console.error("Google Translate:", r.status, data?.error?.message);
    throw new TranslateError(502, `Google Translate báo lỗi: ${data?.error?.message ?? r.status}`);
  }
  data.data.translations.forEach((t, k) => (out[idx[k]] = t.translatedText));
  return out;
}
