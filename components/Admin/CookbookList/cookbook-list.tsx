"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminListToolbar } from "@/components/Admin/Ui/AdminListToolbar/admin-list-toolbar";
import {
  COOKBOOK_STATUS_LABELS,
  COOKBOOK_STATUSES,
  getCookbookStatusBadgeClass,
  isCookbookDisabled,
  resolveCookbookStatus,
} from "@/lib/admin/cookbook-status";
import {
  formatAdminListDate,
  matchesAdminListSearch,
} from "@/lib/admin/format-admin-list";
import { fetchCookbooks } from "@/lib/admin/cookbooks-client";
import { useAdminListRefresh } from "@/lib/admin/use-admin-list-refresh";
import type { Cookbook } from "@/lib/cookbooks/types";
import styles from "@/components/Admin/CookbookEditor/cookbook-editor.module.css";

type CookbookListProps = {
  cookbooks: Cookbook[];
};

function cookbookMeta(cookbook: Cookbook): string {
  const retailerCount = cookbook.buyLinks.filter((link) => link.url.trim()).length;
  const parts: string[] = [];
  if (cookbook.badge.trim()) parts.push(cookbook.badge.trim());
  if (retailerCount > 0) {
    parts.push(`${retailerCount} retailer${retailerCount === 1 ? "" : "s"}`);
  }
  if (parts.length > 0) return parts.join(" · ");
  return cookbook.subtitle || "—";
}

function CookbookStatusBadge({ cookbook }: { cookbook: Cookbook }) {
  const status = resolveCookbookStatus(cookbook);
  return (
    <span className={`badge ${getCookbookStatusBadgeClass(status)}`}>
      {COOKBOOK_STATUS_LABELS[status]}
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

export function CookbookList({ cookbooks: initialCookbooks }: CookbookListProps) {
  const cookbooks = useAdminListRefresh(initialCookbooks, fetchCookbooks, "/admin/cookbooks");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const statusOptions = useMemo(
    () => [
      { value: "all", label: "All statuses" },
      ...COOKBOOK_STATUSES.map((status) => ({
        value: status,
        label: COOKBOOK_STATUS_LABELS[status],
      })),
    ],
    [],
  );

  const filteredCookbooks = useMemo(() => {
    return cookbooks.filter((cookbook) => {
      const status = resolveCookbookStatus(cookbook);
      const matchesStatus = statusFilter === "all" || status === statusFilter;
      const matchesSearch = matchesAdminListSearch(
        searchQuery,
        cookbook.title,
        cookbook.slug,
        cookbook.subtitle,
      );
      return matchesStatus && matchesSearch;
    });
  }, [cookbooks, searchQuery, statusFilter]);

  return (
    <div className="card adminListCard">
      <AdminListToolbar
        searchPlaceholder="Search cookbooks…"
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        statusOptions={statusOptions}
      />
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: 56 }} aria-hidden />
            <th>Title</th>
            <th>Status</th>
            <th>Year</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {filteredCookbooks.length === 0 ? (
            <tr>
              <td colSpan={5} className="tableEmpty">
                No cookbooks match your search.
              </td>
            </tr>
          ) : (
            filteredCookbooks.map((cookbook) => {
              const isDisabled = isCookbookDisabled(cookbook);
              const cover = cookbook.carouselImages.find((image) => image.src.trim())?.src;

              return (
                <ClickableTableRow
                  key={cookbook.id}
                  href={`/admin/cookbooks/${cookbook.id}/edit`}
                  className={isDisabled ? "tableRowDisabled" : undefined}
                >
                  <td>
                    <div className={styles.thumbCell}>
                      {cover ? <img src={cover} alt="" /> : null}
                    </div>
                  </td>
                  <td className="tableTitleCell">
                    <span className="tableTitleMain">{cookbook.title}</span>
                    <span className="tableTitlePath">{cookbookMeta(cookbook)}</span>
                    {isDisabled ? (
                      <span className="tableRowDisabledNote">Hidden from site</span>
                    ) : null}
                  </td>
                  <td>
                    <CookbookStatusBadge cookbook={cookbook} />
                  </td>
                  <td>{cookbook.year ?? "—"}</td>
                  <td>{formatAdminListDate(cookbook.updated_at)}</td>
                </ClickableTableRow>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
