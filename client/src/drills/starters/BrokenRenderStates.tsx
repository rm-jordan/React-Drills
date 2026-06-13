// TODO DRILL: Wrong thing renders — list shows during loading; empty list shows nothing.
// Fix: early return for loading/error/empty before rendering the list (see UpdatesPage).

import type { Update } from "../../types";

interface Props {
  updates: Update[];
  loading: boolean;
  error: string | null;
}

export function BrokenRenderStates({ updates, loading, error }: Props) {
  // BUG: no early returns — list renders during loading; empty list has no message
  return (
    <div>
      {loading && <p>Loading updates…</p>}
      {error && <p className="error-text">{error}</p>}
      <ul data-testid="update-list">
        {updates.map((u) => (
          <li key={u.id}>{u.title}</li>
        ))}
      </ul>
    </div>
  );
}
