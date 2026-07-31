import type { Metadata } from 'next';

import { RecipesArchivePageContent } from '@/components/RecipeScreen/RecipesArchivePage';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';

export const metadata: Metadata = {
  title: 'Recipes Archive | Annabel Karmel',
  description:
    'Find a recipe from Annabel Karmel — search by age, meal time and dietary needs, or browse popular categories for babies, toddlers and families.',
};

export default function RecipesArchivePage() {
  return (
    <>
      <SiteHeader />
      <RecipesArchivePageContent />
      <SiteFooter />
    </>
  );
}
