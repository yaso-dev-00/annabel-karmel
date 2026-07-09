import type { AdviceArticle, AdviceArticleStatus } from "@/lib/content-blocks/types";

export const ADVICE_ARTICLE_STATUSES: AdviceArticleStatus[] = [
  "draft",
  "published",
  "scheduled",
  "private",
  "disabled",
];

export const ADVICE_ARTICLE_STATUS_LABELS: Record<AdviceArticleStatus, string> = {
  draft: "Draft",
  published: "Published",
  scheduled: "Scheduled",
  private: "Private",
  disabled: "Disabled",
};

export const ADVICE_ARTICLE_STATUS_HINTS: Record<AdviceArticleStatus, string> = {
  draft: "Saved in the CMS only — not visible on the public site.",
  published: "Live on the site and available to visitors now.",
  scheduled: "Automatically goes live at the date and time you set.",
  private: "Hidden from public listings; viewable via admin preview only.",
  disabled: "Turned off — hidden from the public site until re-enabled.",
};

export function resolveAdviceArticleStatus(article: AdviceArticle): AdviceArticleStatus {
  if (article.status) return article.status;
  return article.published_at ? "published" : "draft";
}

export function buildAdviceArticleSavePayload(
  article: AdviceArticle,
  options?: { publish?: boolean },
): AdviceArticle {
  const status = options?.publish
    ? "published"
    : (article.status ?? resolveAdviceArticleStatus(article));
  return applyAdviceArticleStatus(article, status, article.scheduled_at);
}

export function getAdviceArticleStatusPatch(article: AdviceArticle): Pick<
  AdviceArticle,
  "status" | "published_at" | "scheduled_at"
> {
  const normalized = applyAdviceArticleStatus(
    article,
    article.status ?? resolveAdviceArticleStatus(article),
    article.scheduled_at,
  );
  return {
    status: normalized.status,
    published_at: normalized.published_at,
    scheduled_at: normalized.scheduled_at,
  };
}

export function normalizeAdviceArticle(article: AdviceArticle): AdviceArticle {
  const status = resolveAdviceArticleStatus(article);
  const scheduled_at = article.scheduled_at ?? null;
  let published_at = article.published_at;

  if (status === "draft") {
    published_at = null;
  } else if (status === "published") {
    published_at = published_at ?? article.updated_at ?? new Date().toISOString();
  } else if (status === "scheduled") {
    if (scheduled_at && new Date(scheduled_at).getTime() <= Date.now()) {
      published_at = published_at ?? scheduled_at;
    } else {
      published_at = null;
    }
  } else if (status === "private") {
    published_at = published_at ?? article.updated_at ?? new Date().toISOString();
  } else if (status === "disabled") {
    published_at = null;
  }

  return {
    ...article,
    status,
    scheduled_at,
    published_at,
  };
}

export function applyAdviceArticleStatus(
  article: AdviceArticle,
  status: AdviceArticleStatus,
  scheduledAt?: string | null,
): AdviceArticle {
  const now = new Date().toISOString();
  const scheduled_at = status === "scheduled" ? (scheduledAt ?? article.scheduled_at ?? now) : null;

  let published_at = article.published_at;
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

  return normalizeAdviceArticle({
    ...article,
    status,
    scheduled_at,
    published_at,
  });
}

export function isAdviceArticlePublic(article: AdviceArticle): boolean {
  const status = resolveAdviceArticleStatus(article);
  if (status === "draft" || status === "private" || status === "disabled") return false;
  if (status === "published") return Boolean(article.published_at);
  if (status === "scheduled") {
    const at = article.scheduled_at;
    if (!at) return false;
    return new Date(at).getTime() <= Date.now();
  }
  return false;
}

export function isAdviceArticleDisabled(article: AdviceArticle): boolean {
  return resolveAdviceArticleStatus(article) === "disabled";
}

export function isAdviceArticlePreviewable(article: AdviceArticle): boolean {
  return !isAdviceArticleDisabled(article);
}

export function getAdviceArticleStatusBadgeClass(status: AdviceArticleStatus): string {
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
