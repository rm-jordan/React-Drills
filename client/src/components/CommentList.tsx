import { useEffect, useState } from "react";
import { fetchComments } from "../api/client";
import type { Comment } from "../types";

interface CommentListProps {
  updateId: string;
  refreshKey: number;
  userNames: Record<string, string>;
}

export function CommentList({ updateId, refreshKey, userNames }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchComments(updateId);
        if (!cancelled) {
          setComments(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load comments");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [updateId, refreshKey]);

  if (loading) return <p className="muted">Loading comments…</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (comments.length === 0) return <p className="muted">No comments yet.</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {comments.map((comment) => (
        <li key={comment.id} className="card" style={{ marginBottom: "0.5rem" }}>
          <strong>{userNames[comment.userId] ?? "Unknown"}</strong>
          <span className="muted"> · {new Date(comment.createdAt).toLocaleString()}</span>
          <p style={{ margin: "0.25rem 0 0" }}>{comment.text}</p>
        </li>
      ))}
    </ul>
  );
}
