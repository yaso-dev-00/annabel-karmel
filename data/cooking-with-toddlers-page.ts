import type { RelatedArticleItem } from "@/components/related-articles-carousel";

export const articleSlug = "cooking-with-toddlers";
export const articlePath = `/articles/${articleSlug}`;

export const cookingWithToddlersIntro = [
  "Children love to ask questions; they're naturally inquisitive and want to explore the world around them. There are many ways to feed your children's curiosity – starting in the kitchen.",
  "These activities provided a great opportunity to teach them all kinds of invaluable skills – as well as the importance of eating a healthy, balanced diet. With childhood obesity on the rise in the UK, there's never been a better time to get children involved in cooking at home. By preparing simple meals together from scratch, you'll stand a good chance of instilling a love of good, healthy food. Of course, it's good to bake a few fun treats along the way, too.",
  "It's important to remember that cooking from scratch doesn't have to mean producing elaborate, time-consuming meals – it might be a simple as boiled eggs and soldiers!",
] as const;

export type CookingWithToddlersSection = {
  title: string;
  paragraphs: string[];
};

export const cookingWithToddlersSections: CookingWithToddlersSection[] = [
  {
    title: "A healthy outlook",
    paragraphs: [
      "Getting your children to take an active interest in their diet is essential for their general health and wellbeing. And, if you have a fussy eater, they're far more likely to eat something they've prepared themselves than something you've put in front of them. If you allow your children to cook with a variety of foods, they will learn all about getting the balance right between choosing healthy, wholesome options and enjoying occasional treats.",
    ],
  },
  {
    title: "Start early",
    paragraphs: [
      "Kids can join you in the kitchen earlier than you might think. Children around the age of three years old love to measure with spoons, mix, stir, roll dough and cut out shapes with cookie cutters, albeit with a helping hand. They also love playing with different textures of food.",
      "Give them bowls of various ingredients and let them explore, while you do the actual work! Remember, children (especially tots) have a short attention span, so choose recipes that are really easy and provide a quick result.",
    ],
  },
];

export const cookingWithToddlersBanner = {
  image: `${articlePath}/frozen-banner-fish-pie.jpg`,
  alt: "Frozen banner fish pie",
} as const;

export const cookingWithToddlersRelatedArticles: RelatedArticleItem[] = [
  {
    href: "/advice/toddler-top-tips-to-healthy-food-habits",
    title: "Toddler Top Tips to Healthy Food Habits",
    image: "/articles/toddler-top-tips-to-healthy-food-habits/hero.jpg",
  },
  {
    href: "/advice/infertility-and-iodine-deficiency-everything-you-need-to-know",
    title: "Infertility and Iodine Deficiency: Everything You Need to Know",
    image: "/articles/infertility-and-iodine-deficiency-everything-you-need-to-know/hero.jpg",
  },
  {
    href: "/advice/the-best-foods-for-boosting-fertility",
    title: "The Best Foods for Boosting Fertility",
    image: "/articles/the-best-foods-for-boosting-fertility/hero.jpg",
  },
  {
    href: "/food-allergies-your-common-questions-concerns-answered",
    title: "Food Allergy Awareness",
    image: "/articles/food-allergies-your-common-questions-concerns-answered/hero.jpg",
  },
  {
    href: "/top-tips-washing-babies-hands",
    title: "Top Tips for Washing Babies Hands",
    image: "/articles/top-tips-washing-babies-hands/wash-hands-sink.png",
  },
  {
    href: "/go-guide-handling-leftovers-safely",
    title: "Go to Guide: Handling Leftovers Safely",
    image: "/articles/go-guide-handling-leftovers-safely/hero.jpg",
  },
  {
    href: "/top-weaning-tips",
    title: "Annabel Karmel's Top 10 Weaning Tips",
    image: "/articles/top-weaning-tips/hero.png",
  },
  {
    href: "/advice/cooking-with-kids",
    title: "Top tips for cooking with kids",
    image: "/articles/get-kids-kitchen/hero.png",
  },
  {
    href: "/advice/gagging-vs-choking",
    title: "Gagging vs Choking: The differences you need to know when weaning your baby",
    image: "/articles/gagging-vs-choking/hero.jpg",
  },
  {
    href: "/advice/weaning-premature-babies",
    title: "Weaning premature babies",
    image: "/articles/weaning-premature-babies/hero.jpg",
  },
];
