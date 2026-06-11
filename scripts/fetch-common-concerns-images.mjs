import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.join("public", "articles", "common-concerns");
const AK = "https://www.annabelkarmel.com/wp-content/uploads";

await mkdir(outDir, { recursive: true });

async function download(url, dest) {
  let res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
  });
  if (!res.ok) {
    const proxy = `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=1400`;
    res = await fetch(proxy);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 3000) throw new Error(`too small (${buf.length})`);
  await writeFile(dest, buf);
  console.log("ok", path.basename(dest), buf.length);
}

const urls = [
  `${AK}/2016/08/common-concerns-1-optimized.jpg`,
  `${AK}/2016/08/common-concerns-1.jpg`,
];

for (const url of urls) {
  try {
    await download(url, path.join(outDir, "hero.jpg"));
    break;
  } catch (e) {
    console.warn("fail", url, e.message);
  }
}
