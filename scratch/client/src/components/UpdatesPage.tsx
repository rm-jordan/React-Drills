/**
 * SESSION 2 — YOUR TASKS:
 *
 * 1. Set USE_API = true
 * 2. Change useState(STATIC_UPDATES) → useState([])
 * 3. Refresh — data should come from fetchUpdates()
 *
 * useEffect is already implemented. You are wiring it on, not writing from scratch.
 */

import { useEffect, useState } from "react";
import { fetchUpdates } from "../api/client";
import { STATIC_UPDATES, STATIC_USER_NAMES } from "../data/staticData";
import type { Update } from "../types";
import { UpdateDetail } from "./UpdateDetail";
import { UpdateList } from "./UpdateList";

// TODO Session 2: flip to true when ready to load from API
const USE_API = false;

export function UpdatesPage() {
  // TODO Session 2: when USE_API is true, start with [] not STATIC_UPDATES
  const [updates, setUpdates] = useState<Update[]>(STATIC_UPDATES);
  const [selectedId, setSelectedId] = useState<string | null>(STATIC_UPDATES[0]?.id ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!USE_API) return;

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchUpdates();
        if (!cancelled) {
          setUpdates(data);
          setSelectedId(data[0]?.id ?? null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load updates");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const selectedUpdate = updates.find((u) => u.id === selectedId) ?? null;

  if (loading) {
    return <p>Loading updates…</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  if (updates.length === 0) {
    return <p className="muted">No updates yet.</p>;
  }

  return (
    <div>
      <header style={{ marginBottom: "1.5rem" }}>
        <h1>Employee Updates</h1>
        <p className="muted">
          {USE_API
            ? `Loaded ${updates.length} updates from API`
            : "Static data — set USE_API = true and initial state to []"}
        </p>
      </header>

      <div className="layout">
        <div>
          <h2>Updates ({updates.length})</h2>
          <UpdateList
            updates={updates}
            userNames={STATIC_USER_NAMES}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
        <div>
          {selectedUpdate ? (
            <UpdateDetail
              update={selectedUpdate}
              authorName={STATIC_USER_NAMES[selectedUpdate.userId] ?? "Unknown"}
            />
          ) : (
            <p className="muted">Select an update to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
}
