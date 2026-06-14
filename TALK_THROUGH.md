# Talk-Through Guide — How to Communicate in the Interview

You are evaluated on **how you think**, not just whether it compiles. Practice saying these out loud while working in `scratch/`.

---

## 1. Starting a feature

**Bad:** silence, then typing.

**Good:**
> "I'll start with the data flow: the list lives in `UpdatesPage`, so I'll fetch there in a `useEffect`, store results in `updates` state, and pass them down to `UpdateList`. I'll add loading and error states before the happy path."

---

## 2. Explaining your approach (vertical slice)

> "I'm going to do the thinnest end-to-end slice first: GET on the server, one fetch helper, prove the list renders. Then I'll add create, then comments. That way we always have something demoable."

---

## 3. State management

**When adding create:**
> "The form owns input state locally. On success, the API returns the saved record and I'll prepend it in the parent with `setUpdates(prev => [created, ...prev])` so the list and detail stay in sync without a second GET."

**When asked why not Redux:**
> "For this scope, parent state plus callbacks is enough. The list and detail share `updates[]`; forms are isolated until submit. I'd reach for context or a store if many unrelated components needed the same data."

**Selection:**
> "`selectedId` lives in `UpdatesPage` because both the list and detail need it. Lifting state avoids the list and detail getting out of sync."

---

## 4. Data flow (narrate while pointing at files)

> "User clicks Create → `CreateUpdateForm` validates → `createUpdate()` in the API client → Express validates again → store pushes → JSON response → `onCreated` updates parent state → React re-renders list and detail."

---

## 5. API interactions

> "All HTTP goes through one `request` helper so error handling is consistent. On 400, the server sends `{ error: 'title is required' }` and I surface that in the form. I return the full created object from POST so the client doesn't guess the id or timestamp."

**Tradeoff:**
> "I'm doing pessimistic updates — wait for the server before updating UI. Optimistic would feel faster but I'd need rollback on failure; for an interview pessimistic is simpler to explain."

---

## 6. useEffect & fetching

> "I load once on mount with an empty dependency array. I use a `cancelled` flag in cleanup so if the component unmounts or the user navigates away, an old fetch can't call `setState`."

**If they ask about deps:**
> "I intentionally omitted `selectedId` from deps because I only want to fetch on mount, not every time selection changes."

---

## 7. Forms & validation

> "Inputs are controlled — `value` and `onChange` — so React owns the source of truth. I validate on the client for instant feedback, but the server validates again because the client can't be trusted."

---

## 8. Lists & keys

> "I map updates to cards with `key={update.id}` so React tracks row identity when the list reorders or deletes. Index keys would reuse the wrong component state."

---

## 9. Filtering & useMemo

> "Search and filter state live in the parent. I derive `filteredUpdates` with `useMemo` so we don't re-sort on unrelated re-renders. I copy with spread before sort because `sort` mutates in place."

**Tradeoff:**
> "I could store filtered results in separate state, but that duplicates source of truth and sync bugs. Deriving is safer here."

---

## 10. Comments (nested resource)

> "Comments are nested under `/updates/:id/comments`. The list fetches in `CommentList` when `updateId` or `refreshKey` changes. After POST I bump `refreshKey` instead of merging into parent — simpler boundary, one extra GET."

**Alternative:**
> "I could append the returned comment to local state and skip refetch; that's faster but couples the form to the list's state shape."

---

## 11. Discussing tradeoffs (template)

Use this sentence structure:

> "I chose **X** over **Y** because **[reason]**. The downside is **[downside]**, which I'd address by **[follow-up]** if we had more time."

**Examples:**
- Local state vs refetch after mutation
- Client-only filter vs server-side search (scale)
- In-memory store vs database (persistence)

---

## 12. Narrating debugging

**Don't panic silently.**

> "The list isn't updating after create. I'll check Network tab — did POST return 201? … OK it did. Then the bug is client-side — probably mutating state instead of a new array. I'll check `handleCreated`."

> "I'm getting a 404 on PATCH — likely wrong route param. I'll log `req.params.id` and compare to the URL in the client."

> "React warns about controlled/uncontrolled — I probably have both `value` and `defaultValue`. I'll pick controlled only."

---

## 13. When you're stuck

> "I'm going to simplify: hardcode one item in state to prove the list renders, then wire the fetch. That isolates whether the bug is data or UI."

> "I'll compare my route to the working pattern in the starter — usually it's params, method, or response shape."

---

## 14. Closing the exercise

> "What works: list, create, and parent state sync. What I'd add next: comments and manager review. I'd add tests around validation and API client error parsing. For production: auth middleware, persistent DB, and pagination on the list."

---

## 15. Phrases to avoid

- "It should just work" (explain why)
- "I always use Redux" (justify for this app)
- Silence for 5+ minutes (narrate even if unsure)

---

## Practice drill

Pick one exercise from `INTERVIEW_DRILLS.md`. Implement it in `scratch/` while recording yourself or talking to an empty room. Replay: did you explain **what**, **why**, and **tradeoffs**?
