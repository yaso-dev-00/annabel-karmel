export type VeggieRecipeCard = {
  title: string;
  body: string;
  postViews: string;
  href: string;
  image: string;
  imageAlt: string;
};

const IMG = '/articles/get-kids-eating-vegetables';

export const veggiesIntro =
  "Encouraging children to eat their veggies or try new foods can often result in mealtimes quite quickly turning into a battle of wills! The good thing is, most children grow out of their fussiness, with mealtime meltdowns becoming a distant memory (or nightmare!). But if you're in the midst of feeling the frustration, Annabel is here to help with her tasty yet effective mealtime picks to get kids to love their veg!";

export const veggieRecipes: VeggieRecipeCard[] = [
  {
    title: 'Plant-Based Veggie Croquettes',
    body: 'Easy to pick up with a soft texture & crispy coating, my Plant-Based Veggie Croquettes are packed with hidden veggies. A perfect finger food for babies & older kids too. You can make ahead & freeze them once cooked.',
    postViews: '8,753',
    href: 'https://www.annabelkarmel.com/recipes/plant-based-veggie-croquettes/',
    image: `${IMG}/veggie-croquettes.jpg`,
    imageAlt: 'Plant-based veggie croquettes on a plate',
  },
  {
    title: 'Mini Chicken Burgers with Red Onion, Carrot and Sage',
    body: "Did you know that chicken thighs contains twice as much iron as the breast? You can make your own healthy versions of fast food and sneak in some veggies. Babies will love these yummy, power-packed mini burgers, and they are easy-peasy to prepare. You simply whizz everything together in a food processor. This is an exclusive recipe from Annabel's 30th Anniversary Edition of her Global Bestselling Cookbook: New Complete Baby & Toddler Meal Planner.",
    postViews: '7,028',
    href: 'https://www.annabelkarmel.com/recipes/mini-chicken-burgers-red-onion-carrot-sage/',
    image: `${IMG}/chicken-burgers.png`,
    imageAlt: 'Mini chicken burgers with red onion, carrot and sage',
  },
  {
    title: 'Rainbow Pizza',
    body: "Vegetables with rich, deep colour are an excellent source of antioxidants to keep the brain cells healthy. It's easy to sneak veggies into spaghetti sauces, soups and on homemade pizzas, just like this colourful rainbow pizza!",
    postViews: '2,250',
    href: 'https://www.annabelkarmel.com/recipes/rainbow-pizza/',
    image: `${IMG}/rainbow-pizza.jpg`,
    imageAlt: 'Colourful rainbow pizza with vegetables',
  },
  {
    title: 'Hidden Vegetable Macaroni Cheese',
    body: 'Sneak in some pureed cauliflower for a classic macaroni cheese with a healthy twist!',
    postViews: '1,446',
    href: 'https://www.annabelkarmel.com/recipes/hidden-vegetable-macaroni-cheese/',
    image: `${IMG}/macaroni-cheese.jpg`,
    imageAlt: 'Hidden vegetable macaroni cheese',
  },
  {
    title: 'Tasty Beef Casserole with 7 Veggies',
    body: 'One of the best ways to boost your immune system is to ensure that you eat foods that are rich in iron and zinc. There is no better source than red meat so serve up this super tasty easy to prepare Tasty Beef Casserole with 7 Veggies to your loved ones.',
    postViews: '1,496',
    href: 'https://www.annabelkarmel.com/recipes/tasty-beef-casserole-7-veggies/',
    image: `${IMG}/beef-casserole.jpg`,
    imageAlt: 'Tasty beef casserole with 7 veggies',
  },
  {
    title: 'Sweetcorn & Tomato Rainbow Fritters',
    body: 'This recipe for sweetcorn & tomato rainbow fritters is super easy. Simply add whichever seasonal vegetables you have to hand. A perfect finger food packed full of flavour!',
    postViews: '3,387',
    href: 'https://www.annabelkarmel.com/recipes/sweetcorn-tomato-rainbow-fritters/',
    image: `${IMG}/sweetcorn-fritters.jpg`,
    imageAlt: 'Sweetcorn and tomato rainbow fritters',
  },
  {
    title: "Annabel's Hidden Veg Beef Bolognese",
    body: "Don't miss Annabel's hidden veg beef bolognese – a family dinner favourite from Annabel's kitchen. Refuel after a busy day with her super-tasty Bolognese recipe which is packed full of those all-important veggies. A great way towards their 5-a-day (and the kids will be none the wiser)!",
    postViews: '2,766',
    href: 'https://www.annabelkarmel.com/recipes/hidden-veg-beef-bolognese/',
    image: `${IMG}/hidden-veg-bolognese.jpg`,
    imageAlt: "Annabel's hidden veg beef bolognese",
  },
  {
    title: 'Veggie Balls',
    body: 'These little Veggie Balls are a fantastic way to pack in veggies and are the ideal finger food. They are also great for batch cooking and freezing, in readiness for those busy days. Just pop them in a plastic freezer box, separating each layer with greaseproof paper, and reheat from frozen in the oven or microwave. Its super easy and a great addition to your little ones lunchbox.',
    postViews: '3,386',
    href: 'https://www.annabelkarmel.com/recipes/veggie-balls/',
    image: `${IMG}/veggie-balls.jpg`,
    imageAlt: 'Veggie balls as finger food',
  },
  {
    title: 'Broccoli, Chicken & Potato Bites',
    body: 'These Broccoli, Chicken & Potato Bites make a great soft finger food for little ones. A yummy combination of flavours to please your gurgling gourmet.',
    postViews: '13,144',
    href: 'https://www.annabelkarmel.com/recipes/broccoli-chicken-potato-bites/',
    image: `${IMG}/broccoli-chicken-bites.png`,
    imageAlt: 'Broccoli, chicken and potato bites',
  },
];
