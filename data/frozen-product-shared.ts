import type { MealProductRetailerLogo } from './chilled-product-page';

const sharedBase = '/products/frozen-shared';

export const frozenProductSharedAssets = {
  arrowLeft: `${sharedBase}/arrow-left.svg`,
  arrowRight: `${sharedBase}/arrow-right.svg`,
  logoTesco: `${sharedBase}/logo-tesco.png`,
  logoAsda: `${sharedBase}/logo-asda.png`,
  logoOcado: `${sharedBase}/logo-ocado.png`,
} as const;

export const frozenProductRetailerLogos: MealProductRetailerLogo[] = [
  {
    src: frozenProductSharedAssets.logoTesco,
    alt: 'Tesco',
    href: 'https://www.tesco.com/groceries/en-GB/search?query=annabel+karmel&sortBy=relevance&facetsArgs=category%3AFrozen+Food&count=24',
  },
  {
    src: frozenProductSharedAssets.logoAsda,
    alt: 'ASDA',
    href: 'https://groceries.asda.com/search/annabel%20karmel',
  },
  {
    src: frozenProductSharedAssets.logoOcado,
    alt: 'Ocado',
    href: 'https://www.ocado.com/search?entry=annabel%20karmel&filters=annabel-karmel-15198',
  },
];

export const frozenPrepareAccordion = [
  'Microwave: Remove meal from box and pierce film several times. Place on a microwaveable plate and heat on full power for 4 minutes. Peel back film carefully, stir and re-cover. Heat on full power for a further 1 minute. After cooking, allow meal to stand for 1 minute in the microwave. Remove film, stir and serve. Do not reheat. All microwaves vary, these are guidelines only.',
  '800W – 5 minutes from frozen',
  'Oven: Preheat oven. Remove meal from box and pierce film several times. Place on a baking tray in the centre of the oven and cook for 20 minutes. Remove meal from the oven on the baking tray, peel back film carefully, stir and re-cover. Cook for a further 10 minutes. After cooking, allow meal to stand on the baking tray for 1 minute. Remove film, stir and serve. Do not reheat. These are guidelines only.',
  '200°C / Fan 180°C / Gas 6 – 30 minutes from frozen',
];

export const frozenStorageAccordion = [
  'Keep frozen at -18C and use within the best before date shown on the side of pack. Do not refreeze when thawed.',
];

export const frozenProductBadges = [
  { src: `${sharedBase}/badge-1.png`, alt: 'Low in salt' },
  { src: `${sharedBase}/badge-2.png`, alt: 'Packed with veggies' },
  { src: `${sharedBase}/badge-3.png`, alt: 'Ready in 5 mins from frozen' },
  { src: `${sharedBase}/badge-4.png`, alt: 'No added sugar' },
  { src: `${sharedBase}/badge-5.png`, alt: 'Source of protein' },
  { src: `${sharedBase}/badge-6.png`, alt: 'Made in Britain' },
];

const chickenPastaBase = '/products/chicken-tomato-mascarpone-pasta';

export const chickenTomatoMascarponePastaBadges = [
  { src: `${chickenPastaBase}/icons/artboard-3.svg`, alt: 'Low in salt' },
  {
    src: `${chickenPastaBase}/icons/artboard-2.svg`,
    alt: 'Packed with veggies',
  },
  {
    src: `${chickenPastaBase}/icons/artboard-2-5.svg`,
    alt: 'Locked in goodness',
  },
  {
    src: `${chickenPastaBase}/icons/artboard-2-9.svg`,
    alt: 'No artificial colours or preservatives',
  },
  {
    src: `${chickenPastaBase}/icons/artboard-4.svg`,
    alt: 'Ready in 5 mins from frozen',
  },
  {
    src: `${chickenPastaBase}/icons/artboard-3-4.svg`,
    alt: 'Approved by tots and kids',
  },
];

export const frozenRelatedImages = {
  bologneseMacCheese: `${sharedBase}/related-bolognese-mac-cheese.png`,
  chickenPasta: `${sharedBase}/related-chicken-pasta.png`,
  chickenTikka: `${sharedBase}/related-chicken-tikka.png`,
  spaghetti: `${sharedBase}/related-spaghetti.png`,
} as const;
