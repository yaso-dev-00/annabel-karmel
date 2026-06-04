import { mkdir, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.join("public", "articles", "travelling-with-children-with-food-allergies");
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
  [`${AK}/2016/07/shutterstock_280220411.jpg`, `${AK}/2016/07/shutterstock_280220411-optimized.jpg`],
  path.join(outDir, "hero.jpg"),
  path.join("public", "articles", "food-allergy-vs-food-intolerance", "hero.jpg")
);
await tryDownload(
  [`${AK}/2017/06/shutterstock_549780931.jpg`, `https://annabelkarmel.com/wp-content/uploads/2017/06/shutterstock_549780931.jpg`],
  path.join(outDir, "be-prepared.jpg"),
  path.join("public", "articles", "managing-my-childs-food-allergy", "shopping.jpg")
);
await tryDownload(
  [`${AK}/2017/06/shutterstock_474705142.jpg`, `https://annabelkarmel.com/wp-content/uploads/2017/06/shutterstock_474705142.jpg`],
  path.join(outDir, "check-meds.jpg"),
  path.join("public", "articles", "managing-my-childs-food-allergy", "parties.jpg")
);
await tryDownload(
  [`${AK}/2017/06/shutterstock_92862460.jpg`, `https://annabelkarmel.com/wp-content/uploads/2017/06/shutterstock_92862460.jpg`],
  path.join(outDir, "eating-out.jpg"),
  path.join("public", "articles", "cows-milk-allergy", "hero.jpg")
);
