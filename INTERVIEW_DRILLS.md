# Interview Drills — Lattice-Style Full-Stack Simulator

Use the **main app** (`client/` + `server/`) as the completed reference.  
Do hands-on work in **`scratch/`** (`npm run dev:scratch` → :5174 / :3002).

Each exercise is 15–30 minutes and mirrors a real product interview: extend a pre-built codebase, narrate your thinking, verify in browser or curl.

---

## Codebase analysis (read once)

### Architecture

```
Browser (:5173 main / :5174 scratch)
    │
    ▼ fetch /api/*
Express (:3001 main / :3002 scratch)
    │
    ├── validation.ts   ← POST/PATCH body checks
    ├── store.ts        ← in-memory arrays + id helpers
    └── routes/
        ├── updates.ts  ← CRUD + nested comments
        └── stats.ts    ← aggregated counts
```

### Data flow (happy path)

1. **`UpdatesPage`** mounts → `useEffect` calls **`fetchUpdates()`** from **`api/client.ts`**
2. API returns JSON → **`setUpdates(data)`** → **`UpdateList`** maps to **`UpdateCard`**
3. User clicks card → **`setSelectedId`** → **`UpdateDetail`** reads from parent `updates` array
4. User submits **`CreateUpdateForm`** → **`createUpdate()`** POST → server validates → returns record → **`handleCreated`** prepends to state (immutable)
5. User edits/deletes/reviews → **`patchUpdate` / `deleteUpdate`** → **`handleUpdated` / `handleDeleted`** sync parent array
6. Comments: **`CommentList`** fetches nested route; **`CommentForm`** POST → **`refreshKey`** bump refetches
7. Filters: controlled state in **`UpdatesPage`** → **`useMemo`** derives **`filteredUpdates`** → passed to list

### State ownership

| State | Owner | Why |
|-------|--------|-----|
| `updates[]`, `selectedId`, filters | `UpdatesPage` | Siblings (list + detail) need same data |
| Form field values | Each form component | Controlled inputs local until submit |
| Comments list | `CommentList` | Nested resource; refetch via `refreshKey` |
| Stats | `StatsPanel` | Server-computed; refetch via `refreshKey` |

### API layer

Single module **`client/src/api/client.ts`**: shared **`request<T>()`**, typed wrappers, throws on `{ error: string }` from server.

---

## How to run an exercise

1. Read the exercise below.
2. Find **`INTERVIEW DRILL N`** markers in `scratch/` (exercises 1–10).
3. Set a timer.
4. Implement without opening main app until timer ends.
5. Verify acceptance criteria.
6. Diff against main app (`client/src/`, `server/src/`).
7. Read **`TALK_THROUGH.md`** — practice explaining what you built.

Micro warm-ups: `cd client && npm run drills:reset` (bug-fix drills, 10–15 min).

---

## Exercise 1 — Data models & seed data

**Feature:** Define core types and realistic seed fixtures for an employee updates product.

**Requirements:**
- `User`, `Update`, `Comment` types with correct fields
- Seed at least 3 users, 3 updates (mixed status), 2 comments
- Match server and client type shapes

**Acceptance criteria:**
- TypeScript compiles
- Seed arrays export from `scratch/server/src/data/seed.ts`

**Files:** `scratch/server/src/types.ts`, `scratch/server/src/data/seed.ts`

**Follow-ups:** How would you add a new field? How do you keep client/server types in sync in production?

**Time:** 15 min

---

## Exercise 2 — In-memory store

**Feature:** Wire seed data into a mutable in-memory store with ID generation.

**Requirements:**
- Copy seed into exported arrays
- `generateUpdateId()`, `generateCommentId()` counters
- `findUser(id)` helper

**Acceptance criteria:**
- Store exports `users`, `updates`, `comments` populated on server start
- New IDs don't collide with seed ids

**Files:** `scratch/server/src/store.ts`

**Follow-ups:** Why in-memory? What breaks on restart?

**Time:** 15 min

---

## Exercise 3 — Server validation

**Feature:** Validate POST/PATCH/comment bodies before touching the store.

**Requirements:**
- `validateCreateUpdate`, `validatePatchUpdate`, `validateCreateComment`
- Return `{ ok: true, data }` or `{ ok: false, error: string }`
- Trim strings; reject empty title/body; validate status enum

**Acceptance criteria:**
- POST with empty title returns 400 with message
- PATCH with invalid status returns 400

**Files:** `scratch/server/src/validation.ts`

**Follow-ups:** Why validate on server if the client also validates?

**Time:** 20 min

---

## Exercise 4 — REST routes (updates CRUD)

**Feature:** Implement update endpoints with validation and correct status codes.

**Requirements:**
- `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id`
- Return created/updated/deleted record in body
- 404 when not found; 400 on validation failure
- Wire router in `index.ts`

**Acceptance criteria:**
- `curl` list, create, patch, delete all work against :3002

**Files:** `scratch/server/src/routes/updates.ts`, `scratch/server/src/index.ts`

**Follow-ups:** Why return the full record from POST? When would you return 204?

**Time:** 25 min

---

## Exercise 5 — API client

**Feature:** Central fetch layer for the frontend.

**Requirements:**
- Generic `request<T>()` with JSON headers and error parsing
- `fetchUpdates`, `createUpdate`, `patchUpdate`, `deleteUpdate` wrappers
- Typed return values matching `types.ts`

**Acceptance criteria:**
- `fetchUpdates()` resolves from running scratch server
- Failed request throws `Error` with server message

**Files:** `scratch/client/src/api/client.ts`

**Follow-ups:** Why one file? How would you add auth headers?

**Time:** 20 min

---

## Exercise 6 — Load data on mount

**Feature:** Fetch updates when the page loads with proper UI states.

**Requirements:**
- `useState` for `updates`, `loading`, `error`, `selectedId`
- `useEffect` with cleanup flag calling `fetchUpdates()`
- Early returns for loading, error, empty

**Acceptance criteria:**
- Brief loading state, then list from API
- Stop server → error message (not blank screen)

**Files:** `scratch/client/src/components/UpdatesPage.tsx`

**Follow-ups:** Why cleanup flag? What goes in the dependency array?

**Time:** 25 min

---

## Exercise 7 — List rendering & selection

**Feature:** Render updates as a selectable list with detail panel.

**Requirements:**
- `UpdateList` maps array to `UpdateCard`
- Stable `key={update.id}`
- Click selects update; detail shows title, body, status, author

**Acceptance criteria:**
- List shows all updates; clicking changes detail panel

**Files:** `scratch/client/src/components/UpdateList.tsx`, `UpdateCard.tsx`, `UpdateDetail.tsx`, `UpdatesPage.tsx`

**Follow-ups:** Why not `key={index}`? Where should `selectedId` live?

**Time:** 20 min

---

## Exercise 8 — Create update (form + POST + sync)

**Feature:** Employees submit a new update.

**Requirements:**
- Controlled inputs (title, body, blockers)
- Client validation before submit
- Call `createUpdate()` with `currentUser.id`
- `handleCreated`: immutable prepend, select new item

**Acceptance criteria:**
- New update appears at top without page reload
- Empty title blocked client-side; server error shown if API fails

**Files:** `scratch/client/src/components/CreateUpdateForm.tsx`, `UpdatesPage.tsx`

**Follow-ups:** Controlled vs uncontrolled? Optimistic vs pessimistic update?

**Time:** 25 min

---

## Exercise 9 — Edit & delete

**Feature:** Owner can edit fields; owner or manager can delete.

**Requirements:**
- `EditUpdateForm` with reset when `update.id` changes
- `patchUpdate` / `deleteUpdate` in detail view
- `handleUpdated` uses `.map()`; `handleDeleted` uses `.filter()` + fix `selectedId`

**Acceptance criteria:**
- Edit syncs list and detail
- Delete removes item and selects next

**Files:** `EditUpdateForm.tsx`, `UpdateDetail.tsx`, `UpdatesPage.tsx`

**Follow-ups:** Why `.map()` not mutate in place? What if delete fails mid-flight?

**Time:** 25 min

---

## Exercise 10 — Search, filter & sort

**Feature:** Client-side search, status filter, and sort controls.

**Requirements:**
- Controlled filter state in parent
- `SearchAndFilters` component
- `useMemo` derived list; copy before `.sort()`
- Pass `filteredUpdates` to list, not raw `updates`

**Acceptance criteria:**
- Search narrows by title/body
- Status filter works; sort by date/title/status

**Files:** `SearchAndFilters.tsx`, `UpdatesPage.tsx`

**Follow-ups:** When is `useMemo` worth it? Why not store filtered list in state?

**Time:** 25 min

---

## Exercise 11 — Nested comments

**Feature:** Comments on an update (separate nested API).

**Requirements:**
- `GET/POST /api/updates/:id/comments` (server)
- `fetchComments`, `createComment` (client)
- `CommentList` with `useEffect` + `refreshKey`
- `CommentForm` posts then bumps key

**Acceptance criteria:**
- Comments load per update; new comment appears without full page reload

**Files:** `scratch/server/src/routes/updates.ts`, `api/client.ts`, `CommentList.tsx`, `CommentForm.tsx`, `UpdateDetail.tsx`

**Follow-ups:** refreshKey vs append to local state? Race conditions?

**Time:** 30 min

---

## Exercise 12 — Manager review (role gate)

**Feature:** Managers mark updates as reviewed.

**Requirements:**
- `currentUser.role === "manager"` gates button
- `patchUpdate(id, { status: "reviewed" })` only
- Parent sync via `onUpdated`

**Acceptance criteria:**
- Employee does not see review button
- Manager click updates badge everywhere

**Files:** `currentUser.ts`, `UpdateDetail.tsx`, `UpdatesPage.tsx`

**Follow-ups:** How would real auth replace `currentUser`?

**Time:** 20 min

---

## Exercise 13 — Stats panel

**Feature:** Managers see counts by status.

**Requirements:**
- `GET /api/stats` route
- `StatsPanel` fetches on `refreshKey` change
- Bump key after create/delete/review

**Acceptance criteria:**
- Counts match number of updates by status
- Stats refresh after mutations

**Files:** `scratch/server/src/routes/stats.ts`, `StatsPanel.tsx`, `UpdatesPage.tsx`

**Follow-ups:** Refetch stats vs compute client-side?

**Time:** 20 min

---

## Exercise 14 — Validation & error UX

**Feature:** End-to-end validation story.

**Requirements:**
- Server rejects blocked status without blockers
- Client shows distinct client vs server errors
- Forms stay controlled after failed submit

**Acceptance criteria:**
- Trigger each error path once; UI recovers on retry

**Files:** `validation.ts`, `CreateUpdateForm.tsx`, `EditUpdateForm.tsx`, `UpdateDetail.tsx`

**Follow-ups:** Where is source of truth for validation?

**Time:** 25 min

---

## Exercise 15 — Timed full simulation

**Feature:** Interviewer asks: "Build employee updates — list, create, and one manager action in 45 minutes."

**Requirements:**
- No peeking for first 45 min
- Backend + API client + list + create + mark reviewed (minimum)
- Narrate out loud using `TALK_THROUGH.md`

**Acceptance criteria:**
- Working demo in browser
- You can explain every state transition

**Files:** Whatever you need in `scratch/`

**Follow-ups:** What would you add with another 15 minutes?

**Time:** 30–45 min

---

## Suggested 1-week schedule

| Day | Exercises |
|-----|-----------|
| 1 | 1–4 (backend) |
| 2 | 5–7 (read path) |
| 3 | 8–9 (write path) |
| 4 | 10 + bug drills |
| 5 | 11–13 |
| 6 | 14–15 timed |

---

## Quick reference

- **Solution:** main app `npm run dev`
- **Practice:** scratch `npm run dev:scratch`
- **Patterns:** `CHEATSHEET.md`
- **Narration:** `TALK_THROUGH.md`
- **Bug drills:** `client/src/drills/` + `npm run drills:reset`
