import type { Metadata } from 'next';

import { ChilledMealsPageContent } from '@/components/ProductScreen/categories/ChilledMealsPage';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';

export const metadata: Metadata = {
  title: 'Chilled Meals for Toddlers & Children | Annabel Karmel',
  description:
    "Delicious dinners at the speed of life. Annabel's kid-approved chilled meals are packed with goodness, low in salt, and ready in minutes.",
};

export default function ChilledMealsPage() {
  return (
    <>
      <SiteHeader />
      <ChilledMealsPageContent />
      <SiteFooter />
    </>
  );
}
