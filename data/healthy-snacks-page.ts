export type HealthySnackCard = {
  title: string;
  body: string;
  postViews: string;
  href: string;
  image: string;
  imageAlt: string;
};

const IMG = "/articles/healthy-snacks-for-toddlers-and-kids";

export const snacksIntro =
  "It's always a good idea to keep a supply of healthy snacks on hand for when those mid-morning and / or mid-afternoon hunger moans strike! Here are top super-fuelled kids snack ideas to help feed their adventures (and keep them topped up until teatime!) And if you can make your own, then do, as it's a good opportunity to get the kids involved in the preparation too.";

export const healthySnacks: HealthySnackCard[] = [
  {
    title: "Banana, Carrot and Raisin Loaf",
    body: "Everyone loves banana bread. This Banana, Carrot and Raisin Loaf makes a sweet and satisfying breakfast or snack perfect for packed lunches. This is a delicious treat and a great way to use up overripe bananas.",
    postViews: "7,148",
    href: "https://www.annabelkarmel.com/recipes/banana-carrot-raisin-loaf/",
    image: `${IMG}/banana-loaf.png`,
    imageAlt: "Banana, carrot and raisin loaf",
  },
  {
    title: "Veggie Frittata Muffins",
    body: "Eggs are full of protein, vitamins and minerals, including vitamin D, folate, iodine and long-chain omega-3 fatty acids, so provide a nutritious and delicious meal at any time of the day. These Veggie Frittata Muffins are a nutritious, quick and easy recipe that you and your tot can enjoy together.",
    postViews: "11,948",
    href: "https://www.annabelkarmel.com/recipes/veggie-frittata-muffins/",
    image: `${IMG}/frittata-muffins.jpg`,
    imageAlt: "Veggie frittata muffins",
  },
  {
    title: "Fruit & Veg Ice Lollies",
    body: "Did you know that you can make the freshest, healthiest ice lollies with just a few ingredients? These zero-sugar fruit and veggie ice lollies are delicious and not only a healthy treat but will also soothe sore gums if your little one is teething.",
    postViews: "7,493",
    href: "https://www.annabelkarmel.com/recipes/fruit-veg-ice-lollies/",
    image: `${IMG}/ice-lollies.png`,
    imageAlt: "Fruit and veg ice lollies",
  },
  {
    title: "Scrambled Egg & Guacamole Teddy Bears",
    body: "Little ones and grown-ups need to refuel, so these Scrambled Egg & Guacamole Teddy Bears are a nutritious, fun, quick and easy recipe that you and your tot can enjoy together. One recipe for both means less cooking and washing-up for you, and more time spent eating good food together. Eggs are full of high quality protein, vitamins and minerals, including vitamin D, folate, iodine and long-chain omega-3 fatty acids, so provide a nutritious and delicious meal at any time of the day. British Lion eggs are the only eggs approved by the Food Standards Agency to be served runny to babies, young children, pregnant women and the elderly, so always look for the Lion mark on egg shells and packs – you can find them in your favourite supermarket.",
    postViews: "1,947",
    href: "https://www.annabelkarmel.com/recipes/scrambled-egg-guacamole-teddy-bears/",
    image: `${IMG}/scrambled-egg-teddy-bears.jpg`,
    imageAlt: "Scrambled egg and guacamole teddy bears",
  },
  {
    title: "Mini Cherry Tomato & Cheese Muffins",
    body: "If you're looking for new ways to mix up your baby's snacks then look no further than these Mini Cherry Tomato & Cheese Muffins. You can also freeze these when cooked for an emergency snack stash!",
    postViews: "10,410",
    href: "https://www.annabelkarmel.com/recipes/mini-cherry-tomato-cheese-muffins/",
    image: `${IMG}/cherry-tomato-muffins.jpg`,
    imageAlt: "Mini cherry tomato and cheese muffins",
  },
  {
    title: "No-Sugar Chocolate Orange Energy Balls",
    body: "These No-Sugar Chocolate Orange Energy Balls are a healthy twist on a chocolate truffle – sweet-toothed tots who think they're raiding the chocolate box will be none the wiser!",
    postViews: "3,934",
    href: "https://www.annabelkarmel.com/recipes/no-sugar-chocolate-orange-energy-balls/",
    image: `${IMG}/chocolate-orange-energy-balls.jpg`,
    imageAlt: "No-sugar chocolate orange energy balls",
  },
  {
    title: "Watermelon Pizza",
    body: "It's no secret that kids love pizza, so tempt them with a tasty slice of this fabulously fresh showstopper Watermelon Pizza!",
    postViews: "459",
    href: "https://www.annabelkarmel.com/recipes/watermelon-pizza/",
    image: `${IMG}/watermelon-pizza.png`,
    imageAlt: "Watermelon pizza",
  },
  {
    title: "Mini Energy Balls",
    body: "Try these delicious Mini Energy Balls. They make a healthy snack and are ideal to give you or your child a mid-morning or afternoon energy boost. Its super easy and a great addition to your little ones lunchbox.",
    postViews: "11,494",
    href: "https://www.annabelkarmel.com/recipes/mini-energy-balls/",
    image: `${IMG}/mini-energy-balls.png`,
    imageAlt: "Mini energy balls",
  },
];
