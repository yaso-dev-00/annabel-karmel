import { mkdirSync, createWriteStream, existsSync } from "fs";
import { pipeline } from "stream/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..", "public", "partners");

async function download(url, dest) {
  const name = dest.split(/[/\\]/).pop();
  if (existsSync(dest)) {
    console.log(`skip ${name}`);
    return true;
  }
  process.stdout.write(`Downloading ${name}... `);
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.log(`FAILED (${res.status})`);
      return false;
    }
    mkdirSync(dirname(dest), { recursive: true });
    await pipeline(res.body, createWriteStream(dest));
    console.log("ok");
    return true;
  } catch (error) {
    console.log(`FAILED (${error instanceof Error ? error.message : error})`);
    return false;
  }
}

/** Exact URLs confirmed from live partner pages. */
const assets = {
  "pampers-snacking/hero-collage.png":
    "https://www.annabelkarmel.com/wp-content/uploads/2026/05/Pampers-Snacks-web-page-4-optimized.png",
  "pampers-snacking/pampers-logo.png":
    "https://www.annabelkarmel.com/wp-content/uploads/2025/02/PAMPERS-web-page_03-003-300x168-optimized.png",
  "pampers-snacking/checklist-hero.jpg":
    "https://www.annabelkarmel.com/wp-content/uploads/2026/05/Pampers-Snacks-Hero-8-scaled-optimized.jpg",
  "pampers-snacking/tips-graphic.png":
    "https://www.annabelkarmel.com/wp-content/uploads/2026/03/Untitled-design-28-optimized.png",
  "pampers-snacking/product-mobile.png":
    "https://www.annabelkarmel.com/wp-content/uploads/2026/05/Supporting-Little-movers-mobile-1-576x1024-optimized.png",
  "pampers-snacking/product-desktop.png":
    "https://www.annabelkarmel.com/wp-content/uploads/2026/05/Pampers-supporting-little-movers-desktop-1024x410-optimized.png",

  "pampers-superfoods/header.png":
    "https://www.annabelkarmel.com/wp-content/uploads/2026/02/Pampers-Header-1-optimized.png",
  "pampers-superfoods/pampers-logo.png":
    "https://www.annabelkarmel.com/wp-content/uploads/2025/02/PAMPERS-web-page_03-003-300x168-optimized.png",
  "pampers-superfoods/checklist.png":
    "https://www.annabelkarmel.com/wp-content/uploads/2026/02/Copy-of-Pampers-Checklist-square-banners-1-optimized.png",
  "pampers-superfoods/tips-graphic.png":
    "https://www.annabelkarmel.com/wp-content/uploads/2026/02/Pampers-image-1-1-optimized.png",
  "pampers-superfoods/wipes-vertical.png":
    "https://www.annabelkarmel.com/wp-content/uploads/2026/02/Pampers-wipes-vertical-576x1024-optimized.png",
  "pampers-superfoods/wipes-footer.png":
    "https://www.annabelkarmel.com/wp-content/uploads/2026/02/Pampers-footer-wipes-1024x410-optimized.png",

  "birds-eye/logo.png":
    "https://www.annabelkarmel.com/wp-content/uploads/2026/04/Birds-Eye-Logo-300x128-optimized.png",
  "birds-eye/hero.png":
    "https://www.annabelkarmel.com/wp-content/uploads/2026/04/Untitled-design-5-optimized.png",
  "birds-eye/fritters.png":
    "https://www.annabelkarmel.com/wp-content/uploads/2026/04/Birds-eye-fritters-optimized.png",
  "birds-eye/pasta.png":
    "https://www.annabelkarmel.com/wp-content/uploads/2026/04/Birds-Eye-Pasta-optimized.png",
  "birds-eye/tots.png":
    "https://www.annabelkarmel.com/wp-content/uploads/2026/04/Birds-Eye-Tots-optimized.png",
  "birds-eye/peas-banner-1.png":
    "https://www.annabelkarmel.com/wp-content/uploads/2026/04/1-optimized.png",
  "birds-eye/peas-banner-2.png":
    "https://www.annabelkarmel.com/wp-content/uploads/2026/04/2-optimized.png",
  "birds-eye/fish-finger-pie.png":
    "https://www.annabelkarmel.com/wp-content/uploads/2026/04/Fish-finger-pie-optimized.png",
  "birds-eye/crunchy-fish-fingers.png":
    "https://www.annabelkarmel.com/wp-content/uploads/2026/04/Birds-eye-nuggets-optimized.png",
  "birds-eye/fish-banner-1.png":
    "https://www.annabelkarmel.com/wp-content/uploads/2026/04/3-optimized.png",
  "birds-eye/fish-banner-2.png":
    "https://www.annabelkarmel.com/wp-content/uploads/2026/04/4-optimized.png",
};

mkdirSync(root, { recursive: true });

let ok = 0;
for (const [rel, url] of Object.entries(assets)) {
  if (await download(url, join(root, rel))) ok += 1;
}
console.log(`Done: ${ok}/${Object.keys(assets).length}`);
