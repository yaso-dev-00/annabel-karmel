import type { AustraliaFrozenProductPageData } from "@/data/australia-frozen-product-page";
import type { ChilledProductPageData } from "@/data/chilled-product-page";
import type { FrozenProductPageData } from "@/data/frozen-product-page";
import type { PlantPoweredBitesPageData } from "@/data/plant-powered-bites-product-page";
import type { TablewareProductPageData } from "@/data/tableware-product-page";
import type { Product } from "@/lib/products/types";
import { tablewareContentToPageData } from "@/lib/products/tableware-variants";

export type ProductPageData =
  | { category: "chilled-meals"; data: ChilledProductPageData }
  | { category: "frozen-meals"; data: FrozenProductPageData }
  | { category: "plant-powered-bites"; data: PlantPoweredBitesPageData }
  | { category: "australia-frozen"; data: AustraliaFrozenProductPageData }
  | { category: "tableware"; data: TablewareProductPageData };

export function productToPageData(
  product: Product,
  tablewareVariantKey?: string | null,
): ProductPageData {
  const { slug, title, page, seo_description } = product;

  switch (page.kind) {
    case "chilled-meals": {
      const { kind: _kind, ...rest } = page;
      return { category: "chilled-meals", data: { ...rest, slug } };
    }
    case "frozen-meals": {
      const { kind: _kind, ...rest } = page;
      return { category: "frozen-meals", data: { ...rest, slug } };
    }
    case "plant-powered-bites": {
      const { kind: _kind, ...rest } = page;
      return { category: "plant-powered-bites", data: { ...rest, slug } };
    }
    case "australia-frozen": {
      const { kind: _kind, ...rest } = page;
      return {
        category: "australia-frozen",
        data: {
          ...rest,
          slug,
          metaDescription: seo_description,
        },
      };
    }
    case "tableware": {
      return {
        category: "tableware",
        data: tablewareContentToPageData(
          page,
          { slug, title, metaDescription: seo_description },
          tablewareVariantKey,
        ),
      };
    }
  }
}
