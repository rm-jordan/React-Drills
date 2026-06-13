/**
 * Session 2: read-only view is enough.
 * Sessions 4–6: add edit, delete, comments, manager review (see main app).
 */
import type { Update } from "../types";

interface UpdateDetailProps {
  update: Update;
  authorName: string;
}

export function UpdateDetail({ update, authorName }: UpdateDetailProps) {
  return (
    <div className="panel">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <h2 style={{ margin: 0 }}>{update.title}</h2>
        <span className={`badge badge-${update.status}`}>{update.status}</span>
      </div>
      <p className="muted">
        {authorName} · {new Date(update.createdAt).toLocaleString()}
      </p>
      <p>{update.body}</p>
      {update.blockers && (
        <p>
          <strong>Blockers:</strong> {update.blockers}
        </p>
      )}
    </div>
  );
}
