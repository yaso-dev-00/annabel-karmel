import { AdminShell } from '@/components/Admin/AdminShell';
import { UserList } from '@/components/Admin/UserList';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function AdminUsersListPage() {
  return (
    <AdminShell title="Users" breadcrumb="Users">
      <UserList />
    </AdminShell>
  );
}
