/**
 * One-off: fetch OG images from AK article pages into public/articles/<slug>/hero.*
 */
import { mkdir, writeFile } from "fs/promises";
import { dirname, extname } from "path";
import { fileURLToPath } from "url";

const root = fileURLToPath(new URL("..", import.meta.url));

const articles = [
  "best-foods-to-help-your-baby-sleep",
  "6-tips-for-getting-out-and-about-with-baby",
  "starting-solids-top-tips-on-how-to-transition-from-milk-to-solid-food",
  "your-guide-to-supporting-babys-gut-health",
  "tips-on-how-to-keep-baby-hydrated",
  "fibre-intake-for-babies-what-you-need-to-know",
  "pedal-power",
  "annabels-6-family-favourites-with-heck",
  "get-your-free-top-50-first-foods-list",
  "haunted-toast-toppers",
  "10-delicious-cherry-tomato-recipes",
];

async function ogImage(url) {
  const res = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0 (compatible; AKMirror/1.0)",
    },
  });
  const html = await res.text();
  const m = html.match(/property="og:image"\s+content="([^"]+)"/);
  return m?.[1] ?? null;
}

for (const slug of articles) {
  const pageUrl = `https://www.annabelkarmel.com/${slug}/`;
  const imgUrl = await ogImage(pageUrl);
  if (!imgUrl) {
    console.error("No og:image", slug);
    continue;
  }
  const ext = extname(new URL(imgUrl).pathname) || ".jpg";
  const outPath = `${root}/public/articles/${slug}/hero${ext}`;
  await mkdir(dirname(outPath), { recursive: true });
  const imgRes = await fetch(imgUrl);
  if (!imgRes.ok) {
    console.error("Fetch image failed", slug, imgRes.status);
    continue;
  }
  const buf = Buffer.from(await imgRes.arrayBuffer());
  await writeFile(outPath, buf);
  console.log("OK", slug, outPath);
}
