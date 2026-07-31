import type { AdviceCategoryListingArticle } from '@/components/ArticleScreen/AdviceCategoryListing';
import type { RelatedArticleItem } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { defaultRelatedArticles } from '@/data/default-related-articles';
import { resolveListingHref } from '@/data/resolve-article-listing';

const listingImageBase = '/advice-category/baby-sleep-advice';

export type BabySleepAdviceArticle = {
  slug: string;
  title: string;
  image: string;
  imageAlt: string;
};

/** Same order as annabelkarmel.com/advice-category/baby-sleep-advice/ */
export const babySleepAdviceArticles: BabySleepAdviceArticle[] = [
  {
    slug: 'busting-common-baby-sleep-myths',
    title: 'Busting common baby sleep myths',
    image: `${listingImageBase}/busting-common-baby-sleep-myths.jpg`,
    imageAlt: 'Busting common baby sleep myths',
  },
  {
    slug: 'supporting-baby-wake-night',
    title: 'Supporting your baby if they wake at night',
    image: `${listingImageBase}/supporting-baby-wake-night.jpg`,
    imageAlt: 'Supporting your baby if they wake at night',
  },
  {
    slug: 'baby-nap-times',
    title: 'Resettling at nap times',
    image: `${listingImageBase}/baby-nap-times.jpg`,
    imageAlt: 'Resettling at nap times',
  },
  {
    slug: 'baby-bedtime',
    title: 'Baby sleep: the biology behind bedtime',
    image: `${listingImageBase}/baby-bedtime.jpg`,
    imageAlt: 'Baby sleep: the biology behind bedtime',
  },
  {
    slug: 'baby-sleep-routine',
    title: 'The bedtime routine and preparing for sleep separation',
    image: `${listingImageBase}/baby-sleep-routine.jpg`,
    imageAlt: 'The bedtime routine and preparing for sleep separation',
  },
];

function toListingArticle(
  article: BabySleepAdviceArticle,
): AdviceCategoryListingArticle {
  return {
    title: article.title,
    href: resolveListingHref(`/advice/${article.slug}`),
    image: article.image,
    imageAlt: article.imageAlt,
  };
}

export const babySleepAdviceListingArticles =
  babySleepAdviceArticles.map(toListingArticle);

export const babySleepAdviceIntro =
  "Sleepless nights are undoubtedly one of the toughest parts of being a parent. Having a baby or toddler that doesn't sleep can leave you feeling as though you're doing something wrong, and that you're the reason your little one is unsettled, fractious and upset. And that's why we are here with experienced paediatric sleep consultant Kerry Secker to help bring you sleep salvation.";

export function babySleepAdviceRelatedArticles(
  _excludeSlug: string,
): RelatedArticleItem[] {
  return defaultRelatedArticles;
}
