// SOLVED — reset with: npm run drills:reset
// Pattern: prev.map(u => u.id === id ? { ...u, field } : u)

import { useState } from "react";
import type { Update } from "../types";

const SEED: Update[] = [
  {
    id: "upd1",
    userId: "u1",
    title: "Ship feature",
    body: "Done",
    status: "pending",
    blockers: "",
    createdAt: "2026-06-10T09:00:00.000Z",
  },
];

export function BrokenUpdateInList() {
  const [updates, setUpdates] = useState<Update[]>(SEED);

  function markReviewed(id: string) {
    setUpdates((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "reviewed" } : u))
    );
  }

  return (
    <ul>
      {updates.map((update) => (
        <li key={update.id}>
          <span>{update.title}</span>
          <span data-testid={`status-${update.id}`}>{update.status}</span>
          {update.status === "pending" && (
            <button type="button" onClick={() => markReviewed(update.id)}>
              Mark reviewed
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
