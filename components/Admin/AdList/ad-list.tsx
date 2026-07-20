"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminListToolbar } from "@/components/Admin/Ui/AdminListToolbar/admin-list-toolbar";
import {
  AD_STATUS_LABELS,
  AD_STATUSES,
  getAdStatusBadgeClass,
  isAdDisabled,
  resolveAdStatus,
} from "@/lib/admin/ad-status";
import { formatAdminListDate, matchesAdminListSearch } from "@/lib/admin/format-admin-list";
import type { AdPlacementId, SiteAd } from "@/lib/ads/types";

type AdListProps = {
  ads: SiteAd[];
};

const PLACEMENT_LABELS: Record<AdPlacementId, string> = {
  header: "Header",
  footer: "Footer",
};

function AdStatusBadge({ ad }: { ad: SiteAd }) {
  const status = resolveAdStatus(ad);
  return (
    <span className={`badge ${getAdStatusBadgeClass(status)}`}>
      {AD_STATUS_LABELS[status]}
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

export function AdList({ ads }: AdListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const statusOptions = useMemo(
    () => [
      { value: "all", label: "All statuses" },
      ...AD_STATUSES.map((status) => ({
        value: status,
        label: AD_STATUS_LABELS[status],
      })),
    ],
    [],
  );

  const filteredAds = useMemo(() => {
    return ads.filter((ad) => {
      const status = resolveAdStatus(ad);
      const matchesStatus = statusFilter === "all" || status === statusFilter;
      const matchesSearch = matchesAdminListSearch(
        searchQuery,
        ad.title,
        ad.href,
        ad.ariaLabel,
      );
      return matchesStatus && matchesSearch;
    });
  }, [ads, searchQuery, statusFilter]);

  return (
    <div className="card adminListCard">
      <AdminListToolbar
        searchPlaceholder="Search advertisements..."
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        statusOptions={statusOptions}
      />
      <table className="table">
        <thead>
          <tr>
            <th>Banner</th>
            <th>Title</th>
            <th>Placements</th>
            <th>Status</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {filteredAds.length === 0 ? (
            <tr>
              <td colSpan={5} className="tableEmpty">
                No advertisements match your search.
              </td>
            </tr>
          ) : (
            filteredAds.map((ad) => {
              const isDisabled = isAdDisabled(ad);
              const placementLabel = ad.placements
                .map((placement) => PLACEMENT_LABELS[placement])
                .join(", ");

              return (
                <ClickableTableRow
                  key={ad.id}
                  href={`/admin/ads/${ad.id}/edit`}
                  className={isDisabled ? "tableRowDisabled" : undefined}
                >
                  <td>
                    {ad.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={ad.image}
                        alt=""
                        width={96}
                        height={26}
                        style={{
                          display: "block",
                          width: 96,
                          height: 26,
                          objectFit: "cover",
                          borderRadius: 4,
                          background: "#f3f1f2",
                        }}
                      />
                    ) : (
                      <span style={{ color: "#9a9498" }}>—</span>
                    )}
                  </td>
                  <td className="tableTitleCell">
                    <span className="tableTitleMain">{ad.title}</span>
                    {ad.href ? <span className="tableTitlePath">{ad.href}</span> : null}
                    {isDisabled ? (
                      <span className="tableRowDisabledNote">Hidden from site</span>
                    ) : null}
                  </td>
                  <td>{placementLabel || "—"}</td>
                  <td>
                    <AdStatusBadge ad={ad} />
                  </td>
                  <td>{formatAdminListDate(ad.updated_at)}</td>
                </ClickableTableRow>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
