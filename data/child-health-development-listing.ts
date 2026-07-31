import type { AdviceCategoryListingArticle } from '@/components/ArticleScreen/AdviceCategoryListing';
import { resolveListingHref } from '@/data/resolve-article-listing';

const listingImageBase = '/advice-category/child-health-and-development';

type ChildHealthArticle = {
  slug: string;
  title: string;
  image: string;
  imageAlt: string;
};

/** Same order as annabelkarmel.com/advice-category/child-health-and-development/ */
const childHealthArticles: ChildHealthArticle[] = [
  {
    slug: 'toddler-top-tips-to-healthy-food-habits',
    title: 'Toddler Top Tips to Healthy Food Habits',
    image: `${listingImageBase}/toddler-top-tips.jpg`,
    imageAlt: 'Toddler Top Tips to Healthy Food Habits',
  },
  {
    slug: 'gagging-vs-choking',
    title:
      'Gagging vs Choking: The differences you need to know when weaning your baby',
    image: `${listingImageBase}/gagging-vs-choking.jpg`,
    imageAlt:
      'Gagging vs Choking: The differences you need to know when weaning your baby',
  },
  {
    slug: 'weaning-premature-babies',
    title: 'Weaning premature babies',
    image: `${listingImageBase}/weaning-premature-babies.jpg`,
    imageAlt: 'Weaning premature babies',
  },
  {
    slug: 'looking-after-childrens-teeth',
    title:
      "10 things you need to know about looking after your children's teeth",
    image: `${listingImageBase}/looking-after-childrens-teeth.jpg`,
    imageAlt:
      "10 things you need to know about looking after your children's teeth",
  },
  {
    slug: 'cooking-with-kids',
    title: "What's cooking kids?",
    image: `${listingImageBase}/cooking-with-kids.jpg`,
    imageAlt: "What's cooking kids?",
  },
  {
    slug: 'toddler-snacking',
    title: 'Toddler snacks',
    image: `${listingImageBase}/toddler-snacking.jpg`,
    imageAlt: 'Toddler snacks',
  },
  {
    slug: 'cooking-with-toddlers',
    title: 'Cooking with toddlers',
    image: `${listingImageBase}/cooking-with-toddlers.jpg`,
    imageAlt: 'Cooking with toddlers',
  },
  {
    slug: 'potty-training',
    title: 'Potty Training',
    image: `${listingImageBase}/potty-training.jpg`,
    imageAlt: 'Potty Training',
  },
  {
    slug: 'learn-through-play',
    title: 'Learning through play',
    image: `${listingImageBase}/learn-through-play.png`,
    imageAlt: 'Learning through play',
  },
  {
    slug: 'common-concerns',
    title: 'Common concerns',
    image: `${listingImageBase}/common-concerns.jpg`,
    imageAlt: 'Common concerns',
  },
  {
    slug: 'schools',
    title: 'Schools',
    image: `${listingImageBase}/schools.jpg`,
    imageAlt: 'Schools',
  },
  {
    slug: 'family-health',
    title: 'Common concerns',
    image: `${listingImageBase}/family-health.jpg`,
    imageAlt: 'Common concerns',
  },
  {
    slug: 'teething',
    title: 'Teething',
    image: `${listingImageBase}/teething.jpg`,
    imageAlt: 'Teething',
  },
];

function toListingArticle(
  article: ChildHealthArticle,
): AdviceCategoryListingArticle {
  return {
    title: article.title,
    href: resolveListingHref(`/advice/${article.slug}`),
    image: article.image,
    imageAlt: article.imageAlt,
  };
}

export const childHealthDevelopmentArticles =
  childHealthArticles.map(toListingArticle);

export const childHealthDevelopmentIntro =
  "All things Child Health, Child Development and Learning. We offer our expertise and advice on promoting your baby's health and development.";
