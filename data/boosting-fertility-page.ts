import type { RelatedArticleItem } from "@/components/related-articles-carousel";
import { ribbonBoxLinks } from "@/data/infertility-iodine-page";

export const articleSlug = "the-best-foods-for-boosting-fertility";
export const articlePath = `/articles/${articleSlug}`;

const listingFallback = "/advice-category/pregnancy-tips/boosting-fertility.jpg";

export const boostingFertilityImages = {
  avocados: {
    src: `${articlePath}/avocados.jpg`,
    fallback: listingFallback,
    final: `${articlePath}/hero.jpg`,
  },
  berries: {
    src: `${articlePath}/berries.jpg`,
    fallback: listingFallback,
    final: `${articlePath}/hero.jpg`,
  },
  dairy: {
    src: `${articlePath}/dairy.jpg`,
    fallback: listingFallback,
    final: `${articlePath}/hero.jpg`,
  },
  banana: {
    src: `${articlePath}/banana.jpg`,
    fallback: listingFallback,
    final: `${articlePath}/hero.jpg`,
  },
  citrus: {
    src: `${articlePath}/citrus.jpg`,
    fallback: listingFallback,
    final: `${articlePath}/hero.jpg`,
  },
  quinoa: {
    src: `${articlePath}/quinoa.jpg`,
    fallback: listingFallback,
    final: `${articlePath}/hero.jpg`,
  },
  ribbonBoxLogo: {
    src: `${articlePath}/ribbon-box-logo.png`,
    fallback:
      "https://www.annabelkarmel.com/wp-content/uploads/2022/07/TRB-LOGO-STACKED-2_BLACK-300x152-optimized.png",
    final: listingFallback,
  },
} as const;

export { ribbonBoxLinks };

export const boostingFertilityRelatedArticles: RelatedArticleItem[] = [
  {
    href: "/advice/infertility-and-iodine-deficiency-everything-you-need-to-know",
    title: "Infertility and Iodine Deficiency: Everything You Need to Know",
    image: "/articles/infertility-and-iodine-deficiency-everything-you-need-to-know/hero.jpg",
  },
  {
    href: "/balanced-diet-throughout-trimesters",
    title: "A balanced diet throughout your trimesters",
    image: "/articles/balanced-diet-throughout-trimesters/hero.jpg",
  },
  {
    href: "/advice-category/pregnancy-tips",
    title: "Pregnancy and Postnatal Tips and Health Advice",
    image: "/advice-category/pregnancy-tips/infertility-iodine.jpg",
  },
  {
    href: "/food-allergies-your-common-questions-concerns-answered",
    title: "Food Allergies – your common questions & concerns answered",
    image: "/articles/food-allergies-your-common-questions-concerns-answered/hero.jpg",
  },
  {
    href: "/go-guide-handling-leftovers-safely",
    title: "Go to Guide: Handling Leftovers Safely",
    image: "/articles/go-guide-handling-leftovers-safely/hero.jpg",
  },
  {
    href: "/annabels-top-10-finger-food-recipes",
    title: "Annabel Karmel's Top 10 Finger Food Recipes",
    image: "/articles/annabels-top-10-finger-food-recipes/chicken-veggie-shapes.jpg",
  },
  {
    href: "/gagging-vs-choking",
    title: "Gagging vs Choking: The differences you need to know when weaning your baby",
    image: "/articles/gagging-vs-choking/hero.jpg",
  },
  {
    href: "/allergies-with-professor-adam-fox",
    title: "Food Allergies with Professor Adam Fox",
    image: "/articles/allergies-with-professor-adam-fox/hero.jpg",
  },
  {
    href: "/weaning-premature-babies",
    title: "Weaning premature babies",
    image: "/articles/weaning-premature-babies/hero.jpg",
  },
  {
    href: "/meet-our-experts/alexis-stickland-and-beccy-hands",
    title: "Alexis Stickland and Beccy Hands, midwife and doula duo",
    image: "/meet-our-experts/alexis-beccy.jpg",
  },
];

export type BoostingFertilityImageKey = keyof typeof boostingFertilityImages;
