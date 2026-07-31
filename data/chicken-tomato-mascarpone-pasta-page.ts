import type { FrozenProductPageData } from './frozen-product-page';
import {
  chickenTomatoMascarponePastaBadges,
  frozenPrepareAccordion,
  frozenProductRetailerLogos,
  frozenProductSharedAssets,
  frozenRelatedImages,
  frozenStorageAccordion,
} from './frozen-product-shared';

const assetBase = '/products/chicken-tomato-mascarpone-pasta';

export const chickenTomatoMascarponePastaPageData: FrozenProductPageData = {
  slug: 'chicken-tomato-mascarpone-pasta',
  heroAlt: 'Chicken pasta with tomato and mascarpone',
  headingId: 'chicken-tomato-mascarpone-pasta-heading',
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
    title: 'chicken pasta with\ntomato & mascarpone',
    intro:
      'Chunky pasta, tender chicken & a veggie-packed tomato and mascarpone sauce – always a dinner winner.',
    desktopWidth: 2160,
    desktopHeight: 1268,
    mobileWidth: 880,
    mobileHeight: 1376,
  },
  carousel: [
    { src: `${assetBase}/carousel-1.png`, alt: 'Chicken pasta lifestyle' },
    { src: `${assetBase}/carousel-2.png`, alt: 'Chicken pasta packaging' },
  ],
  badges: chickenTomatoMascarponePastaBadges,
  description:
    "Calling all little pasta lovers! Forks at the ready to dig into Annabel's tasty chifferi pasta and tender chicken in a tasty tomato and mascarpone sauce. Blended with their favourite veggies, this dinner winner is perfectly balanced for pint-sized pasta connoisseurs.",
  accordion: [
    {
      title: 'Ingredients',
      paragraphs: [
        'Sauce (57%) (water, chopped tomato (20%) (tomato, tomato juice, acidity regulator (citric acid)), tomato (10%), tomato puree (7%), **celery** (5%), carrot (5%), courgette (5%), red onion (5%), half cream (3%) (**milk**), Mascarpone full fat soft cheese (3%) (**milk**), sundried tomato paste (rehydrated sundried tomatoes (water, tomato, salt), sunflower oil and/or rapeseed oil, white wine vinegar, sugar, salt, rosemary, garlic extract (sunflower oil, and/or rapeseed oil, garlic oil), black pepper, olive oil, basil extract), cornflour, garlic puree, vegetable stock (maltodextrin, salt, onion powder, flavouring, yeast extract, sunflower oil and/or rapeseed oil, parsley, black pepper), basil, oregano, parsley, sage, thyme, ground black pepper], cooked chifferi pasta (33%) (durum **wheat** semolina, water), cooked chicken pieces (10%) (chicken breast, salt).',
        'For allergens, including cereals containing gluten, see ingredients in **bold**.',
        '**Caution:** Although every care has been taken to remove all bones, some may still remain. Children should always be supervised whilst they are eating.',
      ],
    },
    {
      title: 'Nutrition',
      table: {
        headers: ['Typical values', 'per 100g', 'per cooked meal'],
        rows: [
          ['Energy', '432kJ/102kcal', '864kJ/204kcal'],
          ['Fat', '1.7g', '3.3g'],
          ['of which saturates', '0.7g', '1.3g'],
          ['Carbohydrates', '15.5g', '30.9g'],
          ['of which sugars', '2.3g', '4.6g'],
          ['Fibre', '1.4g', '2.8g'],
          ['Protein', '5.6g', '11.3g'],
          ['Salt', '0.26g', '0.52g'],
          ['Sodium', '0.10g', '0.21g'],
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
      image: frozenRelatedImages.spaghetti,
      href: '/products/tasty-spaghetti-bolognese/',
      width: 532,
      height: 602,
    },
    {
      image: frozenRelatedImages.chickenTikka,
      href: '/products/chicken-tikka-masala/',
      width: 700,
      height: 753,
    },
  ],
  theme: {
    detailColor: '#65D9D6',
    accordionBg: '#00A19D',
    discoverButtonBg: '#00A19D',
    discoverButtonColor: '#65D9D6',
    detailTextColor: '#000',
    heroTextColor: '#000',
  },
};
