import { mkdirSync, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "recipe-app");
const base = "https://www.annabelkarmel.com/wp-content/uploads";

const dirs = [
  "",
  "awards",
  "features",
  "features/mobile",
  "weaning",
  "discover",
  "recipes",
];

for (const dir of dirs) {
  mkdirSync(join(outDir, dir), { recursive: true });
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

const assets = {
  "hero-desktop.png": `${base}/2024/12/Header-Bg-optimized.png`,
  "hero-mobile.png": `${base}/2024/12/image-2-optimized.png`,
  "group1.png": `${base}/2025/11/group1-optimized.png`,
  "group2.png": `${base}/2025/11/group-2-optimized.png`,
  "annabel-quote.png": `${base}/2024/12/Img-1-optimized.png`,
  "vector-quote.png": `${base}/2024/12/Vector-optimized.png`,
  "customers-bg.png": `${base}/2024/12/Vector-Bg-1-optimized.png`,
  "pricing-vector.png": `${base}/2024/12/Vector-1-optimized.png`,
  "testimonial-avatar.png": `${base}/2024/12/qAYH7e.tif-optimized.png`,
  "app-store.png": `${base}/2024/12/Download-Apple-Store-1-2-optimized.png`,
  "google-play.png": `${base}/2024/12/Download-Google-Play-1-optimized.png`,
  "awards/platinum-logo.png": `${base}/2026/04/00404_LBP_Tried-and-Tested_PLATINUM_Logo-scaled-optimized.png`,
  "awards/mama-awards-2024.png": `${base}/2024/08/mama_awards_2024-e1724147321501-optimized.png`,
  "awards/best-family-app.png": `${base}/2026/04/00404_LBP_Best-Family-App_Logo_2026_ALL-scaled-optimized.png`,
  "awards/product-silver.png": `${base}/2024/08/product_silver-e1724147660768-optimized.png`,
  "awards/mum-marketplace.jpeg": `${base}/2026/04/Mum-Marketplace-2026-optimized.jpeg`,
  "awards/best-2024.png": `${base}/2024/08/best_2024-e1724147451707-optimized.png`,
  "features/1500-ideas.png": `${base}/2026/04/1500-easy-nutritious-ideas-1024x1024-optimized.png`,
  "features/fresh-ideas.png": `${base}/2026/04/Fresh-ideas-every-week-1024x1024-optimized.png`,
  "features/recipe-bank.png": `${base}/2026/04/Build-your-recipe-bank-1024x1024-optimized.png`,
  "features/mobile-ideas.png": `${base}/2024/12/image-7-optimized.png`,
  "features/mobile-fresh.png": `${base}/2024/12/image-optimized.png`,
  "features/mobile-bank.png": `${base}/2024/12/image-1-optimized.png`,
  "weaning/frame-bg.png": `${base}/2024/12/Frame-42-optimized.png`,
  "weaning/first-foods-index.png": `${base}/elementor/thumbs/Weaning-Support-First-Foods-Index-rop9aeu0fl0e8y8mvtejy9jffy31lbqx1cav6r967q-optimized.png`,
  "weaning/expert-advice.png": `${base}/elementor/thumbs/Weaning-Support-Expert-Advice-1-rop9b2bz6fwkb7ai2lk86llyakv7xrc7gkm06oabw6-optimized.png`,
  "weaning/first-foods-tracker.png": `${base}/elementor/thumbs/Weaning-Support-First-Foods-Tracker-rop9aild6x5jje369v1288l9thkig45uduwt3v3liu-optimized.png`,
  "discover/allergy-tracker.png": `${base}/2026/06/Feature_Img_Allergy_Tracker-optimized.png`,
  "discover/meal-plans.png": `${base}/2026/06/Feature_Img_Meal_Plans-optimized.png`,
  "discover/thumbs-up.png": `${base}/2026/04/Feature_Img_Thumbs_Up-1-optimized.png`,
  "discover/recipe-collections.png": `${base}/2026/04/Feature_Img_Recipe_Collections-1-optimized.png`,
  "discover/search.png": `${base}/2026/04/Feature_Img_Search-1-optimized.png`,
  "discover/callout.svg": `${base}/2024/12/slide1_text.svg`,
  "recipes/first-foods.jpg": `${base}/elementor/thumbs/recipes1-qsxis1ua5d320gtsvi4pj8473op8t3ck0xfxcbiqaw-optimized.jpg`,
  "recipes/6-9-months.jpg": `${base}/elementor/thumbs/recipes2-qsxjdqy5wosc0fb76drol908qvr9hkhi0bkf59cko8-optimized.jpg`,
  "recipes/9-12-months.jpg": `${base}/elementor/thumbs/recipes3-qsxjebmm31kn3uh5tmph43sdtcxc6wrlf5x3pchwvc-optimized.jpg`,
  "recipes/12-18-months.jpg": `${base}/elementor/thumbs/recipes4-qsxjfgzifr59aot344l25tcnyb9hllbs8umgtisl9k-optimized.jpg`,
  "recipes/finger-foods.jpg": `${base}/elementor/thumbs/recipes5-qsxjgetp9sfkwnfxmj7mnkt9c6mpap24di3y3hef1k-optimized.jpg`,
  "recipes/toddler.jpg": `${base}/elementor/thumbs/recipes6-qsxji9k8r0yxsyqzsu252lyzijhrh7f2aoff64ngrs-optimized.jpg`,
  "recipes/snacks.jpg": `${base}/elementor/thumbs/recipes7-qsxjjxpwwf9ag0bm1k29i6shj7995u1vuy6hvu69pk-optimized.jpg`,
  "recipes/lunchboxes.jpg": `${base}/elementor/thumbs/recipes8-qsxjli48ahehsm1ow8fvnsk56bj9zo9s2pbmofunc8-optimized.jpg`,
  "recipes/family-meals.jpg": `${base}/elementor/thumbs/recipes9-qsxjo1akpevb2sd93tuovnjusp1vqbbqr8lq8a3gko-optimized.jpg`,
  "recipes/breakfast.jpg": `${base}/elementor/thumbs/recipes10-qsxjpcai74nn7agzhe61cbowhym8f6iblp80845rxk-optimized.jpg`,
  "recipes/allergies.jpg": `${base}/elementor/thumbs/recipes11-qsxjqa4p15xyt93tzsslu35hvtzg4a8nqcphi2rlpk-optimized.jpg`,
  "recipes/vegetarian.jpg": `${base}/elementor/thumbs/recipes12-qsxjrtl68e1vu8v9zyrlf75oxke3qfctlz74tehdig-optimized.jpg`,
};

for (const [filename, url] of Object.entries(assets)) {
  await download(url, join(outDir, filename));
}

console.log("Done.");
