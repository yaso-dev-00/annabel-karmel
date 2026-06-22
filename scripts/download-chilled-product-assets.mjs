import { createWriteStream, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { pipeline } from "stream/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const base = "https://www.annabelkarmel.com/wp-content/uploads";
const publicRoot = join(__dirname, "..", "public", "products");

const sharedAssets = {
  "tesco-logo.png": `${base}/2025/09/Group-267-optimized.png`,
  "arrow-left.svg": `${base}/2025/06/arrow-left.svg`,
  "arrow-right.svg": `${base}/2025/06/arrow-right.svg`,
};

const products = {
  "delicious-cottage-pie": {
    "hero-desktop.jpg": `${base}/2025/10/cottage-pie-hero-optimized.jpg`,
    "hero-mobile.jpg": `${base}/2025/10/cottage-pie-mob-hero-optimized.jpg`,
    "detail-bg.png": `${base}/2025/10/cottage-pie-bg-optimized.png`,
    "retailer-bg.png": `${base}/2025/09/cottage-pie-new-bg-optimized.png`,
    "why-not-try-bg.jpg": `${base}/2025/09/cottage-pie-new-bg-pro-optimized.jpg`,
    "carousel-lifestyle.png": `${base}/2025/10/Cottage-Pie-carousel-optimized.png`,
    "carousel-pack.png": `${base}/2025/10/Cottage-pie-7C3-optimized.png`,
    "carousel-plate.png": `${base}/2025/10/Cottagie-Pie-carousel-optimized.png`,
    "badge-freezable.png": `${base}/2025/09/Cottage-Pie-Cook-from-Frozen-optimized.png`,
    "badge-natural.png": "COTTAGE_PIE_NATURAL_BADGE",
    "badge-beef.png": `${base}/2025/09/Cottage-Pie-British-beef-optimized.png`,
    "badge-cook-time.png": `${base}/2025/09/Cottage-Pie-cook-time-optimized.png`,
    "badge-low-salt.png": `${base}/2025/09/Cottage-Pie-low-in-salt-optimized.png`,
    "badge-veggie.png": `${base}/2025/09/Cottage-Pie-veggie-goodness-optimized.png`,
    "related-tikka.png": `${base}/2025/09/Chicken-tikka-1-optimized.png`,
    "related-pasta.png": `${base}/2025/09/Chicken-pastta-optimized.png`,
    "related-lasagne.png": `${base}/2025/09/Lasagne-1-optimized.png`,
  },
  "yummy-little-lasagne-new": {
    "hero-desktop.jpg": `${base}/2025/10/lasagne-hero-optimized.jpg`,
    "hero-mobile.jpg": `${base}/2025/10/lasagne-hero-mob-optimized.jpg`,
    "detail-bg.png": `${base}/2025/10/lasagne-bg-optimized.png`,
    "retailer-bg.png": `${base}/2025/09/Bg-1-optimized.png`,
    "why-not-try-bg.jpg": `${base}/2025/09/lasagne-new-bg-optimized.jpg`,
    "carousel-lifestyle.png": `${base}/2025/10/Lasagne-carousel-2-optimized.png`,
    "carousel-pack.png": `${base}/2025/10/Lasagne-7C3-1-optimized.png`,
    "carousel-plate.png": `${base}/2025/10/Lasagne-carousel-1-optimized.png`,
    "badge-natural.png": `${base}/2025/09/Little-Lasagne-100-natural-ingredients-optimized.png`,
    "badge-beef.png": `${base}/2025/09/Little-Lasagne-British-beef-optimized.png`,
    "badge-freezable.png": `${base}/2025/09/Little-Lasagne-Cook-from-Frozen-optimized.png`,
    "badge-cook-time.png": `${base}/2025/09/Little-Lasagne-cook-time-optimized.png`,
    "badge-low-salt.png": `${base}/2025/09/Little-Lasagne-low-in-salt-optimized.png`,
    "related-cottage-pie.png": `${base}/2025/09/Cottage-pie-2-optimized.png`,
    "related-pasta.png": `${base}/2025/09/Chicken-pastta-optimized.png`,
    "related-tikka.png": `${base}/2025/09/Chicken-tikka-1-optimized.png`,
  },
  "tasty-chicken-pasta-in-a-tomato-veggie-sauce": {
    "hero-desktop.jpg": `${base}/2025/10/chicken-pasta-hero-optimized.jpg`,
    "hero-mobile.jpg": `${base}/2025/10/chicken-pasta-hero-mob-optimized.jpg`,
    "detail-bg.png": `${base}/2025/10/chicken-pasta-new-bg-scaled-optimized.png`,
    "retailer-bg.png": `${base}/2025/09/Bg-2-optimized.png`,
    "why-not-try-bg.jpg": `${base}/2025/09/chicken-pasta-new-bg-optimized.jpg`,
    "carousel-lifestyle.png": `${base}/2025/10/Chicken-Pasta-Kids-Lifestyle-optimized.png`,
    "carousel-pack.png": `${base}/2025/10/Chicken-pasta-7C3-optimized.png`,
    "carousel-plate.png": `${base}/2025/10/Chicken-Pasta-Carousel-2-optimized.png`,
    "carousel-scene.png": `${base}/2025/10/Chicken-pasta-carousel-optimized.png`,
    "badge-freezable.png": `${base}/2025/09/Cottage-Pie-Cook-from-Frozen-optimized.png`,
    "badge-natural.png": "COTTAGE_PIE_NATURAL_BADGE",
    "badge-low-salt.png": `${base}/2025/09/Cottage-Pie-low-in-salt-optimized.png`,
    "badge-ready-2-min.png": `${base}/2025/09/ready-in-2-minutes-chicken-pasta-optimized.png`,
    "badge-veggie.png": `${base}/2025/09/Cottage-Pie-veggie-goodness-optimized.png`,
    "related-lasagne.png": `${base}/2025/09/Lasagne-1-optimized.png`,
    "related-cottage-pie.png": `${base}/2025/09/Cottage-pie-2-optimized.png`,
    "related-tikka.png": `${base}/2025/09/Chicken-tikka-1-optimized.png`,
  },
};

async function resolveCottagePieNaturalBadgeUrl() {
  const html = await (
    await fetch("https://www.annabelkarmel.com/products/delicious-cottage-pie/")
  ).text();
  const match = html.match(/Cottage-Pie-100[^"']+natural-ingredients-optimized\.png/);
  if (!match) {
    throw new Error("Could not resolve Cottage Pie 100% natural badge URL from live page");
  }
  return `${base}/2025/09/${match[0]}`;
}

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

const cottagePieNaturalBadgeUrl = await resolveCottagePieNaturalBadgeUrl();

for (const [folder, assets] of Object.entries(products)) {
  const outDir = join(publicRoot, folder);
  mkdirSync(outDir, { recursive: true });

  for (const [filename, url] of Object.entries({ ...assets, ...sharedAssets })) {
    const resolvedUrl = url === "COTTAGE_PIE_NATURAL_BADGE" ? cottagePieNaturalBadgeUrl : url;
    await download(resolvedUrl, join(outDir, filename));
  }
}

console.log("Done.");
