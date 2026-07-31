import { PreviewPageClient } from '@/components/Admin/PartnerPageEditor/preview-page-client';
import { DisabledPartnerPreview } from '@/components/Admin/PartnerPageEditor/disabled-partner-preview';
import { getPartnerPageById } from '@/lib/admin/partners-store';
import { isPartnerPageDisabled } from '@/lib/admin/partner-page-status';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminPartnerPreviewPage({ params }: PageProps) {
  const { id } = await params;
  const partner = await getPartnerPageById(id);
  if (!partner) notFound();
  if (isPartnerPageDisabled(partner)) {
    return <DisabledPartnerPreview title={partner.title} />;
  }
  return <PreviewPageClient partner={partner} />;
}
