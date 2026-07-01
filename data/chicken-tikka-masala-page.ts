import type { FrozenProductPageData } from "./frozen-product-page";
import {
  frozenPrepareAccordion,
  frozenProductBadges,
  frozenProductRetailerLogos,
  frozenProductSharedAssets,
  frozenRelatedImages,
  frozenStorageAccordion,
} from "./frozen-product-shared";

const assetBase = "/products/chicken-tikka-masala";

export const chickenTikkaMasalaPageData: FrozenProductPageData = {
  slug: "chicken-tikka-masala",
  heroAlt: "Chicken tikka with fluffy rice",
  headingId: "chicken-tikka-masala-heading",
  assets: {
    heroDesktop: `${assetBase}/hero-desktop.jpg`,
    heroMobile: `${assetBase}/hero-mobile.jpg`,
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
    title: "chicken tikka\nwith fluffy rice",
    intro:
      "Tender chicken in a creamy coconut sauce with butternut squash, tomato and a hint of mango chutney. Made without dairy.",
    desktopWidth: 2160,
    desktopHeight: 1268,
    mobileWidth: 880,
    mobileHeight: 1376,
  },
  carousel: [
    { src: `${assetBase}/carousel-1.png`, alt: "Chicken tikka lifestyle" },
    { src: `${assetBase}/carousel-2.png`, alt: "Chicken tikka packaging" },
    { src: `${assetBase}/carousel-3.png`, alt: "Chicken tikka ingredients" },
    { src: `${assetBase}/carousel-4.png`, alt: "Chicken tikka served with rice" },
  ],
  badges: frozenProductBadges,
  description:
    "Hop on the flavour trail with Annabel's deliciously mild curry. Tuck into tender pieces of chicken in a creamy coconut sauce, blended with butternut squash, juicy tomato, a hint of mango chutney and warming spices, it's perfect for growing appetites and free from dairy too!",
  accordion: [
    {
      title: "Ingredients",
      paragraphs: [
        "Sauce (58%) (water, tomato (19%), butternut squash (14%), mango chutney (5%) (mango, sugar, salt, acidity regulator (acetic acid), garlic, ginger, chilli), onion puree (onion, rapeseed oil), tomato puree, creamed coconut (2.5%), onion, ginger puree, rapeseed oil, ground coriander, cornflour, vegetable stock (maltodextrin, salt, onion powder, flavouring, yeast extract, sunflower oil and/or rapeseed oil, parsley, black pepper), coriander, lemon juice, ground cumin, garlic purée, garam masala (spices, herbs, spice extracts), ground paprika, ground cardamom), cooked long grain rice (32%) (water, long grain rice), cooked chicken pieces (10%) (chicken breast, salt).",
        "**Caution:** Although every care has been taken to remove all bones, some may still remain. Children should always be supervised whilst they are eating.",
      ],
    },
    {
      title: "Nutrition",
      table: {
        headers: ["Typical values", "per 100g", "per cooked meal"],
        rows: [
          ["Energy", "486kJ/116kcal", "972kJ/232kcal"],
          ["Fat", "3.1g", "6.2g"],
          ["of which saturates", "1.2g", "2.4g"],
          ["Carbohydrates", "15.5g", "31g"],
          ["of which sugars", "3.4g", "6.8g"],
          ["Fibre", "1.9g", "3.8g"],
          ["Protein", "5.4g", "10.8g"],
          ["Salt", "0.27g", "0.54g"],
          ["Sodium", "0.11g", "0.22g"],
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
      image: frozenRelatedImages.bologneseMacCheese,
      href: "/products/mighty-bolognese-mac-and-cheese/",
      width: 700,
      height: 753,
    },
    {
      image: frozenRelatedImages.chickenPasta,
      href: "/products/chicken-tomato-mascarpone-pasta/",
      width: 700,
      height: 753,
    },
    {
      image: frozenRelatedImages.spaghetti,
      href: "/products/tasty-spaghetti-bolognese/",
      width: 532,
      height: 602,
    },
  ],
  theme: {
    detailColor: "#D6A8E3",
    accordionBg: "#743DBC",
    discoverButtonBg: "#743DBC",
    discoverButtonColor: "#D6A8E3",
  },
};
