/**
 * Scrape full recipe detail pages into data/recipe-details/{slug}.json
 * Usage: node scripts/fetch-recipe-details.mjs [--force] [--limit=N]
 */
import { mkdir, readdir, readFile, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = fileURLToPath(new URL("..", import.meta.url));
const LISTINGS_DIR = join(root, "data", "recipe-listings");
const OUT_DIR = join(root, "data", "recipe-details");
const BASE = "https://www.annabelkarmel.com";

const force = process.argv.includes("--force");
const limitArg = process.argv.find((a) => a.startsWith("--limit="));
const limit = limitArg ? Number(limitArg.split("=")[1]) : Infinity;

const FETCH_OPTS = {
  headers: { "user-agent": "Mozilla/5.0 (compatible; AKMirror/1.0)", accept: "text/html" },
};

function decodeHtml(text) {
  return text
    .replace(/&#038;/g, "&")
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function stripTags(html) {
  return decodeHtml(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function parseTaxonomyMenu(html, classMarker) {
  const block = html.match(
    new RegExp(`recipe-cat-list[\\s\\S]*?${classMarker}[\\s\\S]*?<\\/nav>`, "i"),
  );
  if (!block) return [];
  const links = [...block[0].matchAll(/<a href="([^"]+)"[^>]*><span>([^<]+)<\/span>/gi)];
  const seen = new Set();
  const items = [];
  for (const [, href, label] of links) {
    const path = href.replace(BASE, "");
    const key = `${path}:${label}`;
    if (seen.has(key)) continue;
    seen.add(key);
    items.push({ label: decodeHtml(label), href: path.endsWith("/") ? path : `${path}/` });
  }
  return items;
}

function parseIngredients(html) {
  const block = html.match(/Ingredients<\/h2>[\s\S]*?Method<\/h2>/i);
  if (!block) return [];
  const repeater = block[0].match(/dce-acf-repeater-item[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i);
  if (repeater) {
    const raw = repeater[1]
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, "");
    return raw
      .split("\n")
      .map((line) => decodeHtml(line.trim()))
      .filter(Boolean);
  }
  const ol = block[0].match(/<ol[^>]*>([\s\S]*?)<\/ol>/i);
  if (ol) {
    return [...ol[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
      .map((m) => stripTags(m[1]))
      .filter(Boolean);
  }
  return [];
}

function parseMethod(html) {
  const block = html.match(/recipe-method[\s\S]*?<ol>([\s\S]*?)<\/ol>/i);
  if (!block) return [];
  return [...block[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
    .map((m) => stripTags(m[1]))
    .filter(Boolean);
}

function parseMeta(html) {
  const chunk = html.slice(html.indexOf("recipe-suitable"), html.indexOf("Ingredients</h2>"));
  const texts = [...chunk.matchAll(/elementor-icon-list-text">([^<]+)</gi)].map((m) =>
    decodeHtml(m[1].trim()),
  );
  const suitableForFreezing = texts.some((t) => /freezing/i.test(t));
  const prepTime = texts.find((t) => /mins?$/i.test(t) && chunk.indexOf("recipe-prep") < chunk.indexOf(t));
  const cookTime = texts.find((t) => /mins?$/i.test(t));
  const portions = texts.find((t) => /portion/i.test(t));

  let prep;
  let cook;
  let makes;
  const prepMatch = chunk.match(/recipe-prep[\s\S]*?elementor-icon-list-text">([^<]+)</i);
  const cookMatch = chunk.match(/recipe-cook[\s\S]*?elementor-icon-list-text">([^<]+)</i);
  const makesMatch = chunk.match(/recipe-makes[\s\S]*?elementor-icon-list-text">([^<]+)</i);
  if (prepMatch) prep = decodeHtml(prepMatch[1].trim());
  if (cookMatch) cook = decodeHtml(cookMatch[1].trim());
  if (makesMatch) makes = decodeHtml(makesMatch[1].trim());

  return {
    suitableForFreezing,
    prepTime: prep ?? texts.find((t) => /^\d+\s*mins?$/i.test(t)),
    cookTime: cook,
    portions: makes ?? portions,
  };
}

function parseRecipeHtml(html, slug) {
  const ogTitle = html.match(/property="og:title" content="([^"]+)"/)?.[1];
  const mainTitle = html.match(
    /recipe-main-section[\s\S]{0,8000}?<h1[^>]*class="[^"]*elementor-heading-title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i,
  );
  const title = ogTitle
    ? decodeHtml(ogTitle.replace(/\s*\|\s*Annabel Karmel\s*$/i, "").trim())
    : mainTitle
      ? stripTags(mainTitle[1])
      : slug;

  const ogImage = html.match(/property="og:image" content="([^"]+)"/)?.[1];
  const featured = html.match(
    /theme-post-featured-image[\s\S]*?<img[^>]+src="([^"]+)"/i,
  )?.[1];
  const image = ogImage ?? featured ?? "";

  const descMatch = html.match(
    /recipe-content[\s\S]{0,12000}?<div class="elementor-widget-container">\s*<p>([^<]+)<\/p>/i,
  );
  const ogDesc = html.match(/property="og:description" content="([^"]+)"/)?.[1];
  const description = descMatch ? decodeHtml(descMatch[1]) : ogDesc ? decodeHtml(ogDesc) : "";

  const appExclusive = /App Exclusive|app-exclusive/i.test(html.slice(0, 200000));

  function parseNavLinks(navHtml) {
    return [...navHtml.matchAll(/<a href="([^"]+)"[^>]*><span>([^<]+)<\/span>/gi)].map(([, href, label]) => ({
      label: decodeHtml(label),
      href: href.replace(BASE, "").replace(/\/?$/, "/"),
    }));
  }

  const catNavs = [...html.matchAll(/recipe-cat-list[\s\S]*?<nav class="dce-menu[\s\S]*?<\/nav>/gi)].map(
    (m) => m[0],
  );

  let allergens = [];
  let ages = [];
  for (const nav of catNavs) {
    if (/\/allergen\//i.test(nav)) {
      allergens = parseNavLinks(nav);
    } else if (/\/recipe-category\//i.test(nav)) {
      ages = parseNavLinks(nav);
    }
  }

  const meta = parseMeta(html);
  const ingredients = parseIngredients(html);
  const method = parseMethod(html);

  const crumbMatch = html.match(/Recipes\s*>\s*([^<]+)/i);

  return {
    slug,
    title,
    href: `/recipes/${slug}`,
    image,
    description,
    appExclusive: appExclusive || undefined,
    allergens,
    ages,
    ...meta,
    ingredients: ingredients.length ? ingredients : ["See Annabel Karmel for ingredients."],
    method: method.length ? method : ["See Annabel Karmel for method."],
    breadcrumb: crumbMatch
      ? [{ label: "Recipes", href: "/recipe-category/first-foods/" }]
      : undefined,
  };
}

async function loadAllSlugs() {
  const files = await readdir(LISTINGS_DIR);
  const slugs = new Set();
  for (const file of files.filter((f) => f.endsWith(".json"))) {
    const items = JSON.parse(await readFile(join(LISTINGS_DIR, file), "utf8"));
    for (const item of items) {
      if (item.slug) slugs.add(item.slug);
    }
  }
  return [...slugs].sort();
}

async function fetchRecipe(slug) {
  const url = `${BASE}/recipes/${slug}/`;
  const res = await fetch(url, FETCH_OPTS);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const html = await res.text();
  return parseRecipeHtml(html, slug);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const slugs = (await loadAllSlugs()).slice(0, limit);
  let ok = 0;
  let skip = 0;
  let fail = 0;

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const outPath = join(OUT_DIR, `${slug}.json`);
    if (!force) {
      try {
        await readFile(outPath, "utf8");
        skip++;
        continue;
      } catch {
        /* fetch */
      }
    }

    try {
      const detail = await fetchRecipe(slug);
      await writeFile(outPath, `${JSON.stringify(detail, null, 2)}\n`, "utf8");
      ok++;
      if ((ok + fail) % 25 === 0 || i === slugs.length - 1) {
        console.log(`[${i + 1}/${slugs.length}] ok=${ok} skip=${skip} fail=${fail} last=${slug}`);
      }
      await new Promise((r) => setTimeout(r, 350));
    } catch (err) {
      fail++;
      console.error(`FAIL ${slug}:`, err.message);
    }
  }

  console.log(`Done. ok=${ok} skip=${skip} fail=${fail} total=${slugs.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
