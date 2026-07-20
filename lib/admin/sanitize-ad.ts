import type { AdPlacementId, AdStatus, SiteAd } from "@/lib/ads/types";
import { normalizeAd } from "@/lib/admin/ad-status";

const PLACEMENTS: AdPlacementId[] = ["header", "footer"];
const STATUSES: AdStatus[] = ["draft", "published", "scheduled", "private", "disabled"];

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asNumber(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function asNullableString(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  return typeof value === "string" ? value : null;
}

function sanitizePlacements(value: unknown): AdPlacementId[] {
  if (!Array.isArray(value)) return ["header", "footer"];
  const next = value.filter((item): item is AdPlacementId =>
    typeof item === "string" && PLACEMENTS.includes(item as AdPlacementId),
  );
  return next.length > 0 ? [...new Set(next)] : ["header", "footer"];
}

function sanitizeStatus(value: unknown): AdStatus {
  if (typeof value === "string" && STATUSES.includes(value as AdStatus)) {
    return value as AdStatus;
  }
  return "draft";
}

export function sanitizeSiteAd(input: unknown): SiteAd {
  const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const now = new Date().toISOString();

  const ad: SiteAd = {
    id: asString(raw.id) || crypto.randomUUID(),
    title: asString(raw.title, "Untitled advertisement"),
    image: asString(raw.image),
    href: asString(raw.href),
    ariaLabel: asString(raw.ariaLabel),
    width: asNumber(raw.width, 728),
    height: asNumber(raw.height, 200),
    placements: sanitizePlacements(raw.placements),
    sortOrder: asNumber(raw.sortOrder, 0),
    status: sanitizeStatus(raw.status),
    scheduled_at: asNullableString(raw.scheduled_at),
    published_at: asNullableString(raw.published_at),
    created_at: asString(raw.created_at, now),
    updated_at: asString(raw.updated_at, now),
  };

  return normalizeAd(ad);
}
