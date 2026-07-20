import type { CookbookPageData } from "@/lib/cookbooks";
import type { Cookbook } from "@/lib/cookbooks/types";

export function cookbookToPageData(cookbook: Cookbook): CookbookPageData {
  const buyNowHref = cookbook.buyLinks.find((link) => link.url.trim())?.url ?? "";
  const moreInfoHref = `/apps-books/${cookbook.slug}`;
  const metaDescription =
    cookbook.seo_description.trim() ||
    cookbook.detailBody.split("\n\n")[0]?.trim() ||
    cookbook.subtitle;

  return {
    slug: cookbook.slug,
    title: cookbook.title,
    subtitle: cookbook.subtitle,
    body: cookbook.body,
    bodyHighlights: cookbook.bodyHighlights,
    suitableFor: cookbook.suitableFor,
    moreInfoHref,
    buyNowHref,
    carouselImages: cookbook.carouselImages
      .filter((image) => image.src.trim())
      .map(({ src, alt }) => ({ src, alt })),
    detailBody: cookbook.detailBody,
    detailBodyHighlights: cookbook.detailBodyHighlights,
    metaDescription,
  };
}
