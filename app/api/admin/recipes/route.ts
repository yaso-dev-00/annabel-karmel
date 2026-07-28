import { NextResponse } from "next/server";
import { createRecipe, getAllRecipesUncached } from "@/lib/admin/recipes-store";
import { revalidateRecipePages } from "@/lib/admin/revalidate-recipe-pages";
import type { Recipe } from "@/lib/recipes/types";

export const dynamic = "force-dynamic";

const NO_STORE_HEADERS = { "Cache-Control": "no-store, max-age=0" };

export async function GET() {
  const recipes = await getAllRecipesUncached();
  return NextResponse.json({ recipes }, { headers: NO_STORE_HEADERS });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Omit<Recipe, "id" | "created_at" | "updated_at">;
    const recipe = await createRecipe(body);
    revalidateRecipePages(recipe);
    return NextResponse.json(recipe, { status: 201, headers: NO_STORE_HEADERS });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create recipe";
    const status = message.includes("already exists") ? 409 : 500;
    return NextResponse.json({ error: message }, { status, headers: NO_STORE_HEADERS });
  }
}
