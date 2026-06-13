// SOLVED — reset with: npm run drills:reset
// Pattern: early return for loading → error → empty → main content

import type { Update } from "../types";

interface Props {
  updates: Update[];
  loading: boolean;
  error: string | null;
}

export function BrokenRenderStates({ updates, loading, error }: Props) {
  if (loading) {
    return <p>Loading updates…</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  if (updates.length === 0) {
    return <p>No updates yet.</p>;
  }

  return (
    <ul data-testid="update-list">
      {updates.map((u) => (
        <li key={u.id}>{u.title}</li>
      ))}
    </ul>
  );
}
