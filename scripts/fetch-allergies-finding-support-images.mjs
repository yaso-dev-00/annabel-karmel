import { mkdir, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.join("public", "articles", "allergies-finding-support");
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
  [`${AK}/2017/06/shutterstock_302699477.jpg`, `${AK}/2017/06/shutterstock_302699477-optimized.jpg`],
  path.join(outDir, "hero.jpg"),
  path.join("public", "articles", "is-eczema-linked-to-food-allergies", "hero.jpg")
);
await tryDownload(
  [
    `${AK}/2017/06/shutterstock_412710196.jpg`,
    `${AK}/2017/06/shutterstock_412710196-256x300.jpg`,
  ],
  path.join(outDir, "managing-allergy.jpg"),
  path.join("public", "articles", "managing-my-childs-food-allergy", "shopping.jpg")
);
