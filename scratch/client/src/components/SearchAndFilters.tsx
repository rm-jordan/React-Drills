/**
 * INTERVIEW DRILL 10 — Search, filter & sort controls
 * See INTERVIEW_DRILLS.md Exercise 10
 * Reference: ../../../client/src/components/SearchAndFilters.tsx
 */

import type { SortDirection, SortField, UpdateStatus } from "../types";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: UpdateStatus | "all";
  onStatusFilterChange: (value: UpdateStatus | "all") => void;
  sortField: SortField;
  onSortFieldChange: (value: SortField) => void;
  sortDirection: SortDirection;
  onSortDirectionChange: (value: SortDirection) => void;
}

export function SearchAndFilters(_props: Props) {
  return <p className="muted">TODO: SearchAndFilters</p>;
}
