import Link from 'next/link';
import { AdminShell } from '@/components/Admin/AdminShell';
import { ExpertList } from '@/components/Admin/ExpertList/expert-list';
import { getAllExperts, getExpertsIntro } from '@/lib/admin/experts-store';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminExpertsListPage() {
  const [experts, intro] = await Promise.all([
    getAllExperts(),
    getExpertsIntro(),
  ]);

  return (
    <AdminShell
      title="Experts"
      breadcrumb="Experts"
      actions={
        <Link href="/admin/experts/new" className="btn btnPrimary">
          + New expert
        </Link>
      }
    >
      <ExpertList experts={experts} intro={intro} />
    </AdminShell>
  );
}
