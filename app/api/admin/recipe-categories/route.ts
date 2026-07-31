import { NextResponse } from 'next/server';
import type { RecipeTaxonomyGroup } from '@/data/recipe-taxonomies';
import {
  getCategoryGroups,
  saveCategoryGroups,
} from '@/lib/admin/recipe-categories-store';
import { revalidatePath, revalidateTag } from 'next/cache';

export const dynamic = 'force-dynamic';

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store, max-age=0' };
export const RECIPE_CATEGORIES_CACHE_TAG = 'recipe-categories';

function revalidateCategories(): void {
  revalidateTag(RECIPE_CATEGORIES_CACHE_TAG, { expire: 0 });
  revalidatePath('/admin/recipes/categories');
  revalidatePath('/admin/recipes/taxonomies');
  revalidatePath('/admin/recipes');
  revalidatePath('/admin', 'layout');
}

export async function GET() {
  const groups = await getCategoryGroups();
  return NextResponse.json({ groups }, { headers: NO_STORE_HEADERS });
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as { groups?: RecipeTaxonomyGroup[] };
    if (!Array.isArray(body.groups)) {
      return NextResponse.json(
        { error: 'groups array is required' },
        { status: 400, headers: NO_STORE_HEADERS },
      );
    }
    const groups = await saveCategoryGroups(body.groups);
    revalidateCategories();
    return NextResponse.json({ groups }, { headers: NO_STORE_HEADERS });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to save categories';
    return NextResponse.json(
      { error: message },
      { status: 500, headers: NO_STORE_HEADERS },
    );
  }
}
