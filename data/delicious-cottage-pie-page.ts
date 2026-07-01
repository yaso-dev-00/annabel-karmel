import type { ChilledProductPageData } from "./chilled-product-page";

const assetBase = "/products/delicious-cottage-pie";

export const deliciousCottagePiePageData: ChilledProductPageData = {
  slug: "delicious-cottage-pie",
  heroAlt: "Delicious cottage pie with veggies",
  headingId: "delicious-cottage-pie-heading",
  assets: {
    heroDesktop: `${assetBase}/hero-desktop.jpg`,
    heroMobile: `${assetBase}/hero-mobile.jpg`,
    detailBg: `${assetBase}/detail-bg.png`,
    detailBgMobile: `${assetBase}/detail-bg-mobile.png`,
    retailerBg: `${assetBase}/retailer-bg.png`,
    whyNotTryBg: `${assetBase}/why-not-try-bg.jpg`,
    tescoLogo: `${assetBase}/tesco-logo.png`,
    arrowLeft: `${assetBase}/arrow-left.svg`,
    arrowRight: `${assetBase}/arrow-right.svg`,
  },
  hero: {
    title: "delicious cottage pie\nwith veggies",
    intro:
      "A cosy cottage pie with cheesy mash and hidden veg gravy – the perfect fuel for little tummies.",
    desktopWidth: 2000,
    desktopHeight: 1171,
    mobileWidth: 657,
    mobileHeight: 574,
  },
  carousel: [
    {
      src: `${assetBase}/carousel-lifestyle.png`,
      alt: "Cottage pie carousel",
    },
    {
      src: `${assetBase}/carousel-pack.png`,
      alt: "Cottage pie packaging",
    },
    {
      src: `${assetBase}/carousel-plate.png`,
      alt: "Cottage pie served on a plate",
    },
  ],
  badges: [
    { src: `${assetBase}/badge-freezable.png`, alt: "Cook from frozen" },
    { src: `${assetBase}/badge-natural.png`, alt: "100% natural ingredients" },
    { src: `${assetBase}/badge-beef.png`, alt: "British beef" },
    { src: `${assetBase}/badge-cook-time.png`, alt: "Ready in minutes" },
    { src: `${assetBase}/badge-low-salt.png`, alt: "Low in salt" },
    { src: `${assetBase}/badge-veggie.png`, alt: "Veggie goodness" },
  ],
  description:
    "Made with 100% British beef, a yummy veggie-packed gravy, and topped with creamy cheesy mash, it's comfort food with a clever twist – guaranteed to win over little diners.",
  accordion: [
    {
      title: "Ingredients",
      paragraphs: [
        "Sauce (50%) (tomato, beef (24%), carrot (9%), onion (8%), apple puree, water, garlic puree, beef stock (beef, yeast extract, salt, natural flavouring, tomato paste, brown sugar, lemon juice concentrate, onion powder), red pepper (1.5%), slow roasted tomato paste (slow roasted tomato, sunflower oil, spirit vinegar, tomato paste, sugar, sea salt, dried garlic, black pepper, rosemary, rubbed basil, water), tomato paste, yeast extract, red wine vinegar, basil, oregano, cornflour, rapeseed oil, dried thyme, black pepper), potato & cheese mash (50%) (potato, **milk**, mature Cheddar cheese (**milk**), butter (**milk**)).",
        "For allergens, see ingredients in **bold**.",
        "Made in a nut and peanut free environment.",
      ],
    },
    {
      title: "Nutrition",
      table: {
        headers: ["Typical values", "per 100g", "per cooked meal"],
        rows: [
          ["Energy", "490kJ/117kcal", "941kJ/225kcal"],
          ["Fat", "5.1g", "9.8g"],
          ["of which saturates", "2.5g", "4.7g"],
          ["Carbohydrates", "11.2g", "21.6g"],
          ["of which sugars", "2.7g", "5.1g"],
          ["Fibre", "2.1g", "4.1g"],
          ["Protein", "5.5g", "10.5g"],
          ["Salt", "0.26g", "0.51g"],
          ["Sodium", "0.10g", "0.20g"],
        ],
      },
    },
    {
      title: "Prepare",
      paragraphs: [
        "Microwave (800W): Remove sleeve and pierce film several times. Place onto a microwaveable plate and heat as indicated. After cooking, allow to stand for 1 minute in the microwave. Carefully cut back film, stir and serve. Do not reheat. All microwaves vary, these are guidelines only. Always test the temperature before serving.",
        "Chilled – 2 minutes 30 seconds",
        "Frozen – 4 minutes 30 seconds",
        "Oven: Preheat oven. Remove sleeve and film lid. Place on a baking tray in the centre of the oven and heat as indicated. After cooking, remove from the oven and allow to stand for 2 minutes then serve. Do not reheat. Always test the temperature before serving.",
        "190°C / Fan 170°C / Gas 5",
        "Chilled – 20 minutes",
        "Frozen – 40 minutes",
      ],
    },
    {
      title: "Storage",
      paragraphs: [
        "Keep refrigerated and use within the date shown on front of pack. Once opened, use within 24 hours. Freeze before use by date and use within 3 months.",
      ],
    },
  ],
  retailer: {
    heading: "exclusively at",
    logoHref: "https://www.tesco.com/groceries/en-GB/products/286999157",
  },
  related: [
    {
      image: `${assetBase}/related-tikka.png`,
      href: "/products/mild-chicken-tikka/",
      width: 1080,
      height: 1080,
    },
    {
      image: `${assetBase}/related-pasta.png`,
      href: "/products/tasty-chicken-pasta-in-a-tomato-veggie-sauce/",
      width: 1080,
      height: 1080,
    },
    {
      image: `${assetBase}/related-lasagne.png`,
      href: "/products/yummy-little-lasagne-new/",
      width: 1080,
      height: 1080,
    },
  ],
  theme: {
    detailColor: "#F15197",
    accordionBg: "#E02E7C",
    discoverButtonBg: "#5B1830",
    discoverButtonColor: "#F15197",
  },
};
