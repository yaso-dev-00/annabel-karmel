import { copyFileSync, mkdirSync, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const base = "https://www.annabelkarmel.com/wp-content/uploads";
const outDir = join(__dirname, "..", "public", "products", "mild-chicken-tikka");

mkdirSync(outDir, { recursive: true });

const assets = {
  "hero-desktop.jpg": `${base}/2025/10/chicken-tikka-hero-optimized.jpg`,
  "hero-mobile.jpg": `${base}/2025/10/chicken-tikka-mob-optimized.jpg`,
  "carousel-lifestyle.png": `${base}/2025/10/Chicken-Tikka-Kids-Lifestyle-optimized.png`,
  "carousel-pack.png": `${base}/2025/10/Chicken-Tikka-7C3-optimized.png`,
  "carousel-plate.png": `${base}/2025/10/Tikka-carousel-optimized.png`,
  "badge-freezable.png": `${base}/2025/09/Chicken-Tikka-Cook-from-Frozen-optimized.png`,
  "badge-low-salt.png": `${base}/2025/09/Chicken-Tikka-low-in-salt-optimized.png`,
  "badge-dairy-free.png": `${base}/2025/09/Chicken-Tikka-Made-without-dairy-optimized.png`,
  "badge-veggie.png": `${base}/2025/09/Veggie-goodness-optimized.png`,
  "badge-cook-time.png": `${base}/2025/09/Cook-time-optimized.png`,
  "tesco-logo.png": `${base}/2025/09/Group-267-optimized.png`,
  "why-not-try-bg.jpg": `${base}/2025/09/Chicken-Tikka-product-bg-optimized.jpg`,
  "related-pasta.png": `${base}/2025/09/Chicken-pastta-optimized.png`,
  "related-lasagne.png": `${base}/2025/09/Lasagne-1-optimized.png`,
  "related-cottage-pie.png": `${base}/2025/09/Cottage-pie-2-optimized.png`,
  "arrow-left.svg": `${base}/2025/06/arrow-left.svg`,
  "arrow-right.svg": `${base}/2025/06/arrow-right.svg`,
  "where-to-buy-bg.png": `${base}/2025/09/Where-to-buy-bg.png`,
};

const userAssets = {
  "intro-bg.png":
    "C:/Users/dmoha/.cursor/projects/d-ak/assets/c__Users_dmoha_AppData_Roaming_Cursor_User_workspaceStorage_46ccc344c2d4536e8eeb07a46ea1ded0_images_image-fe737a45-2ea4-4b73-9349-db8575224bbe.png",
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

for (const [filename, src] of Object.entries(userAssets)) {
  process.stdout.write(`Copying ${filename}... `);
  copyFileSync(src, join(outDir, filename));
  console.log("ok");
}
