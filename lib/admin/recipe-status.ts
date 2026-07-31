import type {
  AdviceArticle,
  AdviceArticleStatus,
} from '@/lib/content-blocks/types';
import type { Recipe, RecipeStatus } from '@/lib/recipes/types';
import {
  ADVICE_ARTICLE_STATUS_HINTS,
  ADVICE_ARTICLE_STATUS_LABELS,
  applyAdviceArticleStatus,
  buildAdviceArticleSavePayload,
  getAdviceArticleStatusBadgeClass,
  getAdviceArticleStatusPatch,
  isAdviceArticleDisabled,
  isAdviceArticlePublic,
  normalizeAdviceArticle,
  resolveAdviceArticleStatus,
} from '@/lib/admin/advice-article-status';

/** Recipe statuses — Private is not offered for recipes. */
export const RECIPE_STATUSES: RecipeStatus[] = [
  'draft',
  'published',
  'scheduled',
  'disabled',
];

export const RECIPE_STATUS_LABELS: Record<RecipeStatus, string> = {
  draft: ADVICE_ARTICLE_STATUS_LABELS.draft,
  published: ADVICE_ARTICLE_STATUS_LABELS.published,
  scheduled: ADVICE_ARTICLE_STATUS_LABELS.scheduled,
  disabled: ADVICE_ARTICLE_STATUS_LABELS.disabled,
};

export const RECIPE_STATUS_HINTS: Record<RecipeStatus, string> = {
  draft: ADVICE_ARTICLE_STATUS_HINTS.draft,
  published: ADVICE_ARTICLE_STATUS_HINTS.published,
  scheduled: ADVICE_ARTICLE_STATUS_HINTS.scheduled,
  disabled: ADVICE_ARTICLE_STATUS_HINTS.disabled,
};

function asAdvice(recipe: Recipe): AdviceArticle {
  return recipe as unknown as AdviceArticle;
}

function coerceRecipeStatus(status: string | undefined): RecipeStatus {
  if (status === 'private') return 'draft';
  if (
    status === 'draft' ||
    status === 'published' ||
    status === 'scheduled' ||
    status === 'disabled'
  ) {
    return status;
  }
  return 'draft';
}

export function resolveRecipeStatus(recipe: Recipe): RecipeStatus {
  const resolved = resolveAdviceArticleStatus(asAdvice(recipe));
  return coerceRecipeStatus(resolved);
}

export function buildRecipeSavePayload(
  recipe: Recipe,
  options?: { publish?: boolean },
): Recipe {
  const withStatus: Recipe = {
    ...recipe,
    status: coerceRecipeStatus(recipe.status),
  };
  return buildAdviceArticleSavePayload(
    asAdvice(withStatus),
    options,
  ) as unknown as Recipe;
}

export function getRecipeStatusPatch(
  recipe: Recipe,
): Pick<Recipe, 'status' | 'published_at' | 'scheduled_at'> {
  return getAdviceArticleStatusPatch(asAdvice(recipe)) as Pick<
    Recipe,
    'status' | 'published_at' | 'scheduled_at'
  >;
}

export function normalizeRecipe(recipe: Recipe): Recipe {
  const normalized = normalizeAdviceArticle(
    asAdvice(recipe),
  ) as unknown as Recipe;
  return {
    ...normalized,
    status: coerceRecipeStatus(normalized.status),
  };
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
  return !isRecipeDisabled(recipe);
}

export function getRecipeStatusBadgeClass(status: RecipeStatus): string {
  return getAdviceArticleStatusBadgeClass(status as AdviceArticleStatus);
}

export function recipeStatusDateMeta(recipe: Recipe): {
  label: string;
  iso: string | null;
} {
  switch (resolveRecipeStatus(recipe)) {
    case 'published':
      return { label: 'Published at', iso: recipe.published_at };
    case 'scheduled':
      return { label: 'Scheduled at', iso: recipe.scheduled_at ?? null };
    case 'disabled':
      return { label: 'Disabled at', iso: recipe.updated_at };
    default:
      return { label: 'Modified at', iso: recipe.updated_at };
  }
}
