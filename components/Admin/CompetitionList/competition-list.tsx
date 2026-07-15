"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminListToolbar } from "@/components/Admin/Ui/AdminListToolbar/admin-list-toolbar";
import {
  COMPETITION_STATUS_LABELS,
  COMPETITION_STATUSES,
  getCompetitionStatusBadgeClass,
  isCompetitionDisabled,
  resolveCompetitionStatus,
} from "@/lib/admin/competition-status";
import { formatAdminListDate, matchesAdminListSearch } from "@/lib/admin/format-admin-list";
import type { Competition } from "@/lib/content-blocks/types";

type CompetitionListProps = {
  competitions: Competition[];
};

function CompetitionStatusBadge({ competition }: { competition: Competition }) {
  const status = resolveCompetitionStatus(competition);
  return (
    <span className={`badge ${getCompetitionStatusBadgeClass(status)}`}>
      {COMPETITION_STATUS_LABELS[status]}
    </span>
  );
}

function ClickableTableRow({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <tr
      className={`tableRowClickable${className ? ` ${className}` : ""}`}
      onClick={() => router.push(href)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          router.push(href);
        }
      }}
      role="link"
      tabIndex={0}
    >
      {children}
    </tr>
  );
}

export function CompetitionList({ competitions }: CompetitionListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const statusOptions = useMemo(
    () => [
      { value: "all", label: "All statuses" },
      ...COMPETITION_STATUSES.map((status) => ({
        value: status,
        label: COMPETITION_STATUS_LABELS[status],
      })),
    ],
    [],
  );

  const filteredCompetitions = useMemo(() => {
    return competitions.filter((competition) => {
      const status = resolveCompetitionStatus(competition);
      const matchesStatus = statusFilter === "all" || status === statusFilter;
      const matchesSearch = matchesAdminListSearch(
        searchQuery,
        competition.title,
        competition.slug,
      );
      return matchesStatus && matchesSearch;
    });
  }, [competitions, searchQuery, statusFilter]);

  return (
    <div className="card adminListCard">
      <AdminListToolbar
        searchPlaceholder="Search competitions..."
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        statusOptions={statusOptions}
      />
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Closes</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompetitions.length === 0 ? (
            <tr>
              <td colSpan={4} className="tableEmpty">
                No competitions match your search.
              </td>
            </tr>
          ) : (
            filteredCompetitions.map((competition) => {
              const isDisabled = isCompetitionDisabled(competition);

              return (
                <ClickableTableRow
                  key={competition.id}
                  href={`/admin/competitions/${competition.id}/edit`}
                  className={isDisabled ? "tableRowDisabled" : undefined}
                >
                  <td className="tableTitleCell">
                    <span className="tableTitleMain">{competition.title}</span>
                    <span className="tableTitlePath">/competitions/{competition.slug}</span>
                    {isDisabled ? (
                      <span className="tableRowDisabledNote">Hidden from site</span>
                    ) : null}
                  </td>
                  <td>
                    <CompetitionStatusBadge competition={competition} />
                  </td>
                  <td>
                    {competition.closes_at
                      ? formatAdminListDate(competition.closes_at)
                      : "—"}
                  </td>
                  <td>{formatAdminListDate(competition.updated_at)}</td>
                </ClickableTableRow>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
