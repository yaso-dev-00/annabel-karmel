import { AdminShell } from '@/components/Admin/AdminShell';
import { ExpertEditor } from '@/components/Admin/ExpertEditor/expert-editor';
import { getExpertById } from '@/lib/admin/experts-store';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminExpertsEditPage({ params }: PageProps) {
  const { id } = await params;
  const expert = await getExpertById(id);
  if (!expert) notFound();

  return (
    <AdminShell breadcrumb="Edit expert">
      <ExpertEditor initialExpert={expert} />
    </AdminShell>
  );
}
