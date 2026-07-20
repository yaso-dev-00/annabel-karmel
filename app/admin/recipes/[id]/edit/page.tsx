import { AdminShell } from "@/components/Admin/AdminShell";
import { RecipeEditor } from "@/components/Admin/RecipeEditor/recipe-editor";
import { getRecipeById } from "@/lib/admin/recipes-store";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminRecipesEditPage({ params }: PageProps) {
  const { id } = await params;
  const recipe = await getRecipeById(id);
  if (!recipe) notFound();

  return (
    <AdminShell breadcrumb="Edit recipe">
      <RecipeEditor initialRecipe={recipe} />
    </AdminShell>
  );
}
