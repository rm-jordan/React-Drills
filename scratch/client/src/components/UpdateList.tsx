/** INTERVIEW DRILL 7 — List rendering & selection (wired; verify after DRILL 6) */

import type { Update } from "../types";
import { UpdateCard } from "./UpdateCard";

interface UpdateListProps {
  updates: Update[];
  userNames: Record<string, string>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function UpdateList({ updates, userNames, selectedId, onSelect }: UpdateListProps) {
  if (updates.length === 0) {
    return <p className="muted">No updates to show.</p>;
  }

  return (
    <div>
      {updates.map((update) => (
        <UpdateCard
          key={update.id}
          update={update}
          authorName={userNames[update.userId] ?? "Unknown"}
          selected={update.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
