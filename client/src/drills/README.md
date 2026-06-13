# Practice Drills

These files contain **intentionally broken** patterns. Do not import them into the main app.
Fix each file, then confirm your fix using the checklist below.

| File | Bug to fix | Working reference |
|------|------------|-------------------|
| `BrokenUseEffect.tsx` | Missing/wrong dependency array causes stale data | `CommentList.tsx`, `UpdatesPage.tsx` |
| `BrokenStateMutation.tsx` | Direct array mutation — React won't re-render | `UpdatesPage.handleCreated` |
| `BrokenFilterMemo.tsx` | Sort mutates source array; filter not memoized | `UpdatesPage` filteredUpdates useMemo |
| `BrokenControlledInput.tsx` | Mixing defaultValue + value (controlled/uncontrolled) | `CreateUpdateForm.tsx` |
| `BrokenNestedFetch.tsx` | Fetch runs on every render; no cleanup | `CommentList.tsx` |

## How to practice

1. Read the `// TODO:` comment at the top of each drill file.
2. Try to spot the bug without running the app.
3. Fix it in place.
4. Confirm your fix (see below).
5. Compare to the working reference component.

## How to confirm your fix

Use **all three** — tests are the fastest objective check.

### 1. Automated tests (recommended)

From the `client/` folder:

```bash
npm run test:drills
```

- Tests **fail** on the broken starter code — that's expected.
- Fix one drill → re-run → that test should pass.
- All 5 passing = Track C complete.

Watch mode while you work: `npm run test:drills:watch`

### 2. Compare to the working app

Open the reference file in the table above and diff mentally:
- Same pattern? (controlled input, immutable setState, deps array, cleanup flag, copy before sort)

### 3. Manual browser check (optional)

Temporarily render a drill in `App.tsx`, use the app, watch the browser console for React warnings.

### Redo drills

Reset a file to broken: `git restore client/src/drills/BrokenControlledInput.tsx`  
Reset all drills: `git restore client/src/drills/`

Tag clean state once: `git tag drills-clean` → redo with `git restore --source=drills-clean client/src/drills/`
