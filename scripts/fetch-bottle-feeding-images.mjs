import { mkdir, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const listingDir = path.join("public", "advice-category", "bottle-feeding-tips");
const fallback = path.join("public", "advice-category", "breastfeeding-advice", "breastmilk-storage.jpg");

await mkdir(listingDir, { recursive: true });

async function download(url, dest) {
  let res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
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
  ["paced-bottle-feeding.jpg", "https://www.annabelkarmel.com/wp-content/uploads/2019/08/Paced-bottle-feeding-Header-optimized.jpg"],
  ["responsive-bottle-feeding.jpg", "https://www.annabelkarmel.com/wp-content/uploads/2016/08/Breast-Bottle-mini-e1485162402338-optimized.jpg"],
  ["how-to-sterilise-bottles.jpg", "https://www.annabelkarmel.com/wp-content/uploads/2019/08/How-to-sterilise-bottles-Header-optimized.jpg"],
  ["different-infant-formula-milks.jpg", "https://www.annabelkarmel.com/wp-content/uploads/2016/08/your-babys-milk-journey-optimized.jpg"],
  ["formula-milk.jpg", "https://www.annabelkarmel.com/wp-content/uploads/2019/09/shutterstock_68791360-optimized.jpg"],
];

for (const [name, url] of jobs) {
  await tryDownload(url, path.join(listingDir, name), fallback);
}
