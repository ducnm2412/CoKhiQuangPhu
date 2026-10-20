# Cơ khí Quảng Phú

Repo gồm 2 phần (npm workspaces):

| Thư mục | Nội dung | Deploy |
| --- | --- | --- |
| `frontend/` | Next.js 16: site công khai (`/vi`, `/en`) và trang quản trị tin tức `/admin` | Vercel (Root Directory = `frontend`) |
| `backend/` | API Express + TypeScript: tin tức (MongoDB), ảnh (Cloudinary), đăng nhập JWT | Render / Railway (Root Directory = `backend`) |

Frontend chỉ gọi backend từ phía server (Server Components, Server Actions), nên token quản trị không lộ ra trình duyệt.

## Chạy trên máy

```bash
npm install                                   # cài cho cả hai phần
cp backend/.env.example backend/.env          # điền MongoDB, Cloudinary, mật khẩu, JWT_SECRET
cp frontend/.env.example frontend/.env.local  # API_URL=http://localhost:4000
npm run seed:news -w backend                  # (một lần) nạp các tin ban đầu
npm run dev:be                                # API: http://localhost:4000
npm run dev:fe                                # Site: http://localhost:3000, quản trị: /admin
```

Lưu ý: `npm run build:fe` cần backend đang chạy, vì lúc build sẽ dựng sẵn các trang tin.

## API

| Method | Đường dẫn | Ghi chú |
| --- | --- | --- |
| POST | `/api/auth/login` | `{ password }` → `{ token, expiresIn }` |
| GET | `/api/news?lang=vi\|en` | Tin đang hiển thị |
| GET | `/api/news/:slug?lang=vi\|en` | Một tin |
| GET | `/api/admin/news` | Tất cả tin (cần `Authorization: Bearer <token>`) |
| GET | `/api/admin/news/:id` | |
| POST | `/api/admin/news` | multipart/form-data, ảnh ở field `image` (tối đa 4MB) |
| PUT | `/api/admin/news/:id` | như POST; không gửi ảnh thì giữ ảnh cũ |
| PATCH | `/api/admin/news/:id/publish` | Ẩn/hiện |
| DELETE | `/api/admin/news/:id` | Xóa bài và ảnh trên Cloudinary |

## Deploy

- **Backend (Render/Railway):** Build `npm install && npm run build`, Start `npm start`. Khai báo các biến trong `backend/.env.example`, đặt `CORS_ORIGIN` là domain frontend. Trên MongoDB Atlas, mở Network Access cho server.
- **Frontend (Vercel):** Root Directory `frontend`, biến `API_URL` = URL backend.
