export type Role = "employee" | "manager";

export interface User {
  id: string;
  name: string;
  role: Role;
}

export type UpdateStatus = "pending" | "reviewed" | "blocked";

export interface Update {
  id: string;
  userId: string;
  title: string;
  body: string;
  status: UpdateStatus;
  blockers: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  updateId: string;
  userId: string;
  text: string;
  createdAt: string;
}

export interface Stats {
  total: number;
  pending: number;
  reviewed: number;
  blocked: number;
}

export type SortField = "createdAt" | "title" | "status";
export type SortDirection = "asc" | "desc";
