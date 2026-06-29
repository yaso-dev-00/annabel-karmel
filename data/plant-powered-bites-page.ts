const assetBase = "/product-category/plant-powered-bites";

export const plantPoweredBitesAssets = {
  heroDesktop: `${assetBase}/hero-desktop.svg`,
  heroMobile: `${assetBase}/hero-mobile.svg`,
  introBg: `${assetBase}/intro-bg.png`,
  introBgMobile: `${assetBase}/intro-bg-mobile.png`,
  signature: "/product-category/chilled-meals/signature.svg",
  promiseBg: `${assetBase}/promise-bg.png`,
  promiseArtwork: `${assetBase}/promise-artwork.svg`,
  promiseArtworkMobile: `${assetBase}/artwork-mobile.png`,
  logoAsda: `${assetBase}/logo-asda.png`,
  retailersBg: `${assetBase}/retailers-bg.png`,
  frozenCtaBg: `${assetBase}/frozen-cta-bg.png`,
  frozenCtaBgMobile: `${assetBase}/frozen-cta-bg-mobile.png`,
  frozenCtaLeft: `${assetBase}/frozen-cta-left.png`,
  frozenCtaRight: `${assetBase}/frozen-cta-right.png`,
  frozenCtaMobile: `${assetBase}/frozen-cta-mobile.png`,
} as const;

export const plantPoweredBitesIntro = {
  heading: "PLANT-POWERED BITES FOR KIDS!",
  body: `Make mealtimes easier (and way more fun) with Annabel's NEW plant-powered bites! Perfectly sized for little hands and packed with up to 50% veggies, these are the tastiest take on kids' all-time favourites. Just the ticket for teatime, snack time, and everything in between!`,
};

export const plantPoweredBitesPromise = {
  heading: "Annabel's expert promise",
  artworkAlt:
    "100% plant-based, up to 50% veggies, iron rich, source of calcium, no artificial colours or preservatives, source of vit D and B12",
};

export type PlantPoweredBitesProduct = {
  title: string;
  description: string;
  image: string;
  href: string;
};

export const plantPoweredBitesProducts: PlantPoweredBitesProduct[] = [
  {
    title: "MEAT-FREE CHICKEN\nSTYLE NUGGETS",
    description: "Expect spontaneous happy dances at the table with my plant-powered nuggets!",
    image: `${assetBase}/product-nuggets.png`,
    href: "/products/nuggets",
  },
  {
    title: "MEAT-FREE MINI BURGERS",
    description: "See them rollin' to the dinner table with my plant-powered mini burgers.",
    image: `${assetBase}/product-burgers.png`,
    href: "/products/burgers",
  },
];

export const plantPoweredBitesRetailer = {
  heading: "Find them in the freezer exclusively at",
  logoHref: "https://www.asda.com/groceries/search/annabel%20karmel%20meat%20free",
};

export const plantPoweredBitesWaysToServe = [
  {
    title: "Nuggets with Sweet Potato Wedges & Veggies",
    href: "/recipes/nuggets-with-sweet-potato-wedges-veggies",
    image: `${assetBase}/recipe-sweet-potato-wedges.jpg`,
  },
  {
    title: "Nuggets Party Platter",
    href: "/recipes/nuggets-party-platter",
    image: `${assetBase}/recipe-party-platter.jpg`,
  },
  {
    title: "Nugget Katsu Curry",
    href: "/recipes/nugget-katsu-curry",
    image: `${assetBase}/recipe-katsu-curry.jpg`,
  },
  {
    title: "Kofta Style Wraps",
    href: "/recipes/kofta-style-wraps",
    image: `${assetBase}/recipe-kofta-wraps.jpg`,
  },
  {
    title: "Mini Burgers Grazing Platter",
    href: "/recipes/mini-burgers-grazing-platter",
    image: `${assetBase}/recipe-burgers-platter.jpg`,
  },
  {
    title: "Mini Meat-Free Sliders",
    href: "/recipes/mini-meat-free-sliders",
    image: `${assetBase}/recipe-mini-sliders.jpg`,
  },
];

export const plantPoweredBitesFrozenCta = {
  heading: "Find Annabel's freshly frozen meals in the freezer too!",
  href: "/product-category/frozen-meals",
};
