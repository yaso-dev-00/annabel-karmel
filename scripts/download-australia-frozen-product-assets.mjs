import { createWriteStream, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { pipeline } from "stream/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const base = "https://www.annabelkarmel.com/wp-content/uploads";
const publicRoot = join(__dirname, "..", "public", "products", "australia-frozen");
const categoryRoot = join(__dirname, "..", "public", "product-category", "australia-frozen");

mkdirSync(publicRoot, { recursive: true });
mkdirSync(categoryRoot, { recursive: true });

async function download(url, dest) {
  const name = dest.split(/[/\\]/).pop();
  process.stdout.write(`Downloading ${name}... `);
  const res = await fetch(url);
  if (!res.ok) {
    console.log(`FAILED (${res.status})`);
    return false;
  }
  mkdirSync(dirname(dest), { recursive: true });
  await pipeline(res.body, createWriteStream(dest));
  console.log("ok");
  return true;
}

const sharedAssets = {
  [join(categoryRoot, "annabel-group-mia.jpg")]:
    `${base}/2023/09/AK-group-with-Mia-scaled-optimized.jpg`,
};

const products = {
  "beautiful-bolognese-pasta-bake": {
    "carousel-1.jpg": `${base}/2023/10/Bolognese-bake-1-optimized.jpg`,
    "carousel-2.jpg": `${base}/2023/10/Little-meals-Bol-pasta-bake-lifestyle-4-min-scaled-1-e1698332839926-optimized.jpg`,
    "carousel-3.jpg": `${base}/2023/10/Ak_19th_Jan-226-min1-scaled-1-e1698332879925-optimized.jpg`,
    "carousel-4.jpg": `${base}/2023/10/Ak-19th-Jan-157-min-scaled-1-e1698332921796-optimized.jpg`,
    "carousel-5.jpg": `${base}/2023/10/AK-goup-in-red-min-scaled-1-e1698332498642-optimized.jpg`,
  },
  "bolognese-mac-cheese": {
    "carousel-1.jpg": `${base}/2025/05/AU-bolog-mac-cheese-optimized.jpg`,
  },
  "comforting-beef-cottage-pie": {
    "carousel-1.jpg": `${base}/2023/10/CP-1-optimized.jpg`,
    "carousel-2.jpg": `${base}/2023/10/Little-meals-Beef-cottage-pie-lifestyle-1-min-scaled-1-lighter-1-e1698333032598-optimized.jpg`,
    "carousel-3.jpg": `${base}/2023/10/Ak-19th-Jan-238-min-scaled-1-e1698333329960-optimized.jpg`,
    "carousel-4.jpg": `${base}/2023/10/AK-goup-in-red-min-scaled-1-e1698332498642-optimized.jpg`,
  },
  "delicious-mild-butter-chicken-rice": {
    "carousel-1.jpg": `${base}/2023/10/Butter-chicken-1-optimized.jpg`,
    "carousel-2.jpg": `${base}/2023/10/Little_meals_Mild_butter_chicken_lifestyle-4-min1-scaled-1-e1698333410538-optimized.jpg`,
    "carousel-3.jpg": `${base}/2023/10/Ak_19th_Jan-499-min1-scaled-1-e1698333449186-optimized.jpg`,
    "carousel-4.jpg": `${base}/2023/10/Ak_19th_Jan-522-min1-scaled-1-e1698333521126-optimized.jpg`,
    "carousel-5.jpg": `${base}/2023/10/AK-goup-in-red-min-scaled-1-e1698332498642-optimized.jpg`,
  },
  "scrumptious-spaghetti-meatballs": {
    "carousel-1.jpg": `${base}/2023/10/meatballs-optimized.jpg`,
    "carousel-2.jpg": `${base}/2023/10/Little-meals-Spaghetti-meatball-lifestyle-4-min-scaled-1-e1698333640764-optimized.jpg`,
    "carousel-3.jpg": `${base}/2023/10/Ak-19th-Jan-102-min-scaled-1-e1698333838189-optimized.jpg`,
    "carousel-4.jpg": `${base}/2023/10/Ak-19th-Jan-082-min-scaled-1-e1698333885567-optimized.jpg`,
    "carousel-5.jpg": `${base}/2023/10/AK-goup-in-red-min-scaled-1-e1698332498642-optimized.jpg`,
  },
  "tasty-veggie-pasta-bake": {
    "carousel-1.jpg": `${base}/2023/10/Veg-bake-optimized.jpg`,
    "carousel-2.jpg": `${base}/2023/10/Little_meals_Veggie_pasta_bake_lifestyle-1-min1-scaled-1-e1698333987891-optimized.jpg`,
    "carousel-3.jpg": `${base}/2023/10/Ak_19th_Jan-140-min1-scaled-1-e1698334040784-optimized.jpg`,
    "carousel-4.jpg": `${base}/2023/10/AK-goup-in-red-min-scaled-1-e1698332498642-optimized.jpg`,
  },
  "macaroni-cheese": {
    "carousel-1.jpg": `${base}/2023/10/Mac-cheese-optimized.jpg`,
    "carousel-2.jpg": `${base}/2023/10/Little-meals-Mac-and-cheese-lifestyle-4-min-scaled-1-e1698334139545-optimized.jpg`,
    "carousel-3.jpg": `${base}/2023/10/Ak_19th_Jan-047-min1-scaled-1-e1698334174559-optimized.jpg`,
    "carousel-4.jpg": `${base}/2023/10/Ak-19th-Jan-063-min-scaled-1-e1698334213144-optimized.jpg`,
    "carousel-5.jpg": `${base}/2023/10/AK-goup-in-red-min-scaled-1-e1698332498642-optimized.jpg`,
  },
};

for (const [dest, url] of Object.entries(sharedAssets)) {
  await download(url, dest);
}

for (const [slug, assets] of Object.entries(products)) {
  const outDir = join(publicRoot, slug);
  mkdirSync(outDir, { recursive: true });
  for (const [filename, url] of Object.entries(assets)) {
    await download(url, join(outDir, filename));
  }
}
