import { UserDetailClient } from '@/components/Admin/UserEditor/user-detail-client';
import { getAdminUserSeedById } from '@/data/admin-users';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminUserDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Seed check for a real 404 on unknown IDs (overrides only exist for known seeds).
  if (!getAdminUserSeedById(id)) {
    notFound();
  }

  return <UserDetailClient userId={id} />;
}
