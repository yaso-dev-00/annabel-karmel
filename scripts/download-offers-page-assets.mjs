import { mkdirSync, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const base = "https://www.annabelkarmel.com/wp-content/uploads";
const outDir = join(__dirname, "..", "public", "offers-page");

mkdirSync(outDir, { recursive: true });

const assets = {
  "hero-bg.jpg": `${base}/2023/08/Main-product-page-mockup-desktop-1-scaled-optimized.jpg`,
  "header.jpg": `${base}/2025/07/offers-page-header-optimized.jpg`,
  "chilled-range.jpg": `${base}/2025/10/Full-Chilled-Range-Square-e1760020828925-optimized.jpg`,
  "logo-tesco.png": `${base}/2023/12/tesco-optimized.png`,
  "frozen-range.jpg": `${base}/2025/06/Frozen-offers-page-image-scaled-e1760020865706-optimized.jpg`,
  "logo-ocado.png": `${base}/2024/06/Ocado-logo-1-optimized.png`,
  "logo-asda.png": `${base}/2023/12/asda-updated-all-black-logo-optimized.png`,
  "award-child.jpg": `${base}/2025/10/Offers-Page-2-img-optimized.jpg`,
  "discover-chilled.jpg": `${base}/2025/10/Offers-page-Discover-chilled-img-optimized.jpg`,
  "discover-frozen.jpg": `${base}/2025/07/Offers-page-Discover-frozen-meals-optimized.jpg`,
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

for (const [filename, url] of Object.entries(assets)) {
  await download(url, join(outDir, filename));
}
