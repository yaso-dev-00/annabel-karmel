const IMG = '/articles/top-10-easy-dinner-recipes';

export type MidweekRecipeCard = {
  title: string;
  image: string;
  imageAlt: string;
  body: string;
  postViews: string;
  href: string;
};

export const midweekRecipesIntro =
  'Hungry kids? Need something easy to cook in the week? Here are 10 of the most popular recipes our families love to cook when busy. They’re speedy, super tasty, and easy to make.';

export const midweekRecipes: MidweekRecipeCard[] = [
  {
    title: 'Rigatoni Pasta Bake with Tomatoes & Mozzarella',
    image: `${IMG}/20220208-AK06108-768x960-optimized.jpg`,
    imageAlt: 'Rigatoni pasta bake with tomatoes and mozzarella',
    body: "This baked rigatoni recipe is pasta tossed in a flavorful tomato sauce, then topped with plenty of cheese and baked until golden brown. A super easy dinner option that's great for feeding a crowd!",
    postViews: '4,379',
    href: 'https://www.annabelkarmel.com/recipes/rigatoni-pasta-bake/',
  },
  {
    title: 'Cherry Tomato & Mascarpone Risotto',
    image: `${IMG}/20210727-AK06124-768x960-optimized.jpg`,
    imageAlt: 'Cherry tomato and mascarpone risotto',
    body: 'Enjoy a comforting bowl of risotto with sweet cherry tomatoes and mascarpone. This is an absolutely winning combo!',
    postViews: '2,559',
    href: 'https://www.annabelkarmel.com/recipes/cherry-tomato-mascarpone-risotto/',
  },
  {
    title: 'Crispy Cod with Sweet Potato Chips',
    image: `${IMG}/20180118_annabel_fishandchips-768x1152-optimized.jpg`,
    imageAlt: 'Crispy cod with sweet potato chips',
    body: "Fish & chips can still very much be on the menu if you're trying to put more healthy food on the family table – simply make a few tweaks so it's less 'naughty' and more nutritious. The whole family will love this Crispy Cod with Sweet Potato Chips recipe.",
    postViews: '2,366',
    href: 'https://www.annabelkarmel.com/recipes/crispy-cod-with-sweet-potato-chips/',
  },
  {
    title: 'Sizzling Sesame Beef Stir Fry',
    image: `${IMG}/18_Sizzling-Beef-Stirfry_1000x667-optimized.jpg`,
    imageAlt: 'Sizzling sesame beef stir fry',
    body: "Dinner in less than 30 minutes? Yes you heard right. This is the ultimate super speedy family stir-fry. Sweet, succulent and packed full of colourful veggies, it's the perfect mid-week meal for growing families.",
    postViews: '323',
    href: 'https://www.annabelkarmel.com/recipes/sizzling-sesame-beef-stir-fry/',
  },
  {
    title: 'Oven Baked Chicken Nuggets',
    image: `${IMG}/28_Oven_Baked_Krispie-Chicken-Nuggets-._1000x1000_3-optimized.jpg`,
    imageAlt: 'Oven baked chicken nuggets',
    body: 'See if little ones can guess the secret snap, crackle and pop ingredient in my healthy take on chicken nuggets. Instead of using batter to coat chicken strips, I like to use Rice Krispies for a light crispy and secret \u2018krispie\u2019 coating. These Oven Baked Chicken Nuggets are suitable for freezing when uncooked.To cook from frozen remove the nuggets from freezer as required and allow to defrost thoroughly before cooking. Cook in a medium to hot oven for 12 to 15 minutes, as per the cooking instructions',
    postViews: '1,357',
    href: 'https://www.annabelkarmel.com/recipes/oven-baked-chicken-nuggets/',
  },
  {
    title: 'Teriyaki Chicken Balls',
    image: `${IMG}/Teriyaki-Chicken-Balls-7-e1547812312859-768x768-optimized.jpg`,
    imageAlt: 'Teriyaki chicken balls',
    body: 'These Teriyaki Chicken Balls are so incredibly tasty and so easy to make. Serve with a side of veggies or on top of egg-fried rice for a wholesome dinner.',
    postViews: '4,091',
    href: 'https://www.annabelkarmel.com/recipes/teriyaki-chicken-balls/',
  },
  {
    title: "Mummy's Pot Noodle",
    image: `${IMG}/Mummys-Pot-Noodle-3-768x576-optimized.jpg`,
    imageAlt: "Mummy's pot noodle",
    body: 'Stuck for after-school meals? This recipe for Mummy\u2019s Pot Noodle is quick, filling & nutritious, plus it\u2019s low in salt & can be packed full of their favourite veggies.  For another tasty after-school snack idea, try a Trio of Toasted Finger Snacks ',
    postViews: '27,408',
    href: 'https://www.annabelkarmel.com/recipes/mummys-pot-noodle/',
  },
  {
    title: 'Meatball Pasta Bake',
    image: `${IMG}/MEATBALL-PASTA-BAKE-3-768x576-optimized.jpg`,
    imageAlt: 'Meatball pasta bake',
    body: 'Family favourite alert! For this Meatball Pasta Bake recipe, cook some mighty meatballs & nestle them inside spirals of tomato pasta for a hearty supper.',
    postViews: '1,777',
    href: 'https://www.annabelkarmel.com/recipes/meatball-pasta-bake/',
  },
];
