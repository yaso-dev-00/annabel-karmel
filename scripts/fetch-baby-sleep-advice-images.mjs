import { mkdir, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const AK = "https://www.annabelkarmel.com/wp-content/uploads";
const listingDir = path.join("public", "advice-category", "baby-sleep-advice");
const fallback = path.join("public", "meet-our-experts", "kerry-secker.jpg");

await mkdir(listingDir, { recursive: true });

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

const listingJobs = [
  [
    "busting-common-baby-sleep-myths.jpg",
    [`${AK}/2019/07/shutterstock_578423287-1024x1024-optimized.jpg`, `${AK}/2019/07/shutterstock_578423287-optimized.jpg`],
  ],
  [
    "supporting-baby-wake-night.jpg",
    [`${AK}/2019/08/shutterstock_567049537-1-optimized.jpg`, `${AK}/2019/08/shutterstock_567049537-optimized.jpg`],
  ],
  [
    "baby-nap-times.jpg",
    [`${AK}/2019/03/shutterstock_553886122-optimized.jpg`, `${AK}/2019/03/shutterstock_553886122.jpg`],
  ],
  ["baby-bedtime.jpg", [`${AK}/2016/08/Sleep-optimized.jpg`, `${AK}/2016/08/Sleep.jpg`]],
  [
    "baby-sleep-routine.jpg",
    [`${AK}/2019/08/shutterstock_683173993-1-optimized.jpg`, `${AK}/2019/08/shutterstock_683173993-1.jpg`],
  ],
];

for (const [name, urls] of listingJobs) {
  await tryDownload(urls, path.join(listingDir, name), fallback);
}

const articleJobs = [
  {
    slug: "busting-common-baby-sleep-myths",
    images: [
      ["hero.jpg", [`${AK}/2019/07/shutterstock_578423287-optimized.jpg`]],
      ["myth-1.jpg", [`${AK}/2019/08/shutterstock_420756877.jpg`, `${AK}/2019/08/shutterstock_420756877-optimized.jpg`]],
      ["myth-2.jpg", [`${AK}/2019/08/shutterstock_364934036-1.jpg`, `${AK}/2019/08/shutterstock_364934036-1-optimized.jpg`]],
      ["myth-3.jpg", [`${AK}/2018/09/shutterstock_738113488.jpg`, `${AK}/2018/09/shutterstock_738113488-optimized.jpg`]],
      ["myth-4.png", [`${AK}/2019/08/ss.png`, `${AK}/2019/08/ss-optimized.png`]],
      ["myth-5.jpg", [`${AK}/2019/08/shutterstock_683173993-1-optimized.jpg`]],
      ["myth-6.jpg", [`${AK}/2019/08/shutterstock_567049537.jpg`, `${AK}/2019/08/shutterstock_567049537-optimized.jpg`]],
      ["myth-7.jpg", [`${AK}/2017/06/shutterstock_590219558.jpg`, `${AK}/2017/06/shutterstock_590219558-optimized.jpg`]],
      ["myth-8.jpg", [`${AK}/2019/08/shutterstock_504191899.jpg`, `${AK}/2019/08/shutterstock_504191899-optimized.jpg`]],
      ["kerry-secker.jpg", [`${AK}/2019/08/Kerry-Secker-optimized.jpg`, `${AK}/2019/08/Kerry-Secker.jpg`]],
    ],
  },
  {
    slug: "supporting-baby-wake-night",
    images: [
      ["hero.jpg", [`${AK}/2019/08/shutterstock_567049537-1-optimized.jpg`]],
      ["night-waking.jpg", [`${AK}/2019/08/shutterstock_504191899.jpg`, `${AK}/2019/08/shutterstock_504191899-optimized.jpg`]],
      ["kerry-secker.jpg", [`${AK}/2019/08/Kerry-Secker-optimized.jpg`]],
    ],
  },
  {
    slug: "baby-nap-times",
    images: [
      ["hero.jpg", [`${AK}/2019/03/shutterstock_553886122-optimized.jpg`]],
      ["kerry-secker.jpg", [`${AK}/2019/08/Kerry-Secker-optimized.jpg`]],
    ],
  },
  {
    slug: "baby-bedtime",
    images: [
      ["hero.jpg", [`${AK}/2016/08/Sleep-optimized.jpg`]],
      ["kerry-secker.jpg", [`${AK}/2019/08/Kerry-Secker-optimized.jpg`]],
    ],
  },
  {
    slug: "baby-sleep-routine",
    images: [
      ["hero.jpg", [`${AK}/2019/08/shutterstock_683173993-1-optimized.jpg`]],
      ["bedtime-routine.jpg", [`${AK}/2018/09/shutterstock_140065822-optimized.jpg`, `${AK}/2018/09/shutterstock_140065822.jpg`]],
      ["bath-time.jpg", [`${AK}/2016/07/shutterstock_1090785626-1-optimized.jpg`, `${AK}/2016/07/shutterstock_1090785626-1.jpg`]],
      ["kerry-secker.jpg", [`${AK}/2019/08/Kerry-Secker-optimized.jpg`]],
    ],
  },
];

for (const { slug, images } of articleJobs) {
  const outDir = path.join("public", "articles", slug);
  await mkdir(outDir, { recursive: true });
  for (const [name, urls] of images) {
    await tryDownload(urls, path.join(outDir, name), fallback);
  }
}
