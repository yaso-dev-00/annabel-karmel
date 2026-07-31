import { AdminShell } from '@/components/Admin/AdminShell';
import { RecipeEditor } from '@/components/Admin/RecipeEditor/recipe-editor';
import { createDefaultRecipe } from '@/components/Admin/RecipeEditor/create-default-recipe';
import type { RelationCatalogItem } from '@/components/Admin/RecipeEditor/recipe-relation-picker';
import { getCategoryGroups } from '@/lib/admin/recipe-categories-store';
import { getAllCookbooks } from '@/lib/admin/cookbooks-store';
import { getAllRecipes } from '@/lib/admin/recipes-store';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminRecipesNewPage() {
  const recipe = createDefaultRecipe();
  const [recipes, cookbooks, categoryGroups] = await Promise.all([
    getAllRecipes(),
    getAllCookbooks(),
    getCategoryGroups(),
  ]);

  const recipeCatalog: RelationCatalogItem[] = recipes.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
  }));

  const cookbookCatalog: RelationCatalogItem[] = cookbooks.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
  }));

  return (
    <AdminShell breadcrumb="New recipe">
      <RecipeEditor
        initialRecipe={recipe}
        isNew
        recipeCatalog={recipeCatalog}
        cookbookCatalog={cookbookCatalog}
        categoryGroups={categoryGroups}
      />
    </AdminShell>
  );
}
