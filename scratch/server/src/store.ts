/**
 * SESSION 1 — In-memory store
 * TODO: Copy seed into mutable arrays, add generateUpdateId / generateCommentId / findUser
 * Reference: ../../server/src/store.ts
 */

import type { Comment, Update, User } from "./types.js";

export const users: User[] = [];
export const updates: Update[] = [];
export const comments: Comment[] = [];

export function generateUpdateId(): string {
  throw new Error("TODO: implement generateUpdateId");
}

export function generateCommentId(): string {
  throw new Error("TODO: implement generateCommentId");
}

export function findUser(id: string): User | undefined {
  throw new Error("TODO: implement findUser");
}
