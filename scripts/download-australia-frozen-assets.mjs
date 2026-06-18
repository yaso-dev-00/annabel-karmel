import { mkdirSync, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const base = "https://www.annabelkarmel.com/wp-content/uploads";
const outDir = join(__dirname, "..", "public", "product-category", "australia-frozen");

mkdirSync(outDir, { recursive: true });

async function download(url, dest) {
  const name = dest.split(/[/\\]/).pop();
  process.stdout.write(`Downloading ${name}... `);
  const res = await fetch(url);
  if (!res.ok) {
    console.log(`FAILED (${res.status})`);
    return false;
  }
  await pipeline(res.body, createWriteStream(dest));
  console.log("ok");
  return true;
}

const assets = {
  "wood-bg.jpg": `${base}/2023/08/Main-product-page-mockup-desktop-1-scaled-optimized.jpg`,
  "signature.png": `${base}/2023/09/Annabel-signature-trans-optimized.png`,
  "carousel-freya.jpg": `${base}/2023/10/AK-Aus-Freya-and-group-scaled-e1696597051201-optimized.jpg`,
  "carousel-jan118.jpg": `${base}/2023/10/Ak-19th-Jan-118-scaled-optimized.jpg`,
  "carousel-april.jpg": `${base}/2023/10/24thApril23-287-scaled-optimized.jpg`,
  "carousel-jan063.jpg": `${base}/2023/10/Ak-19th-Jan-063-scaled-optimized.jpg`,
  "carousel-pack.jpg": `${base}/2023/10/Pack-group-shot-2-scaled-optimized.jpg`,
  "promise-bg.jpg": `${base}/2023/09/12-optimized.jpg`,
  "goodness-characters.png": `${base}/2023/08/Frozen-mockup-desktop-1024x887-optimized.png`,
  "annabel-aus.jpg": `${base}/2023/09/AK__Aus-scaled-optimized.jpg`,
  "buy-bg.jpg": `${base}/2023/09/buy-bg-scaled-optimized.jpg`,
  "logo-woolworths.png": `${base}/2023/10/woolworths-1-optimized.png`,
  "logo-coles.png": `${base}/2023/10/coles-1-optimized.png`,
  "logo-iga.png": `${base}/2023/10/IGA-1-optimized.png`,
  "product-bolognese-pasta-bake.jpg": `${base}/2023/10/Little-meals-Bol-pasta-bake-lifestyle-2-scaled-1-optimized.jpg`,
  "product-bolognese-mac-cheese.jpg": `${base}/2025/05/AU-bolog-mac-cheese-optimized.jpg`,
  "product-beef-cottage-pie.jpg": `${base}/2023/10/Little-meals-Beef-cottage-pie-lifestyle-2-Copy-1-scaled-optimized.jpg`,
  "product-mild-butter-chicken.jpg": `${base}/2023/10/Little-meals-Mild-butter-chicken-lifestyle-2-scaled-1-optimized.jpg`,
  "product-spaghetti-meatballs.jpg": `${base}/2023/10/Little-meals-Spaghetti-meatball-lifestyle-2-scaled-1-optimized.jpg`,
  "product-veggie-pasta-bake.jpg": `${base}/2023/10/Little-meals-Veggie-pasta-bake-lifestyle-2-Copy-scaled-1-optimized.jpg`,
  "product-macaroni-cheese.jpg": `${base}/2023/10/Little_meals_Mac_and_cheese_lifestyle-2-min1-scaled-1-optimized.jpg`,
  "product-bolognese-pasta-bake-pack.jpg": `${base}/2023/10/Bolognese-bake-1-optimized.jpg`,
  "product-beef-cottage-pie-pack.jpg": `${base}/2023/10/CP-1-optimized.jpg`,
  "product-mild-butter-chicken-pack.jpg": `${base}/2023/10/Butter-chicken-1-optimized.jpg`,
  "product-spaghetti-meatballs-pack.jpg": `${base}/2023/10/meatballs-optimized.jpg`,
  "product-veggie-pasta-bake-pack.jpg": `${base}/2023/10/Veg-bake-optimized.jpg`,
  "product-macaroni-cheese-pack.jpg": `${base}/2023/10/Mac-cheese-optimized.jpg`,
  "carousel-arrow-prev.png": `${base}/2023/08/Screenshot-2023-08-18-103230-optimized.png`,
  "carousel-arrow-next.png": `${base}/2023/08/Screenshot-2023-08-18-103524-optimized.png`,
};

for (const [filename, url] of Object.entries(assets)) {
  await download(url, join(outDir, filename));
}
