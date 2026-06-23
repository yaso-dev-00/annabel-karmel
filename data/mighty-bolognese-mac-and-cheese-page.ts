import type { FrozenProductPageData } from "./frozen-product-page";
import {
  frozenPrepareAccordion,
  frozenProductBadges,
  frozenProductRetailerLogos,
  frozenProductSharedAssets,
  frozenRelatedImages,
  frozenStorageAccordion,
} from "./frozen-product-shared";

const assetBase = "/products/mighty-bolognese-mac-and-cheese";

export const mightyBologneseMacAndCheesePageData: FrozenProductPageData = {
  slug: "mighty-bolognese-mac-and-cheese",
  heroAlt: "Bolognese mac and cheese with veggies",
  headingId: "mighty-bolognese-mac-and-cheese-heading",
  assets: {
    heroDesktop: `${assetBase}/hero-desktop.jpg`,
    heroMobile: `${assetBase}/hero-mobile.png`,
    detailBg: "",
    detailBgMobile: "",
    cloudLeft: `${assetBase}/cloud-left.png`,
    cloudRight: `${assetBase}/cloud-right.png`,
    retailerBg: `${assetBase}/retailer-bg.png`,
    whyNotTryBg: `${assetBase}/why-not-try-bg.jpg`,
    arrowLeft: frozenProductSharedAssets.arrowLeft,
    arrowRight: frozenProductSharedAssets.arrowRight,
  },
  hero: {
    title: "bolognese mac & cheese\nwith veggies",
    intro:
      "Creamy mac meets yummy Bolognese in this hearty, veggie-filled dish. It's the tastiest teatime mash-up!",
  },
  carousel: [
    { src: `${assetBase}/carousel-1.png`, alt: "Bolognese mac and cheese lifestyle" },
    { src: `${assetBase}/carousel-2.png`, alt: "Bolognese mac and cheese packaging" },
  ],
  badges: frozenProductBadges,
  description:
    "Classic mac meets hearty Bolognese…two kids' favourites combined to make teatime a total hit – and on the table in minutes! Blended with a rainbow of hidden veggies, this creamy macaroni pasta with a yummy beef Bolognese sauce packs in goodness for happy diners every time!",
  accordion: [
    {
      title: "Ingredients",
      paragraphs: [
        "Cooked macaroni pasta (33%) (water, durum **wheat** semolina), water, vegetables (13%) (butternut squash, sweet potato, carrot, **celery**), semi skimmed **milk**, beef (8%), tomatoes, mature Cheddar cheese (**milk**) (3%), reduced fat cheese (**milk**) (2%), tomato puree, tomato juice, half cream (**milk**), onion, cornflour, medium fat soft cheese (**milk**), beef stock (beef stock (water, beef fat, beef extract) yeast extract, sugar, salt, caramelised sugar syrup, mushroom extract, red wine extract, cornflour, flavouring, black pepper), beef stock (water, beef extract, tomato paste, onion, carrot), garlic puree, sundried tomato paste (rehydrated sundried tomatoes (water, tomato, salt), rapeseed oil, white wine vinegar, sugar, salt, rosemary, black pepper, olive oil, basil, garlic oil), **wheat** flour (**wheat** flour, calcium carbonate, iron, niacin, thiamin), basil, yeast extract, oregano, thyme, vegetable stock (maltodextrin, salt, onion powder, flavouring, yeast extract, rapeseed oil, parsley, black pepper), parsley, sage, white pepper.",
        "For allergens, including cereals containing gluten, see ingredients in **bold**.",
        "**Caution:** Although every care has been taken to remove all bones, some may still remain. Children should always be supervised whilst they are eating.",
      ],
    },
    {
      title: "Nutrition",
      table: {
        headers: ["Typical values", "per 100g", "per cooked meal"],
        rows: [
          ["Energy", "566kJ/134kcal", "1007kJ/239kcal"],
          ["Fat", "3.4g", "6.1g"],
          ["of which saturates", "1.8g", "3.2g"],
          ["Carbohydrates", "18.4g", "32.7g"],
          ["of which sugars", "2.4g", "4.3g"],
          ["Fibre", "1.6g", "2.9g"],
          ["Protein", "6.7g", "12.0g"],
          ["Salt", "0.27g", "0.48g"],
          ["Sodium", "0.11g", "0.19g"],
        ],
      },
    },
    {
      title: "Prepare",
      paragraphs: frozenPrepareAccordion,
    },
    {
      title: "Storage",
      paragraphs: frozenStorageAccordion,
    },
  ],
  retailer: {
    heading: "Discover in the freezer aisle",
    logos: frozenProductRetailerLogos,
  },
  related: [
    {
      image: frozenRelatedImages.chickenTikka,
      href: "/products/chicken-tikka-masala/",
    },
    {
      image: frozenRelatedImages.chickenPasta,
      href: "/products/chicken-tomato-mascarpone-pasta/",
    },
    {
      image: frozenRelatedImages.spaghetti,
      href: "/products/tasty-spaghetti-bolognese/",
    },
  ],
  theme: {
    detailColor: "#F7A0C9",
    accordionBg: "#E93A88",
    discoverButtonBg: "#E93A88",
    discoverButtonColor: "#F7A0C9",
  },
};
