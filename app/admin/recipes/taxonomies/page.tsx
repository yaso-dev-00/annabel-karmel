import { AdminShell } from "@/components/Admin/AdminShell";
import { RecipeTaxonomiesAdmin } from "@/components/Admin/RecipeTaxonomiesAdmin/recipe-taxonomies-admin";
import { getAllRecipes } from "@/lib/admin/recipes-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminRecipeTaxonomiesPage() {
  const recipes = await getAllRecipes();

  return (
    <AdminShell title="Recipe taxonomies" breadcrumb="Recipes / Taxonomies">
      <RecipeTaxonomiesAdmin recipes={recipes} />
    </AdminShell>
  );
}
