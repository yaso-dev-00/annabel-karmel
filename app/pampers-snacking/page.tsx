import {
  PartnerPublicPage,
  generatePartnerPageMetadata,
} from '@/lib/admin/partner-public-page';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const SLUG = 'pampers-snacking';

export async function generateMetadata(): Promise<Metadata> {
  return generatePartnerPageMetadata(SLUG);
}

export default function PampersSnackingPage() {
  return <PartnerPublicPage slug={SLUG} />;
}
