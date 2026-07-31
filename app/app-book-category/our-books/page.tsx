import type { Metadata } from 'next';

import { OurBooksPageContent } from '@/components/MarketingScreen/OurBooksPage';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';

export const metadata: Metadata = {
  title: 'Books Archives | Annabel Karmel',
  description:
    'Discover Annabel Karmel’s bestselling cookbooks — from weaning and finger foods to cooking with kids and quick family meals.',
};

export default function OurBooksPage() {
  return (
    <>
      <SiteHeader />
      <OurBooksPageContent />
      <SiteFooter />
    </>
  );
}
