import cors from "cors";
import express, { type ErrorRequestHandler } from "express";
import { MulterError } from "multer";
import { TOKEN_TTL, checkCredentials, loginLimiter, signToken } from "./auth.js";
import { connectDb } from "./db.js";
import { env } from "./env.js";
import { adminNews, backfillSlugEn, publicNews } from "./routes/news.js";
import { adminProjects, publicProjects } from "./routes/projects.js";
import { translate } from "./routes/translate.js";

const app = express();
app.set("trust proxy", 1); // Render/Railway đứng sau proxy: lấy IP thật cho giới hạn đăng nhập
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());

app.get("/health", (_req, res) => void res.json({ ok: true }));

app.post("/api/auth/login", loginLimiter, async (req, res) => {
  if (!checkCredentials(req.body?.username, req.body?.password)) {
    return void res.status(401).json({ error: "Sai tên đăng nhập hoặc mật khẩu." });
  }
  res.json({ token: await signToken(), expiresIn: TOKEN_TTL });
});

app.use("/api/news", publicNews);
app.use("/api/admin/news", adminNews);
app.use("/api/projects", publicProjects);
app.use("/api/admin/projects", adminProjects);
app.use("/api/admin/translate", translate);

app.use((_req, res) => void res.status(404).json({ error: "Không tìm thấy." }));

const onError: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof MulterError) {
    return void res.status(400).json({ error: err.code === "LIMIT_FILE_SIZE" ? "Mỗi ảnh tối đa 4MB." : err.code === "LIMIT_UNEXPECTED_FILE" ? "Quá nhiều ảnh trong một lần lưu." : err.message });
  }
  console.error(err);
  res.status(500).json({ error: "Lỗi máy chủ." });
};
app.use(onError);

await connectDb();
await backfillSlugEn();
app.listen(env.port, () => console.log(`API chạy tại http://localhost:${env.port}`));
