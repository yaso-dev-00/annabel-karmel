import {
  frozenPrepareAccordion,
  frozenProductBadges,
  frozenProductRetailerLogos,
  frozenProductSharedAssets,
  frozenStorageAccordion,
} from '@/data/frozen-product-shared';
import type {
  Product,
  ProductCategory,
  ProductPageContent,
} from '@/lib/products/types';

function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function emptyAccordion() {
  return [
    { title: 'Ingredients', paragraphs: [''] },
    { title: 'Nutrition', paragraphs: [''] },
    { title: 'Prepare', paragraphs: [''] },
    { title: 'Storage', paragraphs: [''] },
  ];
}

function defaultTheme(category: ProductCategory) {
  switch (category) {
    case 'frozen-meals':
      return {
        detailColor: '#D6A8E3',
        accordionBg: '#743DBC',
        discoverButtonBg: '#743DBC',
        discoverButtonColor: '#D6A8E3',
      };
    case 'plant-powered-bites':
      return {
        detailColor: '#EC98A5',
        accordionBg: '#DF58AC',
        discoverButtonBg: '#005D20',
        discoverButtonColor: '#DF58AC',
      };
    default:
      return {
        detailColor: '#8585D5',
        accordionBg: '#6868CD',
        discoverButtonBg: '#1a2078',
        discoverButtonColor: '#8585D5',
      };
  }
}

export function createDefaultPageContent(
  category: ProductCategory,
): ProductPageContent {
  const theme = defaultTheme(category);

  if (category === 'tableware') {
    return {
      kind: 'tableware',
      activeColor: 'soft-sage',
      colorVariants: [
        {
          slug: '',
          color: 'soft-sage',
          label: 'Soft Sage',
          hex: '#c3d2b6',
          gallery: [{ src: '', alt: '' }],
          shopHref: '',
        },
      ],
      description: [''],
      features: {
        heading: 'Practical, safe and parent approved',
        columns: [[''], ['']],
      },
      materials: {
        heading: 'Materials and dimensions',
        items: [''],
      },
      dimensions: {
        items: [''],
      },
      careHeading: 'Looking after me',
      careIcons: [
        { src: '/tableware/icons/look-icon-1.svg', label: '100% food safe' },
        { src: '/tableware/icons/look-icon-2.svg', label: 'Dishwasher safe' },
        {
          src: '/tableware/icons/look-icon-3.svg',
          label: 'Freezer safe to -40°c',
        },
        { src: '/tableware/icons/look-icon-4.svg', label: 'Microwave safe' },
      ],
      retailer: {
        label: 'Available exclusively at:',
        logo: '/tableware/baby-bunting-logo.jpg',
        shopLabel: 'Shop',
        shopHref: '',
      },
      distributorHtml:
        'The range is distributed exclusively in Australia by <a href="https://infagroup.com.au/" target="_blank" rel="noopener noreferrer">Infa Group Pty LTD</a>.',
      completeSetSlugs: [],
    };
  }

  if (category === 'australia-frozen') {
    return {
      kind: 'australia-frozen',
      title: '',
      description: [''],
      carousel: [{ src: '', alt: '' }],
      retailers: {},
      ingredients: [''],
      nutrition: {
        headers: ['', 'Per serving', 'Per 100g'],
        rows: [['Energy', '', '']],
      },
    };
  }

  if (category === 'plant-powered-bites') {
    return {
      kind: 'plant-powered-bites',
      heroAlt: '',
      headingId: 'product-heading',
      assets: {
        heroDesktop: '',
        heroMobile: '',
        detailBg: '',
        detailBgMobile: '',
        retailerBg: '',
        whyNotTryBg: '',
        asdaLogo: '',
        arrowLeft: '/products/nuggets/arrow-left.svg',
        arrowRight: '/products/nuggets/arrow-right.svg',
      },
      hero: {
        title: '',
        intro: '',
        desktopWidth: 1320,
        desktopHeight: 1032,
        mobileWidth: 1320,
        mobileHeight: 1032,
      },
      carousel: [{ src: '', alt: '', width: 800, height: 800 }],
      badges: {
        desktop: '',
        mobile: '',
        alt: '',
        desktopWidth: 1024,
        desktopHeight: 238,
        mobileWidth: 812,
        mobileHeight: 452,
      },
      description: [''],
      accordion: emptyAccordion(),
      retailer: {
        heading: 'Find them in the freezer exclusively at',
        logoHref: '',
      },
      waysToServe: [],
      related: [],
      theme,
    };
  }

  if (category === 'frozen-meals') {
    return {
      kind: 'frozen-meals',
      heroAlt: '',
      headingId: 'product-heading',
      assets: {
        heroDesktop: '',
        heroMobile: '',
        detailBg: '',
        detailBgMobile: '',
        retailerBg: '',
        whyNotTryBg: '',
        arrowLeft: frozenProductSharedAssets.arrowLeft,
        arrowRight: frozenProductSharedAssets.arrowRight,
      },
      hero: {
        title: '',
        intro: '',
        desktopWidth: 2160,
        desktopHeight: 1268,
        mobileWidth: 880,
        mobileHeight: 1376,
      },
      carousel: [{ src: '', alt: '' }],
      badges: frozenProductBadges.map((badge) => ({ ...badge })),
      description: '',
      accordion: [
        { title: 'Ingredients', paragraphs: [''] },
        { title: 'Nutrition', paragraphs: [''] },
        { title: 'Prepare', paragraphs: [...frozenPrepareAccordion] },
        { title: 'Storage', paragraphs: [...frozenStorageAccordion] },
      ],
      retailer: {
        heading: 'Discover in the freezer aisle',
        logos: frozenProductRetailerLogos.map((logo) => ({ ...logo })),
      },
      related: [],
      theme,
    };
  }

  return {
    kind: 'chilled-meals',
    heroAlt: '',
    headingId: 'product-heading',
    assets: {
      heroDesktop: '',
      heroMobile: '',
      detailBg: '',
      detailBgMobile: '',
      retailerBg: '',
      whyNotTryBg: '',
      arrowLeft: '/products/mild-chicken-tikka/arrow-left.svg',
      arrowRight: '/products/mild-chicken-tikka/arrow-right.svg',
    },
    hero: {
      title: '',
      intro: '',
      desktopWidth: 2000,
      desktopHeight: 1169,
      mobileWidth: 880,
      mobileHeight: 770,
    },
    carousel: [{ src: '', alt: '' }],
    badges: [],
    description: '',
    accordion: emptyAccordion(),
    retailer: {
      heading: 'exclusively at',
    },
    related: [],
    theme,
  };
}

export function createDefaultProduct(
  category: ProductCategory = 'chilled-meals',
): Product {
  const now = new Date().toISOString();
  const title = 'Untitled product';
  return {
    id: '',
    slug: slugifyTitle(title),
    category,
    title,
    seo_title: '',
    seo_description: '',
    status: 'draft',
    scheduled_at: null,
    published_at: null,
    created_at: now,
    updated_at: now,
    page: createDefaultPageContent(category),
  };
}
