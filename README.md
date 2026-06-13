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

- **[PRACTICE_GUIDE.md](./PRACTICE_GUIDE.md)** — **start here** — step-by-step order of operations with checkboxes
- **STUDY_NOTES.md** — patterns, bugs, architecture, talking points
- **client/src/drills/** — intentionally broken code to fix

## Project structure

```
react-drills/
├── client/src/
│   ├── api/client.ts          # All fetch helpers
│   ├── components/            # UI components
│   ├── drills/                # Broken examples (Step 9)
│   └── currentUser.ts         # Simulated auth
├── server/src/
│   ├── data/seed.ts           # Seed users, updates, comments
│   ├── routes/                  # Express routers
│   ├── store.ts               # In-memory store
│   └── validation.ts          # Server-side validation
└── STUDY_NOTES.md
```
