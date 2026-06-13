/**
 * Static data — app works before API is wired.
 * Session 2: replace useState(STATIC_UPDATES) with [] and load via fetchUpdates().
 */
import type { Update } from "../types";

export const STATIC_USER_NAMES: Record<string, string> = {
  u1: "Alex Chen",
  u2: "Jordan Lee",
  u3: "Sam Rivera",
};

export const STATIC_UPDATES: Update[] = [
  {
    id: "upd1",
    userId: "u1",
    title: "Shipped onboarding checklist",
    body: "Finished the new hire onboarding flow and updated docs.",
    status: "pending",
    blockers: "",
    createdAt: "2026-06-10T09:00:00.000Z",
  },
  {
    id: "upd2",
    userId: "u2",
    title: "Blocked on API access",
    body: "Waiting for staging credentials before I can test the integration.",
    status: "blocked",
    blockers: "Need staging API keys from DevOps",
    createdAt: "2026-06-11T14:30:00.000Z",
  },
  {
    id: "upd3",
    userId: "u1",
    title: "Q2 goals draft",
    body: "Shared first draft of Q2 goals with the team for feedback.",
    status: "reviewed",
    blockers: "",
    createdAt: "2026-06-09T16:00:00.000Z",
  },
];
