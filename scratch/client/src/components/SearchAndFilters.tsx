/** SESSION 5 — TODO: controlled search, status filter, sort field/direction */

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
