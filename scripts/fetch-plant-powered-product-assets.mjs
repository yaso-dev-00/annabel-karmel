import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

for (const slug of ["nuggets", "burgers"]) {
  const pageUrl = `https://www.annabelkarmel.com/products/${slug}/`;
  const res = await fetch(pageUrl);
  const html = await res.text();
  const htmlPath = join(__dirname, `plant-powered-${slug}-live.html`);
  writeFileSync(htmlPath, html);

  const urls = [
    ...new Set(
      [...html.matchAll(/https?:\/\/[^"'\s>]+\.(?:jpg|jpeg|png|svg|webp)/gi)].map((m) => m[0]),
    ),
  ];
  urls.sort();

  console.log(`\n=== ${slug} (${urls.length} assets) ===`);
  for (const url of urls) {
    console.log(url);
  }
}
