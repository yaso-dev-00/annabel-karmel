"use client";

type StatusOption = {
  value: string;
  label: string;
};

type AdminListToolbarProps = {
  searchPlaceholder: string;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  statusOptions: StatusOption[];
};

export function AdminListToolbar({
  searchPlaceholder,
  searchQuery,
  onSearchQueryChange,
  statusFilter,
  onStatusFilterChange,
  statusOptions,
}: AdminListToolbarProps) {
  return (
    <div className="listToolbar">
      <div className="listSearchWrap">
        <svg
          className="listSearchIcon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M16 16l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          className="listSearchInput"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(event) => onSearchQueryChange(event.target.value)}
          aria-label={searchPlaceholder}
        />
      </div>
      <select
        className="listStatusSelect fieldSelect"
        value={statusFilter}
        onChange={(event) => onStatusFilterChange(event.target.value)}
        aria-label="Filter by status"
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
