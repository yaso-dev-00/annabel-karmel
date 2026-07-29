import type { RecipeDetail, RecipeTaxonomyLink } from "@/data/recipe-detail";
import { getTaxonomy } from "@/data/recipe-taxonomies";
import type { Recipe, RecipeIngredientSection } from "@/lib/recipes/types";

function flattenIngredientSections(sections: RecipeIngredientSection[]): string[] {
  const lines: string[] = [];
  for (const section of sections) {
    const title = section.title.trim();
    if (title) lines.push(title);
    for (const item of section.items) {
      const line = item.trim();
      if (line) lines.push(line);
    }
  }
  return lines;
}

function taxonomyLinks(
  recipe: Recipe,
  kind: "recipe-category" | "meal-time" | "allergen",
): RecipeTaxonomyLink[] {
  return recipe.taxonomies
    .filter((ref) => ref.kind === kind && !ref.hidden)
    .flatMap((ref) => {
      const taxonomy = getTaxonomy(ref.kind, ref.slug);
      if (!taxonomy) return [];
      return [{ label: taxonomy.label, href: `${taxonomy.path}/` }];
    });
}

export function recipeToDetail(recipe: Recipe): RecipeDetail {
  const ages = taxonomyLinks(recipe, "recipe-category");
  const allergens = taxonomyLinks(recipe, "allergen");
  const mealTimes = taxonomyLinks(recipe, "meal-time");
  const breadcrumbCategory = allergens[0] ?? ages[0] ?? mealTimes[0];

  return {
    slug: recipe.slug,
    title: recipe.title,
    href: `/recipes/${recipe.slug}`,
    image: recipe.featured_image,
    description: recipe.description,
    appExclusive: recipe.app_exclusive,
    allergens,
    mealTimes,
    ages,
    suitableForFreezing: recipe.suitable_for_freezing,
    prepTime: recipe.prep_time || undefined,
    cookTime: recipe.cook_time || undefined,
    portions: recipe.servings || undefined,
    ingredients: flattenIngredientSections(recipe.ingredients),
    method: recipe.method.map((step) => step.text),
    breadcrumb: breadcrumbCategory ? [breadcrumbCategory] : undefined,
  };
}
