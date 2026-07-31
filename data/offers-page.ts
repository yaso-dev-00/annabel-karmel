const assetBase = '/offers-page';

export const offersPageAssets = {
  heroBg: `${assetBase}/hero-bg.jpg`,
  header: `${assetBase}/header.jpg`,
  awardChild: `${assetBase}/award-child.jpg`,
  discoverChilled: `${assetBase}/discover-chilled.jpg`,
  discoverFrozen: `${assetBase}/discover-frozen.jpg`,
} as const;

export const offersPageHero = {
  title: 'On offer this week!',
  subtitle: 'Annabel’s expert ranges for toddlers & kids',
};

export const offersPageIntro =
  'We are proud to stock our goodness-packed meals in the chilled and frozen aisles (and online) at major supermarkets across the UK. Better still, we have regular offers which give you the perfect excuse to stock-up! Here’s where you’ll find our expert ranges on offer this week!';

export type RetailerOffer = {
  logo: string;
  logoAlt: string;
  nowPrice: string;
  nowSuffix?: string;
  wasPrice: string;
  shopHref: string;
  expires: string;
};

export const offersPageChilled = {
  title: 'Offers in the chilled aisle this week',
  image: `${assetBase}/chilled-range.jpg`,
  backgroundColor: '#FFF1F3',
  buttonColor: '#fccad1',
  buttonHoverColor: '#e7f3f2',
  priceColor: '#b7daea',
  offers: [
    {
      logo: `${assetBase}/logo-tesco.png`,
      logoAlt: 'Tesco',
      nowPrice: '£2.00',
      nowSuffix: 'with Clubcard',
      wasPrice: '£2.90',
      shopHref: 'https://www.tesco.com/shop/en-GB/search?query=annabel+karmel',
      expires: '23.06.2026',
    },
  ] satisfies RetailerOffer[],
};

export const offersPageFrozen = {
  title: 'Offers in the frozen aisle this week',
  image: `${assetBase}/frozen-range.jpg`,
  backgroundColor: '#EFF7FA',
  buttonColor: '#b7daea',
  buttonHoverColor: '#e7f3f2',
  priceColors: ['#b7daea', '#5dafa5'],
  offers: [
    {
      logo: `${assetBase}/logo-ocado.png`,
      logoAlt: 'Ocado',
      nowPrice: '£1.70',
      wasPrice: '£2.20',
      shopHref: 'https://www.ocado.com/search?q=annabel%20karmel',
      expires: '14.07.2026',
    },
    {
      logo: `${assetBase}/logo-asda.png`,
      logoAlt: 'ASDA',
      nowPrice: '3 for £5',
      wasPrice: '£2.20',
      shopHref: 'https://www.asda.com/groceries/search/annabel%20karmel',
      expires: '19.08.2026',
    },
  ] satisfies RetailerOffer[],
};

export const offersPageAward = {
  heading: 'Annabel’s quick and tasty meals are award-winning for good reason!',
  body: 'Packing in plenty of goodness for growing toddlers and kids, Annabel’s quick and tasty meals are a saviour for busy family life. No prep needed! Simply heat and serve. Which recipes will your little one love?',
};

export const offersPageDiscover = [
  {
    image: offersPageAssets.discoverChilled,
    label: 'DISCOVER CHILLED MEALS',
    href: '/product-category/chilled-meals',
  },
  {
    image: offersPageAssets.discoverFrozen,
    label: 'DISCOVER FROZEN MEALS',
    href: '/product-category/frozen-meals',
  },
] as const;
