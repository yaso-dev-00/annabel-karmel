import type { Metadata } from 'next';

import { ChickenTomatoMascarponePastaPageContent } from '@/components/ProductScreen/detail/wrappers/ChickenTomatoMascarponePastaPage';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';

export const metadata: Metadata = {
  title: 'Chicken Pasta | Frozen Meal for Children | Annabel Karmel',
  description:
    'Chunky pasta, tender chicken & a veggie-packed tomato and mascarpone sauce – always a dinner winner.',
};

export default function ChickenTomatoMascarponePastaPage() {
  return (
    <>
      <SiteHeader />
      <ChickenTomatoMascarponePastaPageContent />
      <SiteFooter />
    </>
  );
}
