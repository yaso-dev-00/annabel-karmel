import { mkdir, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.join("public", "advice-category", "child-health-and-development");
const fallback = path.join("public", "articles", "gagging-vs-choking", "hero.jpg");

await mkdir(outDir, { recursive: true });

const AK = "https://www.annabelkarmel.com/wp-content/uploads";

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

async function tryDownload(urls, dest, fb) {
  for (const url of urls) {
    try {
      await download(url, dest);
      return;
    } catch (e) {
      console.warn("fail", path.basename(dest), e.message);
    }
  }
  await copyFile(fb, dest);
  console.log("fallback", path.basename(dest));
}

const jobs = [
  ["toddler-top-tips.jpg", [`${AK}/2022/02/toddler-scaled.jpg`]],
  ["gagging-vs-choking.jpg", [`${AK}/2020/08/5.1.3-SLIDE-3-scaled.jpg`, `${AK}/2020/08/5.1.3-SLIDE-3-scaled-optimized.jpg`]],
  ["weaning-premature-babies.jpg", [`${AK}/2019/10/shutterstock_394780183.jpg`, `${AK}/2019/10/shutterstock_394780183-optimized.jpg`]],
  ["looking-after-childrens-teeth.jpg", [`${AK}/2019/03/shutterstock_379214593.jpg`, `${AK}/2019/03/shutterstock_379214593-optimized.jpg`]],
  ["cooking-with-kids.jpg", [`${AK}/2022/01/Kids-386-scaled.jpg`, `${AK}/2022/01/Kids-386-scaled-optimized.jpg`]],
  ["toddler-snacking.jpg", [`${AK}/2017/07/shutterstock_1057719629.jpg`, `${AK}/2017/07/shutterstock_1057719629-optimized.jpg`, `${AK}/2021/07/toddler-snack-time-optimized.jpg`]],
  ["cooking-with-toddlers.jpg", [`${AK}/2016/08/cooking-with-toddlers-2.jpg`, `${AK}/2016/08/cooking-with-toddlers-2-optimized.jpg`]],
  ["potty-training.jpg", [`${AK}/2019/09/shutterstock_243863806.jpg`, `${AK}/2019/09/shutterstock_243863806-optimized.jpg`]],
  ["learn-through-play.png", [`${AK}/2016/08/learning-through-play.png`]],
  ["common-concerns.jpg", [`${AK}/2016/08/common-concerns-1.jpg`, `${AK}/2016/08/common-concerns-1-optimized.jpg`]],
  ["schools.jpg", [`${AK}/2016/07/shutterstock_254355235.jpg`, `${AK}/2016/07/shutterstock_254355235-optimized.jpg`]],
  ["family-health.jpg", [`${AK}/2016/07/family-health.jpg`, `${AK}/2016/07/family-health-optimized.jpg`]],
  ["teething.jpg", [`${AK}/2016/08/teething.jpg`, `${AK}/2016/08/teething-optimized.jpg`]],
];

for (const [name, urls] of jobs) {
  await tryDownload(urls, path.join(outDir, name), fallback);
}
