import { AdminShell } from '@/components/Admin/AdminShell';
import { PartnerPageEditor } from '@/components/Admin/PartnerPageEditor/partner-page-editor';
import { createDefaultPartnerPage } from '@/components/Admin/PartnerPageEditor/create-default-partner-page';

export default function AdminPartnerNewPage() {
  const partner = createDefaultPartnerPage();

  return (
    <AdminShell breadcrumb="New partner page">
      <PartnerPageEditor initialPartner={partner} isNew />
    </AdminShell>
  );
}
