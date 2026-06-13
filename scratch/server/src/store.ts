/**
 * SESSION 1 — In-memory store
 * TODO: Copy seed into mutable arrays, add generateUpdateId / generateCommentId / findUser
 * Reference: ../../server/src/store.ts
 */

import type { Comment, Update, User } from "./types.js";
import { comments as seedComments, updates as seedUpdates, users as seedUsers } from "./data/seed.js";

export const users: User[] = [...seedUsers];
export const updates: Update[] = [...seedUpdates];
export const comments: Comment[] = [...seedComments];

let nextUpdateId = 4;
let nextCommentId = 3;

export function generateUpdateId(): string {
  return `upd${nextUpdateId++}`;
}

export function generateCommentId(): string {
  return `cmt${nextCommentId++}`;
}

export function findUser(id: string): User | undefined {
  return users.find((user) => user.id === id);
}
