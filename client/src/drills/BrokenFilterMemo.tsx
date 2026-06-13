// SOLVED — reset with: npm run drills:reset
// Pattern: filter first, then [...copy].sort() — never sort the source array

import type { Update } from "../types";

export function filterUpdatesBroken(updates: Update[], search: string): Update[] {
  const query = search.trim().toLowerCase();
  const filtered = updates.filter((u) => u.title.toLowerCase().includes(query));

  return [...filtered].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
