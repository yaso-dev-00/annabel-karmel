import type { ArticleRecipeCarouselItem } from "@/components/article-recipe-carousel";

const LUNCHBOX_IMG = "/articles/10-healthy-nutritious-lunchbox-ideas";

export type LunchboxTip = {
  label?: string;
  body: string;
};

export const lunchboxTips: LunchboxTip[] = [
  {
    label: "The humble sarnie",
    body: "still has its place but consider white bread alternatives like pitta pockets, ciabatta, mini baguettes or bagels. Be creative with your contents; tuna, chopped egg, griddled chicken, shredded lettuce….",
  },
  {
    label: "Veggie dipsticks",
    body: "are popular and you can wrap carrot, pepper or cucumber sticks in damp kitchen paper to stop them drying out, and spoon hummus or guacamole into a pot.",
  },
  {
    label: "Soups and salads",
    body: "are great ways of topping up vitamin consumption and there are endless flavours and combinations to play with. Flasks will keep soup warm and is real winner on cold days.",
  },
  {
    body: "Too often the brown banana and bruised apple come home uneaten at the end of the day so make fruit more appealing by threading bite size chunks on to a straw.",
  },
  {
    label: "Snacks",
    body: "needn't be public enemy number one. Although schools are increasingly banning chocolate you can top up your children's energy levels and their nutrition with dried fruit or homemade muffins or flapjacks.",
  },
  {
    label: "Don't forget to drink!",
    body: "Staying hydrated is as important for concentration and energy levels as good nutrition. Beware of 'juice drinks' which may contain more sugar and water than juice. Water is a winner!",
  },
];

/** Lunchbox-friendly recipes (live site carousel is empty; these match the article topic). */
export const lunchboxRecipes: ArticleRecipeCarouselItem[] = [
  {
    title: "Chicken, Tomato & Veggie Stars",
    href: "https://www.annabelkarmel.com/recipes/chicken-tomato-veggie-stars/",
    image: `${LUNCHBOX_IMG}/chicken-tomato-veggie-stars.jpg`,
  },
  {
    title: "Turkey & Vegetable Rice Salad",
    href: "https://www.annabelkarmel.com/recipes/turkey-vegetable-rice-salad/",
    image: `${LUNCHBOX_IMG}/turkey-vegetable-rice-salad.jpg`,
  },
  {
    title: "Veggie Packed Frittata Muffins 4-ways",
    href: "https://www.annabelkarmel.com/recipes/veggie-packed-frittata-muffins/",
    image: `${LUNCHBOX_IMG}/veggie-packed-frittata-muffins.jpg`,
  },
  {
    title: "Chicken, Tomato & Corn Fritters",
    href: "https://www.annabelkarmel.com/recipes/chicken-tomato-corn-fritters/",
    image: `${LUNCHBOX_IMG}/chicken-tomato-corn-fritters.jpg`,
  },
  {
    title: "Macaroni & Cheese Muffins",
    href: "https://www.annabelkarmel.com/recipes/macaroni-cheese-muffins/",
    image: `${LUNCHBOX_IMG}/macaroni-cheese-muffins.jpg`,
  },
  {
    title: "Cheese & Cherry Tomato Muffins",
    href: "https://www.annabelkarmel.com/recipes/cheese-cherry-tomato-muffins/",
    image: `${LUNCHBOX_IMG}/cheese-cherry-tomato-muffins.jpg`,
  },
];
