"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminListToolbar } from "@/components/Admin/Ui/AdminListToolbar/admin-list-toolbar";
import {
  PARTNER_PAGE_STATUS_LABELS,
  PARTNER_PAGE_STATUSES,
  getPartnerPageStatusBadgeClass,
  isPartnerPageDisabled,
  resolvePartnerPageStatus,
} from "@/lib/admin/partner-page-status";
import { formatAdminListDate, matchesAdminListSearch } from "@/lib/admin/format-admin-list";
import type { PartnerPage } from "@/lib/content-blocks/types";

type PartnerPageListProps = {
  partners: PartnerPage[];
};

function PartnerStatusBadge({ partner }: { partner: PartnerPage }) {
  const status = resolvePartnerPageStatus(partner);
  return (
    <span className={`badge ${getPartnerPageStatusBadgeClass(status)}`}>
      {PARTNER_PAGE_STATUS_LABELS[status]}
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

export function PartnerPageList({ partners }: PartnerPageListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const statusOptions = useMemo(
    () => [
      { value: "all", label: "All statuses" },
      ...PARTNER_PAGE_STATUSES.map((status) => ({
        value: status,
        label: PARTNER_PAGE_STATUS_LABELS[status],
      })),
    ],
    [],
  );

  const filteredPartners = useMemo(() => {
    return partners.filter((partner) => {
      const status = resolvePartnerPageStatus(partner);
      const matchesStatus = statusFilter === "all" || status === statusFilter;
      const matchesSearch = matchesAdminListSearch(searchQuery, partner.title, partner.slug);
      return matchesStatus && matchesSearch;
    });
  }, [partners, searchQuery, statusFilter]);

  return (
    <div className="card adminListCard">
      <AdminListToolbar
        searchPlaceholder="Search partners..."
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
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {filteredPartners.length === 0 ? (
            <tr>
              <td colSpan={3} className="tableEmpty">
                No partner pages match your search.
              </td>
            </tr>
          ) : (
            filteredPartners.map((partner) => {
              const isDisabled = isPartnerPageDisabled(partner);

              return (
                <ClickableTableRow
                  key={partner.id}
                  href={`/admin/partners/${partner.id}/edit`}
                  className={isDisabled ? "tableRowDisabled" : undefined}
                >
                  <td className="tableTitleCell">
                    <span className="tableTitleMain">{partner.title}</span>
                    <span className="tableTitlePath">/{partner.slug}</span>
                    {isDisabled ? (
                      <span className="tableRowDisabledNote">Hidden from site</span>
                    ) : null}
                  </td>
                  <td>
                    <PartnerStatusBadge partner={partner} />
                  </td>
                  <td>{formatAdminListDate(partner.updated_at)}</td>
                </ClickableTableRow>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
