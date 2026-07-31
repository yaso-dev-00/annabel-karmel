const IMG = '/articles/top-10-family-recipes';

export type FamilyRecipeCard = {
  title: string;
  image: string;
  imageAlt: string;
  body: string;
  postViews: string;
  href: string;
};

export const familyRecipesIntro =
  "Families all over the world rely on Annabel Karmel's recipes. Out of all the hundreds on our website, these are the top 10 most popular family recipes on our website.";

export const familyRecipes: FamilyRecipeCard[] = [
  {
    title: 'Cherry Tomato & Mascarpone Risotto',
    image: `${IMG}/20210727-AK06124-768x960-optimized.jpg`,
    imageAlt: 'Cherry tomato and mascarpone risotto',
    body: 'Enjoy a comforting bowl of risotto with sweet cherry tomatoes and mascarpone. This is an absolutely winning combo!',
    postViews: '2,559',
    href: 'https://www.annabelkarmel.com/recipes/cherry-tomato-mascarpone-risotto/',
  },
  {
    title: 'Chicken Balls with Tomato & Carrot Sauce',
    image: `${IMG}/chicken-balls-768x755-optimized.png`,
    imageAlt: 'Chicken balls with tomato and carrot sauce',
    body: 'These delicious Chicken Balls with Tomato & Carrot Sauce is a simple and fresh dish packed full of flavour. A fool proof recipe packed with veggies that even the fussiest of eaters will enjoy!',
    postViews: '8,826',
    href: 'https://www.annabelkarmel.com/recipes/chicken-balls-with-tomato-carrot-sauce/',
  },
  {
    title: 'My Favourite Vegan Burger',
    image: `${IMG}/Annabels-Favourite-Vegan-Burgers-768x1029-optimized.jpg`,
    imageAlt: 'My favourite vegan burger',
    body: 'This is a recipe for my My Favourite Vegan Burger \u2013 sneaking vegetables into a burger is a good option for children who are super fussy and profess to hate veggies. Watch them munch these vegan burgers up in blissful ignorance. Instead of using egg as binder in the burger mixture, I use chia seeds soaked in water.',
    postViews: '790',
    href: 'https://www.annabelkarmel.com/recipes/my-favourite-vegan-burger/',
  },
  {
    title: 'Oven Baked Chicken Nuggets',
    image: `${IMG}/28_Oven_Baked_Krispie-Chicken-Nuggets-._1000x1000_3-optimized.jpg`,
    imageAlt: 'Oven baked chicken nuggets',
    body: 'See if little ones can guess the secret snap, crackle and pop ingredient in my healthy take on chicken nuggets. Instead of using batter to coat chicken strips, I like to use Rice Krispies for a light crispy and secret \u2018krispie\u2019 coating. These Oven Baked Chicken Nuggets are suitable for freezing when uncooked. To cook from frozen remove the nuggets from freezer as required and allow to defrost thoroughly before cooking. Cook in a medium to hot oven for 12 to 15 minutes, as per the cooking instructions.',
    postViews: '1,357',
    href: 'https://www.annabelkarmel.com/recipes/oven-baked-chicken-nuggets/',
  },
  {
    title: 'Annabel\u2019s Super-Fuel Veggie Fusilli',
    image: `${IMG}/1140-AnnabelsSuperFuelVeggieFusilli_018690-768x575-optimized.jpg`,
    imageAlt: "Annabel's super-fuel veggie fusilli",
    body: 'Need good food fast? Annabel\u2019s Super-Fuel Veggie Fusilli is easy to prepare and passes the taste test with flying colours. There\u2019s no easier way towards your family\u2019s 5-a-day, and with Annabel\u2019s deliciously light cheese sauce, it\u2019s a staple you\u2019ll want to whip-up time and time again.',
    postViews: '1,335',
    href: 'https://www.annabelkarmel.com/recipes/annabels-super-fuel-veggie-fusilli/',
  },
  {
    title: 'Annabel\u2019s Hidden Veg Beef Bolognese',
    image: `${IMG}/BOLOGNESE-5-768x602-optimized.jpg`,
    imageAlt: "Annabel's hidden veg beef bolognese",
    body: 'Don\u2019t miss Annabel\u2019s hidden veg beef bolognese \u2013 a family dinner favourite from Annabel\u2019s kitchen. Refuel after a busy day with her super-tasty Bolognese recipe which is packed full of those all-important veggies. A great way towards their 5-a-day (and the kids will be none the wiser)!',
    postViews: '2,766',
    href: 'https://www.annabelkarmel.com/recipes/annabels-hidden-veg-beef-bolognese/',
  },
  {
    title: 'Annabel\u2019s Fruity Chicken Curry',
    image: `${IMG}/curry-768x586-optimized.jpg`,
    imageAlt: "Annabel's fruity chicken curry",
    body: 'There\u2019s no reason why the whole family shouldn\u2019t join in on curry nights \u2013 especially when the food is this good! Renowned for getting kids exploring and enjoying new flavours, Annabel\u2019s Fruity Chicken Curry is a must-try with just the right amount of mild spice and flavour.',
    postViews: '12,620',
    href: 'https://www.annabelkarmel.com/recipes/annabels-fruity-chicken-curry/',
  },
  {
    title: 'Family Fish Pie',
    image: `${IMG}/Mni-Fish-Pie-3-768x576-optimized.jpg`,
    imageAlt: 'Family fish pie',
    body: 'Fish is good for the brain so serve up a helping of fish pie at dinner. This recipe is creamy, tasty & looks good in mini ramekins.',
    postViews: '5,328',
    href: 'https://www.annabelkarmel.com/recipes/family-fish-pie/',
  },
  {
    title: 'Meatball Pasta Bake',
    image: `${IMG}/MEATBALL-PASTA-BAKE-3-768x576-optimized.jpg`,
    imageAlt: 'Meatball pasta bake',
    body: 'Family favourite alert! For this Meatball Pasta Bake recipe, cook some mighty meatballs & nestle them inside spirals of tomato pasta for a hearty supper.',
    postViews: '1,776',
    href: 'https://www.annabelkarmel.com/recipes/meatball-pasta-bake/',
  },
];
