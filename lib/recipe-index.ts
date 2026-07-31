import { readFile, readdir } from 'fs/promises';
import path from 'path';

import type { RecipeListingItem } from '@/data/recipe-taxonomies';

const LISTINGS_DIR = path.join(process.cwd(), 'data', 'recipe-listings');

let slugIndexPromise: Promise<Map<string, RecipeListingItem>> | null = null;

async function loadSlugIndex(): Promise<Map<string, RecipeListingItem>> {
  const files = await readdir(LISTINGS_DIR);
  const jsonFiles = files.filter((f) => f.endsWith('.json'));
  const bySlug = new Map<string, RecipeListingItem>();

  await Promise.all(
    jsonFiles.map(async (file) => {
      const raw = await readFile(path.join(LISTINGS_DIR, file), 'utf8');
      const items = JSON.parse(raw) as RecipeListingItem[];
      if (!Array.isArray(items)) return;
      for (const item of items) {
        if (!item.slug) continue;
        if (!bySlug.has(item.slug)) {
          bySlug.set(item.slug, item);
        }
      }
    }),
  );

  return bySlug;
}

export async function getRecipeListingIndex(): Promise<
  Map<string, RecipeListingItem>
> {
  if (!slugIndexPromise) {
    slugIndexPromise = loadSlugIndex();
  }
  return slugIndexPromise;
}

export async function getAllRecipeSlugs(): Promise<string[]> {
  const index = await getRecipeListingIndex();
  return [...index.keys()].sort();
}

export async function getRecipeListingStub(
  slug: string,
): Promise<RecipeListingItem | null> {
  const index = await getRecipeListingIndex();
  return index.get(slug) ?? null;
}
