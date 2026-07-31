import type { AdviceCategoryListingArticle } from '@/components/ArticleScreen/AdviceCategoryListing';

const listingImageBase = '/advice-category/bottle-feeding-tips';

export type BottleFeedingArticle = {
  slug: string;
  title: string;
  image: string;
  imageAlt: string;
};

/** Same order as annabelkarmel.com/advice-category/bottle-feeding-tips/ */
export const bottleFeedingArticles: BottleFeedingArticle[] = [
  {
    slug: 'paced-bottle-feeding',
    title: 'Paced bottle feeding',
    image: `${listingImageBase}/paced-bottle-feeding.jpg`,
    imageAlt: 'Paced bottle feeding | Annabel Karmel',
  },
  {
    slug: 'responsive-bottle-feeding',
    title: 'Responsive Bottle Feeding',
    image: `${listingImageBase}/responsive-bottle-feeding.jpg`,
    imageAlt: 'Responsive bottle feeding by Annabel Karmel',
  },
  {
    slug: 'how-to-sterilise-bottles',
    title: 'How to sterilise bottles',
    image: `${listingImageBase}/how-to-sterilise-bottles.jpg`,
    imageAlt: 'How to sterilise bottles by Annabel Karmel',
  },
  {
    slug: 'different-infant-formula-milks',
    title: 'The different infant formula milks',
    image: `${listingImageBase}/different-infant-formula-milks.jpg`,
    imageAlt: 'The different infant formula milks by Annabel Karmel',
  },
  {
    slug: 'formula-milk',
    title: 'Choosing & preparing formula milk',
    image: `${listingImageBase}/formula-milk.jpg`,
    imageAlt: 'Choosing & preparing formula milk by Annabel Karmel',
  },
];

function toListingArticle(
  article: BottleFeedingArticle,
): AdviceCategoryListingArticle {
  return {
    title: article.title,
    href: `/advice/${article.slug}`,
    image: article.image,
    imageAlt: article.imageAlt,
  };
}

export const bottleFeedingListingArticles =
  bottleFeedingArticles.map(toListingArticle);
