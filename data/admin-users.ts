import type { AdminUser } from "@/lib/admin/users/types";

/** Seeded demo site users for the admin Users section (localStorage overlay can override). */
export const ADMIN_USERS_SEED: AdminUser[] = [
  {
    id: "u-001",
    username: "kaitlyn@live.com",
    email: "kaitlyn@live.com",
    firstName: "Kaitlyn",
    lastName: "Mitchell",
    nickname: "kaitlyn@live.com",
    role: "subscriber",
    displayName: "Kaitlyn Mitchell",
    registeredAt: "2024-03-12T10:24:00.000Z",
  },
  {
    id: "u-002",
    username: "sarah.jones",
    email: "sarah.jones@example.com",
    firstName: "Sarah",
    lastName: "Jones",
    nickname: "SarahJ",
    role: "subscriber",
    displayName: "Sarah Jones",
    registeredAt: "2024-01-08T09:15:00.000Z",
  },
  {
    id: "u-003",
    username: "james.wilson",
    email: "james.wilson@example.com",
    firstName: "James",
    lastName: "Wilson",
    nickname: "JW",
    role: "editor",
    displayName: "James Wilson",
    registeredAt: "2023-11-22T14:40:00.000Z",
  },
];

export function getAdminUserSeedById(id: string): AdminUser | undefined {
  return ADMIN_USERS_SEED.find((user) => user.id === id);
}
