import { useState } from "react";
import { deleteUpdate, patchUpdate } from "../api/client";
import { currentUser } from "../currentUser";
import type { Update, UpdateStatus } from "../types";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { EditUpdateForm } from "./EditUpdateForm";

interface UpdateDetailProps {
  update: Update;
  authorName: string;
  userNames: Record<string, string>;
  onUpdated: (update: Update) => void;
  onDeleted: (id: string) => void;
  onStatsRefresh: () => void;
}

export function UpdateDetail({
  update,
  authorName,
  userNames,
  onUpdated,
  onDeleted,
  onStatsRefresh,
}: UpdateDetailProps) {
  const [editing, setEditing] = useState(false);
  const [commentRefreshKey, setCommentRefreshKey] = useState(0);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const isOwner = update.userId === currentUser.id;
  const isManager = currentUser.role === "manager";
  const canEdit = isOwner;
  const canDelete = isOwner || isManager;

  async function handleStatusChange(newStatus: UpdateStatus) {
    setStatusError(null);
    setStatusLoading(true);
    try {
      const patched = await patchUpdate(update.id, { status: newStatus });
      onUpdated(patched);
      onStatsRefresh();
    } catch (err) {
      setStatusError(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setStatusLoading(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Delete this update?")) return;
    setDeleteLoading(true);
    try {
      await deleteUpdate(update.id);
      onDeleted(update.id);
      onStatsRefresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setDeleteLoading(false);
    }
  }

  function handleCommentCreated() {
    // refreshKey pattern: bump key so CommentList re-fetches
    setCommentRefreshKey((k) => k + 1);
  }

  if (editing) {
    return (
      <EditUpdateForm
        update={update}
        onUpdated={(updated) => {
          onUpdated(updated);
          setEditing(false);
        }}
        onCancel={() => setEditing(false)}
      />
    );
  }

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

      <div className="actions">
        {canEdit && (
          <button type="button" onClick={() => setEditing(true)}>
            Edit
          </button>
        )}
        {canDelete && (
          <button type="button" className="danger" onClick={handleDelete} disabled={deleteLoading}>
            {deleteLoading ? "Deleting…" : "Delete"}
          </button>
        )}
      </div>

      {/* Role-gated: managers can mark updates as reviewed */}
      {isManager && update.status !== "reviewed" && (
        <div className="actions">
          <button
            type="button"
            onClick={() => handleStatusChange("reviewed")}
            disabled={statusLoading}
          >
            Mark as Reviewed
          </button>
        </div>
      )}
      {statusError && <p className="error-text">{statusError}</p>}

      <hr />
      <h3>Comments</h3>
      <CommentList
        updateId={update.id}
        refreshKey={commentRefreshKey}
        userNames={userNames}
      />
      <CommentForm updateId={update.id} onCreated={handleCommentCreated} />
    </div>
  );
}
