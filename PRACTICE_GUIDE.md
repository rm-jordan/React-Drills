# Practice Guide — Order of Operations

Follow this file top to bottom. Check off each step as you go.

**Before you start:**
```bash
npm run install:all
npm run dev
```
- App: http://localhost:5173  
- API: http://localhost:3001/api/updates  

**How to use this repo:**
- **Track A (Study)** — Read/working code in order; best first pass.
- **Track B (Rebuild)** — Hide or delete the listed files and re-implement from the step goal. Best for interview simulation.
- **Track C (Bug drills)** — Fix broken files in `client/src/drills/` after Track A.

Deep reference: [STUDY_NOTES.md](./STUDY_NOTES.md)

---

## Track A — Study the working app (recommended first)

### Step 1 — Project setup & seed data
**Goal:** Understand types and in-memory data.

- [ x] Read `server/src/types.ts`
- [ x] Read `server/src/data/seed.ts`
- [ x] Read `server/src/store.ts`
- [ x] Read `client/src/types.ts`
- [ x] Read `client/src/currentUser.ts` — toggle employee vs manager later

**Verify:** Server starts; `curl http://localhost:3001/api/health` returns `{"ok":true}`

---

### Step 2 — Backend routes & validation
**Goal:** REST API + server-side validation.

- [ x] Read `server/src/validation.ts`
- [ x] Read `server/src/routes/updates.ts`
- [ x] Read `server/src/routes/stats.ts`
- [ x] Read `server/src/index.ts`

**Verify:**
```bash
curl http://localhost:3001/api/updates
curl http://localhost:3001/api/stats
curl -X POST http://localhost:3001/api/updates \
  -H "Content-Type: application/json" \
  -d '{"title":"","body":"x","userId":"u1"}'   # expect 400
```

---

### Step 3 — API client helpers
**Goal:** One place for all `fetch` calls.

- [ x] Read `client/src/api/client.ts`
- [ x] Note: errors parsed from `{ error: string }` body

**Verify:** Open DevTools → Network tab while app loads; confirm `/api/updates` calls succeed. - done 

---

### Step 4 — Updates list & detail (read path)
**Goal:** Load data on mount; show list + selected detail.

| Order | File | What to notice |
|-------|------|----------------|
| 1 | `client/src/main.tsx` | Entry point |
| 2 | `client/src/App.tsx` | Renders `UpdatesPage` |
| 3 | `client/src/components/UpdatesPage.tsx` | `useEffect` load, loading/error states |
| 4 | `client/src/components/UpdateList.tsx` | Empty state |
| 5 | `client/src/components/UpdateCard.tsx` | Click to select |
| 6 | `client/src/components/UpdateDetail.tsx` | Read-only view first (ignore edit/comments for now) |

**Verify:** App shows 3 seed updates; clicking one shows detail on the right.

---

### Step 5 — Create, edit, delete updates
**Goal:** Controlled forms, client + server validation, parent state sync.

| Order | File | What to notice |
|-------|------|----------------|
| 1 | `client/src/components/CreateUpdateForm.tsx` | Controlled inputs, `validate()`, `onCreated` |
| 2 | `UpdatesPage.tsx` → `handleCreated` | `[update, ...prev]` — no `.push()` |
| 3 | `client/src/components/EditUpdateForm.tsx` | Reset form when `update.id` changes |
| 4 | `UpdatesPage.tsx` → `handleUpdated` | `.map()` to replace one item |
| 5 | `UpdateDetail.tsx` → delete flow | `handleDeleted` + `.filter()` |

**Verify:**
- [ x] Create a new update → appears at top of list
- [ x] Edit title/body → list + detail stay in sync
- [ x] Delete → removed from list; another item selected

---

### Step 6 — Search, filter, sort (`useMemo`)
**Goal:** Derive filtered list without mutating state.

| Order | File | What to notice |
|-------|------|----------------|
| 1 | `client/src/components/SearchAndFilters.tsx` | Controlled filter state lifted to parent |
| 2 | `UpdatesPage.tsx` → `filteredUpdates` | `useMemo`, `[...result].sort()` |

**Verify:**
- [ x] Search by title text narrows list
- [ x] Status filter works
- [ x] Sort by date/title/status works
- [ x] Original `updates` array unchanged (check React DevTools or log)

---

### Step 7 — Nested comments resource
**Goal:** Child fetch + `refreshKey` pattern.

| Order | File | What to notice |
|-------|------|----------------|
| 1 | `server/src/routes/updates.ts` | `GET/POST .../comments` routes |
| 2 | `client/src/api/client.ts` | `fetchComments`, `createComment` |
| 3 | `client/src/components/CommentList.tsx` | `useEffect([updateId, refreshKey])`, cleanup |
| 4 | `client/src/components/CommentForm.tsx` | POST then callback |
| 5 | `UpdateDetail.tsx` | `commentRefreshKey` bump on create |

**Verify:**
- [ x] Select update with comments → comments load
- [ x] Post new comment → list refreshes without page reload
- [ x] Switch updates → correct comments shown

---

### Step 8 — Manager review & stats
**Goal:** Role-gated UI + PATCH single field.

| Order | File | What to notice |
|-------|------|----------------|
| 1 | `client/src/currentUser.ts` | Set role to `"manager"` |
| 2 | `client/src/components/StatsPanel.tsx` | `refreshKey` refetch |
| 3 | `UpdateDetail.tsx` | `isManager` → "Mark as Reviewed" button |
| 4 | `UpdateDetail.tsx` | `patchUpdate(id, { status })` only |

**Verify:**
- [ ] Stats panel visible for manager only
- [ ] Mark reviewed → badge updates, stats refresh
- [ ] Switch to employee in `currentUser.ts` → stats + review button hidden

---

### Step 9 — Read study notes
- [ ] Read [STUDY_NOTES.md](./STUDY_NOTES.md) end to end
- [ ] Be able to explain the architecture diagram out loud
- [ ] Be able to argue refetch vs local state update

---

## Track B — Rebuild simulation (interview mode)

Do this on a **branch** or copy of the repo. For each step, delete or stub the listed files, then re-implement from the step goal in Track A.

| Step | Rebuild these files | Time box |
|------|---------------------|----------|
| 1 | `server/src/data/seed.ts`, `store.ts`, types | 10 min |
| 2 | `validation.ts`, `routes/*`, `index.ts` | 15 min |
| 3 | `client/src/api/client.ts` | 10 min |
| 4 | `UpdatesPage`, `UpdateList`, `UpdateCard`, `UpdateDetail` (read-only) | 15 min |
| 5 | `CreateUpdateForm`, `EditUpdateForm`, delete handlers | 15 min |
| 6 | `SearchAndFilters`, `useMemo` block in `UpdatesPage` | 10 min |
| 7 | `CommentList`, `CommentForm`, comment routes | 15 min |
| 8 | `StatsPanel`, manager review in `UpdateDetail` | 10 min |

**60-minute interview slice:** Steps 1–3 → 4 → 5 → pick **7 OR 8**.

---

## Track C — Fix broken drills

Do these **after Track A**. Fix in this order (easiest → hardest).

### Drill 1 — Controlled input
- [ ] Open `client/src/drills/BrokenControlledInput.tsx`
- [ ] Fix without peeking
- [ ] Run `cd client && npm run test:drills` — Drill 1 test should pass
- [ ] Compare to `client/src/components/CreateUpdateForm.tsx`

### Drill 2 — State mutation
- [ ] Open `client/src/drills/BrokenStateMutation.tsx`
- [ ] Re-run `npm run test:drills` — Drill 2 test should pass
- [ ] Compare to `UpdatesPage.tsx` → `handleCreated`

### Drill 3 — useEffect dependencies
- [ ] Open `client/src/drills/BrokenUseEffect.tsx`
- [ ] Re-run `npm run test:drills` — Drill 3 test should pass
- [ ] Compare to `client/src/components/CommentList.tsx`

### Drill 4 — useMemo + immutable sort
- [ ] Open `client/src/drills/BrokenFilterMemo.tsx`
- [ ] Re-run `npm run test:drills` — Drill 4 test should pass
- [ ] Compare to `UpdatesPage.tsx` → `filteredUpdates`

### Drill 5 — Fetch race condition
- [ ] Open `client/src/drills/BrokenNestedFetch.tsx`
- [ ] Re-run `npm run test:drills` — all 5 tests should pass
- [ ] Compare to `client/src/components/CommentList.tsx` (cleanup flag)

**Optional:** Import a fixed drill into `App.tsx` temporarily to confirm behavior in the browser.

---

## Track C Phase 2 — Interview scenario drills (after Phase 1)

These cover **lists, rendering, and app wiring** — closer to a live interview.

| Order | File | What you're fixing |
|-------|------|--------------------|
| 6 | `BrokenMapRender.tsx` | Array → JSX (`.map` not `.forEach`) |
| 7 | `BrokenListKeys.tsx` | Stable `key={item.id}` in lists |
| 8 | `BrokenUpdateInList.tsx` | Update one item in array with `.map()` |
| 9 | `BrokenRenderStates.tsx` | Loading / error / empty early returns |
| 10 | `BrokenParentSync.tsx` | Call `onUpdated()` after PATCH |
| 11 | `BrokenRoleGate.tsx` | `{role === "manager" && ...}` |
| 12 | `BrokenLiftSelection.tsx` | Lift `selectedId` to parent |

Run `npm run test:drills` after each — 12 total tests when all pass.

---

## Quick reference — file touch order (single list)

If you just want a flat sequence of files to open:

```
1.  server/src/types.ts
2.  server/src/data/seed.ts
3.  server/src/store.ts
4.  server/src/validation.ts
5.  server/src/routes/updates.ts
6.  server/src/routes/stats.ts
7.  server/src/index.ts
8.  client/src/types.ts
9.  client/src/currentUser.ts
10. client/src/api/client.ts
11. client/src/main.tsx
12. client/src/App.tsx
13. client/src/components/UpdatesPage.tsx
14. client/src/components/UpdateList.tsx
15. client/src/components/UpdateCard.tsx
16. client/src/components/UpdateDetail.tsx
17. client/src/components/CreateUpdateForm.tsx
18. client/src/components/EditUpdateForm.tsx
19. client/src/components/SearchAndFilters.tsx
20. client/src/components/CommentList.tsx
21. client/src/components/CommentForm.tsx
22. client/src/components/StatsPanel.tsx
23. STUDY_NOTES.md
24. client/src/drills/BrokenControlledInput.tsx
25. client/src/drills/BrokenStateMutation.tsx
26. client/src/drills/BrokenUseEffect.tsx
27. client/src/drills/BrokenFilterMemo.tsx
28. client/src/drills/BrokenNestedFetch.tsx
29. client/src/drills/BrokenMapRender.tsx
30. client/src/drills/BrokenListKeys.tsx
31. client/src/drills/BrokenUpdateInList.tsx
32. client/src/drills/BrokenRenderStates.tsx
33. client/src/drills/BrokenParentSync.tsx
34. client/src/drills/BrokenRoleGate.tsx
35. client/src/drills/BrokenLiftSelection.tsx
```

---

## Suggested weekly plan

| Day | Focus |
|-----|--------|
| 1 | Track A steps 1–4 |
| 2 | Track A steps 5–6 |
| 3 | Track A steps 7–9 |
| 4 | Track C drills 1–3 |
| 5 | Track C drills 4–5 + Track B steps 1–5 timed |
