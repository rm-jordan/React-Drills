# Scratch Mini-App — Build From Scratch

A **separate** copy of the Updates app with TODO stubs. The main app at repo root stays complete as your answer key.

| App | Client | API |
|-----|--------|-----|
| **Main (reference)** | http://localhost:5173 | http://localhost:3001 |
| **Scratch (you build)** | http://localhost:5174 | http://localhost:3002 |

## Setup (once)

```bash
# from repo root
npm run install:scratch
npm run dev:scratch
```

Open http://localhost:5174 — you'll see the scratch banner until you wire up `UpdatesPage`.

## How to use this

1. Pick a session below.
2. Set a timer (45–60 min).
3. Implement TODOs in **scratch/** only.
4. Verify with curl (backend) or browser (frontend).
5. When stuck after timer, diff against main app:
   - Server: `server/src/...`
   - Client: `client/src/...`

**Do not copy-paste during the timer.** After timer, peeking is fine for learning.

## Sessions (piece by piece)

### Session 1 — Backend (~45 min)

**Files to implement:**
- [ ] `scratch/server/src/data/seed.ts`
- [ ] `scratch/server/src/store.ts`
- [ ] `scratch/server/src/validation.ts`
- [ ] `scratch/server/src/routes/updates.ts`
- [ ] Uncomment routers in `scratch/server/src/index.ts`

**Verify:**
```bash
curl http://localhost:3002/api/health
curl http://localhost:3002/api/updates
curl -X POST http://localhost:3002/api/updates \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","body":"Hello","userId":"u1"}'
```

**Reference:** `server/src/` in main app

---

### Session 2 — API client + list (~45 min)

**Already wired for you:** `UpdateList`, `UpdateCard`, `UpdateDetail`, layout, static data in `data/staticData.ts`.

**YOUR tasks in `UpdatesPage.tsx` only:**
1. Change `useState(STATIC_UPDATES)` → `useState([])`
2. Fill in the `useEffect` TODOs (`setLoading`, `setError`, `setUpdates`, `setSelectedId`)
3. Uncomment `load()`
4. Confirm browser shows API data (not the “Showing static data” message)

**Files:**
- [x] `scratch/client/src/api/client.ts` (you built this)
- [ ] `scratch/client/src/components/UpdatesPage.tsx` — **hooks + fetch only**
- [x] `UpdateList`, `UpdateCard`, `UpdateDetail` — done, don't touch unless curious
- [x] `<UpdatesPage />` in `App.tsx`

**Verify:** Browser shows seed updates from API, click to see detail, loading/error states work.

---

### Session 3 — Create (~30 min)

**Files:**
- [ ] `scratch/client/src/components/CreateUpdateForm.tsx`
- [ ] `UpdatesPage` → `handleCreated` (immutable add)

**Verify:** Create update → appears at top of list.

---

### Session 4 — Edit + delete (~30 min)

**Files:**
- [ ] `scratch/client/src/components/EditUpdateForm.tsx`
- [ ] `UpdateDetail` delete + edit flows
- [ ] `handleUpdated`, `handleDeleted` in `UpdatesPage`

**Verify:** Edit syncs list + detail; delete removes item.

---

### Session 5 — Search / filter / sort (~30 min)

**Files:**
- [ ] `scratch/client/src/components/SearchAndFilters.tsx`
- [ ] `useMemo` filtered list in `UpdatesPage`

**Verify:** Search, status filter, sort all work.

---

### Session 6 — Comments + manager (~30 min)

**Backend:**
- [ ] Comment routes (if not done in Session 1)
- [ ] `scratch/server/src/routes/stats.ts`

**Frontend:**
- [ ] `CommentList.tsx`, `CommentForm.tsx`
- [ ] `StatsPanel.tsx`
- [ ] Manager "Mark reviewed" in `UpdateDetail`
- [ ] Toggle `currentUser.ts` to manager

**Verify:** Post comment, stats refresh, manager can review.

---

## File map

```
scratch/
├── README.md                 ← you are here
├── server/src/
│   ├── types.ts              ✓ provided (reference)
│   ├── data/seed.ts          Session 1
│   ├── store.ts              Session 1
│   ├── validation.ts         Session 1
│   ├── routes/updates.ts     Session 1
│   ├── routes/stats.ts       Session 6
│   └── index.ts              Session 1 (uncomment routers)
└── client/src/
    ├── types.ts              ✓ provided
    ├── currentUser.ts        ✓ provided
    ├── api/client.ts         Session 2
    ├── App.tsx               Session 2 (uncomment UpdatesPage)
    └── components/           Sessions 2–6
```

## Also use

- **PATTERN_CHEATSHEET.md** — one-line patterns
- **client/src/drills/** — bug-fix warm-ups (`npm run drills:reset` in main client)
- **Main app** — full working implementation

## Reset scratch progress

Scratch has no git magic — reset files manually or:

```bash
git checkout -- scratch/
```

(Only if scratch is committed; otherwise keep a branch.)
