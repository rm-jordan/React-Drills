/**
 * SESSION 2 — API client
 * TODO: request() helper + fetchUpdates, fetchUpdate, createUpdate, patchUpdate,
 *       deleteUpdate, fetchComments, createComment, fetchStats
 * Reference: ../../../client/src/api/client.ts
 */

import type { Comment, Stats, Update, UpdateStatus } from "../types";

const BASE = "/api";

// TODO: async function request<T>(path, options?) { ... }

export function fetchUpdates(): Promise<Update[]> {
  throw new Error("TODO: fetchUpdates");
}

export function fetchUpdate(_id: string): Promise<Update> {
  throw new Error("TODO: fetchUpdate");
}

export function createUpdate(_data: {
  title: string;
  body: string;
  blockers?: string;
  userId: string;
}): Promise<Update> {
  throw new Error("TODO: createUpdate");
}

export function patchUpdate(
  _id: string,
  _data: Partial<{ title: string; body: string; status: UpdateStatus; blockers: string }>
): Promise<Update> {
  throw new Error("TODO: patchUpdate");
}

export function deleteUpdate(_id: string): Promise<Update> {
  throw new Error("TODO: deleteUpdate");
}

export function fetchComments(_updateId: string): Promise<Comment[]> {
  throw new Error("TODO: fetchComments");
}

export function createComment(
  _updateId: string,
  _data: { text: string; userId: string }
): Promise<Comment> {
  throw new Error("TODO: createComment");
}

export function fetchStats(): Promise<Stats> {
  throw new Error("TODO: fetchStats");
}
