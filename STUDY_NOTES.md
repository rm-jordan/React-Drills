# Study Notes — Employee Updates Practice App

> **Step-by-step walkthrough:** see [PRACTICE_GUIDE.md](./PRACTICE_GUIDE.md) for the ordered checklist.

## What each feature drills

| Area | File(s) | Pattern |
|------|---------|---------|
| Project setup | `package.json`, Vite proxy | Monorepo-ish layout, API proxy to avoid CORS in dev |
| Seed data | `server/src/data/seed.ts` | Realistic fixtures for demo without a DB |
| Server validation | `server/src/validation.ts` | Validate on POST/PATCH; return 400 + message |
| CRUD routes | `server/src/routes/updates.ts` | REST verbs, 404 handling, return created/updated body |
| Nested resource | `GET/POST /api/updates/:id/comments` | Child routes scoped to parent ID |
| API client | `client/src/api/client.ts` | Single module for fetch wrappers + error parsing |
| Load on mount | `UpdatesPage` useEffect | async load, loading/error/empty states |
| Controlled inputs | `CreateUpdateForm`, `EditUpdateForm` | `value` + `onChange`, reset after submit |
| Client validation | forms `validate()` | Check before network; show client vs server errors |
| Parent state sync | `handleCreated/Updated/Deleted` | Lift state; immutable array updates |
| useMemo filter/sort | `UpdatesPage` `filteredUpdates` | Derive list from search + filters without re-running every render unnecessarily |
| PATCH one field | `UpdateDetail` mark reviewed | Partial update; sync single field in parent |
| Role-gated UI | `currentUser.ts`, `UpdateDetail` | Manager: stats + mark reviewed; edit/delete: owner or manager |
| refreshKey | `CommentList`, `StatsPanel` | Bump integer prop to trigger child refetch |
| No direct mutation | `setUpdates(prev => [...prev, x])` | Spread/map/filter instead of push/splice on state |

## Architecture (text diagram)

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ UpdatesPage (state owner)                             │  │
│  │  - updates[], selectedId, filters                     │  │
│  │  - useMemo → filteredUpdates                          │  │
│  │  ├── SearchAndFilters (controlled filter state)       │  │
│  │  ├── UpdateList → UpdateCard                          │  │
│  │  ├── UpdateDetail                                     │  │
│  │  │     ├── EditUpdateForm (PATCH full fields)         │  │
│  │  │     ├── CommentList (fetch + refreshKey)          │  │
│  │  │     └── CommentForm (POST → bump refreshKey)       │  │
│  │  ├── CreateUpdateForm (employee only)                 │  │
│  │  └── StatsPanel (manager only, refreshKey)           │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │ fetch /api/*                     │
└──────────────────────────┼──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              Express (port 3001)                              │
│  ┌─────────────┐  ┌──────────────────┐  ┌───────────────┐  │
│  │ validation  │  │ in-memory store  │  │ seed data     │  │
│  └─────────────┘  │ updates[]        │  └───────────────┘  │
│                   │ comments[]     │                      │
│  GET/POST/PATCH/DELETE /api/updates                         │
│  GET/POST            /api/updates/:id/comments              │
│  GET                 /api/stats                             │
└─────────────────────────────────────────────────────────────┘
```

## Common bugs to watch for

1. **Mutating state arrays** — `items.push(x); setItems(items)` does not trigger re-render. Use `setItems(prev => [...prev, x])`.

2. **Wrong useEffect deps** — Empty `[]` when you need `[updateId]` causes stale data. Including unstable objects causes infinite loops.

3. **Race conditions** — Fast navigation between updates: without a `cancelled` flag, an old fetch can overwrite newer data.

4. **Sort mutates in place** — `array.sort()` mutates. Copy first: `[...array].sort(...)`.

5. **Controlled vs uncontrolled** — Don't mix `value` and `defaultValue`. Reset forms by setting state, not DOM refs.

6. **Forgetting to return API body** — POST/PATCH should return the saved record so the client can sync without a second GET.

7. **PATCH without server validation** — Client checks are UX; always validate again on the server.

8. **selectedId after delete** — When deleting the selected item, pick the next item or null.

9. **Blockers + blocked status** — Server rejects `status: "blocked"` without blockers text.

10. **Strict Mode double mount** — Effects run twice in dev; cleanup functions matter.

## Interview talking points

- **Why in-memory store?** Fast to build in 60 minutes; mention you'd swap for Postgres + migrations in production.
- **Why no auth?** `currentUser` constant simulates session; describe how you'd use JWT/cookies + middleware.
- **REST nesting** — Comments belong to updates → `/updates/:id/comments` keeps ownership clear.
- **Optimistic vs pessimistic updates** — This app waits for server response (pessimistic). Mention optimistic UI for snappier UX with rollback on error.
- **Where does validation live?** Client for instant feedback; server as source of truth.
- **State location** — Updates list lives in `UpdatesPage` because siblings (list + detail) need it. Comments stay local + refreshKey because only detail cares.
- **Error handling** — Parse `error` field from JSON body; show distinct client vs server validation messages.

## Refetch vs update local state

| Approach | When to use | Pros | Cons |
|----------|-------------|------|------|
| **Update local state** from API response | Create, update, delete when API returns full record | Instant UI, no extra request | Client can drift if server transforms data you don't know about |
| **Refetch list** | After complex changes, or low confidence in sync | Always consistent with server | Extra latency, loading flicker |
| **refreshKey on child** | Nested resource (comments) owned by separate endpoint | Simple parent/child boundary | Full refetch even for one new comment |
| **Append to child state** | After POST comment, if parent passes `onCreated(comment)` | No refetch needed | Child must expose callback; parent/detail coupling |

**This app's choices:**
- Updates: local state updated from POST/PATCH/DELETE responses (patterns 7, 11, 14).
- Comments: `refreshKey` refetch (pattern 9) — easy to explain in interviews; upgrading to append-is-trivial drill.
- Stats: `refreshKey` because counts are derived server-side.

**Tradeoff summary:** Prefer **return + merge** for resources you own in parent state. Prefer **refetch or refreshKey** when the server computes aggregates (stats) or the child fully owns fetch lifecycle (comments list).

## Suggested commit / study order

1. `chore: project setup and seed data`
2. `feat: backend routes and validation`
3. `feat: API client helpers`
4. `feat: updates list and detail view`
5. `feat: create, edit, delete updates`
6. `feat: search, filter, sort with useMemo`
7. `feat: nested comments resource`
8. `feat: manager review action and stats panel`
9. `docs: study notes and broken drill exercises`

## Quick run

```bash
npm install
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:3001/api/updates

Toggle role in `client/src/currentUser.ts` (employee vs manager).
