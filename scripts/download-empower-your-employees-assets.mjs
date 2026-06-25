import { mkdirSync, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "empower-your-employees");
const base = "https://www.annabelkarmel.com/wp-content/uploads";

mkdirSync(join(outDir, "awards"), { recursive: true });
mkdirSync(join(outDir, "recipes"), { recursive: true });
mkdirSync(join(outDir, "expert"), { recursive: true });
mkdirSync(join(outDir, "stats"), { recursive: true });
mkdirSync(join(outDir, "steps"), { recursive: true });

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
  "happy-families.jpg": `${base}/2025/04/Happy-Families-Img-1024x1024-optimized.jpg`,
  "childcare-provider.jpg": `${base}/2025/04/childcare-provider-optimized.jpg`,
  "essential-tools.jpg": `${base}/2026/04/Section-1-optimized.jpg`,
  "vector-bg.png": `${base}/2025/04/Vector-Bg-optimized.png`,
  "supporting-parents.jpg": `${base}/2025/04/Supporting-Parent-Img-optimized.jpg`,
  "how-it-works.jpg": `${base}/2025/04/How-It-Works-Img-optimized.jpg`,
  "form-bg.png": `${base}/2025/04/bg-scaled-optimized.png`,
  "awards/platinum-logo.png": `${base}/2026/04/00404_LBP_Tried-and-Tested_PLATINUM_Logo-scaled-optimized.png`,
  "awards/best-family-app.png": `${base}/2026/04/00404_LBP_Best-Family-App_Logo_2026_ALL-scaled-optimized.png`,
  "awards/absolutely-mama.png": `${base}/2025/05/Absolutely-Mama-GOLD-2024-logo-optimized.png`,
  "awards/pregnancy-baby-fair.png": `${base}/2025/05/Pregnancy-Baby-Fair-2024-optimized.png`,
  "awards/first-time-mums.png": `${base}/2025/05/First-Time-Mums-Awards-Logo-optimized.png`,
  "awards/mum-marketplace.jpeg": `${base}/2026/04/Mum-Marketplace-2026-optimized.jpeg`,
  "expert/improved-wellbeing.jpg": `${base}/2025/05/Improved-employee-wellbeing-optimized.jpg`,
  "expert/timesaving.jpg": `${base}/2025/05/Timesaving-for-busy-days-optimized.jpg`,
  "expert/productivity.jpg": `${base}/2025/05/Fostering-productivvity-optimized.jpg`,
  "expert/family-time.jpg": `${base}/2025/05/Championing-family-time-optimized.jpg`,
  "expert/diverse-diets.jpg": `${base}/2025/05/Supporting-diverse-diets-optimized.jpg`,
  "expert/affordable-benefit.jpg": `${base}/2025/05/Affordable-wellness-benefit-optimized.jpg`,
  "stats/icon-1.png": `${base}/2025/04/Icon-1-optimized.png`,
  "stats/icon-2.png": `${base}/2025/04/Icon-2-optimized.png`,
  "stats/icon-3.png": `${base}/2025/04/Icon-3-optimized.png`,
  "stats/icon-4.png": `${base}/2025/04/Icon-4-optimized.png`,
  "stats/icon-5.png": `${base}/2025/04/Icon-5-optimized.png`,
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
  "recipes/allergies.jpg": `${base}/elementor/thumbs/Allergies_icon2-r5ie28anjttqcjfbxm5vtytlkdp8pqu4s79pxs32qw-optimized.jpg`,
  "recipes/vegetarian.jpg": `${base}/elementor/thumbs/recipes12-qsxjrtl68e1vu8v9zyrlf75oxke3qfctlz74tehdig-optimized.jpg`,
};

for (const [filename, url] of Object.entries(assets)) {
  await download(url, join(outDir, filename));
}

console.log("Done.");
