import { Router } from "express";
import { updates } from "../store.js";
import type { Stats } from "../types.js";

export const statsRouter = Router();

statsRouter.get("/", (_req, res) => {
  const stats: Stats = {
    total: updates.length,
    pending: updates.filter((u) => u.status === "pending").length,
    reviewed: updates.filter((u) => u.status === "reviewed").length,
    blocked: updates.filter((u) => u.status === "blocked").length,
  };

  res.json(stats);
});
