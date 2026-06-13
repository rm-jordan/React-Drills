// TODO DRILL: Clicking "Mark reviewed" does not update the badge.
// Fix: replace the item with .map(), don't mutate the object inside state.

import { useState } from "react";
import type { Update } from "../../types";

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
    const index = updates.findIndex((u) => u.id === id);
    if (index === -1) return;

    // BUG: mutates the object already in state
    updates[index].status = "reviewed";
    setUpdates(updates);
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
