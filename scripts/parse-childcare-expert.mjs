import { readFileSync } from "fs";

const html = readFileSync(new URL("./childcare-live.html", import.meta.url), "utf8");
const start = html.indexOf('expert-support-carousel owl-carousel');
const chunk = html.slice(start, start + 12000);
const re = /<div class="item"><img[^>]+src="([^"]+)" alt="([^"]+)"><div class="expert-slide-content"><h4>([^<]+)<\/h4><div class="expert-slide-content-inner">([\s\S]*?)<\/div><\/div><\/div>/g;

for (const match of chunk.matchAll(re)) {
  console.log(JSON.stringify({
    image: match[1].split("/").pop(),
    title: match[3],
    body: match[4].trim(),
  }, null, 2));
}
