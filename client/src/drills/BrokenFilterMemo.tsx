// TODO DRILL: Filtering/sorting is slow and sometimes shuffles the main list.
// Fix: use useMemo, copy before sort, don't mutate props/state arrays.

import type { Update } from "../types";

export function filterUpdatesBroken(updates: Update[], search: string): Update[] {
  const query = search.trim().toLowerCase();

  const filtered = updates.filter((u) => u.title.toLowerCase().includes(query));

  // Copy before sort — .sort() mutates in place
  return [...filtered].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

// Also practice: wrap the call site in useMemo with [updates, search] deps
