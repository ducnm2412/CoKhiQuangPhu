# Font

Các file `.woff2` trong thư mục này được cắt gọn từ font gốc trên Google Fonts (giấy phép SIL Open Font License 1.1):

| File | Font gốc | Xử lý |
|---|---|---|
| `archivo-condensed-600/800.woff2` | Archivo (Omnibus-Type) | Cố định độ rộng `wdth 72`, độ đậm 600 / 800 |
| `be-vietnam-pro-400/500/600.woff2` | Be Vietnam Pro (Lâm Bảo, Tony Le, ViệtAnh Nguyễn) | Giữ nguyên |
| `jetbrains-mono-400.woff2` | JetBrains Mono (JetBrains) | Cố định độ đậm 400 |

Mỗi file chỉ giữ ký tự Latin, Latin mở rộng, tiếng Việt và vài ký hiệu (– — · → ↓ ₫), gộp vào một file
thay vì 3 file theo bộ ký tự của Google Fonts.

Tạo lại: tải font gốc từ https://github.com/google/fonts/tree/main/ofl rồi dùng `fontTools`
(`varLib.instancer` + `subset`, flavor `woff2`).
