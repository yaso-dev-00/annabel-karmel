import Link from 'next/link';
import { AdminShell } from '@/components/Admin/AdminShell';
import { CookbookList } from '@/components/Admin/CookbookList/cookbook-list';
import { getAllCookbooks } from '@/lib/admin/cookbooks-store';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminCookbooksListPage() {
  const cookbooks = await getAllCookbooks();

  return (
    <AdminShell
      title="Cookbooks"
      breadcrumb="Cookbooks"
      actions={
        <Link href="/admin/cookbooks/new" className="btn btnPrimary">
          + New cookbook
        </Link>
      }
    >
      <CookbookList cookbooks={cookbooks} />
    </AdminShell>
  );
}
