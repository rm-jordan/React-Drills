/**
 * INTERVIEW DRILL 8 — Create update (controlled form + POST + onCreated)
 * See INTERVIEW_DRILLS.md Exercise 8
 * Reference: ../../../client/src/components/CreateUpdateForm.tsx
 *
 * STEPS (do in order):
 *  1. Add state: clientError, serverError, submitting (all start null/false)
 *  2. Write validate() — return error string or null (title + body required, trim first)
 *  3. In handleSubmit: call validate(); if error → setClientError and return
 *  4. Clear clientError + serverError, set submitting true
 *  5. await createUpdate({ title, body, blockers, userId }) — import from api/client + currentUser
 *  6. On success: onCreated(created), reset title/body/blockers to ""
 *  7. On catch: setServerError with a simple message
 *  8. finally: set submitting false
 *  9. JSX: show clientError/serverError above button; disable inputs + button while submitting
 */

import { FormEvent, useState } from "react";
import { createUpdate } from "../api/client";
import { currentUser } from "../currentUser";
import type { Update } from "../types";

interface Props {
  onCreated: (update: Update) => void;
}

export function CreateUpdateForm({ onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [blockers, setBlockers] = useState("");
  // Step 1: clientError, serverError, submitting
  const [clientError, setClientError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);


  // Step 2: function validate(): string | null { ... }
  function validate(): string | null {
    if (!title.trim()) return "Title is required";
    if (title.trim().length > 120) return "Title must be 120 characters or fewer";
    if (!body.trim()) return "Body is required";
    return null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Step 3:
    const validationError = validate();
    if (validationError) {
      setClientError(validationError);
      return;
    }

    // Step 4: passed validation — clear old errors, start submit
    setClientError(null);
    setServerError(null);
    setSubmitting(true);

    try {
      // Step 5: POST to API
      const created = await createUpdate({
        title: title.trim(),
        body: body.trim(),
        blockers: blockers.trim(),
        userId: currentUser.id,
      });

      // Step 6: tell parent + clear form
      onCreated(created);
      setTitle("");
      setBody("");
      setBlockers("");
    } catch {
      // Step 7: show server error
      setServerError("Could not create update.");
    } finally {
      // Step 8: done submitting
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
          // Step 9: disabled={submitting}
        />
      </div>

      <div className="form-field">
        <label htmlFor="create-body">Body</label>
        <textarea
          id="create-body"
          rows={3}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          // Step 9: 
          disabled={submitting}
        />
      </div>

      <div className="form-field">
        <label htmlFor="create-blockers">Blockers (optional)</label>
        <input
          id="create-blockers"
          value={blockers}
          onChange={(e) => setBlockers(e.target.value)}
          // Step 9: 
          disabled={submitting}
        />
      </div>

      {clientError && <p className="error-text">{clientError}</p>}
      {serverError && <p className="error-text">{serverError}</p>}

      <button type="submit" disabled={submitting} >
        {/* Step 9: disabled={submitting}, label "Creating…" while submitting */}
        
        {submitting ? "Creating…" : "Create Update"}
      </button>
    </form>
  );
}
