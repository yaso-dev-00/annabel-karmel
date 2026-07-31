import type { ChilledProductPageData } from './chilled-product-page';

const assetBase = '/products/mild-chicken-tikka';

export const mildChickenTikkaPageData: ChilledProductPageData = {
  slug: 'mild-chicken-tikka',
  heroAlt: 'Mild chicken tikka with fluffy rice',
  headingId: 'mild-chicken-tikka-heading',
  assets: {
    heroDesktop: `${assetBase}/hero-desktop.svg`,
    heroMobile: `${assetBase}/hero-mobile.jpg`,
    detailBg: `${assetBase}/chicken-tikka-bg.png`,
    detailBgMobile: `${assetBase}/chicken-tikka-bg-mobile.png`,
    retailerBg: `${assetBase}/where-to-buy-bg.png`,
    whyNotTryBg: `${assetBase}/why-not-try-bg.jpg`,
    tescoLogo: `${assetBase}/tesco-logo.png`,
    arrowLeft: `${assetBase}/arrow-left.svg`,
    arrowRight: `${assetBase}/arrow-right.svg`,
  },
  hero: {
    title: 'mild chicken tikka with fluffy rice',
    intro:
      "Curry night with a tot-twist! Tender chicken pieces in a mild creamy tomato and coconut sauce. It's made without dairy too!",
    desktopWidth: 2000,
    desktopHeight: 1169,
    mobileWidth: 880,
    mobileHeight: 770,
  },
  carousel: [
    {
      src: `${assetBase}/carousel-lifestyle.png`,
      alt: 'Child enjoying mild chicken tikka',
    },
    {
      src: `${assetBase}/carousel-pack.png`,
      alt: 'Mild chicken tikka packaging',
    },
    {
      src: `${assetBase}/carousel-plate.png`,
      alt: 'Mild chicken tikka served with rice',
    },
  ],
  badges: [
    { src: `${assetBase}/badge-freezable.png`, alt: 'Cook from frozen' },
    { src: `${assetBase}/badge-low-salt.png`, alt: 'Low in salt' },
    { src: `${assetBase}/badge-dairy-free.png`, alt: 'Made without dairy' },
    { src: `${assetBase}/badge-veggie.png`, alt: 'Veggie goodness' },
    { src: `${assetBase}/badge-cook-time.png`, alt: 'Ready in minutes' },
  ],
  description:
    "Annabel's award-winning little curry combines tender chicken with a creamy coconut and tomato sauce, subtly spiced with apple, ginger, and mango chutney. Served with Basmati rice, it's an easy, tasty way to introduce new flavours – and make curry night a hit with little ones!",
  accordion: [
    {
      title: 'Ingredients',
      paragraphs: [
        'Cooked basmati rice (47%) (water, basmati rice), chicken breast (14%) (chicken breast, rice starch, salt), tomato, water, onion, apple puree, tomato paste, rapeseed oil, creamed coconut, ginger puree, mango chutney (sugar, mango, salt, ginger, acidity regulator (acetic acid), garlic, cayenne pepper), chicken stock (chicken, rehydrated potato flake, yeast extract, salt), cornflour, yeast extract, vegetable stock (water, yeast extract, salt, onion powder, carrot juice concentrate, dehydrated potato, sunflower oil, sugar, leek powder, lemon juice concentrate, garlic powder), ground coriander, lemon juice concentrate, desiccated coconut, ground turmeric, ground cumin, garlic puree, ground black pepper, ground paprika, ground cassia, ground star anise, ground ginger, ground cardamom, ground pimento, ground bay leaf, ground clove, ground nutmeg.',
        'Made in a nut and peanut free environment.',
        'Caution: Although every care has been taken to remove all bones, some may remain.',
      ],
    },
    {
      title: 'Nutrition',
      table: {
        headers: ['Typical values', 'per 100g', 'per cooked meal'],
        rows: [
          ['Energy', '454kJ/108kcal', '873kJ/207kcal'],
          ['Fat', '1.9g', '3.6g'],
          ['of which saturates', '0.7g', '1.4g'],
          ['Carbohydrates', '15.4g', '29.5g'],
          ['of which sugars', '2.1g', '4.1g'],
          ['Fibre', '1.8g', '3.5g'],
          ['Protein', '6.4g', '12.4g'],
          ['Salt', '0.21g', '0.41g'],
          ['Sodium', '0.09g', '0.16g'],
        ],
      },
    },
    {
      title: 'Prepare',
      paragraphs: [
        'Microwave (800W): Remove sleeve and pierce film several times. Place onto a microwaveable plate and heat as indicated. After cooking, allow to stand for 1 minute in the microwave. Carefully cut back film, stir and serve. Do not reheat. All microwaves vary, these are guidelines only. Always test the temperature before serving.',
        'Chilled – Cook for 1 ½ minutes, stir and cook for a further 1 minute',
        'Frozen – Cook for 3 minutes, stir and cook for a further 3 minutes.',
        'Oven: Preheat oven. Remove sleeve and pierce film lid several times. Place on a baking tray in the centre of the oven and heat as indicated. After cooking, remove from the oven and allow to stand for 2 minutes. Carefully cut back the film, stir and serve. Do not reheat. Always test the temperature before serving.',
        '190°C / Fan 170°C / Gas 5',
        'Chilled – 20 minutes',
        'Frozen – 25 minutes',
      ],
    },
    {
      title: 'Storage',
      paragraphs: [
        'Keep refrigerated and use within the date shown on front of pack. Once opened, use within 24 hours. Freeze before use by date and use within 3 months.',
      ],
    },
  ],
  retailer: {
    heading: 'exclusively at',
    logoHref: 'https://www.tesco.com/groceries/en-GB/products/286999255',
  },
  related: [
    {
      image: `${assetBase}/related-pasta.png`,
      href: '/products/tasty-chicken-pasta-in-a-tomato-veggie-sauce/',
      width: 1080,
      height: 1080,
    },
    {
      image: `${assetBase}/related-lasagne.png`,
      href: '/products/yummy-little-lasagne-new/',
      width: 1080,
      height: 1080,
    },
    {
      image: `${assetBase}/related-cottage-pie.png`,
      href: '/products/delicious-cottage-pie/',
      width: 1080,
      height: 1080,
    },
  ],
  theme: {
    detailColor: '#8585D5',
    accordionBg: '#6868CD',
    discoverButtonBg: '#1a2078',
    discoverButtonColor: '#8585D5',
  },
};

export const mildChickenTikkaAssets = mildChickenTikkaPageData.assets;
export const mildChickenTikkaHero = mildChickenTikkaPageData.hero;
export const mildChickenTikkaCarousel = mildChickenTikkaPageData.carousel;
export const mildChickenTikkaBadges = mildChickenTikkaPageData.badges;
export const mildChickenTikkaDescription = mildChickenTikkaPageData.description;
export const mildChickenTikkaAccordion = mildChickenTikkaPageData.accordion;
export const mildChickenTikkaRetailer = mildChickenTikkaPageData.retailer;
export const mildChickenTikkaRelated = mildChickenTikkaPageData.related;

export type MildChickenTikkaAccordionItem =
  (typeof mildChickenTikkaPageData.accordion)[number];
export type MildChickenTikkaRelatedProduct =
  (typeof mildChickenTikkaPageData.related)[number];
