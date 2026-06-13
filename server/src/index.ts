import cors from "cors";
import express from "express";
import { statsRouter } from "./routes/stats.js";
import { updatesRouter } from "./routes/updates.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/updates", updatesRouter);
app.use("/api/stats", statsRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
