export type ChilledProductAccordionItem = {
  title: string;
  paragraphs?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
};

export type ChilledProductBadge = {
  src: string;
  alt: string;
};

export type ChilledProductCarouselSlide = {
  src: string;
  alt: string;
};

export type ChilledProductRelatedProduct = {
  image: string;
  href: string;
};

export type MealProductRetailerLogo = {
  src: string;
  alt: string;
  href: string;
};

export type ChilledProductTheme = {
  detailColor: string;
  accordionBg: string;
  discoverButtonBg: string;
  discoverButtonColor: string;
  detailTextColor?: string;
  heroTextColor?: string;
};

export type ChilledProductPageData = {
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
    tescoLogo?: string;
    arrowLeft: string;
    arrowRight: string;
  };
  hero: {
    title: string;
    intro: string;
  };
  carousel: ChilledProductCarouselSlide[];
  badges: ChilledProductBadge[];
  description: string;
  accordion: ChilledProductAccordionItem[];
  retailer: {
    heading: string;
    logoHref?: string;
  };
  related: ChilledProductRelatedProduct[];
  theme: ChilledProductTheme;
};

export type MealProductPageData = ChilledProductPageData;
