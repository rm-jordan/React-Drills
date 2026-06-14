# Employee Updates — Interview Simulator

Lattice-style full-stack interview practice. **Main app = solution. Scratch = where you implement.**

## Start here

1. **`INTERVIEW_DRILLS.md`** — 15 exercises (15–30 min each)
2. **`CHEATSHEET.md`** — 10 patterns to memorize
3. **`TALK_THROUGH.md`** — how to narrate in the interview

```bash
npm run install:all
npm run dev              # reference app :5173 / :3001
npm run dev:scratch      # your work     :5174 / :3002
```

## Stack

- **Frontend:** React 19, TypeScript, Vite (port 5173)
- **Backend:** Express, TypeScript (port 3001)
- **Data:** In-memory only (resets on server restart)

## Setup

```bash
npm run install:all
npm run dev
```

Or use the shell script:

```bash
chmod +x scripts/dev.sh   # first time only
./scripts/dev.sh
```

That starts **both** at once:

- **Client:** http://localhost:5173
- **API:** http://localhost:3001

## Simulated user

Edit `client/src/currentUser.ts` to switch between employee and manager. No real auth.

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/updates` | List all updates |
| GET | `/api/updates/:id` | Single update |
| POST | `/api/updates` | Create update |
| PATCH | `/api/updates/:id` | Partial update |
| DELETE | `/api/updates/:id` | Delete update + comments |
| GET | `/api/updates/:id/comments` | List comments |
| POST | `/api/updates/:id/comments` | Add comment |
| GET | `/api/stats` | Counts by status |

## Study materials

| File | Purpose |
|------|---------|
| **INTERVIEW_DRILLS.md** | 15 progressive exercises — primary path |
| **CHEATSHEET.md** | 10 React/TS patterns in this repo |
| **TALK_THROUGH.md** | Interview communication examples |
| **scratch/** | Hands-on implementation (`INTERVIEW DRILL` markers) |
| **client/src/drills/** | Optional 10-min bug-fix warm-ups |
| **STUDY_NOTES.md** | Architecture deep-dive |
| **PRACTICE_GUIDE.md** | Read-through of main app |

## Project structure

```
react-drills/
├── scratch/                   # Mini-app YOU build (ports 5174 / 3002)
├── client/src/                # Main app frontend (reference)
├── server/src/                # Main app backend (reference)
├── PATTERN_CHEATSHEET.md
└── STUDY_NOTES.md
```
