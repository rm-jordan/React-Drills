import { comments as seedComments, updates as seedUpdates, users as seedUsers } from "./data/seed.js";
import type { Comment, Update, User } from "./types.js";

// In-memory store — resets on server restart
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
  return users.find((u) => u.id === id);
}
