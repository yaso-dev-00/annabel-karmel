import type { FrozenProductPageData } from './frozen-product-page';
import {
  frozenPrepareAccordion,
  frozenProductBadges,
  frozenProductRetailerLogos,
  frozenProductSharedAssets,
  frozenRelatedImages,
  frozenStorageAccordion,
} from './frozen-product-shared';

const assetBase = '/products/tasty-spaghetti-bolognese';

export const tastySpaghettiBolognesePageData: FrozenProductPageData = {
  slug: 'tasty-spaghetti-bolognese',
  heroAlt: 'Spaghetti bolognese with hidden veggies',
  headingId: 'tasty-spaghetti-bolognese-heading',
  assets: {
    heroDesktop: `${assetBase}/hero-desktop.jpg`,
    heroMobile: `${assetBase}/hero-mobile.jpg`,
    detailBg: '',
    detailBgMobile: '',
    cloudLeft: `${assetBase}/cloud-left.png`,
    cloudRight: `${assetBase}/cloud-right.png`,
    retailerBg: `${assetBase}/retailer-bg.png`,
    whyNotTryBg: `${assetBase}/why-not-try-bg.jpg`,
    arrowLeft: frozenProductSharedAssets.arrowLeft,
    arrowRight: frozenProductSharedAssets.arrowRight,
  },
  hero: {
    title: 'spaghetti bolognese\nwith hidden veggies',
    intro:
      "Made with 100% British & Irish beef and packed with hidden veg – it's a slurp-worthy spag bol kids will love. Made without dairy.",
    desktopWidth: 2160,
    desktopHeight: 1260,
    mobileWidth: 880,
    mobileHeight: 1368,
  },
  carousel: [
    {
      src: `${assetBase}/carousel-1.png`,
      alt: 'Spaghetti bolognese lifestyle',
    },
    {
      src: `${assetBase}/carousel-2.png`,
      alt: 'Spaghetti bolognese packaging',
    },
    {
      src: `${assetBase}/carousel-3.png`,
      alt: 'Spaghetti bolognese ingredients',
    },
    { src: `${assetBase}/carousel-4.png`, alt: 'Spaghetti bolognese served' },
  ],
  badges: frozenProductBadges,
  description:
    "Say hello to Annabel's take on this childhood classic – short spaghetti and a yummy beef Bolognese sauce with FOUR hidden veggies. A speedy, slurpy favourite inspired by her trusted cookbook collection.",
  accordion: [
    {
      title: 'Ingredients',
      paragraphs: [
        'Sauce (67%) (water, minced beef (18%), chopped tomato (16%) (tomato, tomato juice, acidity regulator (citric acid)), tomato puree (7.5%), tomato (7.5%), onion (4%), celery (3.5%), carrot (3.5%), sundried tomato paste (rehydrated sundried tomato (water, tomato, salt), sunflower oil, white wine vinegar, sugar, salt, rosemary, garlic extract (sunflower oil, garlic), black pepper, olive oil, basil extract), beef bouillon (beef stock (water, beef fat, beef extract), yeast extract, sugar, salt, caramelised sugar syrup, mushroom extract, red wine extract, cornflour, flavourings, black pepper), cornflour, garlic puree, beef stock (water, beef extract, tomato paste, onion, carrot), basil, parsley, thyme, oregano, sage), cooked spaghetti (33%) (water, durum **wheat** semolina).',
        'For allergens, including cereals containing gluten, see ingredients in **bold**.',
        '**Caution:** Although every care has been taken to remove all bones, some may still remain. Children should always be supervised whilst they are eating.',
        '**Made with British & Irish beef.**',
      ],
    },
    {
      title: 'Nutrition',
      table: {
        headers: ['Typical values', 'per 100g', 'per cooked meal'],
        rows: [
          ['Energy', '412kJ/98kcal', '824kJ/196kcal'],
          ['Fat', '2g', '4g'],
          ['of which saturates', '0.7g', '1.4g'],
          ['Carbohydrates', '13.1g', '26.2g'],
          ['of which sugars', '2.4g', '4.8g'],
          ['Fibre', '1.5g', '3g'],
          ['Protein', '6.1g', '12.2g'],
          ['Salt', '0.3g', '0.6g'],
          ['Sodium', '0.12g', '0.24g'],
        ],
      },
    },
    {
      title: 'Prepare',
      paragraphs: frozenPrepareAccordion,
    },
    {
      title: 'Storage',
      paragraphs: frozenStorageAccordion,
    },
  ],
  retailer: {
    heading: 'Discover in the freezer aisle',
    logos: frozenProductRetailerLogos,
  },
  related: [
    {
      image: frozenRelatedImages.bologneseMacCheese,
      href: '/products/mighty-bolognese-mac-and-cheese/',
      width: 700,
      height: 753,
    },
    {
      image: frozenRelatedImages.chickenPasta,
      href: '/products/chicken-tomato-mascarpone-pasta/',
      width: 700,
      height: 753,
    },
    {
      image: frozenRelatedImages.chickenTikka,
      href: '/products/chicken-tikka-masala/',
      width: 700,
      height: 753,
    },
  ],
  theme: {
    detailColor: '#FF8674',
    accordionBg: '#F16547',
    discoverButtonBg: '#F16547',
    discoverButtonColor: '#FF8674',
  },
};
