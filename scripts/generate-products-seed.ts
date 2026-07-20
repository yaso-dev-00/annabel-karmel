/**
 * One-off helper: node --import tsx scripts/generate-products-seed.ts
 * Or: npx tsx scripts/generate-products-seed.ts
 */
import { writeFileSync } from "fs";
import path from "path";
import { mildChickenTikkaPageData } from "../data/mild-chicken-tikka-page";
import { chickenTikkaMasalaPageData } from "../data/chicken-tikka-masala-page";
import { nuggetsPageData } from "../data/nuggets-page";
import { getAustraliaFrozenProductData } from "../data/australia-frozen-products";

const now = "2026-07-16T12:00:00.000Z";

function omitSlug<T extends { slug: string }>(data: T) {
  const { slug: _slug, ...rest } = data;
  return rest;
}

const au = getAustraliaFrozenProductData("beautiful-bolognese-pasta-bake")!;

const store = {
  products: [
    {
      id: "demo-product-chilled-mild-chicken-tikka",
      slug: "demo-mild-chicken-tikka",
      category: "chilled-meals",
      title: "Mild chicken tikka with fluffy rice",
      seo_title: "Mild Chicken Tikka | Annabel Karmel",
      seo_description:
        "Curry night with a tot-twist! Tender chicken pieces in a mild creamy tomato and coconut sauce with fluffy rice. Made without dairy.",
      status: "draft",
      scheduled_at: null,
      published_at: null,
      created_at: now,
      updated_at: now,
      page: {
        kind: "chilled-meals",
        ...omitSlug(mildChickenTikkaPageData),
      },
    },
    {
      id: "demo-product-frozen-chicken-tikka-masala",
      slug: "demo-chicken-tikka-masala",
      category: "frozen-meals",
      title: "Chicken tikka with fluffy rice",
      seo_title: "Chicken Tikka Masala | Frozen Ready Meal for Children | Annabel Karmel",
      seo_description:
        "Tender chicken in a creamy coconut sauce with butternut squash, tomato and a hint of mango chutney. Made without dairy.",
      status: "draft",
      scheduled_at: null,
      published_at: null,
      created_at: now,
      updated_at: now,
      page: {
        kind: "frozen-meals",
        ...omitSlug(chickenTikkaMasalaPageData),
      },
    },
    {
      id: "demo-product-plant-nuggets",
      slug: "demo-nuggets",
      category: "plant-powered-bites",
      title: "Meat-free chicken style nuggets",
      seo_title: "Meat-Free Chicken Style Nuggets | Annabel Karmel",
      seo_description:
        "Expect spontaneous happy dances at the table with Annabel's plant-powered nuggets. Ready from frozen in just 5 minutes.",
      status: "draft",
      scheduled_at: null,
      published_at: null,
      created_at: now,
      updated_at: now,
      page: {
        kind: "plant-powered-bites",
        ...omitSlug(nuggetsPageData),
      },
    },
    {
      id: "demo-product-au-bolognese-pasta-bake",
      slug: "demo-bolognese-pasta-bake",
      category: "australia-frozen",
      title: "Bolognese Pasta Bake",
      seo_title: "Bolognese Pasta Bake | Annabel Karmel",
      seo_description: au.metaDescription,
      status: "draft",
      scheduled_at: null,
      published_at: null,
      created_at: now,
      updated_at: now,
      page: {
        kind: "australia-frozen",
        title: au.title,
        description: au.description,
        carousel: au.carousel,
        retailers: au.retailers,
        ingredients: au.ingredients,
        nutrition: au.nutrition,
      },
    },
  ],
};

const out = path.join(process.cwd(), "data", "cms", "products.seed.json");
writeFileSync(out, JSON.stringify(store, null, 2) + "\n", "utf8");
console.log(`Wrote ${store.products.length} products to ${out}`);
