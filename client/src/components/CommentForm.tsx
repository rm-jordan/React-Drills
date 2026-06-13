import { FormEvent, useState } from "react";
import { createComment } from "../api/client";
import { currentUser } from "../currentUser";

interface CommentFormProps {
  updateId: string;
  onCreated: () => void;
}

export function CommentForm({ updateId, onCreated }: CommentFormProps) {
  const [text, setText] = useState("");
  const [clientError, setClientError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setClientError(null);
    setServerError(null);

    if (!text.trim()) {
      setClientError("Comment cannot be empty");
      return;
    }

    setSubmitting(true);
    try {
      await createComment(updateId, {
        text: text.trim(),
        userId: currentUser.id,
      });
      setText("");
      onCreated();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <div className="form-field">
        <label htmlFor="comment-text">Add a comment</label>
        <textarea
          id="comment-text"
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={submitting}
        />
      </div>
      {clientError && <p className="error-text">{clientError}</p>}
      {serverError && <p className="error-text">{serverError}</p>}
      <button type="submit" disabled={submitting}>
        {submitting ? "Posting…" : "Post Comment"}
      </button>
    </form>
  );
}
