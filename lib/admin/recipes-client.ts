import type { Recipe } from "@/lib/recipes/types";

const BASE = "/api/admin/recipes";

async function readApiError(res: Response, fallback: string): Promise<string> {
  try {
    const data = (await res.json()) as { error?: string };
    return data.error ?? fallback;
  } catch {
    return fallback;
  }
}

export async function fetchRecipes(): Promise<Recipe[]> {
  const res = await fetch(BASE, { cache: "no-store" });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to fetch recipes"));
  const data = (await res.json()) as { recipes: Recipe[] };
  return data.recipes;
}

export async function fetchRecipe(id: string): Promise<Recipe> {
  const res = await fetch(`${BASE}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error(await readApiError(res, "Recipe not found"));
  return (await res.json()) as Recipe;
}

export async function createRecipeApi(
  input: Omit<Recipe, "id" | "created_at" | "updated_at">,
): Promise<Recipe> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to create recipe"));
  return (await res.json()) as Recipe;
}

export async function updateRecipeApi(
  id: string,
  input: Partial<Omit<Recipe, "id" | "created_at">>,
): Promise<Recipe> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to update recipe"));
  return (await res.json()) as Recipe;
}

export async function deleteRecipeApi(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to delete recipe"));
}
