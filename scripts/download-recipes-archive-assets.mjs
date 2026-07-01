import { mkdirSync, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "recipes-archive");

mkdirSync(outDir, { recursive: true });

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

const assets = {
  "first-foods.jpg":
    "https://www.annabelkarmel.com/wp-content/uploads/2024/05/Apple-Pear-Banana-Puree-1-768x960-optimized.jpg",
  "6-months-plus.jpg":
    "https://www.annabelkarmel.com/wp-content/uploads/2025/07/AK-Baby-Self-Feeding-Chicken-Veggie-Stars-No-Product-768x577-optimized.jpg",
  "9-months-plus.jpg":
    "https://www.annabelkarmel.com/wp-content/uploads/2025/09/Quick-Courgette-Cheesy-Pasta-768x960-optimized.jpg",
  "12-months-plus.jpg":
    "https://www.annabelkarmel.com/wp-content/uploads/2025/07/Oven-Baked-Frittata-768x960-optimized.jpg",
  "18-months-plus.jpg":
    "https://www.annabelkarmel.com/wp-content/uploads/2025/08/Thai-Chicken-Curry-768x960-optimized.jpg",
  "family.jpg":
    "https://www.annabelkarmel.com/wp-content/uploads/2025/12/One-Pot-Cottage-Pie-min-768x960-optimized.jpg",
  "all-meal-times.jpg":
    "https://www.annabelkarmel.com/wp-content/uploads/2024/01/20220419-AK00110-768x960-optimized.jpg",
  "breakfast.jpg":
    "https://www.annabelkarmel.com/wp-content/uploads/2024/10/Banana-and-Blueberry-Oat-Pancakes-768x960-1-optimized.jpg",
  "main-meals.jpg":
    "https://www.annabelkarmel.com/wp-content/uploads/2026/01/Chicken-Fajita-Tray-Bake-min-768x960-optimized.jpg",
  "desserts.jpg":
    "https://www.annabelkarmel.com/wp-content/uploads/2025/07/Avocado-Banana-Brownies-768x960-optimized.jpg",
  "snacks.jpg":
    "https://www.annabelkarmel.com/wp-content/uploads/2025/09/Goldfish-Crackers-768x960-optimized.jpg",
  "weaning.jpg":
    "https://www.annabelkarmel.com/wp-content/uploads/2025/05/Brocoli-Pea-and-Orzo-Pasta-768x792-optimized.jpg",
  "finder-bg.webp":
    "https://www.annabelkarmel.com/wp-content/uploads/2021/03/RECIPE-FINDER-IMAGE-optimized.webp",
};

for (const [filename, url] of Object.entries(assets)) {
  await download(url, join(outDir, filename));
}

console.log("Done");
