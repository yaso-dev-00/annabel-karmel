import type { AdviceArticle, AdviceArticleStatus } from "@/lib/content-blocks/types";
import type { Product, ProductStatus } from "@/lib/products/types";
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

export const PRODUCT_STATUSES = ADVICE_ARTICLE_STATUSES;
export const PRODUCT_STATUS_LABELS = ADVICE_ARTICLE_STATUS_LABELS;
export const PRODUCT_STATUS_HINTS = ADVICE_ARTICLE_STATUS_HINTS;

function asAdvice(product: Product): AdviceArticle {
  return product as unknown as AdviceArticle;
}

export function resolveProductStatus(product: Product): ProductStatus {
  return resolveAdviceArticleStatus(asAdvice(product)) as ProductStatus;
}

export function buildProductSavePayload(
  product: Product,
  options?: { publish?: boolean },
): Product {
  return buildAdviceArticleSavePayload(asAdvice(product), options) as unknown as Product;
}

export function getProductStatusPatch(
  product: Product,
): Pick<Product, "status" | "published_at" | "scheduled_at"> {
  return getAdviceArticleStatusPatch(asAdvice(product)) as Pick<
    Product,
    "status" | "published_at" | "scheduled_at"
  >;
}

export function normalizeProduct(product: Product): Product {
  return normalizeAdviceArticle(asAdvice(product)) as unknown as Product;
}

export function applyProductStatus(
  product: Product,
  status: ProductStatus,
  scheduledAt?: string | null,
): Product {
  return applyAdviceArticleStatus(
    asAdvice(product),
    status as AdviceArticleStatus,
    scheduledAt,
  ) as unknown as Product;
}

export function isProductPublic(product: Product): boolean {
  return isAdviceArticlePublic(asAdvice(product));
}

export function isProductDisabled(product: Product): boolean {
  return isAdviceArticleDisabled(asAdvice(product));
}

export function isProductPreviewable(product: Product): boolean {
  return isAdviceArticlePreviewable(asAdvice(product));
}

export function getProductStatusBadgeClass(status: ProductStatus): string {
  return getAdviceArticleStatusBadgeClass(status as AdviceArticleStatus);
}
