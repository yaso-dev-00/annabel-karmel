export type TablewareSwatchColor = 'soft-sage' | 'warm-stone' | 'blushberry';

export type TablewareProductSwatch = {
  color: TablewareSwatchColor;
  image: string;
  hover: string;
  href: string;
  active: boolean;
};

export function tablewareProductHref(slug: string): string {
  return `/tableware/${slug}/`;
}

export type TablewareProduct = {
  slug: string;
  title: string;
  href: string;
  defaultImage: string;
  hoverImage: string;
  swatches: TablewareProductSwatch[];
};

export const tablewareAssets = {
  heroSlides: [
    {
      image: '/tableware/hero-slide-2.jpg',
      bgColor: '#E9C6CE',
      alt: 'Grow tableware hero slide 1',
    },
    {
      image: '/tableware/hero-slide-1.jpg',
      bgColor: '#DBEEF2',
      alt: 'Grow tableware hero slide 2',
    },
    {
      image: '/tableware/hero-slide-3.jpg',
      bgColor: '#DBEEF2',
      alt: 'Grow tableware hero slide 3',
    },
  ],
  growLogo: '/tableware/grow-logo.png',
  lifestyleBanner: '/tableware/lifestyle-banner.jpg',
  practicalLeft: '/tableware/pr-left-side-img-optimized.png',
  practicalRight: '/tableware/pr-right-side-img-optimized.png',
  practicalLeftMobile: '/tableware/pr-left-side-img-mobile.png',
  practicalRightMobile: '/tableware/pr-right-side-img-mobile.png',
  swatchImages: {
    'soft-sage': '/tableware/swatch-soft-sage.png',
    'warm-stone': '/tableware/swatch-warm-stone.png',
    blushberry: '/tableware/swatch-blushberry.png',
  },
  swatchImagesActive: {
    'soft-sage': '/tableware/swatch-soft-sage-active.png',
    'warm-stone': '/tableware/swatch-warm-stone-active.png',
    blushberry: '/tableware/swatch-blushberry-active.png',
  },
} as const;

export const tablewareIntro = {
  body: "Every mealtime is a chance to nourish, nurture and explore. Annabel's expertly designed range is here to support your little one at every stage – helping them grow in confidence, independence and happiness with every bite.",
};

export const tablewareFeatures = {
  heading: 'Practical, safe and parent approved',
  columns: [
    [
      'Durable and long-lasting',
      '100% premium food grade silicone',
      'Dishwasher, microwave & freezer safe',
    ],
    [
      '100% BPA, BPS, PVC & phthalate-free',
      '100% premium food grade silicone',
      'Playful fruit & veg friends for mealtime fun',
    ],
  ],
};

export const tablewareStory = {
  heading:
    'Introducing baby and toddler tableware for healthy, confident mealtimes',
  paragraphs: [
    'For over 35 years, Annabel Karmel MBE – global bestselling author and baby feeding expert – has helped millions of parents feed their little ones with confidence.',
    'Now she brings that expertise to your table with this beautifully designed baby and toddler tableware that makes mealtimes easy, safe, and fun.',
    "Each piece is crafted from the highest-grade food-safe silicone and features Annabel's signature pop-up fruit and veggie friends. Super durable, smooth, and perfect for curious hands and mouths.",
    'From first bowls and plates to multi-way cups, bibs, freezer trays, and popsicle moulds, GROW has everything you need to turn eating into an adventure.',
    "Because mealtime isn't just about food – it's about messy hands, proud first spoonfuls, wide-eyed excitement of exploring new flavours, and the growing confidence that sparks a lifelong love of food.",
  ],
  distributor:
    'The range is distributed exclusively in Australia by <a href="https://infagroup.com.au/" target="_blank" rel="noopener noreferrer">Infa Group Pty LTD</a>.',
};

// Parsed from live site product grid
export const tablewareProducts: TablewareProduct[] = [
  {
    slug: 'suction-bowl-spoon-set',
    title: 'Suction bowl & spoon set',
    href: '/tableware/suction-bowl-spoon-set/',
    defaultImage: '/tableware/products/ANNA5970_AnnabelKarmel-2-optimized.jpg',
    hoverImage:
      '/tableware/products/Suction-Bowl-Spoon-Set-Blushberry-4-optimized.jpg',
    swatches: [
      {
        color: 'soft-sage',
        image: '/tableware/products/ANNA5970_AnnabelKarmel-1-optimized.jpg',
        hover: '/tableware/products/27_28thNov25-035-optimized.jpg',
        href: '/tableware/suction-bowl-spoon-set-soft-sage/',
        active: false,
      },
      {
        color: 'warm-stone',
        image: '/tableware/products/ANNA5970_AnnabelKarmel-3-1-optimized.jpg',
        hover:
          '/tableware/products/Suction-Bowl-Spoon-Set-Warm-Stone-4-1-optimized.jpg',
        href: '/tableware/suction-bowl-spoon-set-warm-stone/',
        active: false,
      },
      {
        color: 'blushberry',
        image: '/tableware/products/ANNA5970_AnnabelKarmel-2-optimized.jpg',
        hover:
          '/tableware/products/Suction-Bowl-Spoon-Set-Blushberry-4-optimized.jpg',
        href: '/tableware/suction-bowl-spoon-set/',
        active: true,
      },
    ],
  },
  {
    slug: 'plate-soft-sage',
    title: 'Plate',
    href: '/tableware/plate-soft-sage/',
    defaultImage: '/tableware/products/Plate-sage-green-2-optimized.png',
    hoverImage: '/tableware/products/27_28thNov25-067-optimized.jpg',
    swatches: [
      {
        color: 'soft-sage',
        image: '/tableware/products/Plate-sage-green-2-optimized.png',
        hover: '/tableware/products/27_28thNov25-067-optimized.jpg',
        href: '/tableware/plate-soft-sage/',
        active: true,
      },
      {
        color: 'warm-stone',
        image: '/tableware/products/Plate-sage-green-4-optimized.png',
        hover: '/tableware/products/27_28thNov25-062-optimized.jpg',
        href: '/tableware/plate-warm-stone/',
        active: false,
      },
      {
        color: 'blushberry',
        image: '/tableware/products/Plate-sage-green-3-optimized.png',
        hover: '/tableware/products/27_28thNov25-051-min-optimized.jpg',
        href: '/tableware/plate/',
        active: false,
      },
    ],
  },
  {
    slug: 'compartment-plate-warm-stone',
    title: 'Compartment plate',
    href: '/tableware/compartment-plate-warm-stone/',
    defaultImage: '/tableware/products/ANNA5970_AnnabelKarmel-9-optimized.jpg',
    hoverImage: '/tableware/products/27_28thNov25-113-optimized.jpg',
    swatches: [
      {
        color: 'soft-sage',
        image: '/tableware/products/ANNA5970_AnnabelKarmel-7-optimized.jpg',
        hover: '/tableware/products/27_28thNov25-098-optimized.jpg',
        href: '/tableware/compartment-plate-soft-sage/',
        active: false,
      },
      {
        color: 'warm-stone',
        image: '/tableware/products/ANNA5970_AnnabelKarmel-9-optimized.jpg',
        hover: '/tableware/products/27_28thNov25-113-optimized.jpg',
        href: '/tableware/compartment-plate-warm-stone/',
        active: true,
      },
      {
        color: 'blushberry',
        image: '/tableware/products/ANNA5970_AnnabelKarmel-8-optimized.jpg',
        hover: '/tableware/products/27_28thNov25-092-optimized.jpg',
        href: '/tableware/compartment-plate/',
        active: false,
      },
    ],
  },
  {
    slug: 'multi-way-cup-warm-stone',
    title: 'Multi-way cup',
    href: '/tableware/multi-way-cup-warm-stone/',
    defaultImage:
      '/tableware/products/Multi-Way-Cup-Warm-Stone-1-optimized.jpg',
    hoverImage:
      '/tableware/products/Multi-Way-Cup-Warm-Stone-4-1-optimized.jpg',
    swatches: [
      {
        color: 'soft-sage',
        image: '/tableware/products/Multi-Way-Cup-Soft-Sage-1-optimized.jpg',
        hover: '/tableware/products/Multi-Way-Cup-Soft-Sage-4-1-optimized.jpg',
        href: '/tableware/multi-way-cup-soft-sage/',
        active: false,
      },
      {
        color: 'warm-stone',
        image: '/tableware/products/Multi-Way-Cup-Warm-Stone-1-optimized.jpg',
        hover: '/tableware/products/Multi-Way-Cup-Warm-Stone-4-1-optimized.jpg',
        href: '/tableware/multi-way-cup-warm-stone/',
        active: true,
      },
      {
        color: 'blushberry',
        image: '/tableware/products/Multi-Way-Cup-Blushberry-1-optimized.jpg',
        hover: '/tableware/products/Multi-way-Cup-Blushberry-4-1-optimized.jpg',
        href: '/tableware/multi-way-cup/',
        active: false,
      },
    ],
  },
  {
    slug: 'catch-all-bib-set-soft-sage-warm-stone',
    title: 'Catch-all bib set',
    href: '/tableware/catch-all-bib-set-soft-sage-warm-stone/',
    defaultImage:
      '/tableware/products/Catch-all-Bib-Set-Soft-Sage-Warm-Stone-1-1-optimized.jpg',
    hoverImage:
      '/tableware/products/Catch-all-Bib-Set-Soft-Sage-Warm-Stone-4-1-optimized.jpg',
    swatches: [
      {
        color: 'soft-sage',
        image:
          '/tableware/products/Catch-all-Bib-Set-Soft-Sage-Warm-Stone-1-1-optimized.jpg',
        hover:
          '/tableware/products/Catch-all-Bib-Set-Soft-Sage-Warm-Stone-4-1-optimized.jpg',
        href: '/tableware/catch-all-bib-set-soft-sage-warm-stone/',
        active: true,
      },
      {
        color: 'blushberry',
        image:
          '/tableware/products/Catch-all-Bib-Set-Blushberry-Warm-Stone-1-1-optimized.jpg',
        hover:
          '/tableware/products/Catch-all-Bib-Set-Blushberry-Warm-Stone-21-optimized.jpg',
        href: '/tableware/catch-all-bib-set/',
        active: false,
      },
    ],
  },
  {
    slug: 'placemat',
    title: 'Placemat',
    href: '/tableware/placemat/',
    defaultImage: '/tableware/products/Placemat-Blushberry-1-optimized.jpg',
    hoverImage: '/tableware/products/27_28thNov25-113-optimized.jpg',
    swatches: [
      {
        color: 'soft-sage',
        image: '/tableware/products/Placemat-Soft-Sage-1-optimized.jpg',
        hover: '/tableware/products/Placemat-Soft-Sage-4-optimized.jpg',
        href: '/tableware/soft-sage/',
        active: false,
      },
      {
        color: 'warm-stone',
        image: '/tableware/products/Placemat-Warm-Stone-1-optimized.jpg',
        hover: '/tableware/products/Placemat-Warm-Stone-4-optimized.jpg',
        href: '/tableware/placemat-warm-stone/',
        active: false,
      },
      {
        color: 'blushberry',
        image: '/tableware/products/Placemat-Blushberry-1-optimized.jpg',
        hover: '/tableware/products/27_28thNov25-113-optimized.jpg',
        href: '/tableware/placemat/',
        active: true,
      },
    ],
  },
  {
    slug: 'cutlery-set',
    title: 'Cutlery set',
    href: '/tableware/cutlery-set/',
    defaultImage: '/tableware/products/Cutlery-Set-Blushberry-1-optimized.jpg',
    hoverImage: '/tableware/products/Cutlery-Set-Blushberry-4-optimized.jpg',
    swatches: [
      {
        color: 'soft-sage',
        image: '/tableware/products/Cutlery-Set-Soft-Sage-1-optimized.jpg',
        hover: '/tableware/products/27_28thNov25-067-optimized.jpg',
        href: '/tableware/cutlery-set-soft-sage/',
        active: false,
      },
      {
        color: 'warm-stone',
        image: '/tableware/products/Cutlery-Set-Warm-Stone-1-optimized.jpg',
        hover: '/tableware/products/Cutlery-Set-Warm-Stone-4-optimized.jpg',
        href: '/tableware/cutlery-set-warm-stone/',
        active: false,
      },
      {
        color: 'blushberry',
        image: '/tableware/products/Cutlery-Set-Blushberry-1-optimized.jpg',
        hover: '/tableware/products/Cutlery-Set-Blushberry-4-optimized.jpg',
        href: '/tableware/cutlery-set/',
        active: true,
      },
    ],
  },
  {
    slug: 'easy-grip-baby-spoons',
    title: 'Easy grip baby spoons',
    href: '/tableware/easy-grip-baby-spoons/',
    defaultImage:
      '/tableware/products/Easy-Grip-Baby-Spoons-Blushberry-Warm-Stone-1-optimized.jpg',
    hoverImage:
      '/tableware/products/Easy-Grip-Baby-Spoons-Blushberry-Warm-Stone-4-optimized.jpg',
    swatches: [
      {
        color: 'soft-sage',
        image:
          '/tableware/products/Easy-Grip-Baby-Spoons-Soft-Sage-Warm-Stone-1-optimized.jpg',
        hover: '/tableware/products/27_28thNov25-035-optimized.jpg',
        href: '/tableware/easy-grip-baby-spoons-soft-sage/',
        active: false,
      },
      {
        color: 'blushberry',
        image:
          '/tableware/products/Easy-Grip-Baby-Spoons-Blushberry-Warm-Stone-1-optimized.jpg',
        hover:
          '/tableware/products/Easy-Grip-Baby-Spoons-Blushberry-Warm-Stone-4-optimized.jpg',
        href: '/tableware/easy-grip-baby-spoons/',
        active: true,
      },
    ],
  },
  {
    slug: 'food-freezer-tray-soft-sage',
    title: 'Food freezer tray',
    href: '/tableware/food-freezer-tray-soft-sage/',
    defaultImage: '/tableware/products/ANNA5970_AnnabelKarmel-10-optimized.jpg',
    hoverImage: '/tableware/products/Freezer-Tray-Soft-Sage-2-optimized.jpg',
    swatches: [
      {
        color: 'soft-sage',
        image: '/tableware/products/ANNA5970_AnnabelKarmel-10-optimized.jpg',
        hover: '/tableware/products/Freezer-Tray-Soft-Sage-2-optimized.jpg',
        href: '/tableware/food-freezer-tray-soft-sage/',
        active: true,
      },
      {
        color: 'warm-stone',
        image: '/tableware/products/ANNA5970_AnnabelKarmel-12-optimized.jpg',
        hover: '/tableware/products/Freezer-Tray-Warm-Stone-2-optimized.jpg',
        href: '/tableware/food-freezer-tray-warm-stone/',
        active: false,
      },
      {
        color: 'blushberry',
        image: '/tableware/products/ANNA5970_AnnabelKarmel-11-optimized.jpg',
        hover: '/tableware/products/Freezer-Tray-Blushberry-2-optimized.jpg',
        href: '/tableware/food-freezer-tray/',
        active: false,
      },
    ],
  },
  {
    slug: 'popsicle-mould',
    title: 'Popsicle mould',
    href: '/tableware/popsicle-mould/',
    defaultImage: '/tableware/products/ANNA5970_AnnabelKarmel-14-optimized.jpg',
    hoverImage: '/tableware/products/Popsicle-Mould-Blushberry-4-optimized.jpg',
    swatches: [
      {
        color: 'soft-sage',
        image: '/tableware/products/ANNA5970_AnnabelKarmel-13-optimized.jpg',
        hover: '/tableware/products/Popsicle-Mould-Soft-Sage-4-optimized.jpg',
        href: '/tableware/popsicle-mould-soft-sage/',
        active: false,
      },
      {
        color: 'warm-stone',
        image: '/tableware/products/ANNA5970_AnnabelKarmel-15-optimized.jpg',
        hover: '/tableware/products/Popsicle-Mould-Warm-Stone-4-optimized.jpg',
        href: '/tableware/popsicle-mould-warm-stone/',
        active: false,
      },
      {
        color: 'blushberry',
        image: '/tableware/products/ANNA5970_AnnabelKarmel-14-optimized.jpg',
        hover: '/tableware/products/Popsicle-Mould-Blushberry-4-optimized.jpg',
        href: '/tableware/popsicle-mould/',
        active: true,
      },
    ],
  },
  {
    slug: 'mealtime-gift-set-soft-sage',
    title: 'Mealtime gift set',
    href: '/tableware/mealtime-gift-set-soft-sage/',
    defaultImage:
      '/tableware/products/Mealtime-Gift-set-Soft-Sage-1-optimized.jpg',
    hoverImage: '/tableware/products/27_28thNov25-175-optimized.jpg',
    swatches: [
      {
        color: 'soft-sage',
        image:
          '/tableware/products/Mealtime-Gift-set-Soft-Sage-1-optimized.jpg',
        hover: '/tableware/products/27_28thNov25-175-optimized.jpg',
        href: '/tableware/mealtime-gift-set-soft-sage/',
        active: true,
      },
      {
        color: 'warm-stone',
        image:
          '/tableware/products/Mealtime-Gift-Set-Warm-Stone-1-optimized.jpg',
        hover: '/tableware/products/27_28thNov25-170-optimized.jpg',
        href: '/tableware/mealtime-gift-set-warm-stone/',
        active: false,
      },
      {
        color: 'blushberry',
        image:
          '/tableware/products/Mealtime-Gift-Set-Blushberry-1-optimized.jpg',
        hover: '/tableware/products/27_28thNov25-161-1-optimized.jpg',
        href: '/tableware/mealtime-gift-set/',
        active: false,
      },
    ],
  },
];
