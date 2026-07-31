import type { Metadata } from 'next';

import { TastySpaghettiBolognesePageContent } from '@/components/ProductScreen/detail/wrappers/TastySpaghettiBolognesePage';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';

export const metadata: Metadata = {
  title: 'Tasty Spaghetti Bolognese Frozen Meal | Annabel Karmel',
  description:
    "Made with 100% British & Irish beef and packed with hidden veg – it's a slurp-worthy spag bol kids will love. Made without dairy.",
};

export default function TastySpaghettiBolognesePage() {
  return (
    <>
      <SiteHeader />
      <TastySpaghettiBolognesePageContent />
      <SiteFooter />
    </>
  );
}
