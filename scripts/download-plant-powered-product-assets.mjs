import { createWriteStream, mkdirSync, copyFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { pipeline } from "stream/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const base = "https://www.annabelkarmel.com/wp-content/uploads";
const publicRoot = join(__dirname, "..", "public", "products");

const sharedAssets = {
  "asda-logo.png": `${base}/2026/04/ASDA_logo.svg-1-1-optimized.png`,
  "retailer-bg.png": `${base}/2026/04/Bg-3-scaled-optimized.png`,
  "arrow-left.svg": `${base}/2025/06/arrow-left.svg`,
  "arrow-right.svg": `${base}/2025/06/arrow-right.svg`,
};

const products = {
  nuggets: {
    "hero-desktop.png": `${base}/2026/04/Header-image-e1777448189874-optimized.png`,
    "hero-mobile.png": `${base}/2026/04/Header-image-e1777448189874-optimized.png`,
    "detail-bg.png": `${base}/2026/04/Group-1-7-scaled-optimized.png`,
    "detail-bg-mobile.png": `${base}/2026/04/v-scaled-e1777456592532-optimized.png`,
    "why-not-try-bg.png": `${base}/2026/04/Frame-1-12-scaled-optimized.png`,
    "carousel-1.png": `${base}/2026/04/Nuggets-Carousel-1-optimized.png`,
    "carousel-2.png": `${base}/2026/05/Nuggets-Carousel-5-optimized.png`,
    "carousel-3.png": `${base}/2026/04/Nuggets-Carousel-2-optimized.png`,
    "carousel-4.png": `${base}/2026/05/Nuggets-carousel-6-optimized.png`,
    "carousel-5.png": `${base}/2026/05/Nuggest-carousel-3-optimized.png`,
    "badge-plant-based.png": `${base}/2026/04/Group-296-optimized.png`,
    "badge-veggies.png": `${base}/2026/04/Group-297-optimized.png`,
    "badge-iron-rich.png": `${base}/2026/04/Nugget-optimized.png`,
    "badge-calcium.png": `${base}/2026/04/Group-299-optimized.png`,
    "badge-no-artificials.png": `${base}/2026/04/Group-copy-optimized.png`,
    "badge-vitamins.png": `${base}/2026/04/Group-300-optimized.png`,
    "recipe-sweet-potato-wedges.jpg": `${base}/2026/04/Meat-Free-Nuggets-with-Sweet-Potato-Wedges-Veggies-1024x1024-optimized.jpg`,
    "recipe-party-platter.jpg": `${base}/2026/04/Meat-free-Nuggets-Party-platter-1024x1024-optimized.jpg`,
    "recipe-katsu-curry.jpg": `${base}/2026/04/Meat-Free-Nuggets-with-Rice-Curry-Sauce-Veggies-1024x1024-optimized.jpg`,
    "related-tikka.png": `${base}/2025/06/Chicken-tikka-optimized.png`,
    "related-burgers.png": `${base}/2026/04/Burgers-pack-shot-optimized.png`,
    "related-spaghetti.png": `${base}/2025/07/Spag-bol-1-optimized.png`,
  },
  burgers: {
    "hero-desktop.jpg": `${base}/2026/04/Burger-Header-scaled-e1777459635480-optimized.jpg`,
    "hero-mobile.png": `${base}/2026/04/Header-image-1-optimized.png`,
    "detail-bg.png": `${base}/2026/04/Section-13-scaled-optimized.png`,
    "detail-bg-mobile.png": `${base}/2026/04/v-1-scaled-optimized.png`,
    "why-not-try-bg.png": `${base}/2026/04/Section-3-scaled-optimized.png`,
    "carousel-1.png": `${base}/2026/04/Burger-Carousel-1-optimized.png`,
    "carousel-2.png": `${base}/2026/05/Burger-carousel-3-optimized.png`,
    "carousel-3.png": `${base}/2026/04/Burger-Carousel-2-optimized.png`,
    "carousel-4.png": `${base}/2026/05/Burgers-carousel-4-optimized.png`,
    "badge-plant-based.png": `${base}/2026/04/100%25-Plant-Based-optimized.png`,
    "badge-calcium.png": `${base}/2026/04/Source-of-Calcium-optimized.png`,
    "badge-veggies.png": `${base}/2026/04/50%25-Veggies-optimized.png`,
    "badge-no-artificials.png": `${base}/2026/04/No-artificial-colours-optimized.png`,
    "badge-iron-rich.png": `${base}/2026/04/Iron-rich-optimized.png`,
    "badge-vitamins.png": `${base}/2026/04/Source-of-Vit-D-optimized.png`,
    "recipe-kofta-wraps.jpg": `${base}/2026/04/Kofta-Style-Wraps-1024x1024-optimized.jpg`,
    "recipe-burgers-platter.jpg": `${base}/2026/04/Meat-Free-Party-Platter-1024x1024-optimized.jpg`,
    "recipe-mini-sliders.jpg": `${base}/2026/04/Mini-Meat-Free-Sliders-1024x1024-optimized.jpg`,
    "related-tikka.png": `${base}/2025/06/Chicken-tikka-optimized.png`,
    "related-nuggets.png": `${base}/2026/04/Nuggets-optimized.png`,
    "related-spaghetti.png": `${base}/2025/07/Spag-bol-1-optimized.png`,
  },
};

async function download(url, dest) {
  process.stdout.write(`Downloading ${dest.split(/[/\\]/).pop()}... `);
  const res = await fetch(url);
  if (!res.ok) {
    console.log(`FAILED (${res.status})`);
    return false;
  }
  await pipeline(res.body, createWriteStream(dest));
  console.log("ok");
  return true;
}

for (const [folder, assets] of Object.entries(products)) {
  const outDir = join(publicRoot, folder);
  mkdirSync(outDir, { recursive: true });

  for (const [filename, url] of Object.entries({ ...assets, ...sharedAssets })) {
    await download(url, join(outDir, filename));
  }
}

console.log("Done.");
