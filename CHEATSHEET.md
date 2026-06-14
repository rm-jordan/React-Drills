# Cheatsheet — 10 Patterns in This Codebase

These are the patterns interviewers probe in a Lattice-style updates exercise. Each maps to working code in the **main app** and practice in **`scratch/`**.

---

## 1. Central API client

**Where:** `client/src/api/client.ts`

**Pattern:** One `request<T>()` wrapper; thin exported functions per endpoint.

**Why:** Single place for headers, JSON parse, and `{ error }` handling.

**Interview line:** "All network calls go through one helper so errors are consistent."

---

## 2. useEffect fetch + cleanup

**Where:** `UpdatesPage.tsx` (load), `CommentList.tsx`, `StatsPanel.tsx`

**Pattern:**
```ts
useEffect(() => {
  let cancelled = false;
  async function load() { /* fetch; if (!cancelled) setState */ }
  load();
  return () => { cancelled = true; };
}, [deps]);
```

**Why:** Avoids stale responses and setState after unmount.

---

## 3. Loading / error / empty early returns

**Where:** `UpdatesPage.tsx`, `CommentList.tsx`, `StatsPanel.tsx`

**Pattern:** Check `loading` → `error` → empty data → main UI.

**Why:** One UI state at a time; no list flashing under a spinner.

---

## 4. Immutable array updates

**Where:** `UpdatesPage` — `handleCreated`, `handleUpdated`, `handleDeleted`

| Action | Pattern |
|--------|---------|
| Create | `setUpdates(prev => [item, ...prev])` |
| Update one | `prev.map(u => u.id === id ? updated : u)` |
| Delete | `prev.filter(u => u.id !== id)` |

**Never:** `arr.push(x); setUpdates(arr)` or `arr[i].field = x`

---

## 5. Controlled forms + dual validation

**Where:** `CreateUpdateForm.tsx`, `EditUpdateForm.tsx`, `CommentForm.tsx`, `server/src/validation.ts`

**Pattern:** `value` + `onChange`; client `validate()` before fetch; server returns 400.

**Why:** Client = UX; server = source of truth.

---

## 6. Parent sync after mutations

**Where:** `CreateUpdateForm` → `onCreated`; `UpdateDetail` → `onUpdated` / `onDeleted`

**Pattern:** API returns saved record → parent updates `updates[]` → list + detail re-render.

**Why:** Parent owns shared list; children don't duplicate server state.

---

## 7. useMemo for filter / sort

**Where:** `UpdatesPage.tsx` — `filteredUpdates`

**Pattern:** Filter → `[...result].sort()` inside `useMemo([updates, search, ...])`.

**Why:** Avoid recomputing on unrelated renders; don't mutate source array.

---

## 8. Stable list keys

**Where:** `UpdateList.tsx`, all `.map()` renders

**Pattern:** `key={item.id}` not `key={index}`

**Why:** Correct component identity when list changes length or order.

---

## 9. Nested resource + refreshKey

**Where:** `CommentList.tsx`, `CommentForm.tsx`, `server/routes/updates.ts`

**Pattern:** Routes at `/updates/:id/comments`; child fetches; parent bumps `refreshKey` after POST.

**Why:** Clear ownership; simple refetch vs merging nested state in parent.

---

## 10. Role-gated UI

**Where:** `currentUser.ts`, `UpdateDetail.tsx`, `StatsPanel` in `UpdatesPage`

**Pattern:** `{currentUser.role === "manager" && <Button />}`

**Why:** Simulate auth without building login; easy to discuss middleware swap-in.

---

## TypeScript tips in this repo

- Import app types: `import type { Update } from "../types"` — not DOM `Comment`
- Route params: `"/:id"` not `"/id"` for `req.params.id`
- PATCH body: `Partial<{ ... }>` for optional fields

---

## 60-second architecture pitch

> "Express in-memory API with validation. React page owns `updates` and selection. API client wraps fetch. Forms submit to server and merge responses into parent state. Comments are a nested resource with refreshKey. Managers see stats and review actions gated by role."

---

## When stuck — check this order

1. Network tab — request/response OK?
2. State update immutable?
3. Correct `useEffect` deps + cleanup?
4. Controlled input (no `defaultValue`)?
5. Parent notified after mutation?

See also: `INTERVIEW_DRILLS.md`, `TALK_THROUGH.md`, `client/src/drills/` for bug-fix reps.
