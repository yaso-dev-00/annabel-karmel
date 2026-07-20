import Link from "next/link";
import { AdminShell } from "@/components/Admin/AdminShell";
import { RecipeList } from "@/components/Admin/RecipeList/recipe-list";
import { getAllRecipes } from "@/lib/admin/recipes-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminRecipesListPage() {
  const recipes = await getAllRecipes();

  return (
    <AdminShell
      title="Recipes"
      breadcrumb="Recipes"
      actions={
        <Link href="/admin/recipes/new" className="btn btnPrimary">
          + New recipe
        </Link>
      }
    >
      <RecipeList recipes={recipes} />
    </AdminShell>
  );
}
