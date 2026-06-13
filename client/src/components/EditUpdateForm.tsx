import { FormEvent, useEffect, useState } from "react";
import { patchUpdate } from "../api/client";
import type { Update } from "../types";

interface EditUpdateFormProps {
  update: Update;
  onUpdated: (update: Update) => void;
  onCancel: () => void;
}

export function EditUpdateForm({ update, onUpdated, onCancel }: EditUpdateFormProps) {
  const [title, setTitle] = useState(update.title);
  const [body, setBody] = useState(update.body);
  const [blockers, setBlockers] = useState(update.blockers);
  const [clientError, setClientError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Reset form when a different update is selected
  useEffect(() => {
    setTitle(update.title);
    setBody(update.body);
    setBlockers(update.blockers);
    setClientError(null);
    setServerError(null);
  }, [update.id, update.title, update.body, update.blockers]);

  function validate(): string | null {
    if (!title.trim()) return "Title is required";
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
      const updated = await patchUpdate(update.id, {
        title: title.trim(),
        body: body.trim(),
        blockers: blockers.trim(),
      });
      onUpdated(updated);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Update</h3>
      <div className="form-field">
        <label htmlFor="edit-title">Title</label>
        <input
          id="edit-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={submitting}
        />
      </div>
      <div className="form-field">
        <label htmlFor="edit-body">Body</label>
        <textarea
          id="edit-body"
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={submitting}
        />
      </div>
      <div className="form-field">
        <label htmlFor="edit-blockers">Blockers</label>
        <input
          id="edit-blockers"
          value={blockers}
          onChange={(e) => setBlockers(e.target.value)}
          disabled={submitting}
        />
      </div>
      {clientError && <p className="error-text">{clientError}</p>}
      {serverError && <p className="error-text">{serverError}</p>}
      <div className="actions">
        <button type="submit" disabled={submitting}>
          {submitting ? "Saving…" : "Save"}
        </button>
        <button type="button" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
      </div>
    </form>
  );
}
