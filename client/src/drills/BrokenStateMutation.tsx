// TODO DRILL: Adding an item to the list does not update the UI.
// Fix: return a new array instead of mutating state in place.

import { useState } from "react";
import type { Update } from "../types";

export function BrokenStateMutation() {
  const [updates, setUpdates] = useState<Update[]>([]);

  function addUpdate(update: Update) {
    // BUG: push mutates the same array reference
    updates.push(update);
    setUpdates(updates);
  }

  return (
    <div>
      <p>Count: {updates.length}</p>
      <button
        type="button"
        onClick={() =>
          addUpdate({
            id: `upd-${Date.now()}`,
            userId: "u1",
            title: "New",
            body: "Test",
            status: "pending",
            blockers: "",
            createdAt: new Date().toISOString(),
          })
        }
      >
        Add (broken)
      </button>
    </div>
  );
}
