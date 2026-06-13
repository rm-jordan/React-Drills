/**
 * SESSION 1 — Seed data
 * TODO: Add users, updates, and comments arrays.
 * Reference: ../react-drills/server/src/data/seed.ts (main app)
 */

import type { Comment, Update, User } from "../types.js";

export const users: User[] = [
  { id: "u1", name: "Tulum Rodriguez", role: "employee" },
  { id: "u2", name: "Steven Gerrard", role: "employee" },
  { id: "u3", name: "Andy Carroll", role: "manager" },
];

export const updates: Update[] = [
  {
    id: "upd1",
    userId: "u1",
    title: "Shipped then dipped",
    body: "Finished the new hire onboarding flow and updated all documentation required",
    status: "pending",
    blockers: "",
    createdAt: "2026-06-10T09:00:00.000Z",
  },
  {
    id: "upd2",
    userId: "u2",
    title: "API integration blocked",
    body: "Waiting for staging credentials before I can test the integration.",
    status: "blocked",
    blockers: "Need staging API keys from DevOps team",
    createdAt: "2026-06-11T14:30:00.000Z",
  },
  {
    id: "upd3",
    userId: "u1",
    title: "Q2 goals draft",
    body: "Shared first draft of Q2 goals with the team",
    createdAt: "2026-06-11T14:30:00.000Z",
    status: "pending",
    blockers: ""
  },
];

export const comments: Comment[] = [
  {
    id: "cmt1",
    updateId: "upd1",
    userId: "u3",
    text: "Looks good — can you add a link to the doc?",
    createdAt: "2026-06-10T10:15:00.000Z",
  },
  {
    id: "cmt2",
    updateId: "upd2",
    userId: "u3",
    text: "I'll ping DevOps today.",
    createdAt: "2026-06-11T15:00:00.000Z",
  },
];