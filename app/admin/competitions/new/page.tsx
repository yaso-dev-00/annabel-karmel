import { AdminShell } from '@/components/Admin/AdminShell';
import { CompetitionEditor } from '@/components/Admin/CompetitionEditor/competition-editor';
import { createDefaultCompetition } from '@/components/Admin/CompetitionEditor/create-default-competition';

export default function AdminCompetitionNewPage() {
  const competition = createDefaultCompetition();

  return (
    <AdminShell breadcrumb="New competition">
      <CompetitionEditor initialCompetition={competition} isNew />
    </AdminShell>
  );
}
