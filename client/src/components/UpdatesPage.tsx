import { useEffect, useMemo, useState } from "react";
import { fetchUpdates } from "../api/client";
import { currentUser } from "../currentUser";
import type { SortDirection, SortField, Update, UpdateStatus } from "../types";
import { CreateUpdateForm } from "./CreateUpdateForm";
import { SearchAndFilters } from "./SearchAndFilters";
import { StatsPanel } from "./StatsPanel";
import { UpdateDetail } from "./UpdateDetail";
import { UpdateList } from "./UpdateList";

// Hardcoded for demo — in a real app you'd fetch /api/users
const USER_NAMES: Record<string, string> = {
  u1: "Alex Chen",
  u2: "Jordan Lee",
  u3: "Sam Rivera",
};

export function UpdatesPage() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statsRefreshKey, setStatsRefreshKey] = useState(0);

  // INTERVIEW DRILL 10 (reference): filter/sort state lives here

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<UpdateStatus | "all">("all");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  useEffect(() => {
    // INTERVIEW DRILL 6 (reference): fetch on mount + cleanup flag
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUpdates();
        if (!cancelled) {
          setUpdates(data);
          if (data.length > 0 && !selectedId) {
            setSelectedId(data[0].id);
          }
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
    // Intentionally omit selectedId — only load on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredUpdates = useMemo(() => {
    // INTERVIEW DRILL 10 (reference): derive filtered + sorted list; copy before sort
    const query = search.trim().toLowerCase();

    let result = updates.filter((u) => {
      const matchesSearch =
        query.length === 0 ||
        u.title.toLowerCase().includes(query) ||
        u.body.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "all" || u.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    result = [...result].sort((a, b) => {
      let cmp = 0;
      if (sortField === "createdAt") {
        cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortField === "title") {
        cmp = a.title.localeCompare(b.title);
      } else {
        cmp = a.status.localeCompare(b.status);
      }
      return sortDirection === "asc" ? cmp : -cmp;
    });

    return result;
  }, [updates, search, statusFilter, sortField, sortDirection]);

  const selectedUpdate = updates.find((u) => u.id === selectedId) ?? null;

  function handleCreated(update: Update) {
    // INTERVIEW DRILL 8 (reference): immutable prepend after POST
    setUpdates((prev) => [update, ...prev]);
    setSelectedId(update.id);
    setStatsRefreshKey((k) => k + 1);
  }

  function handleUpdated(update: Update) {
    // INTERVIEW DRILL 9 (reference): replace one item with .map()
    setUpdates((prev) => prev.map((u) => (u.id === update.id ? update : u)));
  }

  function handleDeleted(id: string) {
    setUpdates((prev) => {
      const next = prev.filter((u) => u.id !== id);
      if (selectedId === id) {
        setSelectedId(next[0]?.id ?? null);
      }
      return next;
    });
    setStatsRefreshKey((k) => k + 1);
  }

  return (
    <div>
      <header style={{ marginBottom: "1.5rem" }}>
        <h1>Employee Updates</h1>
        <p className="muted">
          Signed in as <strong>{currentUser.name}</strong> ({currentUser.role})
        </p>
      </header>

      {currentUser.role === "manager" && (
        <StatsPanel refreshKey={statsRefreshKey} />
      )}

      <CreateUpdateForm onCreated={handleCreated} />

      {loading && <p>Loading updates…</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && (
        <>
          <SearchAndFilters
            search={search}
            onSearchChange={setSearch}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            sortField={sortField}
            onSortFieldChange={setSortField}
            sortDirection={sortDirection}
            onSortDirectionChange={setSortDirection}
          />

          <div className="layout">
            <div>
              <h2>Updates ({filteredUpdates.length})</h2>
              <UpdateList
                updates={filteredUpdates}
                userNames={USER_NAMES}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </div>
            <div>
              {selectedUpdate ? (
                <UpdateDetail
                  update={selectedUpdate}
                  authorName={USER_NAMES[selectedUpdate.userId] ?? "Unknown"}
                  userNames={USER_NAMES}
                  onUpdated={handleUpdated}
                  onDeleted={handleDeleted}
                  onStatsRefresh={() => setStatsRefreshKey((k) => k + 1)}
                />
              ) : (
                <p className="muted">Select an update to view details.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
