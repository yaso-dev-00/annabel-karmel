import type {
  AdviceArticle,
  AdviceArticleStatus,
} from '@/lib/content-blocks/types';
import type { HomepageDocument, HomepageStatus } from '@/lib/homepage/types';
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
} from '@/lib/admin/advice-article-status';

export const HOMEPAGE_STATUSES = ADVICE_ARTICLE_STATUSES;
export const HOMEPAGE_STATUS_LABELS = ADVICE_ARTICLE_STATUS_LABELS;
export const HOMEPAGE_STATUS_HINTS = ADVICE_ARTICLE_STATUS_HINTS;

function asAdvice(doc: HomepageDocument): AdviceArticle {
  return doc as unknown as AdviceArticle;
}

export function resolveHomepageStatus(doc: HomepageDocument): HomepageStatus {
  return resolveAdviceArticleStatus(asAdvice(doc)) as HomepageStatus;
}

export function buildHomepageSavePayload(
  doc: HomepageDocument,
  options?: { publish?: boolean },
): HomepageDocument {
  return buildAdviceArticleSavePayload(
    asAdvice(doc),
    options,
  ) as unknown as HomepageDocument;
}

export function getHomepageStatusPatch(
  doc: HomepageDocument,
): Pick<HomepageDocument, 'status' | 'published_at' | 'scheduled_at'> {
  return getAdviceArticleStatusPatch(asAdvice(doc)) as Pick<
    HomepageDocument,
    'status' | 'published_at' | 'scheduled_at'
  >;
}

export function normalizeHomepage(doc: HomepageDocument): HomepageDocument {
  return normalizeAdviceArticle(asAdvice(doc)) as unknown as HomepageDocument;
}

export function applyHomepageStatus(
  doc: HomepageDocument,
  status: HomepageStatus,
  scheduledAt?: string | null,
): HomepageDocument {
  return applyAdviceArticleStatus(
    asAdvice(doc),
    status as AdviceArticleStatus,
    scheduledAt,
  ) as unknown as HomepageDocument;
}

export function isHomepagePublic(doc: HomepageDocument): boolean {
  return isAdviceArticlePublic(asAdvice(doc));
}

export function isHomepageDisabled(doc: HomepageDocument): boolean {
  return isAdviceArticleDisabled(asAdvice(doc));
}

export function isHomepagePreviewable(doc: HomepageDocument): boolean {
  return isAdviceArticlePreviewable(asAdvice(doc));
}

export function getHomepageStatusBadgeClass(status: HomepageStatus): string {
  return getAdviceArticleStatusBadgeClass(status as AdviceArticleStatus);
}
