export const ADMIN_USER_ROLES = ["subscriber", "administrator", "editor"] as const;

export type AdminUserRole = (typeof ADMIN_USER_ROLES)[number];

export type AdminUser = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  nickname: string;
  role: AdminUserRole;
  displayName: string;
  registeredAt: string;
};

export function formatAdminUserFullName(user: Pick<AdminUser, "firstName" | "lastName">): string {
  return [user.firstName, user.lastName].filter(Boolean).join(" ").trim() || "—";
}

export function buildDisplayNameOptions(user: Pick<AdminUser, "nickname" | "firstName" | "lastName">): string[] {
  const options = [
    user.nickname,
    user.firstName,
    user.lastName,
    [user.firstName, user.lastName].filter(Boolean).join(" ").trim(),
    [user.lastName, user.firstName].filter(Boolean).join(" ").trim(),
  ].filter((value): value is string => Boolean(value && value.trim()));

  return Array.from(new Set(options));
}

export function roleLabel(role: AdminUserRole): string {
  switch (role) {
    case "administrator":
      return "Administrator";
    case "editor":
      return "Editor";
    default:
      return "Subscriber";
  }
}
