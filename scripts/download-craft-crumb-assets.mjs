import { mkdirSync, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const base = "https://www.annabelkarmel.com/wp-content/uploads/2025/04";
const outDir = join(__dirname, "..", "public", "craft-crumb");

mkdirSync(outDir, { recursive: true });

const assets = {
  "title-banner.png": `${base}/CC-webpage-v3_01-1024x312-optimized.png`,
  "lifestyle-hero.jpg": `${base}/Untitled-design-optimized.jpg`,
  "intro-section.jpg": `${base}/CC-webpage-v3-2-scaled-optimized.jpg`,
  "choc-mice-muffins.jpg": `${base}/CC-webpage-v3_04-1-optimized.jpg`,
  "teddy-bear-biscuits.png": `${base}/CC-Email_04-resized-optimized.png`,
  "be-wild-biscuits.jpg": `${base}/CC-webpage-v3_02-1-optimized.jpg`,
  "footer-banner.jpg": `${base}/footer--optimized.jpg`,
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
