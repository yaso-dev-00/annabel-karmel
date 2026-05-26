import type { ArticleRecipeCarouselItem } from "@/components/article-recipe-carousel";
import type { RelatedArticleItem } from "@/components/related-articles-carousel";

const relatedBase = "/articles/introduction-to-finger-foods/related";

/** Recipe carousel on annabelkarmel.com (3 recipes, loop carousel). */
export const introductionToFingerFoodsRecipes: ArticleRecipeCarouselItem[] = [
  {
    title: "Veggie Balls",
    href: "https://www.annabelkarmel.com/recipes/veggie-balls/",
    image: "/articles/introduction-to-finger-foods/veggie-balls.jpg",
  },
  {
    title: "Oriental Chicken Balls",
    href: "https://www.annabelkarmel.com/recipes/oriental-chicken-balls/",
    image: "/articles/introduction-to-finger-foods/oriental-chicken-balls.jpg",
    appExclusive: true,
  },
  {
    title: "Chicken Balls with Pesto in a Tomato Sauce",
    href: "https://www.annabelkarmel.com/recipes/chicken-balls-with-pesto-in-a-tomato-sauce/",
    image: "/articles/introduction-to-finger-foods/chicken-balls-pesto.jpg",
  },
];

export const introductionToFingerFoodsContentImage =
  "/articles/introduction-to-finger-foods/baby-led-weaning-tips.jpg";

/** Related Articles carousel — same order as the live article page. */
export const introductionToFingerFoodsRelatedArticles: RelatedArticleItem[] = [
  {
    title: "The Best Foods to Help Your Baby Sleep",
    href: "/best-foods-to-help-your-baby-sleep",
    image: "/articles/best-foods-to-help-your-baby-sleep/hero.png",
  },
  {
    title: "Haunted Toast Toppers",
    href: "/haunted-toast-toppers",
    image: "/articles/haunted-toast-toppers/hero.png",
  },
  {
    title: "6 tips for getting out and about with baby",
    href: "/6-tips-for-getting-out-and-about-with-baby",
    image: "/articles/6-tips-for-getting-out-and-about-with-baby/hero.jpg",
  },
  {
    title: "Get your FREE top 50 First Foods Checklist",
    href: "/get-your-free-top-50-first-foods-list",
    image: "/articles/get-your-free-top-50-first-foods-list/hero.jpg",
  },
  {
    title: "Tips on how to keep baby hydrated!",
    href: "/tips-on-how-to-keep-baby-hydrated",
    image: "/articles/tips-on-how-to-keep-baby-hydrated/hero.jpg",
  },
  {
    title: "Starting solids: Top tips on how to transition from milk to solid food",
    href: "/starting-solids-top-tips-on-how-to-transition-from-milk-to-solid-food",
    image: "/articles/starting-solids-top-tips-on-how-to-transition-from-milk-to-solid-food/hero.jpg",
  },
  {
    title: "Your guide to supporting baby's gut health",
    href: "/your-guide-to-supporting-babys-gut-health",
    image: "/articles/your-guide-to-supporting-babys-gut-health/hero.jpg",
  },
  {
    title: "Fibre intake for babies – what you need to know!",
    href: "/fibre-intake-for-babies-what-you-need-to-know",
    image: "/articles/fibre-intake-for-babies-what-you-need-to-know/hero.jpg",
  },
  {
    title: "Pedal Power!",
    href: "/pedal-power",
    image: "/articles/pedal-power/hero.jpg",
  },
  {
    title: "Pastably Perfect!",
    href: "https://www.annabelkarmel.com/pastably-perfect/",
    image: `${relatedBase}/pastably-perfect.jpg`,
  },
  {
    title: "Annabel's x HECK! Recipe bangers!",
    href: "/annabels-6-family-favourites-with-heck",
    image: "/articles/annabels-6-family-favourites-with-heck/hero.jpg",
  },
  {
    title: "6 incredibly simple recipes with Green Giant sweetcorn",
    href: "https://www.annabelkarmel.com/6-incredibly-simple-recipes-with-green-giant-sweetcorn/",
    image: `${relatedBase}/green-giant-sweetcorn.jpg`,
  },
  {
    title: "Annabel's Top 10 Burger Recipes",
    href: "/annabels-top-10-burger-recipes",
    image: "/articles/annabels-top-10-burger-recipes/vegan-bunny-burger.jpg",
  },
  {
    title: "7 mouth-watering recipes to celebrate the start of Summer",
    href: "/summer-recipes",
    image: "/articles/summer-recipes/toasted-cinnamon-breadcrumb-ice-cream.png",
  },
  {
    title: "10 delicious cherry tomato recipes",
    href: "/10-delicious-cherry-tomato-recipes",
    image: "/articles/10-delicious-cherry-tomato-recipes/tomato-hummus-with-baked-tortilla-chips.jpg",
  },
  {
    title: "10 quick & easy puff pastry recipes",
    href: "/10-quick-easy-puff-pastry-recipes",
    image: "/articles/10-quick-easy-puff-pastry-recipes/pigs-in-blankets.jpg",
  },
  {
    title: "Discover special offers at Sani Resort, Greece",
    href: "/discover-special-offers-at-sani-resort-greece",
    image: "/articles/discover-special-offers-at-sani-resort-greece/sani-asterias.jpg",
  },
];
