export type PickyEaterRecipeCard = {
  title: string;
  body: string;
  postViews: string;
  href: string;
  image: string;
  imageAlt: string;
};

const IMG = "/articles/top-10-meals-to-make-for-picky-eaters";

export const pickyEatersIntro = [
  "Got a fussy eater in the family? Here are Annabel's Top 10 meals to make for picky eaters you can't live without, including hidden veggie dishes, homemade fish fingers, and Annabel's best burgers!",
  "In need of even more dinner inspo? Download Annabel's Baby & Toddler Recipe app today. It's packed with easy mealtimes for every age and stage. You'll never be stuck for mealtime idea again.",
];

export const pickyEaterRecipes: PickyEaterRecipeCard[] = [
  {
    title: "Tomato, Chicken, Spinach & Cheese Pasta Bake",
    body: "This Mediterranean inspired pasta bake is a recipe you'll want to make over and over again. A quick & easy recipe to keep up your sleeve for mid-week family mealtimes!",
    postViews: "2,621",
    href: "https://www.annabelkarmel.com/recipes/tomato-chicken-spinach-cheese-pasta-bake/",
    image: `${IMG}/pasta-bake.jpg`,
    imageAlt: "Tomato, chicken, spinach and cheese pasta bake",
  },
  {
    title: "Cherry Tomato & Mascarpone Risotto",
    body: "Enjoy a comforting bowl of risotto with sweet cherry tomatoes and mascarpone. This is an absolutely winning combo!",
    postViews: "2,559",
    href: "https://www.annabelkarmel.com/recipes/cherry-tomato-mascarpone-risotto/",
    image: `${IMG}/risotto.jpg`,
    imageAlt: "Cherry tomato and mascarpone risotto",
  },
  {
    title: "Margarita Pizza Slices",
    body: "Packed lunch pizza! Ditch the dough and use vitamin D and calcium enriched thins to create mini pizzas in a flash. Kids will love to add their own healthy toppings at teatime. Simply make a few extra, wrap them in foil and store them in the fridge overnight, and hey pesto! You have a ready-made fast-food favourite for their lunchbox.",
    postViews: "3,335",
    href: "https://www.annabelkarmel.com/recipes/margarita-pizza-slices/",
    image: `${IMG}/margarita-pizza-slices.jpg`,
    imageAlt: "Margarita pizza slices",
  },
  {
    title: "Mini Breaded Chicken Bites",
    body: "For tots and tweens, chicken nuggets are life, right? For a healthy, even tastier version, my baked bites make for the perfect after school fuel. The best bit? They are just as yummy eaten cold for lunch too!",
    postViews: "1,888",
    href: "https://www.annabelkarmel.com/recipes/mini-breaded-chicken-bites/",
    image: `${IMG}/mini-breaded-chicken-bites.jpg`,
    imageAlt: "Mini breaded chicken bites",
  },
  {
    title: "Mini Chicken Burgers with Red Onion, Carrot and Sage",
    body: "Did you know that chicken thighs contains twice as much iron as the breast? You can make your own healthy versions of fast food and sneak in some veggies. Babies will love these yummy, power-packed mini burgers, and they are easy-peasy to prepare. You simply whizz everything together in a food processor. This is an exclusive recipe from Annabel's 30th Anniversary Edition of her Global Bestselling Cookbook: New Complete Baby & Toddler Meal Planner.",
    postViews: "7,028",
    href: "https://www.annabelkarmel.com/recipes/mini-chicken-burgers-red-onion-carrot-sage/",
    image: `${IMG}/chicken-burgers.png`,
    imageAlt: "Mini chicken burgers with red onion, carrot and sage",
  },
  {
    title: "Rainbow Pizza",
    body: "Vegetables with rich, deep colour are an excellent source of antioxidants to keep the brain cells healthy. It's easy to sneak veggies into spaghetti sauces, soups and on homemade pizzas, just like this colourful rainbow pizza!",
    postViews: "2,250",
    href: "https://www.annabelkarmel.com/recipes/rainbow-pizza/",
    image: `${IMG}/rainbow-pizza.jpg`,
    imageAlt: "Colourful rainbow pizza with vegetables",
  },
  {
    title: "Sweetcorn & Tomato Rainbow Fritters",
    body: "This recipe for sweetcorn & tomato rainbow fritters is super easy. Simply add whichever seasonal vegetables you have to hand. A perfect finger food packed full of flavour!",
    postViews: "3,387",
    href: "https://www.annabelkarmel.com/recipes/sweetcorn-tomato-rainbow-fritters/",
    image: `${IMG}/sweetcorn-fritters.jpg`,
    imageAlt: "Sweetcorn and tomato rainbow fritters",
  },
  {
    title: "Chicken Balls with Tomato & Carrot Sauce",
    body: "These delicious Chicken Balls with Tomato & Carrot Sauce is a simple and fresh dish packed full of flavour. A fool proof recipe packed with veggies that even the fussiest of eaters will enjoy!",
    postViews: "8,826",
    href: "https://www.annabelkarmel.com/recipes/chicken-balls-tomato-carrot-sauce/",
    image: `${IMG}/chicken-balls.png`,
    imageAlt: "Chicken balls with tomato and carrot sauce",
  },
  {
    title: "Crispy Baked Cod With Sweet Potato Chips",
    body: "Fish and chips can still very much be on the menu if you're trying to put more healthy food on the family table – simply make a few tweaks so it's less 'naughty' and more nutritious.",
    postViews: "597",
    href: "https://www.annabelkarmel.com/recipes/crispy-baked-cod-sweet-potato-chips/",
    image: `${IMG}/crispy-cod-chips.jpg`,
    imageAlt: "Crispy baked cod with sweet potato chips",
  },
];
