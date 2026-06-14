/** INTERVIEW DRILL 7 — UpdateCard (wired; verify key={update.id} in list) */

import type { Update } from "../types";

interface UpdateCardProps {
  update: Update;
  authorName: string;
  selected: boolean;
  onSelect: (id: string) => void;
}

export function UpdateCard({ update, authorName, selected, onSelect }: UpdateCardProps) {
  return (
    <div
      className={`card${selected ? " selected" : ""}`}
      role="button"
      tabIndex={0}
      onClick={() => onSelect(update.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect(update.id);
        }
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
        <strong>{update.title}</strong>
        <span className={`badge badge-${update.status}`}>{update.status}</span>
      </div>
      <p className="muted" style={{ margin: "0.25rem 0" }}>
        {authorName} · {new Date(update.createdAt).toLocaleDateString()}
      </p>
      <p style={{ margin: 0 }}>
        {update.body.slice(0, 100)}
        {update.body.length > 100 ? "…" : ""}
      </p>
    </div>
  );
}
