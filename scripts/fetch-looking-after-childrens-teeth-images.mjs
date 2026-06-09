import { copyFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const slug = "looking-after-childrens-teeth";
const outDir = path.join("public", "articles", slug);
const listingImage = path.join(
  "public",
  "advice-category",
  "child-health-and-development",
  "looking-after-childrens-teeth.jpg",
);
const fallback = path.join("public", "articles", "gagging-vs-choking", "hero.jpg");

await mkdir(outDir, { recursive: true });

const AK = "https://www.annabelkarmel.com/wp-content/uploads";

async function download(url, dest) {
  let res = await fetch(url, {
    headers: { "user-agent": "Mozilla/5.0 (compatible; AKMirror/1.0)" },
  });
  if (!res.ok) {
    const proxy = `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=1200&output=jpg`;
    res = await fetch(proxy);
  }
  if (!res.ok) throw new Error(`${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 2000) throw new Error(`too small (${buf.length})`);
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
  ["hero.jpg", [`${AK}/2019/03/shutterstock_379214593-optimized.jpg`], listingImage],
  ["01-toothbrushing.jpg", [`${AK}/2019/03/shutterstock_103510871-optimized.jpg`]],
  ["02-bedtime-routine.jpg", [`${AK}/2019/03/shutterstock_492064342-optimized.jpg`]],
  ["03-bottle-use.jpg", [`${AK}/2019/03/shutterstock_666091525-1-optimized.jpg`]],
  ["04-sugar.jpg", [`${AK}/2015/06/Garlic-Pitta-Breadsticks-optimized.jpg`, `${AK}/2015/06/Garlic-Pitta-Breadsticks-1-3-optimized.jpg`]],
  ["05-labelling.jpg", [`${AK}/2009/05/infused-waters-3-optimized.jpg`, `${AK}/2009/05/infused-waters-2-optimized.jpg`]],
  ["06-fruits-smoothies.jpg", [`${AK}/2019/03/shutterstock_272431586-optimized.jpg`]],
  [
    "07-sugar-swap.jpg",
    [`${AK}/2018/11/41_Apricot-and-Cocoa-Energy-Balls-4_1000x1000-optimized.jpg`],
  ],
  ["08-caregivers.jpg", [`${AK}/2019/03/shutterstock_1271132917-optimized.jpg`]],
  ["09-dummies.jpg", [`${AK}/2019/03/shutterstock_553886122-optimized.jpg`]],
  ["10-dental-visits.jpg", [`${AK}/2019/03/shutterstock_477716185-optimized.jpg`]],
  ["helen-clint.jpg", [`${AK}/2019/03/Helen-Clint-optimized.jpg`]],
];

for (const [name, urls, fbOverride] of jobs) {
  if (fbOverride) {
    try {
      await copyFile(fbOverride, path.join(outDir, name));
      console.log("ok", name, "(listing copy)");
      continue;
    } catch {
      /* try URLs */
    }
  }
  await tryDownload(urls, path.join(outDir, name), fallback);
}

const fallbacks = [
  [
    "04-sugar.jpg",
    path.join("public", "articles", "10-delicious-cherry-tomato-recipes", "tomato-hummus-with-baked-tortilla-chips.jpg"),
  ],
];

for (const [name, src] of fallbacks) {
  try {
    const stat = await import("node:fs/promises").then((fs) => fs.stat(path.join(outDir, name)));
    if (stat.size < 5000) {
      await copyFile(src, path.join(outDir, name));
      console.log("related fallback", name);
    }
  } catch {
    try {
      await copyFile(src, path.join(outDir, name));
      console.log("related fallback", name);
    } catch (e) {
      console.warn("related fallback failed", name, e.message);
    }
  }
}
