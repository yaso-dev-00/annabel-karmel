import fs from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";

const root = path.resolve(".");
const outDir = path.join(root, "public", "footer-pages", "about");

const assets = [
  {
    url: "https://www.annabelkarmel.com/wp-content/uploads/2024/07/AK-Orlando-passing-Star-scaled-e1720101120806-1536x1016-optimized.jpg",
    file: "hero.jpg",
  },
  {
    url: "https://www.annabelkarmel.com/wp-content/uploads/2026/06/Recipe-Books-Lifestyle-Updated-2026-998x1024-optimized.jpg",
    file: "cookbooks.jpg",
  },
  {
    url: "https://www.annabelkarmel.com/wp-content/uploads/2026/06/Baby-Front-1024x1024-optimized.png",
    file: "app.png",
  },
  {
    url: "https://www.annabelkarmel.com/wp-content/uploads/2025/10/Chilled_Meals-img-1024x1024-optimized.jpg",
    file: "meals.jpg",
  },
  {
    url: "https://www.annabelkarmel.com/wp-content/uploads/2026/06/TechAwards25_Logo_Badges-108-300x300-optimized.png",
    file: "award-tech.png",
  },
  {
    url: "https://www.annabelkarmel.com/wp-content/uploads/2026/06/00404_LBP_Best-Family-App_Logo_2026_ALL-216x300-optimized.png",
    file: "award-family-app.png",
  },
  {
    url: "https://www.annabelkarmel.com/wp-content/uploads/2026/06/GOLD-2026-e1781188725373-290x300-optimized.jpeg",
    file: "award-gold-2026.jpeg",
  },
  {
    url: "https://www.annabelkarmel.com/wp-content/uploads/2025/03/2025-Best-Toddler-12-months-Food-Range-or-Product-Gold-1-optimized.png",
    file: "award-toddler-gold.png",
  },
  {
    url: "https://www.annabelkarmel.com/wp-content/uploads/2026/06/00404_LBP_Best-Toddler-Food-Range_Logo-2026_PLATINUM-216x300-optimized.png",
    file: "award-toddler-platinum.png",
  },
  {
    url: "https://www.annabelkarmel.com/wp-content/uploads/2026/06/MA-2025-BADGES-winner-gold-1-1-300x300-optimized.png",
    file: "award-ma-gold.png",
  },
  {
    url: "https://www.annabelkarmel.com/wp-content/uploads/2024/07/GG_Creamed-sweetcorn-chic-casserole_V1_5x4-min-819x1024-optimized.jpg",
    file: "partnership-1.jpg",
  },
  {
    url: "https://www.annabelkarmel.com/wp-content/uploads/2024/07/AK-Heinz-Campaign-819x1024-optimized.jpg",
    file: "partnership-2.jpg",
  },
];

fs.mkdirSync(outDir, { recursive: true });

for (const asset of assets) {
  const target = path.join(outDir, asset.file);
  if (fs.existsSync(target)) {
    console.log(`skip ${asset.file}`);
    continue;
  }
  const response = await fetch(asset.url);
  if (!response.ok) {
    console.warn(`failed ${asset.file}: ${response.status}`);
    continue;
  }
  await pipeline(response.body, fs.createWriteStream(target));
  console.log(`saved ${asset.file}`);
}
