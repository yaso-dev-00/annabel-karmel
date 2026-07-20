import type { AdviceArticle, AdviceArticleStatus } from "@/lib/content-blocks/types";
import type { AdStatus, SiteAd } from "@/lib/ads/types";
import {
  ADVICE_ARTICLE_STATUS_HINTS,
  ADVICE_ARTICLE_STATUS_LABELS,
  ADVICE_ARTICLE_STATUSES,
  applyAdviceArticleStatus,
  buildAdviceArticleSavePayload,
  getAdviceArticleStatusBadgeClass,
  getAdviceArticleStatusPatch,
  isAdviceArticleDisabled,
  isAdviceArticlePreviewable,
  isAdviceArticlePublic,
  normalizeAdviceArticle,
  resolveAdviceArticleStatus,
} from "@/lib/admin/advice-article-status";

export const AD_STATUSES = ADVICE_ARTICLE_STATUSES;
export const AD_STATUS_LABELS = ADVICE_ARTICLE_STATUS_LABELS;
export const AD_STATUS_HINTS = ADVICE_ARTICLE_STATUS_HINTS;

function asAdvice(ad: SiteAd): AdviceArticle {
  return ad as unknown as AdviceArticle;
}

export function resolveAdStatus(ad: SiteAd): AdStatus {
  return resolveAdviceArticleStatus(asAdvice(ad)) as AdStatus;
}

export function buildAdSavePayload(ad: SiteAd, options?: { publish?: boolean }): SiteAd {
  return buildAdviceArticleSavePayload(asAdvice(ad), options) as unknown as SiteAd;
}

export function getAdStatusPatch(
  ad: SiteAd,
): Pick<SiteAd, "status" | "published_at" | "scheduled_at"> {
  return getAdviceArticleStatusPatch(asAdvice(ad)) as Pick<
    SiteAd,
    "status" | "published_at" | "scheduled_at"
  >;
}

export function normalizeAd(ad: SiteAd): SiteAd {
  return normalizeAdviceArticle(asAdvice(ad)) as unknown as SiteAd;
}

export function applyAdStatus(
  ad: SiteAd,
  status: AdStatus,
  scheduledAt?: string | null,
): SiteAd {
  return applyAdviceArticleStatus(
    asAdvice(ad),
    status as AdviceArticleStatus,
    scheduledAt,
  ) as unknown as SiteAd;
}

export function isAdPublic(ad: SiteAd): boolean {
  return isAdviceArticlePublic(asAdvice(ad));
}

export function isAdDisabled(ad: SiteAd): boolean {
  return isAdviceArticleDisabled(asAdvice(ad));
}

export function isAdPreviewable(ad: SiteAd): boolean {
  return isAdviceArticlePreviewable(asAdvice(ad));
}

export function getAdStatusBadgeClass(status: AdStatus): string {
  return getAdviceArticleStatusBadgeClass(status as AdviceArticleStatus);
}
