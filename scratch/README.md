# Scratch Mini-App — Interview Practice Surface

Work here. Main app is the answer key.

| | Scratch (you) | Main (reference) |
|--|---------------|------------------|
| UI | http://localhost:5174 | http://localhost:5173 |
| API | http://localhost:3002 | http://localhost:3001 |

```bash
npm run install:scratch   # once, from repo root
npm run dev:scratch
```

## What to do

1. Open **`INTERVIEW_DRILLS.md`** at repo root
2. Do exercises 1–15 in order (15–30 min each)
3. Find **`INTERVIEW DRILL N`** markers in this folder
4. When stuck after timer, diff against `../client/` and `../server/`
5. Read **`TALK_THROUGH.md`** and **`CHEATSHEET.md`**

Exercises 1–10 have TODO markers here. Exercises 11–15 extend the same files (comments, manager, stats, timed sim).

## File map

| Drill | Scratch files |
|-------|----------------|
| 1 | `server/src/data/seed.ts` |
| 2 | `server/src/store.ts` |
| 3 | `server/src/validation.ts` |
| 4 | `server/src/routes/updates.ts` |
| 5 | `client/src/api/client.ts` |
| 6–10 | `client/src/components/UpdatesPage.tsx` + related components |

List/detail UI is pre-wired with static data until you complete **Drill 6** (API load).

## Optional warm-up

Bug-fix drills: `cd ../client && npm run drills:reset` (10 min before a session).
