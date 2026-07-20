import { AdminShell } from "@/components/Admin/AdminShell";
import { RecipeEditor } from "@/components/Admin/RecipeEditor/recipe-editor";
import { createDefaultRecipe } from "@/components/Admin/RecipeEditor/create-default-recipe";

export default function AdminRecipesNewPage() {
  const recipe = createDefaultRecipe();

  return (
    <AdminShell breadcrumb="New recipe">
      <RecipeEditor initialRecipe={recipe} isNew />
    </AdminShell>
  );
}
