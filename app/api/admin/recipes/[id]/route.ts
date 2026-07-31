import { NextResponse } from 'next/server';
import {
  deleteRecipe,
  getRecipeById,
  updateRecipe,
} from '@/lib/admin/recipes-store';
import { revalidateRecipePages } from '@/lib/admin/revalidate-recipe-pages';
import type { Recipe } from '@/lib/recipes/types';

export const dynamic = 'force-dynamic';

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store, max-age=0' };

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const recipe = await getRecipeById(id);
  if (!recipe) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404, headers: NO_STORE_HEADERS },
    );
  }
  return NextResponse.json(recipe, { headers: NO_STORE_HEADERS });
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as Partial<
      Omit<Recipe, 'id' | 'created_at'>
    >;
    const recipe = await updateRecipe(id, body);
    if (!recipe) {
      return NextResponse.json(
        { error: 'Not found' },
        { status: 404, headers: NO_STORE_HEADERS },
      );
    }
    revalidateRecipePages(recipe);
    return NextResponse.json(recipe, { headers: NO_STORE_HEADERS });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to update recipe';
    const status = message.includes('already exists') ? 409 : 500;
    return NextResponse.json(
      { error: message },
      { status, headers: NO_STORE_HEADERS },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const recipe = await getRecipeById(id);
  const deleted = await deleteRecipe(id);
  if (!deleted) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404, headers: NO_STORE_HEADERS },
    );
  }
  revalidateRecipePages(recipe ?? { id });
  return NextResponse.json({ ok: true }, { headers: NO_STORE_HEADERS });
}
