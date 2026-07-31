export type PancakeRecipeCard = {
  title: string;
  body: string;
  postViews: string;
  href: string;
  image: string;
  imageAlt: string;
};

const PANCAKE_IMG = '/articles/pancake-recipes';

export const pancakeIntro =
  "Whether you're looking for an easy pancake recipe to nail with the kids, a creative twist on a classic or something piled high with toppings, our perfect sweet and savoury pancake recipes are all you need. Whisks at the ready to blitz up this year's Pancake Day feast.";

export const pancakeRecipes: PancakeRecipeCard[] = [
  {
    title: 'Mini Pancakes With Banana & Oats',
    body: "Pancakes don't just have to be for pancake day! These mini pancakes with banana & oats will keep your little one going all morning with the slow release energy from the added oats.",
    postViews: '1,887',
    href: 'https://www.annabelkarmel.com/recipes/mini-pancakes-with-banana-oats/',
    image: `${PANCAKE_IMG}/mini-pancakes.jpg`,
    imageAlt: 'Mini pancakes with banana and oats',
  },
  {
    title: 'Caterpillar Pancakes',
    body: 'For a very special start to the day this World Book Day, line up mini pancakes to create your very own (and very hungry) breakfast caterpillar!',
    postViews: '1,286',
    href: 'https://www.annabelkarmel.com/recipes/caterpillar-pancakes/',
    image: `${PANCAKE_IMG}/caterpillar-pancakes.jpg`,
    imageAlt: 'Caterpillar pancakes',
  },
  {
    title: 'Dip Dip Chickpea & Carrot Pancakes',
    body: "How do you like your eggs in the morning? Served nice and runny with these super pancakes please! Dip Dip Chickpea & Carrot Pancakes are the perfect way to power-up your family's day. The pancakes also freeze well once cooked which makes them a super quick serve in the week. Simply slice into strips and dip away!",
    postViews: '1,553',
    href: 'https://www.annabelkarmel.com/recipes/dip-dip-chickpea-carrot-pancakes/',
    image: `${PANCAKE_IMG}/dip-dip-chickpea-carrot.jpg`,
    imageAlt: 'Dip dip chickpea and carrot pancakes',
  },
  {
    title: 'Yoghurt Pancakes With Berries',
    body: "These yoghurt pancakes with berries will tempt even the fussiest eaters to chomp away their breakfast. Plus, you'll be happy too as these pancakes are free from refined sugar and provide a host of nutrients.",
    postViews: '23,117',
    href: 'https://www.annabelkarmel.com/recipes/yoghurt-pancakes-with-berries/',
    image: `${PANCAKE_IMG}/yoghurt-pancakes.jpg`,
    imageAlt: 'Yoghurt pancakes with berries',
  },
  {
    title: 'Buttermilk Pancakes With Berry Compote',
    body: 'Buttermilk pancakes are buttery and fluffy with golden, crisp edges! For these buttermilk pancakes with berry compote, top with a dollop of yoghurt, berry compote and a swirl of maple syrup.',
    postViews: '752',
    href: 'https://www.annabelkarmel.com/recipes/buttermilk-pancakes-with-berry-compote/',
    image: `${PANCAKE_IMG}/buttermilk-pancakes.jpg`,
    imageAlt: 'Buttermilk pancakes with berry compote',
  },
  {
    title: "Baby's First Pancakes",
    body: "Let baby join in the fun too with this Baby's First Pancakes recipe, guaranteed to delight their little taste buds. Serve with a bundle of mixed fruits.",
    postViews: '5,963',
    href: 'https://www.annabelkarmel.com/recipes/babys-first-pancakes/',
    image: `${PANCAKE_IMG}/babys-first-pancakes.jpg`,
    imageAlt: "Baby's first pancakes",
  },
  {
    title: 'Hunny Bunny Pancakes',
    body: 'These hunny bunny pancakes add a hoppy-twist on the traditional scotch pancakes.',
    postViews: '995',
    href: 'https://www.annabelkarmel.com/recipes/hunny-bunny-pancakes/',
    image: `${PANCAKE_IMG}/hunny-bunny-pancakes.jpg`,
    imageAlt: 'Hunny bunny pancakes',
  },
];
