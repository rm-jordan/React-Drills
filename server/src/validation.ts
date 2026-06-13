/**
 * Server-side validation for POST/PATCH bodies.
 * Routes call these before touching the store; invalid input returns 400 with `error`.
 * Each helper returns { ok: true, data } (trimmed, typed fields) or { ok: false, error }.
 * PATCH only validates fields that are present — at least one is required.
 */
import type { UpdateStatus } from "./types.js";

const VALID_STATUSES: UpdateStatus[] = ["pending", "reviewed", "blocked"];

export function validateCreateUpdate(body: unknown): { ok: true; data: { title: string; body: string; blockers: string; userId: string } } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Request body is required" };
  }

  const { title, body: updateBody, blockers, userId } = body as Record<string, unknown>;

  if (typeof title !== "string" || title.trim().length === 0) {
    return { ok: false, error: "title is required" };
  }
  if (title.trim().length > 120) {
    return { ok: false, error: "title must be 120 characters or fewer" };
  }
  if (typeof updateBody !== "string" || updateBody.trim().length === 0) {
    return { ok: false, error: "body is required" };
  }
  if (typeof userId !== "string" || userId.trim().length === 0) {
    return { ok: false, error: "userId is required" };
  }

  return {
    ok: true,
    data: {
      title: title.trim(),
      body: updateBody.trim(),
      blockers: typeof blockers === "string" ? blockers.trim() : "",
      userId: userId.trim(),
    },
  };
}

export function validatePatchUpdate(body: unknown): { ok: true; data: Partial<{ title: string; body: string; status: UpdateStatus; blockers: string }> } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Request body is required" };
  }

  const input = body as Record<string, unknown>;
  const data: Partial<{ title: string; body: string; status: UpdateStatus; blockers: string }> = {};

  if ("title" in input) {
    if (typeof input.title !== "string" || input.title.trim().length === 0) {
      return { ok: false, error: "title cannot be empty" };
    }
    if (input.title.trim().length > 120) {
      return { ok: false, error: "title must be 120 characters or fewer" };
    }
    data.title = input.title.trim();
  }

  if ("body" in input) {
    if (typeof input.body !== "string" || input.body.trim().length === 0) {
      return { ok: false, error: "body cannot be empty" };
    }
    data.body = input.body.trim();
  }

  if ("status" in input) {
    if (typeof input.status !== "string" || !VALID_STATUSES.includes(input.status as UpdateStatus)) {
      return { ok: false, error: "status must be pending, reviewed, or blocked" };
    }
    data.status = input.status as UpdateStatus;
  }

  if ("blockers" in input) {
    if (typeof input.blockers !== "string") {
      return { ok: false, error: "blockers must be a string" };
    }
    data.blockers = input.blockers.trim();
  }

  if (Object.keys(data).length === 0) {
    return { ok: false, error: "At least one field is required" };
  }

  return { ok: true, data };
}

export function validateCreateComment(body: unknown): { ok: true; data: { text: string; userId: string } } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Request body is required" };
  }

  const { text, userId } = body as Record<string, unknown>;

  if (typeof text !== "string" || text.trim().length === 0) {
    return { ok: false, error: "text is required" };
  }
  if (typeof userId !== "string" || userId.trim().length === 0) {
    return { ok: false, error: "userId is required" };
  }

  return {
    ok: true,
    data: { text: text.trim(), userId: userId.trim() },
  };
}
