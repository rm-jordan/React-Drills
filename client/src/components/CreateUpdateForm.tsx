import { FormEvent, useState } from "react";
import { createUpdate } from "../api/client";
import { currentUser } from "../currentUser";
import type { Update } from "../types";

interface CreateUpdateFormProps {
  onCreated: (update: Update) => void;
}

export function CreateUpdateForm({ onCreated }: CreateUpdateFormProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [blockers, setBlockers] = useState("");
  const [clientError, setClientError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function validate(): string | null {
    if (!title.trim()) return "Title is required";
    if (title.trim().length > 120) return "Title must be 120 characters or fewer";
    if (!body.trim()) return "Body is required";
    return null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setClientError(null);
    setServerError(null);

    const validationError = validate();
    if (validationError) {
      setClientError(validationError);
      return;
    }

    setSubmitting(true);
    try {
      const created = await createUpdate({
        title: title.trim(),
        body: body.trim(),
        blockers: blockers.trim(),
        userId: currentUser.id,
      });
      onCreated(created);
      setTitle("");
      setBody("");
      setBlockers("");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Failed to create update");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="panel">
      <h3>New Update</h3>
      <div className="form-field">
        <label htmlFor="create-title">Title</label>
        <input
          id="create-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={submitting}
        />
      </div>
      <div className="form-field">
        <label htmlFor="create-body">Body</label>
        <textarea
          id="create-body"
          rows={3}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={submitting}
        />
      </div>
      <div className="form-field">
        <label htmlFor="create-blockers">Blockers (optional)</label>
        <input
          id="create-blockers"
          value={blockers}
          onChange={(e) => setBlockers(e.target.value)}
          disabled={submitting}
        />
      </div>
      {clientError && <p className="error-text">{clientError}</p>}
      {serverError && <p className="error-text">{serverError}</p>}
      <button type="submit" disabled={submitting}>
        {submitting ? "Creating…" : "Create Update"}
      </button>
    </form>
  );
}
