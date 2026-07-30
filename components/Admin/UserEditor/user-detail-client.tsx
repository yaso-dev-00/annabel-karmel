"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/Admin/AdminShell";
import { UserEditor } from "@/components/Admin/UserEditor";
import type { AdminUser } from "@/lib/admin/users/types";
import { getMergedAdminUserById } from "@/lib/admin/users/users-storage";

type UserDetailClientProps = {
  userId: string;
};

export function UserDetailClient({ userId }: UserDetailClientProps) {
  const [user, setUser] = useState<AdminUser | null | undefined>(undefined);

  useEffect(() => {
    setUser(getMergedAdminUserById(userId) ?? null);
  }, [userId]);

  if (user === undefined) {
    return (
      <AdminShell breadcrumb="Edit user">
        <p style={{ color: "var(--admin-muted, #666)" }}>Loading user…</p>
      </AdminShell>
    );
  }

  if (!user) {
    return (
      <AdminShell breadcrumb="Edit user">
        <p>
          User not found.{" "}
          <Link href="/admin/users" style={{ color: "var(--admin-brand, #963b58)" }}>
            Back to All Users
          </Link>
        </p>
      </AdminShell>
    );
  }

  return (
    <AdminShell
      title={user.displayName || user.username}
      breadcrumb={`Users / ${user.username}`}
    >
      <UserEditor initialUser={user} />
    </AdminShell>
  );
}
