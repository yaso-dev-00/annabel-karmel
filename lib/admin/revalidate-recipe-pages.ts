import { revalidatePath, revalidateTag } from "next/cache";

export const RECIPES_CACHE_TAG = "recipes";

export function recipeIdTag(id: string): string {
  return `recipe:${id}`;
}

export function recipeSlugTag(slug: string): string {
  return `recipe-slug:${slug}`;
}

type RevalidateRecipe = {
  id?: string;
  slug?: string;
};

/**
 * Expire recipe cache tags immediately so the next read is fresh
 * (Route Handlers cannot use updateTag).
 */
export function revalidateRecipeTags(recipe?: RevalidateRecipe): void {
  revalidateTag(RECIPES_CACHE_TAG, { expire: 0 });
  if (recipe?.id) revalidateTag(recipeIdTag(recipe.id), { expire: 0 });
  if (recipe?.slug) revalidateTag(recipeSlugTag(recipe.slug), { expire: 0 });
}

/** Admin + preview paths — live /recipes/[slug] stays on static listings for now. */
export function revalidateRecipePages(recipe?: RevalidateRecipe): void {
  revalidateRecipeTags(recipe);

  revalidatePath("/admin");
  revalidatePath("/admin/recipes");
  revalidatePath("/admin/recipes/taxonomies");
  revalidatePath("/admin", "layout");

  if (recipe?.id) {
    revalidatePath(`/admin/recipes/${recipe.id}/edit`);
    revalidatePath(`/admin/recipes/${recipe.id}/preview`);
  }
}
