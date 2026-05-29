/**
 * One-off: scrape recipe cards from AK taxonomy pages into data/recipe-listings/*.json
 */
import { mkdir, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = fileURLToPath(new URL("..", import.meta.url));
const OUT_DIR = join(root, "data", "recipe-listings");

const BASE = "https://www.annabelkarmel.com";

const taxonomies = [
  { kind: "recipe-category", slug: "first-foods", label: "First Foods" },
  { kind: "recipe-category", slug: "after-first-tastes", label: "After First Tastes" },
  { kind: "recipe-category", slug: "6-9-months-recipes", label: "6 Months +" },
  { kind: "recipe-category", slug: "9-12-months", label: "9 Months +" },
  { kind: "recipe-category", slug: "baby-recipes", label: "Baby" },
  { kind: "recipe-category", slug: "12-18-months", label: "12 Months +" },
  { kind: "recipe-category", slug: "18-months", label: "18 Months +" },
  { kind: "recipe-category", slug: "toddler-recipes", label: "Toddler" },
  { kind: "recipe-category", slug: "family-recipes", label: "Family" },
  { kind: "recipe-category", slug: "back-to-school", label: "Lunchboxes" },
  { kind: "recipe-category", slug: "finger-foods", label: "Finger Foods" },
  { kind: "meal-time", slug: "all-meal-times", label: "All Meal Times" },
  { kind: "meal-time", slug: "breakfast", label: "Breakfast" },
  { kind: "meal-time", slug: "main-meals", label: "Main Meals" },
  { kind: "meal-time", slug: "dessert-recipes", label: "Desserts" },
  { kind: "meal-time", slug: "brunch", label: "Brunch" },
  { kind: "meal-time", slug: "tea-time", label: "Tea Time" },
  { kind: "meal-time", slug: "light-meals", label: "Light Meals" },
  { kind: "meal-time", slug: "snack", label: "Snacks" },
  { kind: "meal-time", slug: "weaning", label: "Weaning" },
  { kind: "allergen", slug: "dairy-free-recipes", label: "Dairy-free" },
  { kind: "allergen", slug: "egg-free-recipes", label: "Egg-free" },
  { kind: "allergen", slug: "nut-free-recipes", label: "Nut-free" },
  { kind: "allergen", slug: "gluten-free-recipes", label: "Gluten-free" },
  { kind: "allergen", slug: "vegetarian", label: "Vegetarian" },
  { kind: "allergen", slug: "all-free-from", label: "All Free From" },
  { kind: "allergen", slug: "vegan", label: "Plant-based" },
];

const FETCH_OPTS = {
  headers: {
    "user-agent": "Mozilla/5.0 (compatible; AKMirror/1.0)",
    accept: "text/html",
  },
};

function decodeHtml(text) {
  return text
    .replace(/&#038;/g, "&")
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function recipeSlugFromHref(href) {
  try {
    const url = new URL(href, BASE);
    const match = url.pathname.match(/\/recipes\/([^/]+)\/?$/);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

function parseRecipesFromHtml(html) {
  const items = [];
  const seen = new Set();

  const articleRegex =
    /<article[^>]*class="[^"]*type-recipes[^"]*"[^>]*>([\s\S]*?)<\/article>/gi;
  let articleMatch;

  while ((articleMatch = articleRegex.exec(html)) !== null) {
    const block = articleMatch[0];
    const inner = articleMatch[1];
    const appExclusive = /app-exclusive-category-app-exclusive/.test(block);

    const titleMatch =
      inner.match(/<h3[^>]*class="[^"]*dce-post-title[^"]*"[^>]*>\s*<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i) ??
      inner.match(/<h3[^>]*>\s*<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i);

    if (!titleMatch) continue;

    const href = decodeHtml(titleMatch[1].trim());
    const slug = recipeSlugFromHref(href);
    if (!slug || seen.has(slug)) continue;

    const title = decodeHtml(titleMatch[2].replace(/<[^>]+>/g, "").trim());
    if (!title) continue;

    const imgMatch =
      block.match(/<img[^>]+src="([^"]+)"[^>]*>/i) ??
      inner.match(/<img[^>]+src="([^"]+)"[^>]*>/i);
    const image = imgMatch ? decodeHtml(imgMatch[1].trim()) : "";

    if (!image) continue;

    seen.add(slug);
    items.push({
      slug,
      title,
      href: `/recipes/${slug}`,
      image,
      ...(appExclusive ? { appExclusive: true } : {}),
    });
  }

  if (items.length > 0) return items;

  const linkRegex =
    /<a[^>]+href="(https:\/\/www\.annabelkarmel\.com\/recipes\/[^"]+)"[^>]*>[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>/gi;
  let linkMatch;
  while ((linkMatch = linkRegex.exec(html)) !== null) {
    const href = decodeHtml(linkMatch[1].trim());
    const slug = recipeSlugFromHref(href);
    if (!slug || seen.has(slug)) continue;
    const title = decodeHtml(linkMatch[2].replace(/<[^>]+>/g, "").trim());
    if (!title) continue;
    seen.add(slug);
    items.push({
      slug,
      title,
      href: `/recipes/${slug}`,
      image: "",
    });
  }

  return items;
}

function hasNextPage(html, currentPage) {
  const nextPath = `/page/${currentPage + 1}/`;
  return (
    new RegExp(`href="[^"]*${nextPath.replace(/\//g, "\\/")}"`, "i").test(html) ||
    new RegExp(`>\\s*${currentPage + 1}\\s*<`, "i").test(html)
  );
}

async function fetchPage(url) {
  const res = await fetch(url, FETCH_OPTS);
  if (!res.ok) {
    throw new Error(`${res.status} ${url}`);
  }
  return res.text();
}

async function scrapeTaxonomy(taxonomy) {
  const segment =
    taxonomy.kind === "recipe-category"
      ? "recipe-category"
      : taxonomy.kind === "meal-time"
        ? "meal-time"
        : "allergen";
  const basePath = `${BASE}/${segment}/${taxonomy.slug}`;
  const all = [];
  const seen = new Set();
  let page = 1;

  while (true) {
    const url = page === 1 ? `${basePath}/` : `${basePath}/page/${page}/`;
    let html;
    try {
      html = await fetchPage(url);
    } catch (err) {
      if (page > 1) break;
      throw err;
    }

    const batch = parseRecipesFromHtml(html);
    let added = 0;
    for (const item of batch) {
      if (!seen.has(item.slug)) {
        seen.add(item.slug);
        all.push(item);
        added++;
      }
    }

    if (batch.length === 0 && page > 1) break;
    if (!hasNextPage(html, page) || added === 0) {
      if (page === 1 && batch.length > 0 && hasNextPage(html, page)) {
        page++;
        continue;
      }
      break;
    }
    page++;
    if (page > 50) break;
  }

  return all;
}

await mkdir(OUT_DIR, { recursive: true });

for (const taxonomy of taxonomies) {
  const key = `${taxonomy.kind}-${taxonomy.slug}`;
  const outPath = join(OUT_DIR, `${key}.json`);
  try {
    const items = await scrapeTaxonomy(taxonomy);
    await writeFile(outPath, JSON.stringify(items, null, 2) + "\n", "utf8");
    console.log("OK", key, items.length, "recipes");
  } catch (err) {
    console.error("FAIL", key, err.message);
  }
}
