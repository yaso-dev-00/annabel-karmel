import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pageUrl = "https://www.annabelkarmel.com/product-category/plant-powered-bites/";

const res = await fetch(pageUrl);
const html = await res.text();

const htmlPath = join(__dirname, "plant-powered-bites-live.html");
writeFileSync(htmlPath, html);

const urls = [...new Set([...html.matchAll(/https?:\/\/[^"'\s>]+\.(?:jpg|jpeg|png|svg|webp|mp4|gif)/gi)].map((m) => m[0]))];
urls.sort();

console.log(`Saved HTML to ${htmlPath}`);
console.log(`Found ${urls.length} asset URLs:\n`);
for (const url of urls) {
  console.log(url);
}
