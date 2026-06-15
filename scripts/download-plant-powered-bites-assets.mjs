import { mkdirSync, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const base = "https://www.annabelkarmel.com/wp-content/uploads";
const outDir = join(__dirname, "..", "public", "product-category", "plant-powered-bites");

mkdirSync(outDir, { recursive: true });

async function mediaUrl(id) {
  const res = await fetch(`https://www.annabelkarmel.com/wp-json/wp/v2/media/${id}`);
  const json = await res.json();
  const file = json.media_details?.file ?? "";
  return `${base}/${file.replace(/\.png$/, "-optimized.png")}`;
}

const assets = {
  "hero-desktop.jpg": `${base}/2026/04/LP-Header-scaled-e1777460438518-optimized.jpg`,
  "hero-mobile.jpg": `${base}/2026/04/LP-Header-scaled-e1777460438518-optimized.jpg`,
  "intro-bg.png": `${base}/2026/04/Section-scaled-optimized.png`,
  "intro-bg-mobile.png": `${base}/2026/04/Section-scaled-optimized.png`,
  "promise-bg.png": `${base}/2026/04/Annabels-expert-promise-scaled-optimized.png`,
  "promise-plant-based.png": () => mediaUrl(109240),
  "promise-veggies.png": () => mediaUrl(109239),
  "promise-iron-rich.png": `${base}/2026/04/Iron-rich-optimized.png`,
  "promise-calcium.png": `${base}/2026/04/Source-of-Calcium-optimized.png`,
  "promise-no-artificials.png": `${base}/2026/04/No-artificial-colours-optimized.png`,
  "promise-vit-d-b12.png": `${base}/2026/04/Source-of-Vit-D-optimized.png`,
  "product-nuggets.png": `${base}/2026/04/Nuggets-1-optimized.png`,
  "product-burgers.png": `${base}/2026/04/Burgers-1-optimized.png`,
  "retailers-bg.png": `${base}/2026/04/Bg-3-scaled-optimized.png`,
  "logo-asda.png": `${base}/2026/04/ASDA_logo.svg-1-1-optimized.png`,
  "frozen-cta-bg.png": `${base}/2026/04/Section-2-scaled-e1777461147350-optimized.png`,
  "frozen-cta-bg-mobile.png": `${base}/2026/04/Section-6-scaled.png`,
  "frozen-cta-left.png": `${base}/2026/04/Chicken-Tikka--optimized.png`,
  "frozen-cta-right.png": `${base}/2026/04/Spaghetti-Bolognese--optimized.png`,
  "frozen-cta-mobile.png": `${base}/2026/04/Frame-1-6-optimized.png`,
  "recipe-sweet-potato-wedges.jpg": `${base}/2026/04/Meat-Free-Nuggets-with-Sweet-Potato-Wedges-Veggies-1024x1024-optimized.jpg`,
  "recipe-party-platter.jpg": `${base}/2026/04/Meat-free-Nuggets-Party-platter-1024x1024-optimized.jpg`,
  "recipe-katsu-curry.jpg": `${base}/2026/04/Meat-Free-Nuggets-with-Rice-Curry-Sauce-Veggies-1024x1024-optimized.jpg`,
  "recipe-kofta-wraps.jpg": `${base}/2026/04/Kofta-Style-Wraps-1024x1024-optimized.jpg`,
  "recipe-burgers-platter.jpg": `${base}/2026/04/Meat-Free-Party-Platter-1024x1024-optimized.jpg`,
  "recipe-mini-sliders.jpg": `${base}/2026/04/Mini-Meat-Free-Sliders-1024x1024-optimized.jpg`,
  "promise-divider.png": `${base}/2026/04/Vector-5-optimized.png`,
};

for (const [filename, source] of Object.entries(assets)) {
  const url = typeof source === "function" ? await source() : source;
  const dest = join(outDir, filename);
  process.stdout.write(`Downloading ${filename}... `);
  const res = await fetch(url);
  if (!res.ok) {
    console.log(`FAILED (${res.status})`);
    continue;
  }
  await pipeline(res.body, createWriteStream(dest));
  console.log("ok");
}

console.log(`\nDone. ${Object.keys(assets).length} files → ${outDir}`);
