import { mkdir, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const listingDir = path.join("public", "advice-category", "breastfeeding-advice");
const fallback = path.join("public", "meet-our-experts", "kerry-secker.jpg");

await mkdir(listingDir, { recursive: true });

async function download(url, dest) {
  let res = await fetch(url);
  if (!res.ok) {
    const proxy = `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=1200&output=jpg`;
    res = await fetch(proxy);
  }
  if (!res.ok) throw new Error(`${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 3000) throw new Error(`too small (${buf.length})`);
  await writeFile(dest, buf);
  console.log("ok", path.basename(dest), buf.length);
}

async function tryDownload(url, dest, fb) {
  try {
    await download(url, dest);
  } catch (e) {
    console.warn("fail", path.basename(dest), e.message);
    await copyFile(fb, dest);
    console.log("fallback", path.basename(dest));
  }
}

const jobs = [
  ["breastmilk-storage.jpg", "https://www.annabelkarmel.com/wp-content/uploads/2019/09/shutterstock_68791360-optimized.jpg"],
  ["pumping.jpg", "https://www.annabelkarmel.com/wp-content/uploads/2019/08/Pumping-Square-optimized.jpg"],
  ["newborn-feeding-patterns.jpg", "https://www.annabelkarmel.com/wp-content/uploads/2019/08/Newborn-feeding-patterns-Square-optimized.jpg"],
  ["breastfeeding-friendly-bottle-feeding.jpg", "https://www.annabelkarmel.com/wp-content/uploads/2019/08/Breastfeeding-friendly-bottle-feeding-Square-optimized.jpg"],
  ["comfort-feeding.jpg", "https://www.annabelkarmel.com/wp-content/uploads/2019/08/Comfort-feeding-Square-optimized.jpg"],
  ["finding-pumping-routine.jpg", "https://www.annabelkarmel.com/wp-content/uploads/2019/08/FInd-a-pumping-routine-Square-optimized.jpg"],
  ["breastfeeding-cues.jpg", "https://www.annabelkarmel.com/wp-content/uploads/2019/08/Breastfeeding-Myths-Square-optimized.jpg"],
  ["breastfeeding-sessions.jpg", "https://www.annabelkarmel.com/wp-content/uploads/2019/08/Managing-breast-engorgement-Square-optimized.jpg"],
  ["breast-feeding-myths.jpg", "https://www.annabelkarmel.com/wp-content/uploads/2018/09/shutterstock_522973660-optimized.jpg"],
  ["introduction-to-breastfeeding.jpg", "https://www.annabelkarmel.com/wp-content/uploads/2016/08/Breastfeeding-optimized.jpg"],
  ["breastfeeding-getting-started.jpg", "https://www.annabelkarmel.com/wp-content/uploads/2019/08/Getting-the-perfect-latch-Square-optimized.jpg"],
  ["managing-breast-engorgement.jpg", "https://www.annabelkarmel.com/wp-content/uploads/2016/08/common-concerns-optimized.jpg"],
  ["have-i-got-enough-breast-milk.jpg", "https://www.annabelkarmel.com/wp-content/uploads/2016/08/supply-and-demand-optimized.jpg"],
  ["breastfeeding-multiples.jpg", "https://www.annabelkarmel.com/wp-content/uploads/2019/08/Breastfeeding-mulitples-Square-optimized.jpg"],
  ["breast-milk.jpg", "https://www.annabelkarmel.com/wp-content/uploads/2016/08/your-babys-milk-journey-optimized.jpg"],
  ["reflux-expert-advice.jpg", "https://www.annabelkarmel.com/wp-content/uploads/2016/08/reflux-optimized.jpg"],
];

for (const [name, url] of jobs) {
  await tryDownload(url, path.join(listingDir, name), fallback);
}
