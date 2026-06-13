/**
 * SESSION 1 — Server-side validation
 * TODO: validateCreateUpdate, validatePatchUpdate, validateCreateComment
 * Return { ok: true, data } or { ok: false, error: string }
 * Reference: ../../server/src/validation.ts
 */

import type { UpdateStatus } from "./types.js";

export function validateCreateUpdate(_body: unknown) {
  return { ok: false as const, error: "TODO: implement validateCreateUpdate" };
}

export function validatePatchUpdate(_body: unknown) {
  return { ok: false as const, error: "TODO: implement validatePatchUpdate" };
}

export function validateCreateComment(_body: unknown) {
  return { ok: false as const, error: "TODO: implement validateCreateComment" };
}

export type { UpdateStatus };
