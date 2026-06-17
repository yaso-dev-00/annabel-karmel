import { mkdirSync, createWriteStream, readFileSync } from "fs";
import { pipeline } from "stream/promises";
import { join, dirname, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const base = "https://www.annabelkarmel.com/wp-content/uploads";
const outDir = join(__dirname, "..", "public", "our-books");

mkdirSync(outDir, { recursive: true });

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

const heroAssets = {
  "wood-background.jpg": `${base}/2023/08/Main-product-page-mockup-desktop-1-scaled-optimized.jpg`,
  "books-collage.jpg": `${base}/2023/10/Books-cropped-scaled-optimized.jpg`,
  "annabel-signature.png": `${base}/2023/09/Annabel-signature-trans-optimized.png`,
  "annabel-portrait.jpg": `${base}/2023/09/annabel-img-optimized.jpg`,
};

for (const [filename, url] of Object.entries(heroAssets)) {
  await download(url, join(outDir, filename));
}

const products = JSON.parse(readFileSync(join(__dirname, "our-books-products.json"), "utf8"));

const slugMap = [
  "finger-foods",
  "weaning-2",
  "new-complete-baby-toddler-meal-planner-25th-anniversary-edition",
  "my-first-cookbook",
  "where-does-my-food-come-from",
  "fun-fast-easy-childrens-cookbook",
  "weaning-made-simple",
  "real-foods-kids-will-love",
  "baby-led-weaning-recipe-book",
  "annabels-family-cookbook",
];

for (let i = 0; i < products.length; i++) {
  const bookDir = join(outDir, slugMap[i]);
  mkdirSync(bookDir, { recursive: true });
  const images = products[i].carouselImages ?? [];
  for (let j = 0; j < images.length; j++) {
    const img = images[j];
    const filename = basename(new URL(img.url).pathname);
    await download(img.url, join(bookDir, filename));
  }
}
