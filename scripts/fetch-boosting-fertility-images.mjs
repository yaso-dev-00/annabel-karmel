import { mkdir, writeFile, copyFile, stat } from "node:fs/promises";
import path from "node:path";

const slug = "the-best-foods-for-boosting-fertility";
const outDir = path.join("public", "articles", slug);
const listingHero = path.join("public", "advice-category", "pregnancy-tips", "boosting-fertility.jpg");
const ribbonSrc = path.join(
  "public",
  "articles",
  "infertility-and-iodine-deficiency-everything-you-need-to-know",
  "ribbon-box-logo.png",
);

await mkdir(outDir, { recursive: true });

const AK = "https://www.annabelkarmel.com/wp-content/uploads/2022/04";

async function download(url, dest) {
  let res = await fetch(url);
  if (!res.ok) {
    const proxy = `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=1400&output=jpg`;
    res = await fetch(proxy);
  }
  if (!res.ok) throw new Error(`${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error(`too small (${buf.length})`);
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
  console.log("fallback", path.basename(dest), "<-", path.basename(fallback));
}

const jobs = [
  ["hero.jpg", [`${AK}/brooke-lark-jUPOXXRNdcA-unsplash-1024x697-optimized.jpg`, `${AK}/brooke-lark-jUPOXXRNdcA-unsplash-scaled-optimized.jpg`], listingHero],
  ["avocados.jpg", [`${AK}/estudio-bloom-NYqCYYqymlM-unsplash-scaled-optimized.jpg`, `${AK}/estudio-bloom-NYqCYYqymlM-unsplash-1164x1536-optimized.jpg`], listingHero],
  ["berries.jpg", [`${AK}/aliona-gumeniuk-Y9WTwredge0-unsplash-scaled-optimized.jpg`, `${AK}/aliona-gumeniuk-Y9WTwredge0-unsplash-1536x2048-optimized.jpg`], listingHero],
  ["dairy.jpg", [`${AK}/larisa-birta-mzAI0NXH-yw-unsplash-scaled-optimized.jpg`, `${AK}/larisa-birta-mzAI0NXH-yw-unsplash-1367x2048-optimized.jpg`], listingHero],
  ["banana.jpg", [`${AK}/charlesdeluvio-0v_1TPz1uXw-unsplash-scaled-optimized.jpg`, `${AK}/charlesdeluvio-0v_1TPz1uXw-unsplash-1463x2048-optimized.jpg`], listingHero],
  ["citrus.jpg", [`${AK}/arianka-ibarra-fz4j0RPp9qo-unsplash-1024x1024-optimized.jpg`, `${AK}/arianka-ibarra-fz4j0RPp9qo-unsplash-2048x2048-optimized.jpg`], listingHero],
  ["quinoa.jpg", [`${AK}/sonny-mauricio-yhc4pSbl01A-unsplash-scaled-optimized.jpg`, `${AK}/sonny-mauricio-yhc4pSbl01A-unsplash-1638x2048-optimized.jpg`], listingHero],
];

for (const [name, urls, fallback] of jobs) {
  await tryDownload(urls, path.join(outDir, name), fallback);
}

try {
  await copyFile(ribbonSrc, path.join(outDir, "ribbon-box-logo.png"));
  console.log("ribbon logo copied");
} catch (e) {
  console.warn("ribbon logo", e.message);
}
