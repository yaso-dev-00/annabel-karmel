import {
  australiaFrozenAssets,
  australiaFrozenPromise,
  australiaFrozenRange,
  australiaFrozenWhereToBuy,
} from "./australia-frozen-page";

export type AustraliaFrozenProductCarouselSlide = {
  src: string;
  alt: string;
};

export type AustraliaFrozenProductPageData = {
  slug: string;
  title: string;
  metaDescription: string;
  description: string[];
  carousel: AustraliaFrozenProductCarouselSlide[];
  retailers: {
    woolworths?: string;
    coles?: string;
    iga?: string;
  };
  ingredients: string[];
  nutrition: {
    headers: [string, string, string];
    rows: string[][];
  };
};

export const australiaFrozenProductSharedAssets = {
  woodBg: australiaFrozenAssets.woodBg,
  promiseBg: `${australiaFrozenAssets.promiseBg}`,
  promisePhoto: "/product-category/australia-frozen/annabel-group-mia.jpg",
  buyBg: australiaFrozenAssets.buyBg,
  logoWoolworths: australiaFrozenAssets.logoWoolworths,
  logoColes: australiaFrozenAssets.logoColes,
  logoIga: australiaFrozenAssets.logoIga,
} as const;

export const australiaFrozenProductPromise = australiaFrozenPromise;
export const australiaFrozenProductRange = australiaFrozenRange;
export const australiaFrozenProductWhereToBuy = australiaFrozenWhereToBuy;

export function getAustraliaFrozenProductRetailers(
  productRetailers: AustraliaFrozenProductPageData["retailers"],
) {
  const entries: { src: string; alt: string; href: string }[] = [];

  if (productRetailers.woolworths) {
    entries.push({
      src: australiaFrozenProductSharedAssets.logoWoolworths,
      alt: "Woolworths",
      href: productRetailers.woolworths,
    });
  }

  if (productRetailers.coles) {
    entries.push({
      src: australiaFrozenProductSharedAssets.logoColes,
      alt: "Coles",
      href: productRetailers.coles,
    });
  }

  if (productRetailers.iga) {
    entries.push({
      src: australiaFrozenProductSharedAssets.logoIga,
      alt: "IGA",
      href: productRetailers.iga,
    });
  }

  return entries;
}
