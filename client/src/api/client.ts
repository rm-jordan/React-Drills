import type { Comment, Stats, Update, UpdateStatus } from "../types";

const BASE = "/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  // INTERVIEW DRILL 5 (reference): central fetch + error parsing
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const message = typeof body.error === "string" ? body.error : res.statusText;
    throw new Error(message || `Request failed (${res.status})`);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

// --- Updates ---

export function fetchUpdates(): Promise<Update[]> {
  return request<Update[]>("/updates");
}

export function fetchUpdate(id: string): Promise<Update> {
  return request<Update>(`/updates/${id}`);
}

export function createUpdate(data: {
  title: string;
  body: string;
  blockers?: string;
  userId: string;
}): Promise<Update> {
  return request<Update>("/updates", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function patchUpdate(
  id: string,
  data: Partial<{ title: string; body: string; status: UpdateStatus; blockers: string }>
): Promise<Update> {
  return request<Update>(`/updates/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteUpdate(id: string): Promise<Update> {
  return request<Update>(`/updates/${id}`, {
    method: "DELETE",
  });
}

// --- Comments (nested under updates) ---

export function fetchComments(updateId: string): Promise<Comment[]> {
  return request<Comment[]>(`/updates/${updateId}/comments`);
}

export function createComment(
  updateId: string,
  data: { text: string; userId: string }
): Promise<Comment> {
  return request<Comment>(`/updates/${updateId}/comments`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// --- Stats ---

export function fetchStats(): Promise<Stats> {
  return request<Stats>("/stats");
}
