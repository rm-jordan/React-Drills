# Employee Updates — Interview Practice

A minimal full-stack React + TypeScript app for practicing Lattice-style "Updates" feature patterns.

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

## Study

- **scratch/README.md** — **build from scratch** mini-app (`npm run dev:scratch` → :5174)
- **[PRACTICE_GUIDE.md](./PRACTICE_GUIDE.md)** — study the main app in order
- **STUDY_NOTES.md** — patterns, bugs, architecture, talking points
- **PATTERN_CHEATSHEET.md** — one-line patterns + drill reset
- **client/src/drills/** — bug-fix exercises

## Project structure

```
react-drills/
├── scratch/                   # Mini-app YOU build (ports 5174 / 3002)
├── client/src/                # Main app frontend (reference)
├── server/src/                # Main app backend (reference)
├── PATTERN_CHEATSHEET.md
└── STUDY_NOTES.md
```
