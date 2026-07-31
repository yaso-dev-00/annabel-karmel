import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RecipeBrowseSection } from '@/components/RecipeScreen/RecipeBrowseSection';
import { RecipeFinder } from '@/components/RecipeScreen/RecipeFinder';
import {
  browseByMealTimeSection,
  popularByAgeSection,
} from '@/data/recipes-archive-page';

export function RecipesArchivePageContent() {
  return (
    <main className="bg-white">
      <RecipeFinder initialFilters={{}} variant="archive" />
      <RecipeBrowseSection
        heading={popularByAgeSection.heading}
        subheading={popularByAgeSection.subheading}
        tiles={popularByAgeSection.tiles}
      />
      <RecipeBrowseSection
        heading={browseByMealTimeSection.heading}
        tiles={browseByMealTimeSection.tiles}
      />
      <div className="mt-[50px]!">
        <InstagramShareSection />
      </div>
    </main>
  );
}
