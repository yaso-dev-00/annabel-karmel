import { mkdir, writeFile, copyFile, stat } from "node:fs/promises";
import path from "node:path";

const slug = "infertility-and-iodine-deficiency-everything-you-need-to-know";
const outDir = path.join("public", "articles", slug);
const listingHero = path.join("public", "advice-category", "pregnancy-tips", "infertility-iodine.jpg");
const fertilityFood = path.join("public", "advice-category", "pregnancy-tips", "boosting-fertility.jpg");
const trimesterHero = path.join("public", "articles", "balanced-diet-throughout-trimesters", "hero.jpg");

await mkdir(outDir, { recursive: true });

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error(`too small (${buf.length} bytes)`);
  await writeFile(dest, buf);
  console.log("ok", path.basename(dest), buf.length);
}

async function tryDownload(urls, dest, fallback) {
  for (const url of urls) {
    try {
      await download(url, dest);
      return;
    } catch (e) {
      console.warn("fail", path.basename(dest), e.message);
    }
  }
  await copyFile(fallback, dest);
  const size = (await stat(dest)).size;
  console.log("fallback", path.basename(dest), "<-", path.basename(fallback), size);
}

/** Unsplash stand-ins when Annabel CDN is captcha-blocked. */
const jobs = [
  [
    "hero.jpg",
    ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&w=1400&q=80"],
    listingHero,
  ],
  [
    "toothpaste.jpg",
    ["https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&w=1400&q=80"],
    fertilityFood,
  ],
  [
    "chlorine-pool.jpg",
    ["https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&w=1400&q=80"],
    trimesterHero,
  ],
  [
    "bromide-extinguisher.jpg",
    ["https://images.unsplash.com/photo-1581092918484-831bc0f30203?auto=format&w=1400&q=80"],
    trimesterHero,
  ],
  [
    "supplements.jpg",
    ["https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&w=1400&q=80"],
    fertilityFood,
  ],
  [
    "pregnancy-couple.jpg",
    ["https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&w=1400&q=80"],
    listingHero,
  ],
];

for (const [name, urls, fallback] of jobs) {
  await tryDownload(urls, path.join(outDir, name), fallback);
}

// Prefer listing hero for article hero when available locally.
try {
  await copyFile(listingHero, path.join(outDir, "hero.jpg"));
  console.log("hero restored from pregnancy listing");
} catch {
  /* keep downloaded hero */
}

const ribbonLogoUrl =
  "https://www.annabelkarmel.com/wp-content/uploads/2022/07/TRB-LOGO-STACKED-2_BLACK-300x152-optimized.png";
try {
  await download(ribbonLogoUrl, path.join(outDir, "ribbon-box-logo.png"));
} catch (e) {
  console.warn("ribbon logo", e.message);
}
