import { ADMIN_USERS_SEED } from "@/data/admin-users";
import type { AdminUser } from "@/lib/admin/users/types";

export const ADMIN_USERS_OVERRIDES_KEY = "ak-admin-users-overrides";

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readOverrides(): Record<string, AdminUser> {
  if (!canUseStorage()) return {};
  try {
    const raw = window.localStorage.getItem(ADMIN_USERS_OVERRIDES_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, AdminUser>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeOverrides(overrides: Record<string, AdminUser>): void {
  if (!canUseStorage()) return;
  window.localStorage.setItem(ADMIN_USERS_OVERRIDES_KEY, JSON.stringify(overrides));
}

export function getMergedAdminUsers(): AdminUser[] {
  const overrides = readOverrides();
  return ADMIN_USERS_SEED.map((user) => overrides[user.id] ?? user).sort((a, b) =>
    a.username.localeCompare(b.username, undefined, { sensitivity: "base" }),
  );
}

export function getMergedAdminUserById(id: string): AdminUser | undefined {
  const overrides = readOverrides();
  if (overrides[id]) return overrides[id];
  return ADMIN_USERS_SEED.find((user) => user.id === id);
}

export function saveAdminUserOverride(user: AdminUser): AdminUser {
  const overrides = readOverrides();
  overrides[user.id] = user;
  writeOverrides(overrides);
  return user;
}
