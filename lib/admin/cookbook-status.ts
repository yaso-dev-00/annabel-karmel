import type { AdviceArticle, AdviceArticleStatus } from "@/lib/content-blocks/types";
import type { Cookbook, CookbookStatus } from "@/lib/cookbooks/types";
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

export const COOKBOOK_STATUSES = ADVICE_ARTICLE_STATUSES;
export const COOKBOOK_STATUS_LABELS = ADVICE_ARTICLE_STATUS_LABELS;
export const COOKBOOK_STATUS_HINTS = ADVICE_ARTICLE_STATUS_HINTS;

function asAdvice(cookbook: Cookbook): AdviceArticle {
  return cookbook as unknown as AdviceArticle;
}

export function resolveCookbookStatus(cookbook: Cookbook): CookbookStatus {
  return resolveAdviceArticleStatus(asAdvice(cookbook)) as CookbookStatus;
}

export function buildCookbookSavePayload(
  cookbook: Cookbook,
  options?: { publish?: boolean },
): Cookbook {
  return buildAdviceArticleSavePayload(asAdvice(cookbook), options) as unknown as Cookbook;
}

export function getCookbookStatusPatch(
  cookbook: Cookbook,
): Pick<Cookbook, "status" | "published_at" | "scheduled_at"> {
  return getAdviceArticleStatusPatch(asAdvice(cookbook)) as Pick<
    Cookbook,
    "status" | "published_at" | "scheduled_at"
  >;
}

export function normalizeCookbook(cookbook: Cookbook): Cookbook {
  return normalizeAdviceArticle(asAdvice(cookbook)) as unknown as Cookbook;
}

export function applyCookbookStatus(
  cookbook: Cookbook,
  status: CookbookStatus,
  scheduledAt?: string | null,
): Cookbook {
  return applyAdviceArticleStatus(
    asAdvice(cookbook),
    status as AdviceArticleStatus,
    scheduledAt,
  ) as unknown as Cookbook;
}

export function isCookbookPublic(cookbook: Cookbook): boolean {
  return isAdviceArticlePublic(asAdvice(cookbook));
}

export function isCookbookDisabled(cookbook: Cookbook): boolean {
  return isAdviceArticleDisabled(asAdvice(cookbook));
}

export function isCookbookPreviewable(cookbook: Cookbook): boolean {
  return isAdviceArticlePreviewable(asAdvice(cookbook));
}

export function getCookbookStatusBadgeClass(status: CookbookStatus): string {
  return getAdviceArticleStatusBadgeClass(status as AdviceArticleStatus);
}
