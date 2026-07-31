import type { ArticleRecipeCarouselItem } from '@/components/SharedCarousels/ArticleRecipeCarousel';

const SHARED = '/articles/food-allergy-vs-food-intolerance';

export const dairyFreeCmpaBooks: ArticleRecipeCarouselItem[] = [
  {
    title: 'Complete Baby & Toddler Meal Planner',
    href: 'https://www.annabelkarmel.com/apps-books/new-complete-baby-toddler-meal-planner-25th-anniversary-edition/',
    image: `${SHARED}/book-meal-planner.png`,
  },
  {
    title: 'Weaning Made Simple',
    href: 'https://www.annabelkarmel.com/apps-books/weaning-made-simple/',
    image: `${SHARED}/book-weaning-made-simple.png`,
  },
  {
    title: 'Real Food Kids Will Love',
    href: 'https://www.annabelkarmel.com/apps-books/real-foods-kids-will-love/',
    image: `${SHARED}/book-real-food.png`,
  },
];
