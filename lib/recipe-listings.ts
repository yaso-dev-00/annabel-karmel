import { readFile } from "fs/promises";
import path from "path";
import {
  listingDataKey,
  type RecipeListingItem,
  type RecipeTaxonomy,
  type RecipeTaxonomyKind,
} from "@/data/recipe-taxonomies";

export type { RecipeListingItem };

const LISTINGS_DIR = path.join(process.cwd(), "data", "recipe-listings");

export async function getRecipeListing(
  kind: RecipeTaxonomyKind,
  slug: string,
): Promise<RecipeListingItem[] | null> {
  const filePath = path.join(LISTINGS_DIR, `${kind}-${slug}.json`);
  try {
    const raw = await readFile(filePath, "utf8");
    const data = JSON.parse(raw) as RecipeListingItem[];
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

export async function getRecipeListingForTaxonomy(
  taxonomy: RecipeTaxonomy,
): Promise<RecipeListingItem[]> {
  const items = await getRecipeListing(taxonomy.kind, taxonomy.slug);
  return items ?? [];
}

export function getListingFilePath(taxonomy: RecipeTaxonomy): string {
  return path.join(LISTINGS_DIR, `${listingDataKey(taxonomy)}.json`);
}
