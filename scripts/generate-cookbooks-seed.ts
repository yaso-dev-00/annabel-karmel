import { createHash } from "crypto";
import { writeFileSync } from "fs";
import path from "path";
import { cookbookDetailsBySlug } from "../data/cookbook-details";
import { ourBooksProducts } from "../data/our-books-page";

function stableId(slug: string): string {
  const hash = createHash("sha256").update(`cookbook:${slug}`).digest("hex");
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}-${hash.slice(16, 20)}-${hash.slice(20, 32)}`;
}

const now = "2026-01-01T00:00:00.000Z";

const cookbooks = ourBooksProducts.map((product) => {
  const details = cookbookDetailsBySlug[product.slug];
  const detailBody = details?.detailBody ?? product.body;
  const detailBodyHighlights = details?.detailBodyHighlights ?? product.bodyHighlights;

  return {
    id: stableId(product.slug),
    slug: product.slug,
    title: product.title,
    subtitle: product.subtitle,
    year: null,
    badge: "",
    body: product.body,
    bodyHighlights: product.bodyHighlights,
    detailBody,
    detailBodyHighlights,
    suitableFor: product.suitableFor,
    buyLinks: [{ retailer: "Buy Now", url: product.buyNowHref }],
    carouselImages: product.carouselImages,
    seo_title: `${product.title} | Annabel Karmel`,
    seo_description: detailBody.split("\n\n")[0] ?? product.subtitle,
    status: "published" as const,
    scheduled_at: null,
    published_at: now,
    created_at: now,
    updated_at: now,
  };
});

const outPath = path.join(process.cwd(), "data", "cms", "cookbooks.seed.json");
writeFileSync(outPath, `${JSON.stringify({ cookbooks }, null, 2)}\n`, "utf8");
console.log(`Wrote ${cookbooks.length} cookbooks to ${outPath}`);
