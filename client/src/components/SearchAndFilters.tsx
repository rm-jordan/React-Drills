import type { SortDirection, SortField, UpdateStatus } from "../types";

interface SearchAndFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: UpdateStatus | "all";
  onStatusFilterChange: (value: UpdateStatus | "all") => void;
  sortField: SortField;
  onSortFieldChange: (value: SortField) => void;
  sortDirection: SortDirection;
  onSortDirectionChange: (value: SortDirection) => void;
}

export function SearchAndFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortField,
  onSortFieldChange,
  sortDirection,
  onSortDirectionChange,
}: SearchAndFiltersProps) {
  return (
    <div className="toolbar">
      <input
        type="search"
        placeholder="Search title or body…"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search updates"
      />
      <select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value as UpdateStatus | "all")}
        aria-label="Filter by status"
      >
        <option value="all">All statuses</option>
        <option value="pending">Pending</option>
        <option value="reviewed">Reviewed</option>
        <option value="blocked">Blocked</option>
      </select>
      <select
        value={sortField}
        onChange={(e) => onSortFieldChange(e.target.value as SortField)}
        aria-label="Sort field"
      >
        <option value="createdAt">Date</option>
        <option value="title">Title</option>
        <option value="status">Status</option>
      </select>
      <select
        value={sortDirection}
        onChange={(e) => onSortDirectionChange(e.target.value as SortDirection)}
        aria-label="Sort direction"
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
}
