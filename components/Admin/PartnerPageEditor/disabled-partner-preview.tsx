import Link from 'next/link';
import { AdminShell } from '@/components/Admin/AdminShell';

type DisabledPartnerPreviewProps = {
  title: string;
};

export function DisabledPartnerPreview({ title }: DisabledPartnerPreviewProps) {
  return (
    <AdminShell breadcrumb="Preview unavailable">
      <div className="card">
        <h2 className="cardTitle">Preview unavailable</h2>
        <p className="cardDesc">
          <strong>{title}</strong> is disabled and cannot be previewed. Change
          the status to Draft, Published, Scheduled, or Private, then save to
          preview again.
        </p>
        <Link href="/admin/partners" className="btn btnSecondary">
          Back to partners
        </Link>
      </div>
    </AdminShell>
  );
}
