import type { WaysToServeItem } from '@/components/SharedCarousels/WaysToServeCarousel';
import type {
  ChilledProductAccordionItem,
  ChilledProductCarouselSlide,
  ChilledProductRelatedProduct,
  ChilledProductTheme,
} from './chilled-product-page';

export type { ChilledProductAccordionItem as PlantPoweredBitesAccordionItem } from './chilled-product-page';
export type { ChilledProductTheme as PlantPoweredBitesTheme } from './chilled-product-page';

export type PlantPoweredBitesCarouselSlide = ChilledProductCarouselSlide & {
  width: number;
  height: number;
};

export type PlantPoweredBitesBadgeStrip = {
  desktop: string;
  mobile: string;
  alt: string;
  desktopWidth: number;
  desktopHeight: number;
  mobileWidth: number;
  mobileHeight: number;
};

export type PlantPoweredBitesRelatedProduct = ChilledProductRelatedProduct & {
  width?: number;
  height?: number;
};

export type PlantPoweredBitesPageData = {
  slug: string;
  heroAlt: string;
  headingId: string;
  assets: {
    heroDesktop: string;
    heroMobile: string;
    detailBg: string;
    detailBgMobile: string;
    retailerBg: string;
    whyNotTryBg: string;
    asdaLogo: string;
    arrowLeft: string;
    arrowRight: string;
  };
  hero: {
    title: string;
    intro: string;
    desktopWidth: number;
    desktopHeight: number;
    mobileWidth: number;
    mobileHeight: number;
  };
  carousel: PlantPoweredBitesCarouselSlide[];
  badges: PlantPoweredBitesBadgeStrip;
  description: string | readonly string[];
  accordion: ChilledProductAccordionItem[];
  retailer: {
    heading: string;
    logoHref: string;
  };
  waysToServe: WaysToServeItem[];
  related: PlantPoweredBitesRelatedProduct[];
  theme: ChilledProductTheme;
};
