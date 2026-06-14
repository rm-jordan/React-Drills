/**
 * INTERVIEW DRILL 6 — Load data on mount (useEffect + loading/error)
 * INTERVIEW DRILL 8 — handleCreated + CreateUpdateForm
 * INTERVIEW DRILL 10 — SearchAndFilters + useMemo filteredUpdates
 *
 * See INTERVIEW_DRILLS.md Exercises 6, 8, 10
 * Reference: ../../../client/src/components/UpdatesPage.tsx
 */

import { useEffect, useState } from "react";
import { fetchUpdates } from "../api/client";
import { STATIC_USER_NAMES } from "../data/staticData";
import type { Update } from "../types";
import { UpdateDetail } from "./UpdateDetail";
import { UpdateList } from "./UpdateList";
import { CreateUpdateForm } from "./CreateUpdateForm";
// INTERVIEW DRILL 8: import CreateUpdateForm
// INTERVIEW DRILL 10: import SearchAndFilters; import useMemo; import SortField, SortDirection, UpdateStatus


const USE_API = true;

export function UpdatesPage() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // INTERVIEW DRILL 10: add state for search, statusFilter, sortField, sortDirection

  useEffect(() => {
    async function loadUpdates() {
      try {
        const data = await fetchUpdates();
        console.log("data",data)
        setUpdates(data);
        setSelectedId(data[0]?.id ?? null);
      } catch {
        setError("Could not load updates.");
      } finally {
        setLoading(false);
      }
    }
    loadUpdates();
  }, []);

  // INTERVIEW DRILL 10: implement filteredUpdates with useMemo (filter + [...result].sort)

  const selectedUpdate = updates.find((u) => u.id === selectedId) ?? null;

  // DRILL 8 — handleCreated (2 steps):
  //  1. setUpdates(prev => [update, ...prev])  — prepend, don't mutate
  //  2. setSelectedId(update.id)               — show new item in detail panel
  function handleCreated(update: Update) {
    setUpdates((prev) => [update, ...prev]);
    setSelectedId(update.id);
  }

  // INTERVIEW DRILL 9: implement handleUpdated (.map) and handleDeleted (.filter + fix selectedId)

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
            : "Static data — complete DRILL 6 to load from API"}
        </p>
      </header>

      <CreateUpdateForm onCreated={handleCreated} />

      {/* INTERVIEW DRILL 10: <SearchAndFilters ... /> */}

      <div className="layout">
        <div>
          <h2>Updates ({updates.length})</h2>
          <UpdateList
            updates={updates /* DRILL 10: pass filteredUpdates instead */}
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
