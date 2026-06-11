import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.join("public", "articles", "learn-through-play");
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

const jobs = [
  ["development-areas.png", `${AK}/2016/08/Key-Developmental-Areas-optimized.png`],
  ["messy-play.jpg", `${AK}/2016/08/shutterstock_563342317-1-optimized.png`],
  ["play-dough.jpg", `${AK}/2016/08/playdough-optimized.jpg`],
  ["open-ended-toys.jpg", `${AK}/2016/08/GWP3632-scaled-optimized.jpg`],
  ["handy-helpers.jpg", `${AK}/2016/08/shutterstock_551692165-optimized.png`],
  ["words-and-numbers.jpg", `${AK}/2016/08/shutterstock_559308964-optimized.png`],
  ["singing.jpg", `${AK}/2016/08/shutterstock_605386256-optimized.png`],
  ["story-time.jpg", `${AK}/2016/08/shutterstock_1023152578-optimized.png`],
  ["edx-promo.jpg", `${AK}/2020/01/IMG-1-optimized.jpg`],
  ["edx-button.png", `${AK}/2020/01/AK-EDX-Web-Button-200108-04-optimized.png`],
  ["instagram-icon.jpg", `${AK}/2020/01/Instagram-Logo-50x50-1-optimized.jpg`],
];

for (const [name, url] of jobs) {
  try {
    await download(url, path.join(outDir, name));
  } catch (e) {
    console.error("FAIL", name, e.message);
  }
}
