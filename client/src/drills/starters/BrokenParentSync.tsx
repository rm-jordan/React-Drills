// TODO DRILL: PATCH succeeds in detail view but the list still shows old status.
// Fix: call onUpdated(patched) so the parent can sync its array.

import { useState } from "react";
import { patchUpdate } from "../../api/client";
import type { Update } from "../../types";

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
      // BUG: parent never notified — list stays stale
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
