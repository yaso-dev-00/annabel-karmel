import type { PlantPoweredBitesPageData } from './plant-powered-bites-product-page';

const assetBase = '/products/burgers';

export const burgersPageData: PlantPoweredBitesPageData = {
  slug: 'burgers',
  heroAlt: 'Meat-free mini burgers',
  headingId: 'burgers-heading',
  assets: {
    heroDesktop: `${assetBase}/hero-desktop.jpg`,
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
    title: 'meat-free mini\nburgers',
    intro:
      "See them rollin' to the dinner table with Annabel's plant-powered mini burgers. Big on veggie goodness and approved by kids!",
    desktopWidth: 1842,
    desktopHeight: 1158,
    mobileWidth: 1760,
    mobileHeight: 1540,
  },
  carousel: [
    {
      src: `${assetBase}/carousel-1.png`,
      alt: 'Burger carousel 1',
      width: 800,
      height: 800,
    },
    {
      src: `${assetBase}/carousel-2.png`,
      alt: 'Burger carousel 3',
      width: 800,
      height: 800,
    },
    {
      src: `${assetBase}/carousel-3.png`,
      alt: 'Burger carousel 2',
      width: 800,
      height: 800,
    },
    {
      src: `${assetBase}/carousel-4.png`,
      alt: 'Burgers carousel 4',
      width: 800,
      height: 800,
    },
  ],
  badges: {
    desktop: `${assetBase}/badges-desktop.png`,
    mobile: `${assetBase}/badges-mobile.png`,
    alt: '100% plant-based, 50% veggies in every burger, iron rich, source of calcium, no artificial colours or preservatives, source of vit D and B12',
    desktopWidth: 1024,
    desktopHeight: 213,
    mobileWidth: 406,
    mobileHeight: 226,
  },
  description:
    "Combining all the power of pea protein with yummy real veggies and natural seasoning, Annabel's burgers are mini in size, mighty in flavour. The perfect post-school snack, or dinner winner – and they're ready from frozen in just 5 minutes!",
  accordion: [
    {
      title: 'Ingredients',
      paragraphs: [
        'Water, chickpea (13%), carrot (12%), pea (12%), sweetcorn (12%), sunflower oil, corn starch, pea protein (5%), thickener (methyl cellulose), textured vegetable protein [lentil, **wheat**], onion (3%), crispy onion [dried onion, sunflower oil], natural flavourings, garlic, pea fibre, vitamin and mineral mix [calcium, iron, folic acid, vitamin D, vitamin B12], salt, caramelised sugar, spices [cumin, sweet red pepper, coriander, black pepper, thyme, salt, acidity regulator (sodium bicarbonate)], beetroot concentrate, cumin, black pepper, sweet pepper powder, concentrated apple juice, yeast extract.',
        'For allergens, including **cereals** containing **gluten**, see ingredients in **bold**. May contain **celery**, **soy**, **sesame**, **nuts**, and **peanut**.',
        '**Caution:** Children should always be supervised whilst they are eating.',
      ],
    },
    {
      title: 'Nutrition',
      table: {
        headers: ['Typical values', 'Per 100g', 'Per serving (110g)'],
        rows: [
          ['Energy', '756kJ/183kcal', '831kJ/201kcal'],
          ['Fat', '10.9g', '12g'],
          ['of which saturates', '1.2g', '1.3g'],
          ['Carbohydrates', '21.4g', '23.5g'],
          ['of which sugars', '0.8g', '0.9g'],
          ['Fibre', '15.4g', '17g'],
          ['Protein', '7.5g', '8.3g'],
          ['Salt', '1.20g', '1.32g'],
          ['Vitamin D', '0.75µg (15%)*', '0.83µg (17%)*'],
          ['Folic Acid', '30µg (15%)*', '33µg (17%)*'],
          ['Vitamin B12', '0.38µg (15%)*', '0.42µg (17%)*'],
          ['Calcium', '120mg (15%)*', '132mg (17%)'],
          ['Iron', '4.2mg (30%)*', '4.6mg (33%)*'],
        ],
        footnote: '*NRV = Nutrient Reference Value',
      },
    },
    {
      title: 'Prepare',
      paragraphs: [
        'Cook from frozen: The following instructions are guidelines only. Remove from packaging. Ensure the product is piping hot before serving. Keep frozen until ready to cook. Not suitable for microwave cooking.',
        'Pan fry: Gently heat a little oil in a frying pan. Fry over a medium heat for **5 minutes**, turning halfway through.',
        'Oven: Preheat oven to **210°C / Fan 190°C / Gas 6**. Lightly coat the burgers with oil, place on an oven tray and cook in the oven for **12 minutes**, turning halfway through.',
        'Air fryer: Lightly coat the burgers with oil and cook at **200°C** in the air fryer for **10 minutes**, turning halfway through.',
      ],
    },
    {
      title: 'Storage',
      paragraphs: [
        'Keep frozen at -18°C and use within the best before date shown on back of pack. Do not refreeze once thawed.',
      ],
    },
  ],
  retailer: {
    heading: 'Find them in the freezer exclusively at',
    logoHref:
      'https://www.asda.com/groceries/product/frozen-vegan-burgers-sausages/annabel-karmel-meat-free-mini-burgers-kids-3-years-220g-5-x-44g-/9336688',
  },
  waysToServe: [
    {
      title: 'Kofta Style Wraps',
      href: '/recipes/kofta-style-wraps',
      image: `${assetBase}/recipe-kofta-wraps.jpg`,
    },
    {
      title: 'Mini Burgers Grazing Platter',
      href: '/recipes/mini-burgers-grazing-platter',
      image: `${assetBase}/recipe-burgers-platter.jpg`,
    },
    {
      title: 'Mini Meat-Free Sliders',
      href: '/recipes/mini-meat-free-sliders',
      image: `${assetBase}/recipe-mini-sliders.jpg`,
    },
  ],
  related: [
    {
      image: `${assetBase}/related-tikka.png`,
      href: '/products/chicken-tikka-masala/',
      width: 700,
      height: 753,
    },
    {
      image: `${assetBase}/related-nuggets.png`,
      href: '/products/nuggets/',
      width: 314,
      height: 370,
    },
    {
      image: `${assetBase}/related-spaghetti.png`,
      href: '/products/tasty-spaghetti-bolognese/',
      width: 700,
      height: 753,
    },
  ],
  theme: {
    detailColor: '#B524AF',
    accordionBg: '#A716A4',
    discoverButtonBg: '#005D20',
    discoverButtonColor: '#A716A4',
  },
};
