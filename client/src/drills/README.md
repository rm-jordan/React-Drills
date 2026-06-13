# Practice Drills

These files contain **intentionally broken** patterns. Do not import them into the app.
Fix each file, then compare your solution to the working components in `src/components/`.

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
4. Optionally wire the component into `App.tsx` temporarily to verify behavior.
