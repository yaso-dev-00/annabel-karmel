import { mkdir, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.join("public", "articles", "the-most-common-food-allergens-in-the-uk");
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
  [`${AK}/2017/06/shutterstock_1441241306.jpg`, `${AK}/2017/06/shutterstock_1441241306-optimized.jpg`],
  path.join(outDir, "hero.jpg"),
  path.join("public", "articles", "allergies-finding-support", "hero.jpg")
);
await tryDownload(
  [`${AK}/2026/05/Allergy-infographic-8-scaled.png`],
  path.join(outDir, "allergens-infographic.png"),
  path.join(outDir, "hero.jpg")
);
