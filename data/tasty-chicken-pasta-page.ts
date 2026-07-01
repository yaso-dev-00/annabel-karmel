import type { ChilledProductPageData } from "./chilled-product-page";

const assetBase = "/products/tasty-chicken-pasta-in-a-tomato-veggie-sauce";

export const tastyChickenPastaPageData: ChilledProductPageData = {
  slug: "tasty-chicken-pasta",
  heroAlt: "Tasty chicken pasta in a tomato and veggie sauce",
  headingId: "tasty-chicken-pasta-heading",
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
    title: "tasty chicken pasta\nin a tomato & veggie sauce",
    intro:
      "Calling little pasta lovers! Tuck into Annabel's chicken pasta in a fresh tomato, veggie and creamy mascarpone sauce.",
    desktopWidth: 2000,
    desktopHeight: 1171,
    mobileWidth: 880,
    mobileHeight: 762,
  },
  carousel: [
    {
      src: `${assetBase}/carousel-lifestyle.png`,
      alt: "Child enjoying chicken pasta",
    },
    {
      src: `${assetBase}/carousel-pack.png`,
      alt: "Chicken pasta packaging",
    },
    {
      src: `${assetBase}/carousel-plate.png`,
      alt: "Chicken pasta served on a plate",
    },
    {
      src: `${assetBase}/carousel-scene.png`,
      alt: "Chicken pasta lifestyle scene",
    },
  ],
  badges: [
    { src: `${assetBase}/badge-freezable.png`, alt: "Cook from frozen" },
    { src: `${assetBase}/badge-natural.png`, alt: "100% natural ingredients" },
    { src: `${assetBase}/badge-low-salt.png`, alt: "Low in salt" },
    { src: `${assetBase}/badge-ready-2-min.png`, alt: "Ready in 2 minutes" },
    { src: `${assetBase}/badge-veggie.png`, alt: "Veggie goodness" },
  ],
  description:
    "Pasta night, upgraded! Tender chicken pieces, chunky Chifferi pasta, and a creamy tomato & veggie sauce. Super tasty and packed with goodness, it's the perfect non-strop dinner for non-stop days!",
  accordion: [
    {
      title: "Ingredients",
      paragraphs: [
        "Sauce (76%) (tomato, onion, water, Mascarpone full fat soft cheese (5%) (full fat soft cheese (**milk**), cornflour, sea salt), apple puree, carrot, red pepper, butternut squash, slow roasted tomato paste (slow roasted tomato, sunflower oil, spirit vinegar, tomato paste, sugar, sea salt, dried garlic, black pepper, rosemary, rubbed basil, water), mature Cheddar cheese (**milk**), rapeseed oil, garlic puree, cornflour, basil, black pepper, oregano, dried thyme), cooked chicken breast (15%) (chicken breast, salt), Ditali Rigati pasta (9%) (durum **wheat** semolina).",
        "For allergens, including cereals containing gluten, see ingredients in **bold**.",
        "Made in a nut and peanut free environment.",
      ],
    },
    {
      title: "Nutrition",
      table: {
        headers: ["Typical values", "per 100g", "per cooked meal"],
        rows: [
          ["Energy", "372kJ/89kcal", "736kJ/175kcal"],
          ["Fat", "3.7g", "7.3g"],
          ["of which saturates", "1.6g", "3.1g"],
          ["Carbohydrates", "6.1g", "12.0g"],
          ["of which sugars", "2.8g", "5.5g"],
          ["Fibre", "1.8g", "3.5g"],
          ["Protein", "7.0g", "13.8g"],
          ["Salt", "0.21g", "0.42g"],
          ["Sodium", "0.08g", "0.17g"],
        ],
      },
    },
    {
      title: "Prepare",
      paragraphs: [
        "Microwave (800W): Remove sleeve and pierce film several times. Place onto a microwaveable plate and heat as indicated. After cooking, allow to stand for 1 minute in the microwave. Carefully cut back film, stir and serve. Do not reheat. All microwaves vary, these are guidelines only. Always test the temperature before serving.",
        "Chilled – 2 minutes",
        "Frozen – 3 minutes, then stir and cook for a further 2 minutes",
        "Oven: Preheat oven. Remove sleeve and pierce film lid several times. Place on a baking tray in the centre of the oven and heat as indicated. After cooking, remove from the oven and allow to stand for 2 minutes. Carefully cut back the film, stir and serve. Do not reheat. Always test the temperature before serving.",
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
    logoHref: "https://www.tesco.com/groceries/en-GB/products/322830147",
  },
  related: [
    {
      image: `${assetBase}/related-lasagne.png`,
      href: "/products/yummy-little-lasagne-new/",
      width: 1080,
      height: 1080,
    },
    {
      image: `${assetBase}/related-cottage-pie.png`,
      href: "/products/delicious-cottage-pie/",
      width: 1080,
      height: 1080,
    },
    {
      image: `${assetBase}/related-tikka.png`,
      href: "/products/mild-chicken-tikka/",
      width: 1080,
      height: 1080,
    },
  ],
  theme: {
    detailColor: "#FF5C39",
    accordionBg: "#EE421E",
    discoverButtonBg: "#5B1830",
    discoverButtonColor: "#FF5C39",
  },
};
