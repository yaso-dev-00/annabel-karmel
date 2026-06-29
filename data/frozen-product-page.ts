import type {
  ChilledProductAccordionItem,
  ChilledProductBadge,
  ChilledProductCarouselSlide,
  ChilledProductRelatedProduct,
  ChilledProductTheme,
  MealProductRetailerLogo,
  ProductHeroDimensions,
} from "./chilled-product-page";

export type {
  ChilledProductAccordionItem as FrozenProductAccordionItem,
  ChilledProductBadge as FrozenProductBadge,
  ChilledProductCarouselSlide as FrozenProductCarouselSlide,
  ChilledProductRelatedProduct as FrozenProductRelatedProduct,
  ChilledProductTheme as FrozenProductTheme,
  MealProductRetailerLogo,
};

export type FrozenProductPageData = {
  slug: string;
  heroAlt: string;
  headingId: string;
  assets: {
    heroDesktop: string;
    heroMobile: string;
    detailBg: string;
    detailBgMobile: string;
    cloudLeft?: string;
    cloudRight?: string;
    retailerBg: string;
    whyNotTryBg: string;
    arrowLeft: string;
    arrowRight: string;
  };
  hero: {
    title: string;
    intro: string;
  } & ProductHeroDimensions;
  carousel: ChilledProductCarouselSlide[];
  badges: ChilledProductBadge[];
  description: string;
  accordion: ChilledProductAccordionItem[];
  retailer: {
    heading: string;
    logos: MealProductRetailerLogo[];
  };
  related: ChilledProductRelatedProduct[];
  theme: ChilledProductTheme;
};
