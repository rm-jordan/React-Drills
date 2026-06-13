import { useEffect, useState } from "react";
import { fetchStats } from "../api/client";
import type { Stats } from "../types";

interface StatsPanelProps {
  refreshKey: number;
}

export function StatsPanel({ refreshKey }: StatsPanelProps) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchStats();
        if (!cancelled) {
          setStats(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load stats");
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
  }, [refreshKey]);

  if (loading) return <p className="muted">Loading stats…</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!stats) return null;

  return (
    <div className="stats-grid">
      <div className="stat-box">
        <strong>{stats.total}</strong>
        <span className="muted">Total</span>
      </div>
      <div className="stat-box">
        <strong>{stats.pending}</strong>
        <span className="muted">Pending</span>
      </div>
      <div className="stat-box">
        <strong>{stats.reviewed}</strong>
        <span className="muted">Reviewed</span>
      </div>
      <div className="stat-box">
        <strong>{stats.blocked}</strong>
        <span className="muted">Blocked</span>
      </div>
    </div>
  );
}
