// Nhận yêu cầu báo giá từ form.
// TODO: nối với kênh nhận thật (email qua Resend/SMTP, Google Sheets, Telegram/Zalo bot...).

export async function POST(request: Request) {
  const form = await request.formData();
  const name = String(form.get("name") ?? "").trim();
  const phone = String(form.get("phone") ?? "").trim();
  const product = String(form.get("product") ?? "");
  const message = String(form.get("message") ?? "").trim();

  if (!name || !/^[0-9 +.\-]{9,15}$/.test(phone)) {
    return Response.json(
      { ok: false, error: "Cần nhập họ tên và số điện thoại hợp lệ." },
      { status: 400 },
    );
  }

  console.log("[bao-gia]", { name, phone, product, message });

  return Response.json({ ok: true });
}
