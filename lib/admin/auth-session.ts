export const ADMIN_SESSION_COOKIE = "ak-admin-session";

/** @deprecated Prefer ADMIN_SESSION_COOKIE — kept for clearing old localStorage sessions. */
export const ADMIN_SESSION_KEY = "ak-admin-session";

export const DEMO_ADMIN = {
  email: "admin@annabelkarmel.com",
  password: "admin123",
  name: "Admin",
} as const;

export type AdminSession = {
  email: string;
  name: string;
  loggedInAt: string;
};

type SessionListener = () => void;

const sessionListeners = new Set<SessionListener>();

/** Cached snapshot so `useSyncExternalStore` gets a stable reference. */
let cachedRaw: string | null | undefined;
let cachedSession: AdminSession | null = null;

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function canUseDom(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function notifySessionListeners(): void {
  sessionListeners.forEach((listener) => listener());
}

function parseSession(raw: string | null): AdminSession | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<AdminSession>;
    if (!parsed.email || !parsed.loggedInAt) return null;
    return {
      email: parsed.email,
      name: parsed.name ?? "Admin",
      loggedInAt: parsed.loggedInAt,
    };
  } catch {
    return null;
  }
}

function readSessionCookieRaw(): string | null {
  if (!canUseDom()) return null;
  const prefix = `${ADMIN_SESSION_COOKIE}=`;
  const parts = document.cookie.split("; ");
  for (const part of parts) {
    if (part.startsWith(prefix)) {
      return decodeURIComponent(part.slice(prefix.length));
    }
  }
  return null;
}

function writeSessionCookie(raw: string): void {
  if (!canUseDom()) return;
  document.cookie = [
    `${ADMIN_SESSION_COOKIE}=${encodeURIComponent(raw)}`,
    "Path=/",
    "SameSite=Lax",
    `Max-Age=${SESSION_MAX_AGE_SECONDS}`,
  ].join("; ");
}

function clearSessionCookie(): void {
  if (!canUseDom()) return;
  document.cookie = `${ADMIN_SESSION_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}

function clearLegacyLocalStorage(): void {
  try {
    window.localStorage?.removeItem(ADMIN_SESSION_KEY);
  } catch {
    // ignore
  }
}

export function subscribeAdminSession(listener: SessionListener): () => void {
  sessionListeners.add(listener);
  return () => {
    sessionListeners.delete(listener);
  };
}

export function validateAdminCredentials(email: string, password: string): boolean {
  return (
    email.trim().toLowerCase() === DEMO_ADMIN.email && password === DEMO_ADMIN.password
  );
}

export function getAdminSession(): AdminSession | null {
  const raw = readSessionCookieRaw();
  if (raw === cachedRaw) {
    return cachedSession;
  }
  cachedRaw = raw;
  cachedSession = parseSession(raw);
  return cachedSession;
}

/** SSR-safe snapshot for `useSyncExternalStore` (always null on server). */
export function getAdminSessionServerSnapshot(): AdminSession | null {
  return null;
}

export function setAdminSession(email: string): AdminSession {
  const session: AdminSession = {
    email: email.trim().toLowerCase(),
    name: DEMO_ADMIN.name,
    loggedInAt: new Date().toISOString(),
  };
  const raw = JSON.stringify(session);
  writeSessionCookie(raw);
  clearLegacyLocalStorage();
  cachedRaw = raw;
  cachedSession = session;
  notifySessionListeners();
  return session;
}

export function clearAdminSession(): void {
  clearSessionCookie();
  clearLegacyLocalStorage();
  cachedRaw = null;
  cachedSession = null;
  notifySessionListeners();
}

/** Safe post-login redirect within /admin (blocks open redirects). */
export function getSafeAdminNextPath(next: string | null | undefined): string {
  if (!next) return "/admin";
  if (!next.startsWith("/admin")) return "/admin";
  if (next.startsWith("/admin/login")) return "/admin";
  return next;
}
