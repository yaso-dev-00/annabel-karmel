"use server";

import { revalidatePath } from "next/cache";
import {
  getAllRecipesUncached,
  updateRecipe,
} from "@/lib/admin/recipes-store";
import { revalidateRecipeTags } from "@/lib/admin/revalidate-recipe-pages";
import type { Recipe, RecipeTaxonomyRef } from "@/lib/recipes/types";

export type UpdateRecipeTaxonomiesResult = {
  recipe: Recipe;
  recipes: Recipe[];
};

/**
 * Persist taxonomy membership and immediately expire recipe cache tags
 * so admin lists / taxonomies read fresh data on the next request.
 */
export async function updateRecipeTaxonomiesAction(
  id: string,
  taxonomies: RecipeTaxonomyRef[],
): Promise<UpdateRecipeTaxonomiesResult> {
  const recipe = await updateRecipe(id, { taxonomies });
  if (!recipe) {
    throw new Error("Recipe not found");
  }

  revalidateRecipeTags(recipe);
  revalidatePath("/admin/recipes");
  revalidatePath("/admin/recipes/taxonomies");
  revalidatePath(`/admin/recipes/${recipe.id}/edit`);

  const recipes = await getAllRecipesUncached();
  return { recipe, recipes };
}
