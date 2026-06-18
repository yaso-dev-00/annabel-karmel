const assetBase = "/product-category/australia-frozen";

export const australiaFrozenAssets = {
  woodBg: `${assetBase}/wood-bg.jpg`,
  signature: `${assetBase}/signature.png`,
  promiseBg: `${assetBase}/promise-bg.jpg`,
  goodnessCharacters: `${assetBase}/goodness-characters.png`,
  annabelAus: `${assetBase}/annabel-aus.jpg`,
  buyBg: `${assetBase}/buy-bg.jpg`,
  logoWoolworths: `${assetBase}/logo-woolworths.png`,
  logoColes: `${assetBase}/logo-coles.png`,
  logoIga: `${assetBase}/logo-iga.png`,
  carouselArrowPrev: `${assetBase}/carousel-arrow-prev.png`,
  carouselArrowNext: `${assetBase}/carousel-arrow-next.png`,
} as const;

export const australiaFrozenHero = {
  titleLine1: "Discover Annabel’s award-winning",
  titleLine2: "recipes in the freezer aisle",
};

export const australiaFrozenExpertMeals = {
  headingLine1: "Expert meals",
  headingLine2: "in minutes",
  body: `With over 30 years of recipe expertise, I know just what it takes to make a delicious, balanced meal that children will love. My trusty cookbook-inspired recipes are full of flavour, packed with goodness, and ready in minutes. The perfect fuel for daily adventures, growing children will love them!`,
};

export const australiaFrozenCarouselSlides = [
  { src: `${assetBase}/carousel-freya.jpg`, alt: "AK Aus Freya and group" },
  { src: `${assetBase}/carousel-jan118.jpg`, alt: "Ak 19th Jan-118" },
  { src: `${assetBase}/carousel-april.jpg`, alt: "24thApril23-287" },
  { src: `${assetBase}/carousel-jan063.jpg`, alt: "Ak 19th Jan-063" },
  { src: `${assetBase}/carousel-pack.jpg`, alt: "Pack group shot" },
] as const;

export const australiaFrozenPromise = {
  heading: "Annabel’s promise",
  items: [
    "Up to 3.5 serves of veggies",
    "Low in sodium",
    "Low in sugar",
    { lines: ["No preservatives,", "artificial colours or", "flavours"] },
    { lines: ["Veggie & dairy-free", "meals"] },
    "Loved by kids 1+",
    "Ready in under 5 minutes",
  ],
};

export const australiaFrozenGoodness = {
  headingLine1: "Mealtimes packed",
  headingLine2: "with goodness",
  body: `Nourished with veggies and packed with natural flavour, Annabel’s expert meals are the tastiest way toward their 5 a day – just like you’d make at home.`,
};

export const australiaFrozenNew = {
  heading: "New for 2024!",
  body: `My little meals family have just got even BIGGER! Introducing my Mediterranean Meatballs and Pumpkin, Parmesan & Mozzarella Risotto. The perfect freezer fillers!`,
};

export const australiaFrozenRange = {
  heading: "The expert range",
  subtitle:
    "Shop now in the frozen aisle, in-store and online. Click on your favourite retailer below.",
};

export const australiaFrozenRetailers = [
  {
    src: australiaFrozenAssets.logoWoolworths,
    alt: "Woolworths",
    href: "https://www.woolworths.com.au/shop/search/products?searchTerm=annabel%20karmel",
  },
  {
    src: australiaFrozenAssets.logoColes,
    alt: "Coles",
    href: "https://www.coles.com.au/search?q=annabel%20karmel",
  },
  {
    src: australiaFrozenAssets.logoIga,
    alt: "IGA",
    href: "https://www.igashop.com.au/search/1?q=Annabel+Karmel",
  },
] as const;

export type AustraliaFrozenProduct = {
  title: string;
  lifestyleImage: string;
  packImage: string;
  href: string;
};

export const australiaFrozenProducts: AustraliaFrozenProduct[] = [
  {
    title: "Bolognese Pasta Bake",
    lifestyleImage: `${assetBase}/product-bolognese-pasta-bake.jpg`,
    packImage: `${assetBase}/product-bolognese-pasta-bake-pack.jpg`,
    href: "https://www.annabelkarmel.com/products/beautiful-bolognese-pasta-bake/",
  },
  {
    title: "Bolognese Mac & Cheese",
    lifestyleImage: `${assetBase}/product-bolognese-mac-cheese.jpg`,
    packImage: `${assetBase}/product-bolognese-mac-cheese.jpg`,
    href: "https://www.annabelkarmel.com/products/bolognese-mac-cheese/",
  },
  {
    title: "Beef Cottage Pie",
    lifestyleImage: `${assetBase}/product-beef-cottage-pie.jpg`,
    packImage: `${assetBase}/product-beef-cottage-pie-pack.jpg`,
    href: "https://www.annabelkarmel.com/products/comforting-beef-cottage-pie/",
  },
  {
    title: "Mild Butter Chicken & Rice",
    lifestyleImage: `${assetBase}/product-mild-butter-chicken.jpg`,
    packImage: `${assetBase}/product-mild-butter-chicken-pack.jpg`,
    href: "https://www.annabelkarmel.com/products/delicious-mild-butter-chicken-rice/",
  },
  {
    title: "Spaghetti & Meatballs",
    lifestyleImage: `${assetBase}/product-spaghetti-meatballs.jpg`,
    packImage: `${assetBase}/product-spaghetti-meatballs-pack.jpg`,
    href: "https://www.annabelkarmel.com/products/scrumptious-spaghetti-meatballs/",
  },
  {
    title: "Veggie Pasta Bake",
    lifestyleImage: `${assetBase}/product-veggie-pasta-bake.jpg`,
    packImage: `${assetBase}/product-veggie-pasta-bake-pack.jpg`,
    href: "https://www.annabelkarmel.com/products/tasty-veggie-pasta-bake/",
  },
  {
    title: "Macaroni Cheese",
    lifestyleImage: `${assetBase}/product-macaroni-cheese.jpg`,
    packImage: `${assetBase}/product-macaroni-cheese-pack.jpg`,
    href: "https://www.annabelkarmel.com/products/macaroni-cheese/",
  },
];

export const australiaFrozenWhereToBuy = {
  heading: "Where to buy",
  bodyLine1:
    "You’ll find Annabel’s goodness-packed recipe range in the frozen aisles and online across Australian supermarkets.",
  bodyLine2: "They are the perfect freezer-filler!",
};
