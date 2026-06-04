import type { ArticleRecipeCarouselItem } from "@/components/article-recipe-carousel";

const IMG = "/articles/breastfeeding-and-food-allergies";
const SHARED = "/articles/food-allergy-vs-food-intolerance";

export const breastfeedingAllergiesBooks: ArticleRecipeCarouselItem[] = [
  {
    title: "Busy Mum's Cookbook",
    href: "https://www.annabelkarmel.com/apps-books/busy-mums-cookbook/",
    image: `${IMG}/book-busy-mums.png`,
  },
  {
    title: "Complete Baby & Toddler Meal Planner",
    href: "https://www.annabelkarmel.com/apps-books/new-complete-baby-toddler-meal-planner-25th-anniversary-edition/",
    image: `${SHARED}/book-meal-planner.png`,
  },
  {
    title: "Weaning Made Simple",
    href: "https://www.annabelkarmel.com/apps-books/weaning-made-simple/",
    image: `${SHARED}/book-weaning-made-simple.png`,
  },
];
