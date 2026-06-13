# Pattern Cheatsheet

Quick reference before drills or a timed rebuild. Each line maps to a drill + app file.

| # | Pattern | Fix in one line | Drill | App reference |
|---|---------|-----------------|-------|---------------|
| 1 | Controlled input | `value` + `onChange` only | `BrokenControlledInput` | `CreateUpdateForm` |
| 2 | Add to array | `setItems(prev => [x, ...prev])` | `BrokenStateMutation` | `handleCreated` |
| 3 | useEffect deps | Put `updateId` (etc.) in `[]` | `BrokenUseEffect` | `CommentList` |
| 4 | Sort without mutating | `[...arr].sort()` not `arr.sort()` | `BrokenFilterMemo` | `filteredUpdates` |
| 5 | Async race | `cancelled` flag + cleanup `return` | `BrokenNestedFetch` | `CommentList` |
| 6 | Render array | `.map()` not `.forEach()` | `BrokenMapRender` | `UpdateList` |
| 7 | List keys | `key={item.id}` not `key={index}` | `BrokenListKeys` | `UpdateList` |
| 8 | Update one item | `prev.map(u => u.id === id ? { ...u, field } : u)` | `BrokenUpdateInList` | `handleUpdated` |
| 9 | Loading / empty | Early `return` before main UI | `BrokenRenderStates` | `UpdatesPage` |
| 10 | Parent sync | `onUpdated(patched)` after PATCH | `BrokenParentSync` | `UpdateDetail` |
| 11 | Role gate | `role === "manager" && ...` | `BrokenRoleGate` | `UpdateDetail` |
| 12 | Lift state | `selectedId` in parent, pass `onSelect` | `BrokenLiftSelection` | `UpdatesPage` |

## Reset drills to broken

```bash
cd client
npm run drills:reset
npm run test:drills   # all should fail
```

## Solutions on remote, practice locally

1. Push repo (solutions in `drills/`, broken copies in `drills/starters/`)
2. Run `npm run drills:reset` to copy broken starters back
3. Fix drills, run tests until all 14 pass
4. Peek at git history or diff if stuck — don't peek before trying

## Interview one-liners

- **Why immutable updates?** React compares references; mutation skips re-render.
- **Why keys?** React matches component identity across renders.
- **Why cleanup in useEffect?** Ignore stale async results after unmount or prop change.
- **Why early returns?** One UI state at a time — loading, error, empty, content.
