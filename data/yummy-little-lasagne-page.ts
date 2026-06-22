import type { ChilledProductPageData } from "./chilled-product-page";

const assetBase = "/products/yummy-little-lasagne-new";

export const yummyLittleLasagnePageData: ChilledProductPageData = {
  slug: "yummy-little-lasagne-new",
  heroAlt: "Yummy little lasagne with mini pasta squares",
  headingId: "yummy-little-lasagne-heading",
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
    title: "yummy little lasagne\nwith mini pasta squares",
    intro:
      "Mini pasta squares layered with beef, hidden veg ragu and creamy cheese sauce – a quick, clever twist on lasagne just for kids!",
  },
  carousel: [
    {
      src: `${assetBase}/carousel-lifestyle.png`,
      alt: "Child enjoying lasagne",
    },
    {
      src: `${assetBase}/carousel-pack.png`,
      alt: "Lasagne packaging",
    },
    {
      src: `${assetBase}/carousel-plate.png`,
      alt: "Lasagne served on a plate",
    },
  ],
  badges: [
    { src: `${assetBase}/badge-natural.png`, alt: "100% natural ingredients" },
    { src: `${assetBase}/badge-beef.png`, alt: "British beef" },
    { src: `${assetBase}/badge-freezable.png`, alt: "Cook from frozen" },
    { src: `${assetBase}/badge-cook-time.png`, alt: "Ready in minutes" },
    { src: `${assetBase}/badge-low-salt.png`, alt: "Low in salt" },
  ],
  description:
    "Lasagne always hits the spot, and here's your midweek cheat! Made with 100% British beef in a hidden veggie ragu, layered between mini pasta squares and a tasty cheese sauce. Little prep, BIG flavour!",
  accordion: [
    {
      title: "Ingredients",
      paragraphs: [
        "Beef ragu (60%) (tomato (25%), beef (22%), water, onion (10%), apple puree, carrot (6%), red pepper, slow roasted tomato paste (slow roasted tomato, sunflower oil, spirit vinegar, tomato paste, sugar, sea salt, dried garlic, black pepper, rosemary, rubbed basil, water), garlic puree, basil, rapeseed oil, cornflour, tomato paste, vegetable stock (water, yeast extract, salt, onion powder, carrot juice concentrate, dehydrated potato, sunflower oil, sugar, leek powder, lemon juice concentrate, garlic powder), oregano, dried thyme, rosemary, ground bay leaves), cheese sauce (30%) (water, **milk**, mature Cheddar cheese (**milk**), cornflour), mini pasta squares (10%) (durum **wheat** semolina, water, whole **egg**).",
        "For allergens, including cereals containing **gluten**, see ingredients in **bold**.",
        "Made in a nut and peanut free environment.",
      ],
    },
    {
      title: "Nutrition",
      table: {
        headers: ["Typical values", "per 100g", "per cooked meal"],
        rows: [
          ["Energy", "485kJ/116kcal", "915kJ/218kcal"],
          ["Fat", "4.6g", "8.7g"],
          ["of which saturates", "1.9g", "3.6g"],
          ["Carbohydrates", "10.9g", "20.6g"],
          ["of which sugars", "3.4g", "6.4g"],
          ["Fibre", "1.8g", "3.4g"],
          ["Protein", "6.7g", "12.7g"],
          ["Salt", "0.26g", "0.49g"],
          ["Sodium", "0.10g", "0.20g"],
        ],
      },
    },
    {
      title: "Prepare",
      paragraphs: [
        "Microwave: Remove sleeve and pierce film several times. Place onto a microwaveable plate and heat as indicated. After cooking, allow to stand for 1 minute in the microwave. Carefully cut back film, stir and serve. Do not reheat. All microwaves vary, these are guidelines only. Always test the temperature before serving.",
        "Chilled (800W) – 2 minutes 30 seconds",
        "Frozen (800W) – 5 minutes",
        "Oven: Preheat oven. Remove sleeve and film lid. Place on a baking tray in the centre of the oven and heat as indicated. After cooking, remove from the oven and allow to stand for 2 minutes then stir and serve. Do not reheat. Always test the temperature before serving.",
        "190°C / Fan 170°C / Gas 5",
        "Chilled – 20 minutes",
        "Frozen – 35 minutes",
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
    logoHref: "https://www.tesco.com/groceries/en-GB/products/318184519",
  },
  related: [
    {
      image: `${assetBase}/related-cottage-pie.png`,
      href: "/products/delicious-cottage-pie/",
    },
    {
      image: `${assetBase}/related-pasta.png`,
      href: "/products/tasty-chicken-pasta-in-a-tomato-veggie-sauce/",
    },
    {
      image: `${assetBase}/related-tikka.png`,
      href: "/products/mild-chicken-tikka/",
    },
  ],
  theme: {
    detailColor: "#CA65CE",
    accordionBg: "#B54BBA",
    discoverButtonBg: "#1a2078",
    discoverButtonColor: "#CA65CE",
  },
};
