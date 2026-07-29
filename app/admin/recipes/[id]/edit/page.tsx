import { AdminShell } from "@/components/Admin/AdminShell";
import { RecipeEditor } from "@/components/Admin/RecipeEditor/recipe-editor";
import type { RelationCatalogItem } from "@/components/Admin/RecipeEditor/recipe-relation-picker";
import { getCategoryGroups } from "@/lib/admin/recipe-categories-store";
import { getAllCookbooks } from "@/lib/admin/cookbooks-store";
import { getAllRecipes, getRecipeById } from "@/lib/admin/recipes-store";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminRecipesEditPage({ params }: PageProps) {
  const { id } = await params;
  const [recipe, recipes, cookbooks, categoryGroups] = await Promise.all([
    getRecipeById(id),
    getAllRecipes(),
    getAllCookbooks(),
    getCategoryGroups(),
  ]);
  if (!recipe) notFound();

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
    <AdminShell breadcrumb="Edit recipe">
      <RecipeEditor
        initialRecipe={recipe}
        recipeCatalog={recipeCatalog}
        cookbookCatalog={cookbookCatalog}
        categoryGroups={categoryGroups}
      />
    </AdminShell>
  );
}
