import { Router } from "express";
import { requireAdmin } from "../auth.js";
import { TranslateError, translateTexts } from "../translate.js";

// POST { texts: string[], source?: "vi", target?: "en" } → { texts: string[] } (cùng thứ tự)
export const translate = Router();
translate.use(requireAdmin);

translate.post("/", async (req, res) => {
  const texts: unknown = req.body?.texts;
  if (!Array.isArray(texts) || !texts.every((t) => typeof t === "string")) {
    return void res.status(400).json({ error: "Dữ liệu cần dịch không hợp lệ." });
  }
  try {
    const source = req.body.source === "en" ? "en" : "vi";
    res.json({ texts: await translateTexts(texts, source, source === "vi" ? "en" : "vi") });
  } catch (e) {
    if (e instanceof TranslateError) return void res.status(e.status).json({ error: e.message });
    throw e;
  }
});
