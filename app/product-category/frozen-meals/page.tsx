import type { Metadata } from 'next';

import { FrozenMealsPageContent } from '@/components/ProductScreen/categories/FrozenMealsPage';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';

export const metadata: Metadata = {
  title: 'Frozen Meals for Toddlers & Kids | Annabel Karmel',
  description:
    "Make tonight's dinner a doddle with Annabel's freezer-friendly award-winning meals inspired by kids' all-time favourites.",
};

export default function FrozenMealsPage() {
  return (
    <>
      <SiteHeader />
      <FrozenMealsPageContent />
      <SiteFooter />
    </>
  );
}
