import { mkdir, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.join("public", "articles", "are-allergies-genetic");
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
const managing = path.join("public", "articles", "managing-my-childs-food-allergy");

await tryDownload(
  [`${AK}/2017/06/genetics.jpg`, `${AK}/2017/06/genetics-optimized.jpg`],
  path.join(outDir, "genetics.jpg"),
  path.join("public", "articles", "introducing-allergenic-foods", "hero.jpg")
);

await tryDownload(
  [`${AK}/2017/06/genetics.jpg`],
  path.join(outDir, "hero.jpg"),
  path.join(outDir, "genetics.jpg")
);

await tryDownload(
  [`${AK}/2017/01/1-optimized.png`, `${AK}/2017/01/1.png`],
  path.join(outDir, "book-baby-led-weaning.png"),
  path.join(managing, "book-baby-led-weaning.png")
);

await tryDownload(
  [`${AK}/2017/01/3-optimized.png`, `${AK}/2017/01/3.png`],
  path.join(outDir, "book-family.png"),
  path.join(managing, "book-family.png")
);
