import type { ArticleRecipeCarouselItem } from '@/components/SharedCarousels/ArticleRecipeCarousel';

const IMG = '/articles/managing-my-childs-food-allergy';

export const managingAllergyBooks: ArticleRecipeCarouselItem[] = [
  {
    title: 'Real Food Kids Will Love',
    href: 'https://www.annabelkarmel.com/apps-books/real-foods-kids-will-love/',
    image: `${IMG}/book-real-food.png`,
  },
  {
    title: 'Baby-Led Weaning Recipe Book',
    href: 'https://www.annabelkarmel.com/apps-books/baby-led-weaning-recipe-book/',
    image: `${IMG}/book-baby-led-weaning.png`,
  },
  {
    title: 'Family Cookbook',
    href: 'https://www.annabelkarmel.com/apps-books/annabels-family-cookbook/',
    image: `${IMG}/book-family.png`,
  },
];
