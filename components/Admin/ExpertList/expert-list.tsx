"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminListToolbar } from "@/components/Admin/Ui/AdminListToolbar/admin-list-toolbar";
import {
  EXPERT_STATUS_LABELS,
  EXPERT_STATUSES,
  getExpertStatusBadgeClass,
  isExpertDisabled,
  resolveExpertStatus,
} from "@/lib/admin/expert-status";
import { updateExpertsIntroApi } from "@/lib/admin/experts-client";
import {
  formatAdminListDate,
  matchesAdminListSearch,
} from "@/lib/admin/format-admin-list";
import type { Expert } from "@/lib/experts/types";

type ExpertListProps = {
  experts: Expert[];
  intro: string;
};

function ExpertStatusBadge({ expert }: { expert: Expert }) {
  const status = resolveExpertStatus(expert);
  return (
    <span className={`badge ${getExpertStatusBadgeClass(status)}`}>
      {EXPERT_STATUS_LABELS[status]}
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

export function ExpertList({ experts, intro: initialIntro }: ExpertListProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [intro, setIntro] = useState(initialIntro);
  const [introDirty, setIntroDirty] = useState(false);
  const [savingIntro, setSavingIntro] = useState(false);
  const [introMessage, setIntroMessage] = useState<string | null>(null);

  const statusOptions = useMemo(
    () => [
      { value: "all", label: "All statuses" },
      ...EXPERT_STATUSES.map((status) => ({
        value: status,
        label: EXPERT_STATUS_LABELS[status],
      })),
    ],
    [],
  );

  const filteredExperts = useMemo(() => {
    return experts.filter((expert) => {
      const status = resolveExpertStatus(expert);
      const matchesStatus = statusFilter === "all" || status === statusFilter;
      const matchesSearch = matchesAdminListSearch(
        searchQuery,
        expert.name,
        expert.slug,
        expert.role,
      );
      return matchesStatus && matchesSearch;
    });
  }, [experts, searchQuery, statusFilter]);

  const saveIntro = async () => {
    setSavingIntro(true);
    setIntroMessage(null);
    try {
      const saved = await updateExpertsIntroApi(intro);
      setIntro(saved);
      setIntroDirty(false);
      setIntroMessage("Listing intro saved.");
      router.refresh();
    } catch (error) {
      setIntroMessage(error instanceof Error ? error.message : "Failed to save intro.");
    } finally {
      setSavingIntro(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="card">
        <h2 className="cardSectionTitle">Listing page intro</h2>
        <p className="cardDesc">Shown at the top of /meet-our-experts.</p>
        <div className="field">
          <label className="fieldLabel" htmlFor="experts-intro">
            Intro text
          </label>
          <textarea
            id="experts-intro"
            className="fieldTextarea"
            rows={4}
            value={intro}
            onChange={(e) => {
              setIntro(e.target.value);
              setIntroDirty(true);
              setIntroMessage(null);
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
          <button
            type="button"
            className="btn btnPrimary"
            onClick={saveIntro}
            disabled={savingIntro || !introDirty}
          >
            {savingIntro ? "Saving…" : "Save intro"}
          </button>
          {introMessage ? <span className="statusBar">{introMessage}</span> : null}
          {introDirty && !introMessage ? <span className="statusBar statusDirty">Unsaved intro changes</span> : null}
        </div>
      </div>

      <div className="card adminListCard">
        <AdminListToolbar
          searchPlaceholder="Search experts..."
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          statusOptions={statusOptions}
        />
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Role</th>
              <th>Order</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {filteredExperts.length === 0 ? (
              <tr>
                <td colSpan={5} className="tableEmpty">
                  No experts match your search.
                </td>
              </tr>
            ) : (
              filteredExperts.map((expert) => {
                const isDisabled = isExpertDisabled(expert);

                return (
                  <ClickableTableRow
                    key={expert.id}
                    href={`/admin/experts/${expert.id}/edit`}
                    className={isDisabled ? "tableRowDisabled" : undefined}
                  >
                    <td className="tableTitleCell">
                      <span className="tableTitleMain">{expert.name}</span>
                      <span className="tableTitlePath">/experts/{expert.slug}</span>
                      {isDisabled ? (
                        <span className="tableRowDisabledNote">Hidden from site</span>
                      ) : null}
                    </td>
                    <td>
                      <ExpertStatusBadge expert={expert} />
                    </td>
                    <td>{expert.role || "—"}</td>
                    <td>{expert.sort_order}</td>
                    <td>{formatAdminListDate(expert.updated_at)}</td>
                  </ClickableTableRow>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
