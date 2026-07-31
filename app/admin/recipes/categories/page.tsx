import { AdminShell } from '@/components/Admin/AdminShell';
import { RecipeCategoriesAdmin } from '@/components/Admin/RecipeCategoriesAdmin/recipe-categories-admin';
import { getCategoryGroups } from '@/lib/admin/recipe-categories-store';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminRecipeCategoriesPage() {
  const groups = await getCategoryGroups();

  return (
    <AdminShell title="Recipe categories" breadcrumb="Recipes / Categories">
      <RecipeCategoriesAdmin initialGroups={groups} />
    </AdminShell>
  );
}
