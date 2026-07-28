import { unstable_cache } from "next/cache";
import seedStore from "@/data/cms/recipes.seed.json";
import { isRecipePublic } from "@/lib/admin/recipe-status";
import { readRecipesCmsStoreRaw, writeRecipesCmsStoreRaw } from "@/lib/admin/recipes-cms-store-io";
import { RECIPES_CACHE_TAG } from "@/lib/admin/revalidate-recipe-pages";
import { sanitizeRecipe, sanitizeRecipesStore } from "@/lib/recipes/sanitize-recipe";
import type { Recipe, RecipesStore } from "@/lib/recipes/types";

async function readStore(): Promise<RecipesStore> {
  let raw: string;
  try {
    raw = await readRecipesCmsStoreRaw();
  } catch {
    raw = JSON.stringify(seedStore);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = seedStore;
  }

  return sanitizeRecipesStore(parsed);
}

async function writeStore(store: RecipesStore): Promise<void> {
  await writeRecipesCmsStoreRaw(JSON.stringify(store, null, 2));
}

async function listRecipesFromStore(): Promise<Recipe[]> {
  const store = await readStore();
  return store.recipes.slice().sort((a, b) => a.title.localeCompare(b.title));
}

/** Cached + tagged list for RSC pages — invalidated via revalidateTag(RECIPES_CACHE_TAG). */
export const getAllRecipes = unstable_cache(listRecipesFromStore, ["recipes-all"], {
  tags: [RECIPES_CACHE_TAG],
});

/** Always reads the store (API routes / post-mutation responses). */
export async function getAllRecipesUncached(): Promise<Recipe[]> {
  return listRecipesFromStore();
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  const store = await readStore();
  return store.recipes.find((recipe) => recipe.id === id) ?? null;
}

export async function getPublishedRecipeBySlug(slug: string): Promise<Recipe | null> {
  const store = await readStore();
  const recipe = store.recipes.find((item) => item.slug === slug);
  if (!recipe || !isRecipePublic(recipe)) return null;
  return recipe;
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  const store = await readStore();
  return store.recipes.find((item) => item.slug === slug) ?? null;
}

function assertUniqueSlug(store: RecipesStore, slug: string, excludeId?: string): void {
  const conflict = store.recipes.find(
    (recipe) => recipe.slug === slug && recipe.id !== excludeId,
  );
  if (conflict) {
    throw new Error(`A recipe with slug "${slug}" already exists.`);
  }
}

export async function createRecipe(
  input: Omit<Recipe, "id" | "created_at" | "updated_at">,
): Promise<Recipe> {
  const store = await readStore();
  assertUniqueSlug(store, input.slug.trim());

  const now = new Date().toISOString();
  const recipe = sanitizeRecipe({
    ...input,
    id: crypto.randomUUID(),
    created_at: now,
    updated_at: now,
  });

  store.recipes.push(recipe);
  await writeStore(store);
  return recipe;
}

export async function updateRecipe(
  id: string,
  input: Partial<Omit<Recipe, "id" | "created_at">>,
): Promise<Recipe | null> {
  const store = await readStore();
  const index = store.recipes.findIndex((recipe) => recipe.id === id);
  if (index === -1) return null;

  const nextSlug = input.slug?.trim() ?? store.recipes[index].slug;
  assertUniqueSlug(store, nextSlug, id);

  const updated = sanitizeRecipe({
    ...store.recipes[index],
    ...input,
    id,
    updated_at: new Date().toISOString(),
  });
  store.recipes[index] = updated;
  await writeStore(store);
  return updated;
}

export async function deleteRecipe(id: string): Promise<boolean> {
  const store = await readStore();
  const next = store.recipes.filter((recipe) => recipe.id !== id);
  if (next.length === store.recipes.length) return false;
  await writeStore({ recipes: next });
  return true;
}
