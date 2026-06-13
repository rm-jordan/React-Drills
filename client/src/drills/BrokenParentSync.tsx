// SOLVED — reset with: npm run drills:reset
// Pattern: after PATCH, call onUpdated(patched) so parent syncs its array

import { useState } from "react";
import { patchUpdate } from "../api/client";
import type { Update } from "../types";

interface Props {
  update: Update;
  onUpdated: (update: Update) => void;
}

export function BrokenParentSync({ update, onUpdated }: Props) {
  const [local, setLocal] = useState(update);
  const [loading, setLoading] = useState(false);

  async function handleReview() {
    setLoading(true);
    try {
      const patched = await patchUpdate(local.id, { status: "reviewed" });
      setLocal(patched);
      onUpdated(patched);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <span data-testid="status">{local.status}</span>
      {local.status === "pending" && (
        <button type="button" onClick={handleReview} disabled={loading}>
          Mark reviewed
        </button>
      )}
    </div>
  );
}
