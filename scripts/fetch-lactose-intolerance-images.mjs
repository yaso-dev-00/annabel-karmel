import { mkdir, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.join("public", "articles", "managing-your-babys-lactose-intolerance");
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
const fallbackHero = path.join("public", "articles", "cows-milk-allergy", "hero.jpg");

const images = [
  {
    name: "hero.jpg",
    urls: [
      `${AK}/2019/04/shutterstock_570212251-1-optimized.jpg`,
      `${AK}/2019/04/shutterstock_570212251-1.jpg`,
    ],
    fallback: fallbackHero,
  },
  {
    name: "what-is-lactose.jpg",
    urls: [`${AK}/2019/04/shutterstock_519406789.jpg`, `${AK}/2019/04/shutterstock_519406789-optimized.jpg`],
    fallback: fallbackHero,
  },
  {
    name: "symptoms.jpg",
    urls: [`${AK}/2019/04/shutterstock_247174669-3.jpg`],
    fallback: path.join(outDir, "what-is-lactose.jpg"),
  },
  {
    name: "breastfeeding.jpg",
    urls: [`${AK}/2019/04/shutterstock_376979113.jpg`],
    fallback: path.join("public", "articles", "breastfeeding-and-food-allergies", "hero.jpg"),
  },
  {
    name: "infant-formula.jpg",
    urls: [`${AK}/2019/04/shutterstock_738113506-2.jpg`],
    fallback: path.join(outDir, "what-is-lactose.jpg"),
  },
  {
    name: "weaning.jpg",
    urls: [`${AK}/2018/11/shutterstock_692527879.jpg`, `${AK}/2018/11/shutterstock_692527879-optimized.jpg`],
    fallback: path.join("public", "articles", "most-common-food-allergies-in-babies", "hero.jpg"),
  },
  {
    name: "how-strict.jpg",
    urls: [`${AK}/2009/02/Three-cheese-sauce-3.jpg`],
    fallback: path.join(outDir, "weaning.jpg"),
  },
  {
    name: "plant-based-milks.jpg",
    urls: [`${AK}/2019/04/shutterstock_746530360.jpg`],
    fallback: path.join(outDir, "infant-formula.jpg"),
  },
  {
    name: "nutrition.jpg",
    urls: [`${AK}/2009/01/Carrot-puree-with-lentils-cheese-2.jpg`],
    fallback: path.join(outDir, "plant-based-milks.jpg"),
  },
  {
    name: "grow-out.jpg",
    urls: [`${AK}/2019/04/shutterstock_415238506.jpg`],
    fallback: path.join(outDir, "breastfeeding.jpg"),
  },
];

for (const { name, urls, fallback } of images) {
  const dest = path.join(outDir, name);
  try {
    await tryDownload(urls, dest, fallback);
  } catch (e) {
    console.error("skip", name, e.message);
  }
}
