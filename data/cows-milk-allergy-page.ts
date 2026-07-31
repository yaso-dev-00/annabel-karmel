import type { ArticleRecipeCarouselItem } from '@/components/SharedCarousels/ArticleRecipeCarousel';

const IMG = '/articles/cows-milk-allergy';

export const cowsMilkAllergyBooks: ArticleRecipeCarouselItem[] = [
  {
    title: 'Complete Baby & Toddler Meal Planner',
    href: 'https://www.annabelkarmel.com/apps-books/new-complete-baby-toddler-meal-planner-25th-anniversary-edition/',
    image: `${IMG}/book-meal-planner.png`,
  },
  {
    title: 'Real Food Kids Will Love',
    href: 'https://www.annabelkarmel.com/apps-books/real-foods-kids-will-love/',
    image: '/articles/weaning-and-baby-allergies/book-real-food.png',
  },
  {
    title: 'Baby-Led Weaning Recipe Book',
    href: 'https://www.annabelkarmel.com/apps-books/baby-led-weaning-recipe-book/',
    image: '/articles/weaning-and-baby-allergies/book-baby-led-weaning.png',
  },
];
