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

/** Admin + preview paths only — live /recipes/[slug] stays on static listings for now. */
export function revalidateRecipePages(recipe?: RevalidateRecipe): void {
  revalidateTag(RECIPES_CACHE_TAG, "seconds");
  if (recipe?.id) revalidateTag(recipeIdTag(recipe.id), "seconds");
  if (recipe?.slug) revalidateTag(recipeSlugTag(recipe.slug), "seconds");

  revalidatePath("/admin");
  revalidatePath("/admin/recipes");
  revalidatePath("/admin", "layout");

  if (recipe?.id) {
    revalidatePath(`/admin/recipes/${recipe.id}/edit`);
    revalidatePath(`/admin/recipes/${recipe.id}/preview`);
  }
}
