import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { RecipeDetailPage } from '@/components/RecipeScreen/RecipeDetailPage';
import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import type { RecipeDetail } from '@/data/recipe-detail';
import { recipeDetailDemoContent } from '@/data/recipe-detail-demo';
import { getRecipePage } from '@/lib/recipe-detail';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.annabelkarmel.com';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

/** Live site still uses static listing stub + demo body until CMS goes live. */
function demoRecipeDetail(
  title: string,
  slug: string,
  href: string,
): RecipeDetail {
  const demo = recipeDetailDemoContent;
  return {
    slug,
    title,
    href,
    image: demo.image,
    description: demo.description,
    allergens: [...demo.allergens],
    mealTimes: [...demo.mealTimes],
    ages: [...demo.ages],
    suitableForFreezing: demo.suitableForFreezing,
    prepTime: demo.prepTime,
    cookTime: demo.cookTime,
    portions: demo.portions,
    ingredients: [...demo.ingredients],
    method: [...demo.method],
    breadcrumb: [demo.breadcrumbCategory],
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipePage(slug);
  if (!recipe) {
    return { title: 'Recipe | Annabel Karmel' };
  }
  return {
    title: `${recipe.title} | Annabel Karmel`,
    description: recipeDetailDemoContent.description,
    openGraph: {
      title: recipe.title,
      description: recipeDetailDemoContent.description,
      images: [{ url: recipeDetailDemoContent.image }],
    },
  };
}

export default async function RecipeDetailRoute({ params }: PageProps) {
  const { slug } = await params;
  const recipe = await getRecipePage(slug);
  if (!recipe) {
    notFound();
  }

  const shareUrl = `${SITE_URL}${recipe.href}`;
  const detail = demoRecipeDetail(recipe.title, recipe.slug, recipe.href);

  return (
    <>
      <SiteHeader />
      <RecipeDetailPage recipe={detail} shareUrl={shareUrl} />
      <div className="mt-[90px]">
        <InstagramShareSection />
      </div>
      <SiteFooter />
    </>
  );
}
