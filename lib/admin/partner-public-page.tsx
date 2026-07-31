import { PartnerPageShell } from '@/components/ContentBlocks/partner-page-shell';
import { getPublishedPartnerPageBySlug } from '@/lib/admin/partners-store';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generatePartnerPageMetadata(
  slug: string,
): Promise<Metadata> {
  const partner = await getPublishedPartnerPageBySlug(slug);
  if (!partner) return { title: 'Partners | Annabel Karmel' };
  return {
    title: partner.seo_title || partner.title,
    description: partner.seo_description,
  };
}

export async function PartnerPublicPage({ slug }: { slug: string }) {
  const partner = await getPublishedPartnerPageBySlug(slug);
  if (!partner) notFound();
  return <PartnerPageShell partner={partner} />;
}
