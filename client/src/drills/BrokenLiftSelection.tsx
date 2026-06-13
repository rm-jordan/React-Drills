// SOLVED — reset with: npm run drills:reset
// Pattern: lift selectedId to parent; pass onSelect down, selected update to detail

import { useState } from "react";
import type { Update } from "../types";

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

function UpdateList({
  updates,
  onSelect,
}: {
  updates: Update[];
  onSelect: (id: string) => void;
}) {
  return (
    <ul>
      {updates.map((u) => (
        <li key={u.id}>
          <button type="button" onClick={() => onSelect(u.id)}>
            {u.title}
          </button>
        </li>
      ))}
    </ul>
  );
}

function UpdateDetail({
  updates,
  selectedId,
}: {
  updates: Update[];
  selectedId: string | null;
}) {
  const selected = updates.find((u) => u.id === selectedId);
  if (!selected) return <p>No update selected</p>;

  return <div data-testid="detail">{selected.title}</div>;
}

export function BrokenLiftSelection() {
  const [selectedId, setSelectedId] = useState<string | null>(UPDATES[0]?.id ?? null);

  return (
    <div>
      <UpdateList updates={UPDATES} onSelect={setSelectedId} />
      <UpdateDetail updates={UPDATES} selectedId={selectedId} />
    </div>
  );
}
