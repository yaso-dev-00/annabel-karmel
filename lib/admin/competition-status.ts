import type { Competition, CompetitionStatus } from "@/lib/content-blocks/types";

export const COMPETITION_STATUSES: CompetitionStatus[] = [
  "draft",
  "published",
  "scheduled",
  "private",
  "disabled",
];

export const COMPETITION_STATUS_LABELS: Record<CompetitionStatus, string> = {
  draft: "Draft",
  published: "Published",
  scheduled: "Scheduled",
  private: "Private",
  disabled: "Disabled",
};

export const COMPETITION_STATUS_HINTS: Record<CompetitionStatus, string> = {
  draft: "Saved in the CMS only — not visible on the public site.",
  published: "Live on the site and available to visitors now.",
  scheduled: "Automatically goes live at the date and time you set.",
  private: "Hidden from public listings; viewable via admin preview only.",
  disabled: "Turned off — hidden from the public site until re-enabled.",
};

export function resolveCompetitionStatus(competition: Competition): CompetitionStatus {
  if (competition.status) return competition.status;
  return competition.published_at ? "published" : "draft";
}

export function buildCompetitionSavePayload(
  competition: Competition,
  options?: { publish?: boolean },
): Competition {
  const status = options?.publish
    ? "published"
    : (competition.status ?? resolveCompetitionStatus(competition));
  return applyCompetitionStatus(competition, status, competition.scheduled_at);
}

export function getCompetitionStatusPatch(competition: Competition): Pick<
  Competition,
  "status" | "published_at" | "scheduled_at"
> {
  const normalized = applyCompetitionStatus(
    competition,
    competition.status ?? resolveCompetitionStatus(competition),
    competition.scheduled_at,
  );
  return {
    status: normalized.status,
    published_at: normalized.published_at,
    scheduled_at: normalized.scheduled_at,
  };
}

export function normalizeCompetition(competition: Competition): Competition {
  const status = resolveCompetitionStatus(competition);
  const scheduled_at = competition.scheduled_at ?? null;
  let published_at = competition.published_at;

  if (status === "draft") {
    published_at = null;
  } else if (status === "published") {
    published_at = published_at ?? competition.updated_at ?? new Date().toISOString();
  } else if (status === "scheduled") {
    if (scheduled_at && new Date(scheduled_at).getTime() <= Date.now()) {
      published_at = published_at ?? scheduled_at;
    } else {
      published_at = null;
    }
  } else if (status === "private") {
    published_at = published_at ?? competition.updated_at ?? new Date().toISOString();
  } else if (status === "disabled") {
    published_at = null;
  }

  return {
    ...competition,
    status,
    scheduled_at,
    published_at,
    closes_at: competition.closes_at ?? null,
  };
}

export function applyCompetitionStatus(
  competition: Competition,
  status: CompetitionStatus,
  scheduledAt?: string | null,
): Competition {
  const now = new Date().toISOString();
  const scheduled_at = status === "scheduled" ? (scheduledAt ?? competition.scheduled_at ?? now) : null;

  let published_at = competition.published_at;
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

  return normalizeCompetition({
    ...competition,
    status,
    scheduled_at,
    published_at,
  });
}

export function isCompetitionPublic(competition: Competition): boolean {
  const status = resolveCompetitionStatus(competition);
  if (status === "draft" || status === "private" || status === "disabled") return false;
  if (status === "published") return Boolean(competition.published_at);
  if (status === "scheduled") {
    const at = competition.scheduled_at;
    if (!at) return false;
    return new Date(at).getTime() <= Date.now();
  }
  return false;
}

export function isCompetitionDisabled(competition: Competition): boolean {
  return resolveCompetitionStatus(competition) === "disabled";
}

export function isCompetitionPreviewable(competition: Competition): boolean {
  return !isCompetitionDisabled(competition);
}

export function getCompetitionStatusBadgeClass(status: CompetitionStatus): string {
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
