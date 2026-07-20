import type { AdviceArticle, AdviceArticleStatus } from "@/lib/content-blocks/types";
import type { Recipe, RecipeStatus } from "@/lib/recipes/types";
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

export const RECIPE_STATUSES = ADVICE_ARTICLE_STATUSES;
export const RECIPE_STATUS_LABELS = ADVICE_ARTICLE_STATUS_LABELS;
export const RECIPE_STATUS_HINTS = ADVICE_ARTICLE_STATUS_HINTS;

function asAdvice(recipe: Recipe): AdviceArticle {
  return recipe as unknown as AdviceArticle;
}

export function resolveRecipeStatus(recipe: Recipe): RecipeStatus {
  return resolveAdviceArticleStatus(asAdvice(recipe)) as RecipeStatus;
}

export function buildRecipeSavePayload(recipe: Recipe, options?: { publish?: boolean }): Recipe {
  return buildAdviceArticleSavePayload(asAdvice(recipe), options) as unknown as Recipe;
}

export function getRecipeStatusPatch(
  recipe: Recipe,
): Pick<Recipe, "status" | "published_at" | "scheduled_at"> {
  return getAdviceArticleStatusPatch(asAdvice(recipe)) as Pick<
    Recipe,
    "status" | "published_at" | "scheduled_at"
  >;
}

export function normalizeRecipe(recipe: Recipe): Recipe {
  return normalizeAdviceArticle(asAdvice(recipe)) as unknown as Recipe;
}

export function applyRecipeStatus(
  recipe: Recipe,
  status: RecipeStatus,
  scheduledAt?: string | null,
): Recipe {
  return applyAdviceArticleStatus(
    asAdvice(recipe),
    status as AdviceArticleStatus,
    scheduledAt,
  ) as unknown as Recipe;
}

export function isRecipePublic(recipe: Recipe): boolean {
  return isAdviceArticlePublic(asAdvice(recipe));
}

export function isRecipeDisabled(recipe: Recipe): boolean {
  return isAdviceArticleDisabled(asAdvice(recipe));
}

export function isRecipePreviewable(recipe: Recipe): boolean {
  return isAdviceArticlePreviewable(asAdvice(recipe));
}

export function getRecipeStatusBadgeClass(status: RecipeStatus): string {
  return getAdviceArticleStatusBadgeClass(status as AdviceArticleStatus);
}
