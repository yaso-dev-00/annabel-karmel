import { readFileSync, mkdirSync, createWriteStream, writeFileSync, existsSync } from "fs";
import { pipeline } from "stream/promises";
import { join, dirname, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const productsJson = JSON.parse(readFileSync(join(__dirname, "tableware-products.json"), "utf8"));
const productsDir = join(__dirname, "..", "public", "tableware", "products");
const outFile = join(__dirname, "..", "data", "tableware-product-pages.json");

mkdirSync(productsDir, { recursive: true });

const COLOR_MAP = {
  blushberry: { label: "Blushberry", hex: "#ca9591" },
  "soft-sage": { label: "Soft Sage", hex: "#c3d2b6" },
  "warm-stone": { label: "Warm Stone", hex: "#f8f0ec" },
};

const CARE_ICON_MAP = {
  "look-icon-1.svg": { src: "/tableware/icons/look-icon-1.svg", label: "100% food safe" },
  "look-icon-2.svg": { src: "/tableware/icons/look-icon-2.svg", label: "Dishwasher safe" },
  "look-icon-3.svg": { src: "/tableware/icons/look-icon-3.svg", label: "Freezer safe to -40°c" },
  "look-icon-4.svg": { src: "/tableware/icons/look-icon-4.svg", label: "Microwave safe" },
  "look-icon-5.svg": { src: "/tableware/icons/look-icon-5.svg", label: "Oven safe to 230°C" },
};

const DISTRIBUTOR_HTML =
  'The range is distributed exclusively in Australia by <a href="https://infagroup.com.au/" target="_blank" rel="noopener noreferrer">Infa Group Pty LTD</a>.';

const imageMap = new Map();

function decodeHtml(text) {
  return text
    .replace(/&#038;/g, "&")
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(html) {
  return decodeHtml(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function urlToLocalFilename(url) {
  const name = basename(new URL(url).pathname);
  return name
    .replace(/-1024x1024/g, "")
    .replace(/-1024x683/g, "")
    .replace(/-150x150/g, "");
}

function localImagePath(url) {
  if (!url) return "";
  if (imageMap.has(url)) return imageMap.get(url);
  const filename = urlToLocalFilename(url);
  const local = `/tableware/products/${filename}`;
  imageMap.set(url, local);
  return local;
}

async function download(url, dest) {
  if (existsSync(dest)) return true;
  const res = await fetch(url);
  if (!res.ok) {
    console.log(`  skip image ${basename(dest)} (${res.status})`);
    return false;
  }
  await pipeline(res.body, createWriteStream(dest));
  return true;
}

function slugFromHref(href) {
  return href.replace(/\/$/, "").split("/").filter(Boolean).pop() ?? href;
}

function collectSlugs() {
  const slugs = new Set();
  for (const product of productsJson) {
    slugs.add(slugFromHref(product.href));
    for (const swatch of product.swatches) {
      slugs.add(slugFromHref(swatch.href));
    }
  }
  return [...slugs].sort();
}

function parseListItems(html) {
  const items = [];
  const regex = /<li>([\s\S]*?)<\/li>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = stripTags(match[1]);
    if (text) items.push(text);
  }
  return items;
}

function parseProductPage(html, slug) {
  const titleMatch = html.match(/<h2 class="grow-title">([\s\S]*?)<\/h2>/);
  const colorMatch = html.match(/<span class="st-color-val">([\s\S]*?)<\/span>/);
  const title = titleMatch ? decodeHtml(titleMatch[1]) : slug;
  const activeColorLabel = colorMatch ? decodeHtml(colorMatch[1]) : "";

  const gallery = [];
  const gallerySection = html.match(
    /<div class="swiper grow-gallery-main">([\s\S]*?)<div class="grow-gallery-main-arrows">/,
  )?.[1];
  if (gallerySection) {
    const imgRegex = /src="(https:\/\/www\.annabelkarmel\.com\/wp-content\/uploads\/[^"]+-optimized\.(?:jpg|png))"/g;
    let imgMatch;
    while ((imgMatch = imgRegex.exec(gallerySection)) !== null) {
      const src = imgMatch[1];
      if (src.includes("150x150")) continue;
      gallery.push({
        src: localImagePath(src),
        alt: title,
      });
    }
  }

  const swatches = [];
  const swatchRegex =
    /<a[^>]*href="https:\/\/www\.annabelkarmel\.com\/tableware\/([^/]+)\/"[^>]*>/g;
  let swatchMatch;
  while ((swatchMatch = swatchRegex.exec(html)) !== null) {
    const tag = swatchMatch[0];
    const swatchSlug = swatchMatch[1];
    if (!tag.includes('class="swatch') && !tag.includes("class='swatch")) continue;
    const hex = tag.match(/style="background:([^"]+)"/)?.[1]?.trim() ?? "";
    const classes = tag.match(/class="([^"]+)"/)?.[1] ?? "";
    const title = tag.match(/title="([^"]+)"/)?.[1] ?? "";
    const colorMatch = classes.match(/(blushberry|soft-sage|warm-stone)/);
    if (!colorMatch) continue;
    const color = colorMatch[1];
    swatches.push({
      slug: swatchSlug,
      color,
      label: decodeHtml(title) || COLOR_MAP[color]?.label || color,
      hex: hex || COLOR_MAP[color]?.hex || "#ca9591",
    });
  }

  const activeSwatch =
    swatches.find((s) => s.slug === slug) ??
    swatches.find((s) => classesIncludesActive(html, s.slug)) ??
    swatches[0];

  const shopMatch =
    html.match(/<a[^>]*class="grow-shop-button"[^>]*href="([^"]+)"/) ??
    html.match(/<a[^>]*href="([^"]+)"[^>]*class="grow-shop-button"/);
  const shopHref = shopMatch?.[1] ?? "";

  const descBlock = html.match(/<div class="grow-product-description">\s*([\s\S]*?)<\/div>/)?.[1] ?? "";
  const description = [];
  const pRegex = /<p>([\s\S]*?)<\/p>/g;
  let pMatch;
  while ((pMatch = pRegex.exec(descBlock)) !== null) {
    const text = stripTags(pMatch[1]);
    if (text) description.push(text);
  }

  const featuresHeading =
    stripTags(html.match(/<h2 class="practical-safe-section__title">\s*([\s\S]*?)\s*<\/h2>/)?.[1] ?? "") ||
    "Practical, safe and parent approved";

  const firstCol = html.match(/<div class="practical-section-first-col">\s*([\s\S]*?)<\/div>/)?.[1] ?? "";
  const secondCol = html.match(/<div class="practical-section-second-col">\s*([\s\S]*?)<\/div>/)?.[1] ?? "";
  const features = {
    heading: featuresHeading,
    columns: [parseListItems(firstCol), parseListItems(secondCol)].filter((col) => col.length > 0),
  };

  const materialsBlock = html.match(/<div class="materials-section">([\s\S]*?)<\/div>/)?.[1] ?? "";
  const dimensionsBlock = html.match(/<div class="dimensions-section">([\s\S]*?)<\/div>/)?.[1] ?? "";
  const materials = {
    heading: stripTags(html.match(/<h3>\s*Materials and dimensions\s*<\/h3>/) ? "Materials and dimensions" : "Materials and dimensions"),
    items: parseListItems(materialsBlock),
  };
  const dimensions = {
    items: parseListItems(dimensionsBlock),
  };

  const careHeading = stripTags(html.match(/<div class="looks-section">[\s\S]*?<h3>\s*([\s\S]*?)\s*<\/h3>/)?.[1] ?? "Looking after me");
  const careIcons = [];
  const careBlock = html.match(/<div class="looks-section">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/)?.[1] ?? "";
  const careItemRegex = /<div class="looks-title-item">([\s\S]*?)<\/div>\s*(?=<div class="looks-title-item">|<\/div>)/g;
  let careMatch;
  while ((careMatch = careItemRegex.exec(careBlock)) !== null) {
    const block = careMatch[1];
    const iconFile = block.match(/look-icon-\d+\.svg/)?.[0];
    if (!iconFile || !CARE_ICON_MAP[iconFile]) continue;
    const label = stripTags(block.match(/<div class="intro-name">[\s\S]*?<p>([\s\S]*?)<\/p>/)?.[1] ?? CARE_ICON_MAP[iconFile].label)
      .replace(/\s+/g, " ");
    careIcons.push({ ...CARE_ICON_MAP[iconFile], label });
  }
  if (careIcons.length === 0) {
    careIcons.push(...Object.values(CARE_ICON_MAP));
  }

  const completeSetSlugs = [];
  const completeSetRegex = /data-link="https:\/\/www\.annabelkarmel\.com\/tableware\/([^/]+)\/"/g;
  const seenTitles = new Set();
  let csMatch;
  while ((csMatch = completeSetRegex.exec(html)) !== null) {
    const csSlug = csMatch[1];
    const listing = productsJson.find(
      (product) =>
        slugFromHref(product.href) === csSlug ||
        product.swatches.some((swatch) => slugFromHref(swatch.href) === csSlug),
    );
    const listingSlug = listing ? listing.slug : csSlug;
    if (!seenTitles.has(listingSlug)) {
      seenTitles.add(listingSlug);
      completeSetSlugs.push(listingSlug);
    }
  }

  const metaDescription = description[0] ?? `${title} from Grow by Annabel Karmel.`;

  const color = activeSwatch?.color ?? inferColorFromLabel(activeColorLabel);

  return {
    slug,
    title,
    metaDescription,
    activeColor: color,
    activeColorLabel: activeColorLabel || COLOR_MAP[color]?.label || "",
    swatches,
    gallery,
    description,
    features,
    materials,
    dimensions,
    careHeading,
    careIcons,
    retailer: {
      label: "Available exclusively at:",
      logo: "/tableware/baby-bunting-logo.jpg",
      shopLabel: "Shop",
      shopHref,
    },
    distributorHtml: DISTRIBUTOR_HTML,
    completeSetSlugs,
  };
}

function classesIncludesActive(html, slug) {
  const regex = new RegExp(
    `href="https://www\\.annabelkarmel\\.com/tableware/${slug}/"[^>]*class="[^"]*active`,
    "i",
  );
  const regex2 = new RegExp(
    `class="[^"]*active[^"]*"[^>]*href="https://www\\.annabelkarmel\\.com/tableware/${slug}/"`,
    "i",
  );
  return regex.test(html) || regex2.test(html);
}

function inferColorFromLabel(label) {
  const lower = label.toLowerCase();
  if (lower.includes("sage")) return "soft-sage";
  if (lower.includes("stone")) return "warm-stone";
  if (lower.includes("blush")) return "blushberry";
  return "blushberry";
}

function normalizeTitleKey(title) {
  return title.toLowerCase().replace(/\s+/g, " ").trim();
}

async function fetchPage(slug) {
  const url = `https://www.annabelkarmel.com/tableware/${slug}/`;
  console.log(`Fetching ${slug}...`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} returned ${res.status}`);
  return res.text();
}

async function main() {
  const slugs = collectSlugs();
  console.log(`Parsing ${slugs.length} product variants...`);

  const pages = {};
  const titleFamilies = new Map();

  for (const slug of slugs) {
    try {
      const html = await fetchPage(slug);
      const parsed = parseProductPage(html, slug);
      pages[slug] = parsed;

      const familyKey = normalizeTitleKey(parsed.title);
      if (!titleFamilies.has(familyKey)) {
        titleFamilies.set(familyKey, slug);
      }
    } catch (error) {
      console.error(`Failed ${slug}:`, error.message);
    }
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`\nDownloading ${imageMap.size} gallery images...`);
  for (const [url, localPath] of imageMap) {
    const filename = basename(localPath);
    await download(url, join(productsDir, filename));
  }

  writeFileSync(outFile, JSON.stringify(pages, null, 2));
  console.log(`\nWrote ${Object.keys(pages).length} pages → data/tableware-product-pages.json`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
