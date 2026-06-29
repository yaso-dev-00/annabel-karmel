import type { PlantPoweredBitesPageData } from "./plant-powered-bites-product-page";

const assetBase = "/products/nuggets";

export const nuggetsPageData: PlantPoweredBitesPageData = {
  slug: "nuggets",
  heroAlt: "Meat-free chicken style nuggets",
  headingId: "nuggets-heading",
  assets: {
    heroDesktop: `${assetBase}/hero-desktop.png`,
    heroMobile: `${assetBase}/hero-mobile.png`,
    detailBg: `${assetBase}/detail-bg.png`,
    detailBgMobile: `${assetBase}/detail-bg-mobile.png`,
    retailerBg: `${assetBase}/retailer-bg.png`,
    whyNotTryBg: `${assetBase}/why-not-try-bg.png`,
    asdaLogo: `${assetBase}/asda-logo.png`,
    arrowLeft: `${assetBase}/arrow-left.svg`,
    arrowRight: `${assetBase}/arrow-right.svg`,
  },
  hero: {
    title: "meat-free chicken\nstyle nuggets",
    intro: "Expect spontaneous happy dances at the table with my plant-powered nuggets!",
    desktopWidth: 1320,
    desktopHeight: 1032,
    mobileWidth: 1320,
    mobileHeight: 1032,
  },
  carousel: [
    { src: `${assetBase}/carousel-1.png`, alt: "Nuggets carousel 1", width: 800, height: 800 },
    { src: `${assetBase}/carousel-2.png`, alt: "Nuggets carousel 5", width: 800, height: 800 },
    { src: `${assetBase}/carousel-3.png`, alt: "Nuggets carousel 2", width: 800, height: 800 },
    { src: `${assetBase}/carousel-4.png`, alt: "Nuggets carousel 6", width: 800, height: 800 },
    { src: `${assetBase}/carousel-5.png`, alt: "Nuggets carousel 3", width: 800, height: 800 },
  ],
  badges: {
    desktop: `${assetBase}/badges-desktop.png`,
    mobile: `${assetBase}/badges-mobile.png`,
    alt: "100% plant-based, 40% veggies in every nugget, iron rich, source of calcium, no artificial colours or preservatives, source of vit D and B12",
    desktopWidth: 1024,
    desktopHeight: 238,
    mobileWidth: 812,
    mobileHeight: 452,
  },
  description: [
    "Packing in real veg and coated in crispy breadcrumbs, these might just be the tastiest nuggets on the block. A clever blend of pea, lentil, and wheat protein makes them a satisfying, feel-good choice for little (and big) appetites.",
    "Your easy-peasy mealtime hero – ready from frozen in just 5 minutes!",
  ],
  accordion: [
    {
      title: "Ingredients",
      paragraphs: [
        "Water, batter [water, **wheat** flour, **wheat** starch, salt, natural flavourings (**celery**)], sunflower oil, chickpea (10%), sweetcorn (9%), carrot (9%), pea (8%), breadcrumbs] **wheat** flour, water, salt, yeast, sweet red pepper extract, turmeric extract, natural flavouring], textured vegetable protein (4%) [**wheat**, lentil], pea protein (3%), onion, pea fibre, corn starch, thickener (methyl cellulose), natural flavourings, vitamin and mineral mix [calcium, iron, folic acid, vitamin D, vitamin B12], salt, black pepper, yeast extract, concentrated apple juice.",
        "For allergens, including **cereals** containing **gluten**, see ingredients in **bold**. May also contain **soy**, **sesame**, **nuts**, and peanut.",
        "**Caution:** Children should always be supervised whilst they are eating.",
      ],
    },
    {
      title: "Nutrition",
      table: {
        headers: ["Typical values", "Per 100g", "Per serving (110g)"],
        rows: [
          ["Energy", "866kJ/208kcal", "952kJ/229kcal"],
          ["Fat", "12.2g", "13.4g"],
          ["of which saturates", "1.4g", "1.5g"],
          ["Carbohydrates", "18.9g", "20.8g"],
          ["of which sugars", "1.3g", "1.4g"],
          ["Fibre", "6.1g", "6.7g"],
          ["Protein", "8.7g", "9.6g"],
          ["Salt", "1.20g", "1.32g"],
          ["Vitamin D", "0.75µg (15%)*", "0.83µg (17%)*"],
          ["Folic Acid", "30µg (15%)*", "33µg (17%)*"],
          ["Vitamin B12", "0.38µg (15%)*", "0.42µg (17%)*"],
          ["Calcium", "120mg (15%)*", "132mg (17%)"],
          ["Iron", "4.2mg (30%)*", "4.6mg (33%)*"],
        ],
        footnote: "*NRV = Nutrient Reference Value",
      },
    },
    {
      title: "Prepare",
      paragraphs: [
        "Cook from frozen: The following instructions are guidelines only. Remove from packaging. Ensure the product is piping hot before serving. Keep frozen until ready to cook. Not suitable for microwave cooking.",
        "Pan fry: Gently heat a little oil in a frying pan. Fry over a medium heat for **5 minutes**, turning halfway through.",
        "Oven: Preheat oven to **210°C / Fan 190°C / Gas 6**. Lightly coat the nuggets with oil, place on an oven tray and cook in the oven for **10 minutes**, turning halfway through.",
        "Air fryer: Lightly coat the nuggets with oil and cook at **200°C** in the air fryer for **9 minutes**, turning halfway through.",
      ],
    },
    {
      title: "Storage",
      paragraphs: [
        "Keep frozen at -18°C and use within the best before date shown on back of pack. Do not refreeze once thawed.",
      ],
    },
  ],
  retailer: {
    heading: "Find them in the freezer exclusively at",
    logoHref:
      "https://www.asda.com/groceries/product/frozen-vegetarian-mince-fillets-nuggets-pieces/annabel-karmel-meat-free-chicken-style-nuggets-kids-3-years-220g-10-x-22g-/9329352",
  },
  waysToServe: [
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
  ],
  related: [
    {
      image: `${assetBase}/related-tikka.png`,
      href: "/products/chicken-tikka-masala/",
      width: 700,
      height: 753,
    },
    {
      image: `${assetBase}/related-burgers.png`,
      href: "/products/burgers/",
      width: 700,
      height: 753,
    },
    {
      image: `${assetBase}/related-spaghetti.png`,
      href: "/products/tasty-spaghetti-bolognese/",
      width: 700,
      height: 753,
    },
  ],
  theme: {
    detailColor: "#EC98A5",
    accordionBg: "#DF58AC",
    discoverButtonBg: "#005D20",
    discoverButtonColor: "#DF58AC",
  },
};
