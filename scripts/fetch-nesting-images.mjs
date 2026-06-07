import { mkdir, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";

const slug = "nesting";
const outDir = path.join("public", "articles", slug);
const listingHero = path.join("public", "advice-category", "pregnancy-tips", "nesting.jpg");

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

async function tryDownload(urls, dest, fallback) {
  for (const url of urls) {
    try {
      await download(url, dest);
      return;
    } catch (e) {
      console.warn("fail", path.basename(dest), e.message);
    }
  }
  await copyFile(fallback, dest);
  console.log("fallback", path.basename(dest), "<-", path.basename(fallback));
}

await tryDownload(
  [`${AK}/2016/07/nesting-optimized.jpg`, `${AK}/2016/07/nesting.jpg`],
  path.join(outDir, "hero.jpg"),
  listingHero,
);
