import { mkdir, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.join("public", "articles", "breastfeeding-and-food-allergies");
await mkdir(outDir, { recursive: true });

async function download(url, dest) {
  const proxy = `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=1200`;
  let res = await fetch(proxy);
  if (!res.ok) res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status}`);
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  console.log("ok", dest);
}

async function tryDownload(urls, dest, fallback) {
  for (const url of urls) {
    try {
      await download(url, dest);
      return;
    } catch {
      console.warn("fail", url);
    }
  }
  await copyFile(fallback, dest);
  console.log("copied fallback", fallback, "->", dest);
}

const AK = "https://www.annabelkarmel.com/wp-content/uploads";
await tryDownload(
  [`${AK}/2017/06/shutterstock_590219558.jpg`, `${AK}/2017/06/shutterstock_590219558-optimized.jpg`],
  path.join(outDir, "hero.jpg"),
  path.join("public", "articles", "cows-milk-allergy", "hero.jpg")
);
await tryDownload(
  [`${AK}/2017/10/recips-optimized.png`, `${AK}/2017/10/recips.png`],
  path.join(outDir, "book-busy-mums.png"),
  path.join("public", "articles", "food-allergy-vs-food-intolerance", "book-real-food.png")
);
