"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { matchesAdminListSearch } from "@/lib/admin/format-admin-list";
import {
  formatAdminUserFullName,
  type AdminUser,
} from "@/lib/admin/users/types";
import { getMergedAdminUsers } from "@/lib/admin/users/users-storage";
import styles from "./user-list.module.css";

const PAGE_SIZE = 20;

function formatRegisteredDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}/${m}/${day}`;
}

function ClickableTableRow({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <tr
      className="tableRowClickable"
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

export function UserList() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setUsers(getMergedAdminUsers());
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      matchesAdminListSearch(
        appliedSearch,
        user.username,
        formatAdminUserFullName(user),
        user.email,
        user.nickname,
      ),
    );
  }, [users, appliedSearch]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const applySearch = () => {
    setAppliedSearch(searchQuery.trim());
    setPage(1);
  };

  return (
    <div className={`card ${styles.userListCard}`}>
      <div className={styles.toolbar}>
        <form
          className={styles.searchForm}
          onSubmit={(event) => {
            event.preventDefault();
            applySearch();
          }}
        >
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search users"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            aria-label="Search users"
          />
          <button type="submit" className={styles.searchBtn}>
            Search
          </button>
        </form>
      </div>

      <div className={styles.listMetaBar}>
        <span className={styles.itemCount}>{filteredUsers.length} items</span>
        <div className={styles.pagination}>
          <button
            type="button"
            className={styles.pageBtn}
            disabled={currentPage <= 1}
            onClick={() => setPage(1)}
            aria-label="First page"
          >
            «
          </button>
          <button
            type="button"
            className={styles.pageBtn}
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            aria-label="Previous page"
          >
            ‹
          </button>
          <span className={styles.pageIndicator}>
            <input
              className={styles.pageInput}
              type="number"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={(event) => {
                const next = Number(event.target.value);
                if (!Number.isNaN(next)) {
                  setPage(Math.min(totalPages, Math.max(1, next)));
                }
              }}
              aria-label="Current page"
            />
            of {totalPages}
          </span>
          <button
            type="button"
            className={styles.pageBtn}
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            aria-label="Next page"
          >
            ›
          </button>
          <button
            type="button"
            className={styles.pageBtn}
            disabled={currentPage >= totalPages}
            onClick={() => setPage(totalPages)}
            aria-label="Last page"
          >
            »
          </button>
        </div>
      </div>

      <div className={styles.tableWrap}>
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Registered</th>
            </tr>
          </thead>
          <tbody>
            {pageUsers.length === 0 ? (
              <tr>
                <td colSpan={4} className="tableEmpty">
                  No users match your search.
                </td>
              </tr>
            ) : (
              pageUsers.map((user) => (
                <ClickableTableRow key={user.id} href={`/admin/users/${user.id}`}>
                  <td className={styles.usernameCell}>{user.username}</td>
                  <td>{formatAdminUserFullName(user)}</td>
                  <td>{user.email}</td>
                  <td className={styles.dateCell}>{formatRegisteredDate(user.registeredAt)}</td>
                </ClickableTableRow>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
