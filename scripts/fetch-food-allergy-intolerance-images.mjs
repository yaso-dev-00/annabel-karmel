import { mkdir, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.join("public", "articles", "food-allergy-vs-food-intolerance");
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
  [`${AK}/2017/06/intolerance-vs-allergy-1.jpg`, `${AK}/2017/06/intolerance-vs-allergy-1-optimized.jpg`],
  path.join(outDir, "hero.jpg"),
  path.join("public", "articles", "cows-milk-allergy", "hero.jpg")
);
await tryDownload(
  [
    `${AK}/2017/06/fdafa.png`,
    `${AK}/2017/06/shutterstock_256369225-300x200.jpg`,
    `${AK}/2017/06/intolerance-vs-allergy-1-optimized.jpg`,
  ],
  path.join(outDir, "food-intolerance.png"),
  path.join("public", "articles", "managing-my-childs-food-allergy", "shopping.jpg")
);
await tryDownload(
  [
    `${AK}/2017/06/shutterstock_256369225.jpg`,
    `${AK}/2017/06/shutterstock_256369225-300x200.jpg`,
  ],
  path.join(outDir, "food-allergy.jpg"),
  path.join("public", "articles", "managing-my-childs-food-allergy", "parties.jpg")
);
await tryDownload(
  [`${AK}/2019/10/toddler.png`, `${AK}/2019/10/toddler-optimized.png`],
  path.join(outDir, "book-meal-planner.png"),
  path.join("public", "articles", "cows-milk-allergy", "book-meal-planner.png")
);
await tryDownload(
  [`${AK}/2020/01/weaningmade.png`, `${AK}/2020/01/weaningmade-optimized.png`],
  path.join(outDir, "book-weaning-made-simple.png"),
  path.join("public", "articles", "weaning-and-baby-allergies", "book-meal-planner.png")
);
await tryDownload(
  [`${AK}/2018/06/kids.png`, `${AK}/2018/06/kids-optimized.png`],
  path.join(outDir, "book-real-food.png"),
  path.join("public", "articles", "managing-my-childs-food-allergy", "book-real-food.png")
);
