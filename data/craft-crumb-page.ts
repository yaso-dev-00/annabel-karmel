export const craftCrumbLinks = {
  tescoSearch:
    'https://www.tesco.com/groceries/en-GB/search?query=craft+%26+crumb&inputType=free+text',
  craftAndCrumb: 'https://www.craftandcrumb.com/pages/annabel-karmel',
  chocMiceMuffins: 'https://www.tesco.com/groceries/en-GB/products/321838958',
  teddyBearBiscuits: 'https://www.tesco.com/groceries/en-GB/products/321848468',
  beWildBiscuits: 'https://www.tesco.com/groceries/en-GB/products/321832014',
} as const;

export const craftCrumbAssets = {
  titleBanner: '/craft-crumb/title-banner.png',
  lifestyleHero: '/craft-crumb/lifestyle-hero.jpg',
  introSection: '/craft-crumb/intro-section.jpg',
  chocMiceMuffins: '/craft-crumb/choc-mice-muffins.jpg',
  teddyBearBiscuits: '/craft-crumb/teddy-bear-biscuits.png',
  beWildBiscuits: '/craft-crumb/be-wild-biscuits.jpg',
  footerBanner: '/craft-crumb/footer-banner.jpg',
} as const;

export const craftCrumbIntro = {
  collaboration:
    'My collaboration with the amazing Craft & Crumb just got even more exciting...',
  tesco: 'Our TRIO of fun bake and craft kits are now available at Tesco!',
  body: 'Inspired by my own favourite bakes, the range of tot-friendly kits will get little hands and minds inspired in the kitchen.',
  closing: "Let's whisk little bakers off on a food adventure!",
};

export type CraftCrumbProduct = {
  slug: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  href: string;
  reverse?: boolean;
};

export const craftCrumbProducts: CraftCrumbProduct[] = [
  {
    slug: 'choc-mice-muffins',
    title: 'Choc Mice Muffins',
    body: "Hickory, Dickory, Dock…get ready, it's bake o'clock! You'll have little ones scurrying to the kitchen with our mischievous muffins, complete with cute rocking mice craft.",
    image: craftCrumbAssets.chocMiceMuffins,
    imageAlt: 'Choc Mice Muffins bake and craft kit',
    href: craftCrumbLinks.chocMiceMuffins,
  },
  {
    slug: 'teddy-bear-biscuits',
    title: 'Teddy Bear Biscuits',
    body: "No teddy bears' picnic would be complete without a batch of beary tasty cookies. Complete with a make-your-own tray for sharing, it's time for a pawesome kitchen adventure.",
    image: craftCrumbAssets.teddyBearBiscuits,
    imageAlt: 'Teddy Bear Biscuits bake and craft kit',
    href: craftCrumbLinks.teddyBearBiscuits,
    reverse: true,
  },
  {
    slug: 'be-wild-biscuits',
    title: 'Be Wild Biscuits',
    body: "Let little imaginations run free with these roarsome animal print biscuits! Packed with all natural ingredients, this tasty adventure is perfect for little paws with wild imaginations. Get ready for a biscuit tin stampede – these treats won't last long!",
    image: craftCrumbAssets.beWildBiscuits,
    imageAlt: 'Be Wild Biscuits bake and craft kit',
    href: craftCrumbLinks.beWildBiscuits,
  },
];

export const craftCrumbCta = {
  label: 'DISCOVER THE RANGE',
  href: craftCrumbLinks.tescoSearch,
};
