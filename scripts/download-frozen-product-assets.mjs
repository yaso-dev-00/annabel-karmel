import { createWriteStream, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { pipeline } from "stream/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const base = "https://www.annabelkarmel.com/wp-content/uploads";
const publicRoot = join(__dirname, "..", "public", "products");

const sharedAssets = {
  "frozen-shared/arrow-left.svg": `${base}/2025/06/arrow-left.svg`,
  "frozen-shared/arrow-right.svg": `${base}/2025/06/arrow-right.svg`,
  "frozen-shared/logo-tesco.png": `${base}/2025/06/tesco-optimized.png`,
  "frozen-shared/logo-asda.png": `${base}/2018/07/logo-asda-optimized.png`,
  "frozen-shared/logo-ocado.png": `${base}/2025/06/Ocado-optimized.png`,
  "frozen-shared/badge-1.png": `${base}/2025/06/Artboard-3-optimized.png`,
  "frozen-shared/badge-2.png": `${base}/2025/06/Artboard-2-optimized.png`,
  "frozen-shared/badge-3.png": `${base}/2025/06/Artboard-4-optimized.png`,
  "frozen-shared/badge-4.png": `${base}/2025/06/Artboard-2_9-optimized.png`,
  "frozen-shared/badge-5.png": `${base}/2025/06/Artboard-2_5-optimized.png`,
  "frozen-shared/badge-6.png": `${base}/2025/06/Artboard-3_4-optimized.png`,
  "frozen-shared/related-bolognese-mac-cheese.png": `${base}/2025/06/Bolognese-MacCheese-optimized.png`,
  "frozen-shared/related-chicken-pasta.png": `${base}/2025/06/Chicken-pasta-1-optimized.png`,
  "frozen-shared/related-chicken-tikka.png": `${base}/2025/06/Chicken-tikka-optimized.png`,
  "frozen-shared/related-spaghetti.png": `${base}/2025/07/Spag-bol-1-optimized.png`,
};

const products = {
  "chicken-tikka-masala": {
    "hero-desktop.jpg": `${base}/2025/06/chicken-tikka-hero-optimized.jpg`,
    "hero-mobile.jpg": `${base}/2025/06/chicken-tikka-mob-optimized.jpg`,
    "cloud-left.png": `${base}/2025/06/chicken-tikka-left.png`,
    "cloud-right.png": `${base}/2025/06/chicken-tikka-right.png`,
    "retailer-bg.png": `${base}/2025/06/chicken-tikka-bg2-optimized.png`,
    "why-not-try-bg.jpg": `${base}/2025/06/chicken-tikka-bg-3-optimized.jpg`,
    "carousel-1.png": `${base}/2025/06/Chicken-Tikka-1-optimized.png`,
    "carousel-2.png": `${base}/2025/06/Chicken-Tikka-2-optimized.png`,
    "carousel-3.png": `${base}/2025/06/Chicken-Tikka-3-optimized.png`,
    "carousel-4.png": `${base}/2025/06/Chicken-Tikka-4-optimized.png`,
  },
  "tasty-spaghetti-bolognese": {
    "hero-desktop.jpg": `${base}/2025/06/spaghetti-bolognese-header-optimized.jpg`,
    "hero-mobile.jpg": `${base}/2025/06/spaghetti-bolognese-mob-optimized.jpg`,
    "cloud-left.png": `${base}/2025/06/cloud-left.png`,
    "cloud-right.png": `${base}/2025/06/cloud-right.png`,
    "retailer-bg.png": `${base}/2025/06/or-bg-optimized.png`,
    "why-not-try-bg.jpg": `${base}/2025/06/spaghetti-bg-3-scaled-optimized.jpg`,
    "carousel-1.png": `${base}/2025/06/Spaghetti-Bolognese-1-optimized.png`,
    "carousel-2.png": `${base}/2025/06/Spaghetti-Bolognese-2-optimized.png`,
    "carousel-3.png": `${base}/2025/06/Spaghetti-Bolognese-3-optimized.png`,
    "carousel-4.png": `${base}/2025/06/Spaghetti-Bolognese-4-optimized.png`,
  },
  "mighty-bolognese-mac-and-cheese": {
    "hero-desktop.jpg": `${base}/2025/06/bolognese-mac-hero-1-optimized.jpg`,
    "hero-mobile.png": `${base}/2025/06/bolognese-mac-mob-optimized.png`,
    "cloud-left.png": `${base}/2025/06/bolognese-mac-left.png`,
    "cloud-right.png": `${base}/2025/06/bolognese-mac-right.png`,
    "retailer-bg.png": `${base}/2025/06/bolognese-mac-bg-2-optimized.png`,
    "why-not-try-bg.jpg": `${base}/2025/06/bolognese-bg-3-optimized.jpg`,
    "carousel-1.png": `${base}/2025/06/Bolognese-Mac-Cheese-1-optimized.png`,
    "carousel-2.png": `${base}/2025/06/Bolognese-Mac-Cheese-2-optimized.png`,
  },
  "chicken-tomato-mascarpone-pasta": {
    "hero-desktop.jpg": `${base}/2025/06/chicken-pasta-hero-optimized.jpg`,
    "hero-mobile.jpg": `${base}/2025/06/chicken-pasta-mob-optimized.jpg`,
    "cloud-left.png": `${base}/2025/06/chicken-pasta-cloud-left.png`,
    "cloud-right.png": `${base}/2025/06/chicken-pasta-cloud-right.png`,
    "retailer-bg.png": `${base}/2025/06/chicken-pasta-bg-2-optimized.png`,
    "why-not-try-bg.jpg": `${base}/2025/06/chicken-pasta-bg-3-optimized.jpg`,
    "carousel-1.png": `${base}/2025/06/Chicken-Pasta-1-1-optimized.png`,
    "carousel-2.png": `${base}/2025/06/Chicken-Pasta-2-optimized.png`,
    "badge-1.png": `${base}/2025/06/Artboard-3-optimized.png`,
    "badge-2.png": `${base}/2025/06/Artboard-2-optimized.png`,
    "badge-3.png": `${base}/2025/06/Artboard-4-optimized.png`,
    "badge-4.png": `${base}/2025/06/Artboard-2_9-optimized.png`,
    "badge-5.png": `${base}/2025/06/Artboard-2_5-optimized.png`,
    "badge-6.png": `${base}/2025/06/Artboard-3_4-optimized.png`,
  },
};

async function downloadFile(url, dest) {
  mkdirSync(dirname(dest), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed ${url}: ${res.status}`);
  }
  await pipeline(res.body, createWriteStream(dest));
  console.log("saved", dest);
}

for (const [relativePath, url] of Object.entries(sharedAssets)) {
  await downloadFile(url, join(publicRoot, relativePath));
}

for (const [slug, files] of Object.entries(products)) {
  for (const [filename, url] of Object.entries(files)) {
    await downloadFile(url, join(publicRoot, slug, filename));
  }
}

console.log("done");
