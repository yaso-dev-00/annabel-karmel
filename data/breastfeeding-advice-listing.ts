import type { AdviceCategoryListingArticle } from "@/components/ArticleScreen/AdviceCategoryListing";

const listingImageBase = "/advice-category/breastfeeding-advice";

export type BreastfeedingAdviceArticle = {
  slug: string;
  title: string;
  image: string;
  imageAlt: string;
};

/** Same order as annabelkarmel.com/advice-category/breastfeeding-advice/ */
export const breastfeedingAdviceArticles: BreastfeedingAdviceArticle[] = [
  {
    slug: "breastmilk-storage",
    title: "Breastmilk storage",
    image: `${listingImageBase}/breastmilk-storage.jpg`,
    imageAlt: "Breastmilk Storage by Annabel Karmel",
  },
  {
    slug: "pumping",
    title: "Pumping",
    image: `${listingImageBase}/pumping.jpg`,
    imageAlt: "Pumping Breast Milk by Annabel Karmel",
  },
  {
    slug: "newborn-feeding-patterns",
    title: "Newborn feeding patterns",
    image: `${listingImageBase}/newborn-feeding-patterns.jpg`,
    imageAlt: "Newborn feeding patterns advice by Annabel Karmel",
  },
  {
    slug: "breastfeeding-friendly-bottle-feeding",
    title: "Breastfeeding friendly bottle feeding",
    image: `${listingImageBase}/breastfeeding-friendly-bottle-feeding.jpg`,
    imageAlt: "Breastfeeding friendly bottle feeding by Annabel Karmel",
  },
  {
    slug: "comfort-feeding",
    title: "Comfort feeding",
    image: `${listingImageBase}/comfort-feeding.jpg`,
    imageAlt: "Comfort Feeding by Annabel Karmel",
  },
  {
    slug: "finding-pumping-routine",
    title: "Finding a pumping routine",
    image: `${listingImageBase}/finding-pumping-routine.jpg`,
    imageAlt: "Finding a pumping routine by Annabel Karmel",
  },
  {
    slug: "breastfeeding-cues",
    title: "Breastfeeding cues",
    image: `${listingImageBase}/breastfeeding-cues.jpg`,
    imageAlt: "Recognising baby's breastfeeding cues by Annabel Karmel",
  },
  {
    slug: "breastfeeding-sessions",
    title: "Are endless breastfeeding sessions normal",
    image: `${listingImageBase}/breastfeeding-sessions.jpg`,
    imageAlt: "Are endless breastfeeding sessions normal by Annabel Karmel",
  },
  {
    slug: "breast-feeding-myths",
    title: "Myths about breastfeeding and breast milk busted",
    image: `${listingImageBase}/breast-feeding-myths.jpg`,
    imageAlt: "Myths about breastfeeding and breast milk busted by Annabel Karmel",
  },
  {
    slug: "introduction-to-breastfeeding",
    title: "Introduction to breastfeeding",
    image: `${listingImageBase}/introduction-to-breastfeeding.jpg`,
    imageAlt: "Introduction to breastfeeding by Annabel Karmel",
  },
  {
    slug: "breastfeeding-getting-started",
    title: "Getting the perfect latch",
    image: `${listingImageBase}/breastfeeding-getting-started.jpg`,
    imageAlt: "Getting the perfect latch by Annabel Karmel",
  },
  {
    slug: "managing-breast-engorgement",
    title: "Managing breast engorgement",
    image: `${listingImageBase}/managing-breast-engorgement.jpg`,
    imageAlt: "Managing breast engorgement by Annabel Karmel",
  },
  {
    slug: "have-i-got-enough-breast-milk",
    title: "You've got enough milk",
    image: `${listingImageBase}/have-i-got-enough-breast-milk.jpg`,
    imageAlt: "You've got enough milk by Annabel Karmel",
  },
  {
    slug: "breastfeeding-multiples",
    title: "Breastfeeding multiples",
    image: `${listingImageBase}/breastfeeding-multiples.jpg`,
    imageAlt: "Breastfeeding multiples by Annabel Karmel",
  },
  {
    slug: "breast-milk",
    title: "Day one of breast milk",
    image: `${listingImageBase}/breast-milk.jpg`,
    imageAlt: "Day one of breast milk by Annabel Karmel",
  },
  {
    slug: "reflux-expert-advice",
    title: "Reflux: Expert Advice",
    image: `${listingImageBase}/reflux-expert-advice.jpg`,
    imageAlt: "Reflux: expert advice by Annabel Karmel",
  },
];

function toListingArticle(article: BreastfeedingAdviceArticle): AdviceCategoryListingArticle {
  return {
    title: article.title,
    href: `/advice/${article.slug}`,
    image: article.image,
    imageAlt: article.imageAlt,
  };
}

export const breastfeedingAdviceListingArticles = breastfeedingAdviceArticles.map(toListingArticle);
