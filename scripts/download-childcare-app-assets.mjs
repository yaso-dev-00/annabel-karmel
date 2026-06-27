import { mkdirSync, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "annabel-karmels-app-for-childcare");
const base = "https://www.annabelkarmel.com/wp-content/uploads";

mkdirSync(join(outDir, "expert"), { recursive: true });
mkdirSync(join(outDir, "weaning"), { recursive: true });
mkdirSync(join(outDir, "quote"), { recursive: true });

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
  "hero-desktop.png": `${base}/2026/06/App-for-BusinessChildcare-Hero-optimized.png`,
  "hero-mobile.png": `${base}/2026/06/App-for-BusinessChildcare-Hero-1024x837-optimized.png`,
  "weaning/frame-bg.png": `${base}/2025/05/Frame-421-1-optimized.png`,
  "weaning/first-foods-index.png": `${base}/elementor/thumbs/Weaning-Support-First-Foods-Index-1-rop9b8wuia5kkh0y06em61y6g9ysfn2bth6ejm0kom-optimized.png`,
  "weaning/expert-advice.png": `${base}/elementor/thumbs/Weaning-Support-Expert-Advice-1-rop9b2bz6fwkb7ai2lk86llyakv7xrc7gkm06oabw6-optimized.png`,
  "weaning/allergy-support.png": `${base}/elementor/thumbs/Weaning-Support-Allergy-support-rop9aykmf3rf0rfyojxpwmk3x1dr2yxa42029kfwl2-optimized.png`,
  "expert/everyday-inspiration.jpg": `${base}/2025/05/Everyday-inspiration-optimized.jpg`,
  "expert/confidence-in-nutrition.jpg": `${base}/2025/05/Confidence-in-nutrition-optimized.jpg`,
  "expert/allergy-aware.jpg": `${base}/2025/05/Allergy-aware-optimized.jpg`,
  "expert/simplified-meal-planning.jpg": `${base}/2025/05/Simplified-meal-planning-optimized.jpg`,
  "expert/caregiver-development.jpg": `${base}/2025/05/Support-for-caregiver-development-optimized.jpg`,
  "expert/building-bonds.jpg": `${base}/2025/05/Building-bonds-optimized.jpg`,
  "quote/annabel.png": `${base}/2024/12/Img-1-optimized.png`,
  "quote/vector-bg.png": `${base}/2024/12/Vector-optimized.png`,
};

for (const [filename, url] of Object.entries(assets)) {
  await download(url, join(outDir, filename));
}

console.log("Done.");
