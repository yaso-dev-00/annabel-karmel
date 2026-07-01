import { cookbookDetailsBySlug } from "@/data/cookbook-details";
import { ourBooksProducts, type OurBooksProduct } from "@/data/our-books-page";

export type CookbookPageData = OurBooksProduct & {
  detailBody: string;
  detailBodyHighlights: string[];
  metaDescription: string;
};

export function getAllCookbookSlugs(): string[] {
  return ourBooksProducts.map((product) => product.slug);
}

export function getCookbookBySlug(slug: string): CookbookPageData | null {
  const product = ourBooksProducts.find((item) => item.slug === slug);
  if (!product) {
    return null;
  }

  const details = cookbookDetailsBySlug[slug];
  const detailBody = details?.detailBody ?? product.body;
  const detailBodyHighlights = details?.detailBodyHighlights ?? product.bodyHighlights;
  const metaDescription = detailBody.split("\n\n")[0] ?? product.subtitle;

  return {
    ...product,
    detailBody,
    detailBodyHighlights,
    metaDescription,
  };
}
