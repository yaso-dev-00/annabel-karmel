import type { PartnerPage, PartnerPageStatus } from "@/lib/content-blocks/types";

export const PARTNER_PAGE_STATUSES: PartnerPageStatus[] = [
  "draft",
  "published",
  "scheduled",
  "private",
  "disabled",
];

export const PARTNER_PAGE_STATUS_LABELS: Record<PartnerPageStatus, string> = {
  draft: "Draft",
  published: "Published",
  scheduled: "Scheduled",
  private: "Private",
  disabled: "Disabled",
};

export const PARTNER_PAGE_STATUS_HINTS: Record<PartnerPageStatus, string> = {
  draft: "Saved in the CMS only — not visible on the public site.",
  published: "Live on the site and available to visitors now.",
  scheduled: "Automatically goes live at the date and time you set.",
  private: "Hidden from public listings; viewable via admin preview only.",
  disabled: "Turned off — hidden from the public site until re-enabled.",
};

export function resolvePartnerPageStatus(partner: PartnerPage): PartnerPageStatus {
  if (partner.status) return partner.status;
  return partner.published_at ? "published" : "draft";
}

export function buildPartnerPageSavePayload(
  partner: PartnerPage,
  options?: { publish?: boolean },
): PartnerPage {
  const status = options?.publish
    ? "published"
    : (partner.status ?? resolvePartnerPageStatus(partner));
  return applyPartnerPageStatus(partner, status, partner.scheduled_at);
}

export function getPartnerPageStatusPatch(partner: PartnerPage): Pick<
  PartnerPage,
  "status" | "published_at" | "scheduled_at"
> {
  const normalized = applyPartnerPageStatus(
    partner,
    partner.status ?? resolvePartnerPageStatus(partner),
    partner.scheduled_at,
  );
  return {
    status: normalized.status,
    published_at: normalized.published_at,
    scheduled_at: normalized.scheduled_at,
  };
}

export function normalizePartnerPage(partner: PartnerPage): PartnerPage {
  const status = resolvePartnerPageStatus(partner);
  const scheduled_at = partner.scheduled_at ?? null;
  let published_at = partner.published_at;

  if (status === "draft") {
    published_at = null;
  } else if (status === "published") {
    published_at = published_at ?? partner.updated_at ?? new Date().toISOString();
  } else if (status === "scheduled") {
    if (scheduled_at && new Date(scheduled_at).getTime() <= Date.now()) {
      published_at = published_at ?? scheduled_at;
    } else {
      published_at = null;
    }
  } else if (status === "private") {
    published_at = published_at ?? partner.updated_at ?? new Date().toISOString();
  } else if (status === "disabled") {
    published_at = null;
  }

  return {
    ...partner,
    status,
    scheduled_at,
    published_at,
  };
}

export function applyPartnerPageStatus(
  partner: PartnerPage,
  status: PartnerPageStatus,
  scheduledAt?: string | null,
): PartnerPage {
  const now = new Date().toISOString();
  const scheduled_at = status === "scheduled" ? (scheduledAt ?? partner.scheduled_at ?? now) : null;

  let published_at = partner.published_at;
  if (status === "draft") {
    published_at = null;
  } else if (status === "published") {
    published_at = published_at ?? now;
  } else if (status === "scheduled") {
    const isDue = scheduled_at ? new Date(scheduled_at).getTime() <= Date.now() : false;
    published_at = isDue ? (published_at ?? scheduled_at) : null;
  } else if (status === "private") {
    published_at = published_at ?? now;
  } else if (status === "disabled") {
    published_at = null;
  }

  return normalizePartnerPage({
    ...partner,
    status,
    scheduled_at,
    published_at,
  });
}

export function isPartnerPagePublic(partner: PartnerPage): boolean {
  const status = resolvePartnerPageStatus(partner);
  if (status === "draft" || status === "private" || status === "disabled") return false;
  if (status === "published") return Boolean(partner.published_at);
  if (status === "scheduled") {
    const at = partner.scheduled_at;
    if (!at) return false;
    return new Date(at).getTime() <= Date.now();
  }
  return false;
}

export function isPartnerPageDisabled(partner: PartnerPage): boolean {
  return resolvePartnerPageStatus(partner) === "disabled";
}

export function isPartnerPagePreviewable(partner: PartnerPage): boolean {
  return !isPartnerPageDisabled(partner);
}

export function getPartnerPageStatusBadgeClass(status: PartnerPageStatus): string {
  switch (status) {
    case "published":
      return "badgePublished";
    case "scheduled":
      return "badgeScheduled";
    case "private":
      return "badgePrivate";
    case "disabled":
      return "badgeDisabled";
    default:
      return "badgeDraft";
  }
}
