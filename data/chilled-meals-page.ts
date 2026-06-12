const assetBase = "/product-category/chilled-meals";

export const chilledMealsAssets = {
  heroDesktop: `${assetBase}/hero-desktop.jpg`,
  heroMobile: `${assetBase}/hero-mobile.jpg`,
  introBg: `${assetBase}/intro-bg.png`,
  introBgMobile: `${assetBase}/intro-bg-mobile.png`,
  signature: `${assetBase}/signature.svg`,
  awardLbc: `${assetBase}/award-lbc.svg`,
  promiseBg: `${assetBase}/promise-bg.png`,
  tescoBg: `${assetBase}/tesco-bg.png`,
  tescoLogo: `${assetBase}/tesco-logo.png`,
  frozenAisleBg: `${assetBase}/frozen-aisle-bg.png`,
  frozenChild1: `${assetBase}/frozen-child-1.svg`,
  frozenChild2: `${assetBase}/frozen-child-2.svg`,
} as const;

export const chilledMealsIntro = {
  heading: "Delicious dinners at the speed of life",
  body: `Guess what? Tonight, you're off-duty. Weekdays are wild enough, so Annabel makes dinnertime the easy part. Her delicious kid-approved meals are packed with goodness, low in salt, and ready faster than they can say "what's for dinner?"`,
};

export const chilledMealsPromise = {
  heading: "Annabel's expert promise",
  icons: [
    { src: `${assetBase}/promise-freezable.png`, alt: "Cook from frozen" },
    { src: `${assetBase}/promise-low-salt.png`, alt: "Low in salt" },
    { src: `${assetBase}/promise-100-natural.png`, alt: "100% natural" },
    { src: `${assetBase}/promise-veggie.png`, alt: "Veggie goodness" },
    { src: `${assetBase}/promise-cook-time.png`, alt: "Ready in minutes" },
  ],
};

export type ChilledMealsProduct = {
  title: string;
  description: string;
  image: string;
  href: string;
  accentColor: string;
};

export const chilledMealsProducts: ChilledMealsProduct[] = [
  {
    title: "mild chicken tikka",
    description:
      "Curry night with a tot-twist! Tender chicken pieces in a mild creamy tomato and coconut sauce. It's made without dairy too!",
    image: `${assetBase}/product-tikka.png`,
    href: "/products/mild-chicken-tikka/",
    accentColor: "#7eb8e8",
  },
  {
    title: "tasty chicken pasta",
    description:
      "Calling little pasta lovers! Tuck into Annabel's chicken pasta in a fresh tomato, veggie and mascarpone sauce.",
    image: `${assetBase}/product-pasta.png`,
    href: "/products/tasty-chicken-pasta-in-a-tomato-veggie-sauce/",
    accentColor: "#f5b88a",
  },
  {
    title: "delicious cottage pie",
    description:
      "A cosy cottage pie with cheesy mash and hidden veg gravy – the perfect fuel for little tummies.",
    image: `${assetBase}/product-cottage-pie.svg`,
    href: "/products/delicious-cottage-pie/",
    accentColor: "#f04e8d",
  },
  {
    title: "yummy little lasagne",
    description:
      "Mini pasta squares layered with beef, hidden veg ragu and creamy cheese sauce – a clever twist on lasagne just for kids!",
    image: `${assetBase}/product-lasagne.svg`,
    href: "/products/yummy-little-lasagne-new/",
    accentColor: "#b8a8e8",
  },
];

export const chilledMealsTesco = {
  heading: "exclusively at",
  logoHref: "https://www.tesco.com/groceries/en-GB/search?query=annabel%20karmel",
};

export const chilledMealsFrozenCta = {
  heading: "Annabel is in the\nfrozen aisle too!",
  href: "/product-category/frozen-meals",
};
