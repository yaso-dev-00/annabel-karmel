import { mkdir, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.join("public", "advice-category", "pregnancy-tips");
await mkdir(outDir, { recursive: true });

const AK = "https://www.annabelkarmel.com/wp-content/uploads";
const fallback = path.join("public", "articles", "balanced-diet-throughout-trimesters", "hero.jpg");

async function download(url, dest) {
  const proxy = `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=1200`;
  let res = await fetch(proxy);
  if (!res.ok) res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  console.log("ok", path.basename(dest));
}

async function tryDownload(urls, dest) {
  for (const url of urls) {
    try {
      await download(url, dest);
      return;
    } catch (e) {
      console.warn("fail", url, e.message);
    }
  }
  await copyFile(fallback, dest);
  console.log("fallback", path.basename(dest));
}

const jobs = [
  [
    "infertility-iodine.jpg",
    [
      `${AK}/2022/04/andrew-seaman-8n02UpJ170E-unsplash-1024x678-optimized.jpg`,
      `${AK}/2022/04/andrew-seaman-8n02UpJ170E-unsplash-optimized.jpg`,
    ],
  ],
  [
    "boosting-fertility.jpg",
    [
      `${AK}/2022/04/brooke-lark-jUPOXXRNdcA-unsplash-1024x697-optimized.jpg`,
      `${AK}/2022/04/brooke-lark-jUPOXXRNdcA-unsplash-optimized.jpg`,
    ],
  ],
  [
    "fourth-trimester.jpg",
    [`${AK}/2019/08/top-10-tips-optimized.jpg`, `${AK}/2019/08/top-10-tips.jpg`],
  ],
  [
    "pregnancy-month-by-month.jpg",
    [
      `${AK}/2016/07/your-pregnancy-month-by-month-1-optimized.jpg`,
      `${AK}/2016/07/your-pregnancy-month-by-month-1.jpg`,
    ],
  ],
  ["nesting.jpg", [`${AK}/2016/07/nesting-optimized.jpg`, `${AK}/2016/07/nesting.jpg`]],
  ["what-to-buy.jpg", [`${AK}/2016/07/what-to-buy-optimized.jpg`, `${AK}/2016/07/what-to-buy.jpg`]],
];

for (const [name, urls] of jobs) {
  await tryDownload(urls, path.join(outDir, name));
}
