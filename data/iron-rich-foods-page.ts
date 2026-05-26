import type { ArticleRecipeCarouselItem } from "@/components/article-recipe-carousel";

const IMG = "/articles/iron-rich-foods";

export const ironRichFoodsContentImage = `${IMG}/iron-rich-foods.jpg`;

export const ironRichMeatRecipes: ArticleRecipeCarouselItem[] = [
  {
    title: "Chicken & Veggie Shapes",
    href: "https://www.annabelkarmel.com/recipes/chicken-veggie-shapes/",
    image: `${IMG}/chicken-veggie-shapes.jpg`,
  },
  {
    title: "Vroom Vroom Veggie-packed Bolognese",
    href: "https://www.annabelkarmel.com/recipes/vroom-vroom-veggie-packed-bolognese/",
    image: `${IMG}/veggie-bolognese.jpg`,
  },
  {
    title: "Beef Meatballs with Carrot & Apple",
    href: "https://www.annabelkarmel.com/recipes/beef-meatballs-with-carrot-and-apple/",
    image: `${IMG}/beef-meatballs.jpg`,
  },
];

export const ironRichNonMeatRecipes: ArticleRecipeCarouselItem[] = [
  {
    title: "Veggie Frittata Muffins",
    href: "https://www.annabelkarmel.com/recipes/veggie-frittata-muffins/",
    image: `${IMG}/veggie-frittata-muffins.jpg`,
    appExclusive: true,
  },
  {
    title: "Tasty Meatless Bolognese",
    href: "https://www.annabelkarmel.com/recipes/tasty-meatless-bolognese/",
    image: `${IMG}/meatless-bolognese.jpg`,
  },
  {
    title: "Spinach & Tomato Frittata",
    href: "https://www.annabelkarmel.com/recipes/spinach-frittata/",
    image: `${IMG}/spinach-tomato-frittata.jpg`,
  },
  {
    title: "Sweet Potato, Carrot & Apricot Puree",
    href: "https://www.annabelkarmel.com/recipes/sweet-potato-carrot-and-apricot-puree/",
    image: `${IMG}/sweet-potato-carrot-apricot.jpg`,
  },
  {
    title: "Lovely Lentil Puree",
    href: "https://www.annabelkarmel.com/recipes/lovely-lentil-puree/",
    image: `${IMG}/lovely-lentil-puree.jpg`,
  },
  {
    title: "Eat Your Greens Puree",
    href: "https://www.annabelkarmel.com/recipes/eat-your-greens-puree/",
    image: `${IMG}/eat-your-greens-puree.jpg`,
  },
];
