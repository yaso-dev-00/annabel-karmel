import { readFileSync, mkdirSync, createWriteStream, writeFileSync } from "fs";
import { pipeline } from "stream/promises";
import { join, dirname, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const base = "https://www.annabelkarmel.com/wp-content/uploads";
const themeBase = "https://www.annabelkarmel.com/wp-content/themes/astra-annabelle-karmel-child-theme";
const outDir = join(__dirname, "..", "public", "tableware");
const productsDir = join(outDir, "products");
const html = readFileSync(join(__dirname, "tableware-live.html"), "utf8");

mkdirSync(productsDir, { recursive: true });
mkdirSync(join(outDir, "fonts"), { recursive: true });

function urlToLocalFilename(url) {
  const name = basename(new URL(url).pathname);
  return name.replace(/-1024x1024/g, "").replace(/-1024x683/g, "");
}

async function download(url, dest) {
  process.stdout.write(`Downloading ${basename(dest)}... `);
  const res = await fetch(url);
  if (!res.ok) {
    console.log(`FAILED (${res.status})`);
    return false;
  }
  await pipeline(res.body, createWriteStream(dest));
  console.log("ok");
  return true;
}

const staticAssets = {
  "hero-slide-1.jpg": `${base}/2026/01/Grow-LP-Hero-Carousel-1-V2.jpg`,
  "hero-slide-2.jpg": `${base}/2026/01/Grow-LP-Hero-Carousel-2-V2.jpg`,
  "hero-slide-3.jpg": `${base}/2025/12/Grow-LP-Hero-Carousel-3-scaled.jpg`,
  "grow-logo.png": `${base}/2026/03/Annabel-Karmel-tableware-logo-1024x291-optimized.png`,
  "lifestyle-banner.jpg": `${base}/2025/12/Second-LP-image-scaled-optimized.jpg`,
  "pr-left-side-img-optimized.png": `${base}/2025/12/pr-left-side-img-optimized.png`,
  "pr-right-side-img-optimized.png": `${base}/2025/12/pr-right-side-img-optimized.png`,
  "swatch-soft-sage.png": `${base}/2025/10/Vector-6.png`,
  "swatch-soft-sage-active.png": `${base}/2025/10/Vector-3.png`,
  "swatch-warm-stone.png": `${base}/2025/10/Vector-7.png`,
  "swatch-warm-stone-active.png": `${base}/2025/10/Vector-4.png`,
  "swatch-blushberry.png": `${base}/2025/10/Vector-8.png`,
  "swatch-blushberry-active.png": `${base}/2025/10/Vector-5.png`,
  "fonts/mundial-regular.otf": `${themeBase}/assets/fonts/4-Mundial-Regular-TTY.otf`,
  "fonts/mundial-semibold.otf": `${themeBase}/assets/fonts/5-Mundial-Demibold-TTY.otf`,
};

for (const [filename, url] of Object.entries(staticAssets)) {
  await download(url, join(outDir, filename));
}

const imageMap = new Map();

function localImagePath(url) {
  if (!url) return "";
  if (imageMap.has(url)) return imageMap.get(url);
  const filename = urlToLocalFilename(url);
  const local = `/tableware/products/${filename}`;
  imageMap.set(url, local);
  return local;
}

const products = [];
const cardRegex =
  /<div class="grow-product-card">([\s\S]*?)<\/div>\s*(?=<div class="grow-product-card">|<\/div>\s*<\/div>\s*<\/div>\s*<\/div>)/g;

let cardMatch;
while ((cardMatch = cardRegex.exec(html)) !== null) {
  const block = cardMatch[1];
  const titleMatch = block.match(/<h3>([^<]+)<\/h3>/);
  const linkMatch = block.match(/<a href="([^"]+)"[^>]*>\s*<h3>/);
  const defaultImgMatch = block.match(/class="main-thumb default-img"[^>]*src="([^"]+)"/) ||
    block.match(/src="([^"]+)"[^>]*class="main-thumb default-img"/);
  const hoverImgMatch = block.match(/class="main-thumb hover-img"[^>]*src="([^"]+)"/) ||
    block.match(/src="([^"]+)"[^>]*class="main-thumb hover-img"/);

  if (!titleMatch || !linkMatch || !defaultImgMatch) continue;

  const swatches = [];
  const swatchRegex =
    /class="wc_prd_color_switch swatch\s+([^"]+)"[^>]*data-image="([^"]+)"[^>]*data-hover="([^"]+)"[^>]*data-link="([^"]+)"/g;
  let swatchMatch;
  while ((swatchMatch = swatchRegex.exec(block)) !== null) {
    const [, colorClass, image, hover, href] = swatchMatch;
    const colorMatch = colorClass.match(/(soft-sage|warm-stone|blushberry)/);
    if (!colorMatch) continue;
    swatches.push({
      color: colorMatch[1],
      image: localImagePath(image),
      hover: localImagePath(hover),
      href,
      active: colorClass.includes("active"),
    });
  }

  const title = titleMatch[1].replace(/&#038;/g, "&").trim();
  const slug = linkMatch[1].split("/").filter(Boolean).pop() ?? title.toLowerCase().replace(/\s+/g, "-");

  products.push({
    slug,
    title,
    href: linkMatch[1],
    defaultImage: localImagePath(defaultImgMatch[1]),
    hoverImage: localImagePath(hoverImgMatch?.[1] ?? defaultImgMatch[1]),
    swatches,
  });
}

for (const [url, localPath] of imageMap) {
  const filename = basename(localPath);
  await download(url, join(productsDir, filename));
}

writeFileSync(join(__dirname, "tableware-products.json"), JSON.stringify(products, null, 2));
console.log(`\nParsed ${products.length} products → scripts/tableware-products.json`);
