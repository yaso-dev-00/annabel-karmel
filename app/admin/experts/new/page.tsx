import { AdminShell } from '@/components/Admin/AdminShell';
import { ExpertEditor } from '@/components/Admin/ExpertEditor/expert-editor';
import { createDefaultExpert } from '@/components/Admin/ExpertEditor/create-default-expert';

export default function AdminExpertsNewPage() {
  const expert = createDefaultExpert();

  return (
    <AdminShell breadcrumb="New expert">
      <ExpertEditor initialExpert={expert} isNew />
    </AdminShell>
  );
}
