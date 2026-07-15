import type { AdviceArticle, AdviceArticleStatus } from "@/lib/content-blocks/types";
import type { Expert, ExpertStatus } from "@/lib/experts/types";
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

export const EXPERT_STATUSES = ADVICE_ARTICLE_STATUSES;
export const EXPERT_STATUS_LABELS = ADVICE_ARTICLE_STATUS_LABELS;
export const EXPERT_STATUS_HINTS = ADVICE_ARTICLE_STATUS_HINTS;

function asAdvice(expert: Expert): AdviceArticle {
  return expert as unknown as AdviceArticle;
}

export function resolveExpertStatus(expert: Expert): ExpertStatus {
  return resolveAdviceArticleStatus(asAdvice(expert)) as ExpertStatus;
}

export function buildExpertSavePayload(expert: Expert, options?: { publish?: boolean }): Expert {
  return buildAdviceArticleSavePayload(asAdvice(expert), options) as unknown as Expert;
}

export function getExpertStatusPatch(
  expert: Expert,
): Pick<Expert, "status" | "published_at" | "scheduled_at"> {
  return getAdviceArticleStatusPatch(asAdvice(expert)) as Pick<
    Expert,
    "status" | "published_at" | "scheduled_at"
  >;
}

export function normalizeExpert(expert: Expert): Expert {
  return normalizeAdviceArticle(asAdvice(expert)) as unknown as Expert;
}

export function applyExpertStatus(
  expert: Expert,
  status: ExpertStatus,
  scheduledAt?: string | null,
): Expert {
  return applyAdviceArticleStatus(
    asAdvice(expert),
    status as AdviceArticleStatus,
    scheduledAt,
  ) as unknown as Expert;
}

export function isExpertPublic(expert: Expert): boolean {
  return isAdviceArticlePublic(asAdvice(expert));
}

export function isExpertDisabled(expert: Expert): boolean {
  return isAdviceArticleDisabled(asAdvice(expert));
}

export function isExpertPreviewable(expert: Expert): boolean {
  return isAdviceArticlePreviewable(asAdvice(expert));
}

export function getExpertStatusBadgeClass(status: ExpertStatus): string {
  return getAdviceArticleStatusBadgeClass(status as AdviceArticleStatus);
}
