// TODO DRILL: Clicking a list item does not update the detail panel.
// Fix: lift selectedId to parent; list calls onSelect(id), detail reads selected update.

import { useState } from "react";
import type { Update } from "../../types";

const UPDATES: Update[] = [
  {
    id: "upd1",
    userId: "u1",
    title: "First update",
    body: "Body one",
    status: "pending",
    blockers: "",
    createdAt: "2026-06-10T09:00:00.000Z",
  },
  {
    id: "upd2",
    userId: "u1",
    title: "Second update",
    body: "Body two",
    status: "reviewed",
    blockers: "",
    createdAt: "2026-06-11T09:00:00.000Z",
  },
];

function UpdateListBroken({ updates }: { updates: Update[] }) {
  // BUG: selection lives in the list — parent/detail can't see it
  const [selectedId, setSelectedId] = useState<string | null>(updates[0]?.id ?? null);

  return (
    <ul>
      {updates.map((u) => (
        <li key={u.id}>
          <button type="button" onClick={() => setSelectedId(u.id)}>
            {u.title}
          </button>
        </li>
      ))}
    </ul>
  );
}

function UpdateDetailBroken({ updates }: { updates: Update[] }) {
  // Always shows first item — not wired to list selection
  const selected = updates[0];
  if (!selected) return <p>No update selected</p>;

  return <div data-testid="detail">{selected.title}</div>;
}

export function BrokenLiftSelection() {
  return (
    <div>
      <UpdateListBroken updates={UPDATES} />
      <UpdateDetailBroken updates={UPDATES} />
    </div>
  );
}
