import type { ArticleRecipeCarouselItem } from "@/components/article-recipe-carousel";

const IMG = "/articles/foods-boost-childs-brainpower";
const ICONS = `${IMG}/icons`;

export type BrainFoodItem = {
  name: string;
  icon: string;
  iconAlt: string;
  description: string;
};

export const brainFoods: BrainFoodItem[] = [
  {
    name: "Avocados",
    icon: `${ICONS}/avocado.png`,
    iconAlt: "Avocados",
    description:
      "Bursting with nutrients and melt in the mouth, these green gems are perfect for babies and children. They're rich in monounsaturated fat (the 'good type' of fat) as well as vitamin E which boosts baby's immune system.",
  },
  {
    name: "Blueberries",
    icon: `${ICONS}/blueberries.png`,
    iconAlt: "Blueberries",
    description:
      "They are jam packed with vitamin C & can help you fight off colds, so it's an essential ingredient for your child throughout the year.",
  },
  {
    name: "Eggs",
    icon: `${ICONS}/eggs.png`,
    iconAlt: "Eggs",
    description:
      "Contain Choline an important vitamin that is vital for the creation of memory cells within the brain. Eggs are also high in protein and contain iron, folate and vitamin A – all of which are important for growth, repair and development of cells.",
  },
  {
    name: "Salmon",
    icon: `${ICONS}/salmon.png`,
    iconAlt: "Salmon",
    description:
      "Fish in your baby and child's diet is so important; healthy omega-3 fats contained in oily fish encourage growth as well as the development of their brain, nervous system and vision.",
  },
  {
    name: "Oats",
    icon: `${ICONS}/oats.png`,
    iconAlt: "Oats",
    description:
      "Oats take a long time to digest, so the sugars they contain are released more slowly. Try porridge for breakfast (whole oats are better than instant) or spread an oatcake with cream cheese or peanut butter for a satisfying snack.",
  },
  {
    name: "Carrots",
    icon: `${ICONS}/carrot.png`,
    iconAlt: "Carrots",
    description:
      "Carrots pack a powerful crunch. High in antioxidants; these easy to prepare orange vegetables are stuffed full of vitamin A and other nutrients to help with your baby and child's vision and skin.",
  },
  {
    name: "Broccoli",
    icon: `${ICONS}/broccoli.png`,
    iconAlt: "Broccoli",
    description:
      "Broccoli is top of the league when it comes to its antioxidant properties. It has one of the most concentrated sources of vitamin C, making it a great food for fighting infection. Broccoli is also a great source of calcium and vitamin K, crucial for bone health.",
  },
  {
    name: "Tomatoes",
    icon: `${ICONS}/tomato.png`,
    iconAlt: "Tomatoes",
    description:
      "These glossy red fruits are fit to burst full of vitamins and minerals such as A, C and E. Its secret weapon is the antioxidant lycopene, you and your baby will benefit from this more if you cook tomatoes in fat, either olive oil or butter.",
  },
  {
    name: "Nuts & Seeds",
    icon: `${ICONS}/seeds.png`,
    iconAlt: "Nuts and seeds",
    description:
      "Packed with protein, essential fatty acids, vitamins and minerals, nuts & seeds keeps your nervous system in check",
  },
];

export const brainpowerRecipes: ArticleRecipeCarouselItem[] = [
  {
    title: "Peach, Apple & Blueberry Fool",
    href: "https://www.annabelkarmel.com/recipes/peach-apple-blueberry-fool/",
    image: `${IMG}/recipes/peach-apple-blueberry-fool.jpg`,
  },
  {
    title: "Trio of Vegetables with Tomatoes & Basil",
    href: "https://www.annabelkarmel.com/recipes/trio-of-vegetables-with-tomatoes-basil/",
    image: `${IMG}/recipes/trio-of-vegetables-with-tomatoes-basil.jpg`,
  },
  {
    title: "Lovely Lentil & Egg Puree",
    href: "https://www.annabelkarmel.com/recipes/lovely-lentil-egg-puree/",
    image: `${IMG}/recipes/lovely-lentil-egg-puree.jpg`,
  },
  {
    title: "Boiled Egg with Broccoli & Cheese Soldiers",
    href: "https://www.annabelkarmel.com/recipes/boiled-egg-with-broccoli-cheese-soldiers/",
    image: `${IMG}/recipes/boiled-egg-with-broccoli-cheese-soldiers.jpg`,
  },
  {
    title: "Baby Shakshuka",
    href: "https://www.annabelkarmel.com/recipes/baby-shakshuka/",
    image: `${IMG}/recipes/baby-shakshuka.jpg`,
  },
  {
    title: "Fruit & Granola Pots",
    href: "https://www.annabelkarmel.com/recipes/fruit-granola-pots/",
    image: `${IMG}/recipes/fruit-granola-pots.jpg`,
  },
  {
    title: "Salmon & Cod Burgers",
    href: "https://www.annabelkarmel.com/recipes/salmon-cod-burgers/",
    image: `${IMG}/recipes/salmon-cod-burgers.jpg`,
    appExclusive: true,
  },
  {
    title: "Annabel's One Pot Chicken & Tomato Orzo",
    href: "https://www.annabelkarmel.com/recipes/annabels-one-pot-chicken-tomato-orzo/",
    image: `${IMG}/recipes/annabels-one-pot-chicken-tomato-orzo.jpg`,
  },
  {
    title: "Crunchy Salmon Fishcakes",
    href: "https://www.annabelkarmel.com/recipes/crunchy-salmon-fish-cakes/",
    image: `${IMG}/recipes/crunchy-salmon-fish-cakes.jpg`,
  },
  {
    title: "Tasty Carrot & Oat Energy Bars",
    href: "https://www.annabelkarmel.com/recipes/tasty-carrot-oat-energy-bars/",
    image: `${IMG}/recipes/tasty-carrot-oat-energy-bars.jpg`,
  },
  {
    title: "Broccoli, Chicken & Potato Bites",
    href: "https://www.annabelkarmel.com/recipes/broccoli-chicken-potato-bites/",
    image: `${IMG}/recipes/broccoli-chicken-potato-bites.png`,
  },
  {
    title: "Glazed Salmon",
    href: "https://www.annabelkarmel.com/recipes/glazed-salmon/",
    image: `${IMG}/recipes/glazed-salmon.png`,
  },
  {
    title: "Salmon, Broccoli & Spinach Puree",
    href: "https://www.annabelkarmel.com/recipes/salmon-broccoli-spinach-puree/",
    image: `${IMG}/recipes/salmon-broccoli-spinach-puree.jpg`,
  },
  {
    title: "Carrot Puree",
    href: "https://www.annabelkarmel.com/recipes/carrot-puree/",
    image: `${IMG}/recipes/carrot-puree.jpg`,
  },
  {
    title: "Annabel's Granola",
    href: "https://www.annabelkarmel.com/recipes/annabels-granola/",
    image: `${IMG}/recipes/annabels-granola.jpg`,
  },
  {
    title: "Peach, Pear & Blueberry Puree",
    href: "https://www.annabelkarmel.com/recipes/peach-pear-blueberry-puree/",
    image: `${IMG}/recipes/peach-pear-blueberry-puree.jpg`,
  },
  {
    title: "Flapjacks",
    href: "https://www.annabelkarmel.com/recipes/flapjacks/",
    image: `${IMG}/recipes/flapjacks.jpg`,
  },
  {
    title: "Blueberry, Pear & Banana Puree",
    href: "https://www.annabelkarmel.com/recipes/blueberry-pear-banana-puree/",
    image: `${IMG}/recipes/blueberry-pear-banana-puree.jpg`,
    appExclusive: true,
  },
];
