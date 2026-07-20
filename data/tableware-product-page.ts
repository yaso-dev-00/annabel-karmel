import type { TablewareProduct, TablewareSwatchColor } from "@/data/tableware-page";
import { tablewareAssets, tablewareProductHref, tablewareProducts } from "@/data/tableware-page";

import tablewareProductPagesJson from "@/data/tableware-product-pages.json";

export type TablewareGalleryImage = {
  src: string;
  alt: string;
};

export type TablewareColorSwatch = {
  slug: string;
  color: TablewareSwatchColor;
  label: string;
  hex: string;
};

export type TablewareCareIcon = {
  src: string;
  label: string;
};

export type TablewareProductPageData = {
  slug: string;
  title: string;
  metaDescription: string;
  activeColor: TablewareSwatchColor;
  activeColorLabel: string;
  /** Unique swatch identity for preview when multiple variants share a colour. */
  activeSwatchKey?: string;
  swatches: TablewareColorSwatch[];
  gallery: TablewareGalleryImage[];
  description: string[];
  features: {
    heading: string;
    columns: string[][];
  };
  materials: {
    heading: string;
    items: string[];
  };
  dimensions: {
    items: string[];
  };
  careHeading: string;
  careIcons: TablewareCareIcon[];
  retailer: {
    label: string;
    logo: string;
    shopLabel: string;
    shopHref: string;
  };
  distributorHtml: string;
  completeSetSlugs: string[];
};

export const tablewareProductSharedAssets = {
  growLogo: tablewareAssets.growLogo,
  babyBuntingLogo: "/tableware/baby-bunting-logo.jpg",
} as const;

const tablewareProductPages = tablewareProductPagesJson as Record<string, TablewareProductPageData>;

export function tablewareSlugFromHref(href: string): string {
  if (href.startsWith("/tableware/")) {
    return href.replace(/^\/tableware\//, "").replace(/\/$/, "");
  }

  return href.replace(/\/$/, "").split("/").filter(Boolean).pop() ?? href;
}

export function tablewareLocalHref(hrefOrSlug: string): string {
  if (hrefOrSlug.startsWith("/tableware/")) {
    return hrefOrSlug.endsWith("/") ? hrefOrSlug : `${hrefOrSlug}/`;
  }

  if (!hrefOrSlug.includes("/")) {
    return tablewareProductHref(hrefOrSlug);
  }

  const slug = tablewareSlugFromHref(hrefOrSlug);
  return tablewareProductHref(slug);
}

export function getTablewareProductPageData(slug: string): TablewareProductPageData | undefined {
  return tablewareProductPages[slug];
}

export function getAllTablewareProductSlugs(): string[] {
  return Object.keys(tablewareProductPages);
}

function findListingProduct(slug: string): TablewareProduct | undefined {
  return tablewareProducts.find(
    (product) =>
      product.slug === slug ||
      tablewareSlugFromHref(product.href) === slug ||
      product.swatches.some((swatch) => tablewareSlugFromHref(swatch.href) === slug),
  );
}

export function getCompleteSetProducts(
  slugs: string[],
  excludeSlug?: string,
): TablewareProduct[] {
  const excludeFamily = excludeSlug?.replace(/-(soft-sage|warm-stone|blushberry)$/, "") ?? excludeSlug;
  const seen = new Set<string>();

  return slugs
    .map((itemSlug) => findListingProduct(itemSlug))
    .filter((product): product is TablewareProduct => {
      if (!product || seen.has(product.slug)) return false;
      seen.add(product.slug);

      if (!excludeSlug) return true;

      const productFamily = product.slug.replace(/-(soft-sage|warm-stone|blushberry)$/, "");
      return product.slug !== excludeSlug && productFamily !== excludeFamily;
    });
}
