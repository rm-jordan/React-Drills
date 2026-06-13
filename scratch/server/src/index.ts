import cors from "cors";
import express from "express";
// TODO Session 1: uncomment when routes are ready
import { statsRouter } from "./routes/stats.js";
import { updatesRouter } from "./routes/updates.js";

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, app: "scratch" });
});

// TODO Session 1:
app.use("/api/updates", updatesRouter);
app.use("/api/stats", statsRouter);

app.listen(PORT, () => {
  console.log(`Scratch API http://localhost:${PORT}`);
});
