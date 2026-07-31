import { AdminShell } from '@/components/Admin/AdminShell';
import { AdminDashboard } from '@/components/Admin/Dashboard/admin-dashboard';
import { getAllAdviceArticles } from '@/lib/admin/advice-articles-store';
import { getAllArticles } from '@/lib/admin/articles-store';
import { getAllCompetitions } from '@/lib/admin/competitions-store';
import { buildDashboardSummary } from '@/lib/admin/dashboard-summary';
import { getAllExperts } from '@/lib/admin/experts-store';
import { getAllPartners } from '@/lib/admin/partners-store';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [advice, articles, competitions, partners, experts] = await Promise.all(
    [
      getAllAdviceArticles(),
      getAllArticles(),
      getAllCompetitions(),
      getAllPartners(),
      getAllExperts(),
    ],
  );

  const summary = buildDashboardSummary({
    advice,
    articles,
    competitions,
    partners,
    experts,
  });

  return (
    <AdminShell title="Dashboard" breadcrumb="Dashboard">
      <AdminDashboard summary={summary} />
    </AdminShell>
  );
}
