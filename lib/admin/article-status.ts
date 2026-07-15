import type { AdviceArticle, Article, ArticleStatus } from "@/lib/content-blocks/types";
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

export const ARTICLE_STATUSES = ADVICE_ARTICLE_STATUSES;
export const ARTICLE_STATUS_LABELS = ADVICE_ARTICLE_STATUS_LABELS;
export const ARTICLE_STATUS_HINTS = ADVICE_ARTICLE_STATUS_HINTS;

export function resolveArticleStatus(article: Article): ArticleStatus {
  return resolveAdviceArticleStatus(article as AdviceArticle);
}

export function buildArticleSavePayload(article: Article, options?: { publish?: boolean }): Article {
  return buildAdviceArticleSavePayload(article as AdviceArticle, options) as Article;
}

export function getArticleStatusPatch(article: Article): Pick<Article, "status" | "published_at" | "scheduled_at"> {
  return getAdviceArticleStatusPatch(article as AdviceArticle);
}

export function normalizeArticle(article: Article): Article {
  return normalizeAdviceArticle(article as AdviceArticle) as Article;
}

export function applyArticleStatus(
  article: Article,
  status: ArticleStatus,
  scheduledAt?: string | null,
): Article {
  return applyAdviceArticleStatus(article as AdviceArticle, status, scheduledAt) as Article;
}

export function isArticlePublic(article: Article): boolean {
  return isAdviceArticlePublic(article as AdviceArticle);
}

export function isArticleDisabled(article: Article): boolean {
  return isAdviceArticleDisabled(article as AdviceArticle);
}

export function isArticlePreviewable(article: Article): boolean {
  return isAdviceArticlePreviewable(article as AdviceArticle);
}

export function getArticleStatusBadgeClass(status: ArticleStatus): string {
  return getAdviceArticleStatusBadgeClass(status);
}
