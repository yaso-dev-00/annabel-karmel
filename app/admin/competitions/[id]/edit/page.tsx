import { AdminShell } from '@/components/Admin/AdminShell';
import { CompetitionEditor } from '@/components/Admin/CompetitionEditor/competition-editor';
import { getCompetitionById } from '@/lib/admin/competitions-store';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminCompetitionEditPage({ params }: PageProps) {
  const { id } = await params;
  const competition = await getCompetitionById(id);
  if (!competition) notFound();

  return (
    <AdminShell breadcrumb="Edit competition">
      <CompetitionEditor initialCompetition={competition} />
    </AdminShell>
  );
}
