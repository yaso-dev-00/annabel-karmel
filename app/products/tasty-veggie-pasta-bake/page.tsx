import type { Metadata } from 'next';

import { AustraliaFrozenProductPageContent } from '@/components/ProductScreen/detail/AustraliaFrozenProductPage';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getAustraliaFrozenProductData } from '@/data/australia-frozen-products';

const data = getAustraliaFrozenProductData('tasty-veggie-pasta-bake')!;

export const metadata: Metadata = {
  title: `${data.title} | Annabel Karmel`,
  description: data.metaDescription,
};

export default function TastyVeggiePastaBakePage() {
  return (
    <>
      <SiteHeader />
      <AustraliaFrozenProductPageContent data={data} />
      <SiteFooter />
    </>
  );
}
