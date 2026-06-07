import type { RelatedArticleItem } from "@/components/related-articles-carousel";

export const articleSlug = "infertility-and-iodine-deficiency-everything-you-need-to-know";
export const articlePath = `/articles/${articleSlug}`;

/** Local paths with thematic fallbacks from pregnancy listing / trimesters article. */
export const infertilityIodineImages = {
  toothpaste: {
    src: `${articlePath}/toothpaste.jpg`,
    fallback: "/advice-category/pregnancy-tips/boosting-fertility.jpg",
    final: "/advice-category/pregnancy-tips/infertility-iodine.jpg",
  },
  chlorinePool: {
    src: `${articlePath}/chlorine-pool.jpg`,
    fallback: `${articlePath}/hero.jpg`,
    final: "/articles/balanced-diet-throughout-trimesters/hero.jpg",
  },
  bromideExtinguisher: {
    src: `${articlePath}/bromide-extinguisher.jpg`,
    fallback: `${articlePath}/hero.jpg`,
    final: "/articles/balanced-diet-throughout-trimesters/hero.jpg",
  },
  supplements: {
    src: `${articlePath}/supplements.jpg`,
    fallback: "/advice-category/pregnancy-tips/boosting-fertility.jpg",
    final: `${articlePath}/hero.jpg`,
  },
  pregnancyCouple: {
    src: `${articlePath}/pregnancy-couple.jpg`,
    fallback: "/advice-category/pregnancy-tips/infertility-iodine.jpg",
    final: `${articlePath}/hero.jpg`,
  },
  ribbonBoxLogo: {
    src: `${articlePath}/ribbon-box-logo.png`,
    fallback: "https://www.annabelkarmel.com/wp-content/uploads/2022/07/TRB-LOGO-STACKED-2_BLACK-300x152-optimized.png",
    final: `${articlePath}/hero.jpg`,
  },
} as const;

export const infertilityIodineRelatedArticles: RelatedArticleItem[] = [
  {
    href: "/advice/the-best-foods-for-boosting-fertility",
    title: "The Best Foods for Boosting Fertility",
    image: "/articles/the-best-foods-for-boosting-fertility/hero.jpg",
  },
  {
    href: "/balanced-diet-throughout-trimesters",
    title: "A balanced diet throughout your trimesters",
    image: "/articles/balanced-diet-throughout-trimesters/hero.jpg",
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
    href: "/weaning-premature-babies",
    title: "Weaning premature babies",
    image: "/articles/weaning-premature-babies/hero.jpg",
  },
  {
    href: "/allergies-with-professor-adam-fox",
    title: "Food Allergies with Professor Adam Fox",
    image: "/articles/allergies-with-professor-adam-fox/hero.jpg",
  },
  {
    href: "/meet-our-experts/alexis-stickland-and-beccy-hands",
    title: "Alexis Stickland and Beccy Hands, midwife and doula duo",
    image: "/meet-our-experts/alexis-beccy.jpg",
  },
  {
    href: "/advice-category/pregnancy-tips",
    title: "Pregnancy and Postnatal Tips and Health Advice",
    image: "/advice-category/pregnancy-tips/infertility-iodine.jpg",
  },
];

export const ribbonBoxLinks = {
  ttc: "https://www.instagram.com/fertility_help_hub/",
  parenting: "https://www.instagram.com/parenting.theribbonbox/",
};
