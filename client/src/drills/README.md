# Practice Drills

These files contain **intentionally broken** patterns. Do not import them into the main app.
Fix each file, then confirm with `npm run test:drills`.

## Phase 1 — Core React patterns (start here)

| # | File | Bug to fix | Working reference |
|---|------|------------|-------------------|
| 1 | `BrokenControlledInput.tsx` | defaultValue + value together | `CreateUpdateForm.tsx` |
| 2 | `BrokenStateMutation.tsx` | Array `.push()` on state | `UpdatesPage.handleCreated` |
| 3 | `BrokenUseEffect.tsx` | Wrong dependency array | `CommentList.tsx` |
| 4 | `BrokenFilterMemo.tsx` | `.sort()` mutates source array | `UpdatesPage` filteredUpdates |
| 5 | `BrokenNestedFetch.tsx` | No fetch cleanup / race condition | `CommentList.tsx` |

## Phase 2 — Interview scenarios (lists, render, app patterns)

| # | File | Bug to fix | Working reference |
|---|------|------------|-------------------|
| 6 | `BrokenMapRender.tsx` | `.forEach()` instead of `.map()` — nothing renders | `UpdateList.tsx` |
| 7 | `BrokenListKeys.tsx` | `key={index}` — wrong row state after delete | `UpdateList` / `UpdateCard` |
| 8 | `BrokenUpdateInList.tsx` | Mutates item inside state array | `UpdatesPage.handleUpdated` |
| 9 | `BrokenRenderStates.tsx` | No loading/error/empty early returns | `UpdatesPage` load + empty states |
| 10 | `BrokenParentSync.tsx` | PATCH works locally but parent not notified | `UpdateDetail` + `onUpdated` |
| 11 | `BrokenRoleGate.tsx` | Manager action shown to everyone | `UpdateDetail` + `currentUser` |
| 12 | `BrokenLiftSelection.tsx` | Selection stuck in child — detail never updates | `UpdatesPage` selectedId pattern |

## How to practice

1. Read the `// TODO:` at the top of the file.
2. Fix without peeking at the reference.
3. Run `npm run test:drills` (or `npm run test:drills:watch`).
4. Compare your fix to the reference component.

## Confirm your fix

```bash
cd client
npm run test:drills
```

- Phase 1: 5 tests (drills 1–5)
- Phase 2: 7 more tests (drills 6–12)
- **All 12 passing** = drills complete

## Redo drills

Broken copies are saved in `starters/`. Current files are **solutions** (all tests pass).

```bash
cd client
npm run drills:reset      # copy broken starters → drills/
npm run test:drills       # all should fail — then fix each one
```

Peek at solutions on git remote or diff after trying. See **PATTERN_CHEATSHEET.md** at repo root.
