const assetBase = "/product-category/frozen-meals";

export const frozenMealsAssets = {
  heroVideo: `${assetBase}/hero-video.mp4`,
  heroDesktop: `${assetBase}/hero-desktop.jpg`,
  heroMobile: `${assetBase}/hero-mobile.png`,
  introBg: `${assetBase}/intro-bg.png`,
  introBgMobile: `${assetBase}/intro-bg-mobile.png`,
  signature: "/product-category/chilled-meals/signature.svg",
  awardLogos: `${assetBase}/award-logos.png`,
  promiseBg: `${assetBase}/promise-bg.png`,
  retailersBg: `${assetBase}/retailers-bg.png`,
  chilledAisleBg: `${assetBase}/chilled-aisle-bg.png`,
  chilledAislePhoto: `${assetBase}/chilled-aisle-photo.png`,
} as const;

export const frozenMealsIntro = {
  heading: "Make tonight's dinner a doddle!",
  body: `Tired of the teatime juggle? I've taken the stress off your plate with my freezer-friendly award-winning meals inspired by kids' all-time favourites. Packed with goodness. Full of flavour. Always a hit at the table.`,
};

export const frozenMealsPromise = {
  heading: "Annabel's expert promise",
  icons: [
    { src: `${assetBase}/promise-low-salt.png`, alt: "Low in salt" },
    { src: `${assetBase}/promise-veggies.png`, alt: "Packed with veggies" },
    { src: `${assetBase}/promise-no-sugar.png`, alt: "No added sugar" },
    { src: `${assetBase}/promise-no-artificials.png`, alt: "No artificials" },
    { src: `${assetBase}/promise-ready-5-mins.png`, alt: "Ready in 5 mins from frozen" },
    { src: `${assetBase}/promise-approved-by-kids.png`, alt: "Approved by kids" },
  ],
};

export type FrozenMealsProduct = {
  title: string;
  description: string;
  image: string;
  href: string;
};

export const frozenMealsProducts: FrozenMealsProduct[] = [
  {
    title: "chicken tikka\nwith fluffy rice",
    description:
      "Tender chicken in a creamy coconut sauce with butternut squash, tomato and a hint of mango chutney.",
    image: `${assetBase}/product-chicken-tikka.png`,
    href: "/products/chicken-tikka-masala/",
  },
  {
    title: "spaghetti bolognese\nwith hidden veggies",
    description:
      "Packed with hidden veg, it's a slurp-worthy spag bol kids will love – and made without dairy.",
    image: `${assetBase}/product-spaghetti-bolognese.png`,
    href: "/products/tasty-spaghetti-bolognese/",
  },
  {
    title: "bolognese mac &\ncheese with veggies",
    description:
      "Creamy mac meets yummy Bolognese in this hearty, veggie-filled dish. It's the tastiest teatime mash-up!",
    image: `${assetBase}/product-bolognese-mac.png`,
    href: "/products/mighty-bolognese-mac-and-cheese/",
  },
  {
    title: "chicken pasta with\ntomato & mascarpone",
    description:
      "Chunky pasta, tender chicken & a veggie-packed tomato and mascarpone sauce – always a dinner winner.",
    image: `${assetBase}/product-chicken-pasta.png`,
    href: "/products/chicken-tomato-mascarpone-pasta/",
  },
];

export const frozenMealsRetailers = {
  heading: "Discover in the freezer aisle",
  logos: [
    {
      src: `${assetBase}/logo-tesco.png`,
      alt: "Tesco",
      href: "https://www.tesco.com/groceries/en-GB/search?query=annabel+karmel&sortBy=relevance&facetsArgs=category%3AFrozen+Food&count=24",
    },
    {
      src: `${assetBase}/logo-asda.png`,
      alt: "ASDA",
      href: "https://groceries.asda.com/search/annabel%20karmel",
    },
    {
      src: `${assetBase}/logo-morrisons.png`,
      alt: "Morrisons",
      href: "https://groceries.morrisons.com/categories/frozen/ready-meals/baby-toddler-meals/d68e9364-dd06-4227-85cb-48a58d8eabbf?brands=Annabel%20Karmel&sortBy=favorite",
    },
    {
      src: `${assetBase}/logo-ocado.png`,
      alt: "Ocado",
      href: "https://www.ocado.com/search?entry=annabel%20karmel&filters=annabel-karmel-15198",
    },
  ],
};

export const frozenMealsChilledCta = {
  heading: "Annabel is in the\nchilled aisle too!",
  href: "/product-category/chilled-meals",
};
