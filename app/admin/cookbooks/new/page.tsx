import { AdminShell } from '@/components/Admin/AdminShell';
import { CookbookEditor } from '@/components/Admin/CookbookEditor/cookbook-editor';
import { createDefaultCookbook } from '@/components/Admin/CookbookEditor/create-default-cookbook';

export default function AdminCookbooksNewPage() {
  const cookbook = createDefaultCookbook();

  return (
    <AdminShell breadcrumb="New cookbook">
      <CookbookEditor initialCookbook={cookbook} isNew />
    </AdminShell>
  );
}
