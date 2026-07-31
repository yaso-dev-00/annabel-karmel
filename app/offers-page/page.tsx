import type { Metadata } from 'next';

import { OffersPageContent } from '@/components/MarketingScreen/OffersPage';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';

export const metadata: Metadata = {
  title: 'Offers Page | Annabel Karmel',
  description:
    "Find Annabel Karmel's expert chilled and frozen meal ranges on offer this week at major UK supermarkets.",
};

export default function OffersPage() {
  return (
    <>
      <SiteHeader />
      <OffersPageContent />
      <SiteFooter />
    </>
  );
}
